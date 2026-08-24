import { Course } from "../models/course.model.js";
import {
  getLessonContent,
  insertLessonContent,
  getCourseById,
} from "../lib/queries.js";
import { buildLessonPrompt } from "../lib/prompts.js";
import { generateJSON } from "../lib/gemini.js";
import { GoogleGenAI } from "@google/genai";
import * as googleTTS from "google-tts-api";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const LANGUAGE_CONFIG = {
  english: {
    instruction: "clear, concise, standard conversational English.",
    code: "en",
  },
  bengali: {
    instruction: "natural conversational Bengali in Bengali script.",
    code: "bn",
  },
  hinglish: {
    instruction: "simple, friendly Hinglish (Hindi written in Latin/English script). Keep technical terms in English.",
    code: "hi",
  },
  hindi: {
    instruction: "pure Hindi in Devanagari script. Keep concepts simple.",
    code: "hi",
  },
  tamil: {
    instruction: "natural conversational Tamil in Tamil script.",
    code: "ta",
  },
  spanish: {
    instruction: "clear, educational Spanish.",
    code: "es",
  },
};


export const getLesson = async (req, res) => {
  const userId = req.user._id || req.user.id;

  if (!userId) {
    console.error("❌ Auth Error: req.user is missing both _id and id");
    return res.status(401).json({ error: "Unauthorized access" });
  }

  try {
    const { courseId, moduleIndex, lessonIndex } = req.params;
    const userId = req.user._id;

    // 1. Log what we are looking for
    console.log(`🔍 DEBUG: Searching Course: ${courseId} for User: ${userId}`);

    // 2. Perform a raw find to check for existence first
    const exists = await Course.findById(courseId);
    console.log(
      `❓ DEBUG: Does course ${courseId} exist for ANY user?`,
      !!exists
    );

    if (exists) {
      console.log(
        `❓ DEBUG: Does course ${courseId} exist for ANY user?`,
        !!exists
      );
      const existsUserId = exists.user ? exists.user.toString() : "null";
      const requestUserId = userId.toString();

      console.log(`❓ DEBUG: Types match?`, existsUserId === requestUserId);
    }
    const course = await Course.findOne({ _id: courseId, user: userId });

    if (!course) {
      console.log(
        "❌ CRITICAL: Course found in db but NOT for this user/id combination."
      );
      return res.status(404).json({ error: "Course not found" });
    }

    //Validate Lesson Metadata
    const mod = course.modules[Number(moduleIndex)];
    const lessonMeta = mod?.lessons[Number(lessonIndex)];

    if (!mod || !lessonMeta) {
      return res.status(404).json({ error: "Lesson not found" });
    }

    //Return Cached Content (if exists)
    const cached = await getLessonContent(lessonMeta.id);
    if (cached) return res.json(cached);

    //Generate AI Content
    const generated = await generateJSON({
      prompt: buildLessonPrompt({
        courseTitle: course.title,
        courseDescription: course.description,
        moduleTitle: mod.title,
        lessonTitle: lessonMeta.title,
      }),
      temperature: 0.7,
    });

    const lesson = {
      lessonId: lessonMeta.id,
      courseId,
      user: userId,
      title: generated.title || lessonMeta.title,
      objectives: generated.objectives || [],
      content: generated.content || [],
    };

    //Persistence
    await insertLessonContent(lesson);
    res.status(201).json(lesson);
  } catch (err) {
    console.error("Lesson generation failed:", err);
    res.status(502).json({ error: err.message || "Lesson generation failed" });
  }
};

export const getLessonAudio = async (req, res) => {
  try {
    let { text, language = "hinglish" } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Lesson text is required." });
    }

    const config = LANGUAGE_CONFIG[language.toLowerCase()] || LANGUAGE_CONFIG["hinglish"];

    // 1. Generate text translation/summary via gemini-3.6-flash
    const translationResponse = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `Summarize and translate the following lesson into ${config.instruction}. Keep it around 2 to 3 sentences for a spoken summary. Output ONLY plain spoken text without headings or markdown formatting:

"${text}"`,
    });

    const spokenScript = translationResponse.text?.trim() || "Here is your lesson summary.";

    // 2. Use getAllAudioBase64 to handle scripts longer than 200 characters
    const audioChunks = await googleTTS.getAllAudioBase64(spokenScript, {
      lang: config.code,
      slow: false,
      host: "https://translate.google.com",
      timeout: 10000,
    });

    // 3. Concatenate all audio chunk buffers into one single buffer
    const buffers = audioChunks.map((chunk) => Buffer.from(chunk.base64, "base64"));
    const combinedBuffer = Buffer.concat(buffers);

    // 4. Send combined audio buffer back to frontend
    res.set({
      "Content-Type": "audio/mp3",
      "Content-Length": combinedBuffer.length,
    });

    return res.send(combinedBuffer);
  } catch (error) {
    console.error("Server error during audio generation:", error);
    return res.status(500).json({ error: error.message || "Failed to generate audio." });
  }
};
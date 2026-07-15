import { nanoid } from "nanoid";
import { generateJSON } from "../lib/gemini.js";
import { buildOutlinePrompt, buildLessonPrompt } from "../lib/prompts.js";
import { slugify } from "../utils/slug.js";
import {
  insertCourse,
  getAllCourses,
  getCourseById,
  getLessonContent,
  insertLessonContent,
  setLessonDone,
} from "../lib/queries.js";

export const getCourses = async (req, res, next) => {
  try { res.json(await getAllCourses()); } catch (err) { next(err); }
};

export const getCourse = async (req, res, next) => {
  try {
    const course = await getCourseById(req.params.id);
    if (!course) return res.status(404).json({ error: "Course not found" });
    res.json(course);
  } catch (err) { next(err); }
};

export const generateCourse = async (req, res) => {
  const topic = (req.body?.topic || "").trim();
  if (!topic) return res.status(400).json({ error: "topic is required" });

  try {
    // 1. Generate the outline using Gemini
    const outline = await generateJSON({
      prompt: buildOutlinePrompt(topic),
      temperature: 0.8,
    });

    if (!outline?.title || !Array.isArray(outline?.modules)) {
      throw new Error("Gemini returned an incomplete course outline.");
    }

    // 2. Prepare the course object
    const courseId = `${slugify(outline.title)}-${nanoid(6)}`;
    
    // Add unique IDs to every lesson so we can fetch them later
    const modulesWithIds = outline.modules.map(mod => ({
      ...mod,
      lessons: mod.lessons.map(lesson => ({
        ...lesson,
        id: nanoid(10) // Vital: each lesson needs a unique ID
      }))
    }));

    const course = {
      _id: courseId,      // Satisfies standard MongoDB schema practices
      id: courseId,       // Explicitly mapped to satisfy your insertCourse query mapping!
      title: outline.title,
      description: outline.description,
      tags: outline.tags,
      modules: modulesWithIds,
      progress: 0
    };

    // 3. Save to database
    await insertCourse(course);

    // 4. Return the new course to the frontend
    res.status(201).json(course);

  } catch (err) {
    console.error("Course generation failed:", err);
    res.status(500).json({ error: err.message || "Failed to generate course" });
  }
};

export const getLesson = async (req, res) => {
  try {
    const { courseId, moduleIndex, lessonIndex } = req.params;
    const course = await getCourseById(courseId);
    const mod = course?.modules[Number(moduleIndex)];
    const lessonMeta = mod?.lessons[Number(lessonIndex)];
    if (!mod || !lessonMeta) return res.status(404).json({ error: "Lesson not found" });

    const cached = await getLessonContent(lessonMeta.id);
    if (cached) return res.json(cached);

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
      title: generated.title || lessonMeta.title,
      objectives: generated.objectives || [],
      content: generated.content || [],
    };

    await insertLessonContent(lesson);
    res.status(201).json(lesson);
  } catch (err) {
    console.error("Lesson generation failed:", err);
    res.status(502).json({ error: err.message || "Lesson generation failed" });
  }
};

export const markLessonDone = async (req, res, next) => {
  try {
    const { courseId, moduleIndex, lessonIndex } = req.params;
    const done = req.body?.done !== false;
    const updated = await setLessonDone(courseId, Number(moduleIndex), Number(lessonIndex), done);
    if (!updated) return res.status(404).json({ error: "Lesson not found" });
    res.json(updated);
  } catch (err) { next(err); }
};
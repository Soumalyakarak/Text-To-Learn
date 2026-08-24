import { nanoid } from "nanoid";
import { generateJSON } from "../lib/gemini.js";
import { buildOutlinePrompt, buildLessonPrompt } from "../lib/prompts.js";
import { slugify } from "../utils/slug.js";
import {Course} from "../models/course.model.js";
import {
  insertCourse,
  getAllCourses,
  setLessonDone,
  getCourseById,
} from "../lib/queries.js";

export const getCourses = async (req, res, next) => {
  try { 
    const courses = await getAllCourses(req.user.id || req.user._id);
    res.json(courses); 
  } 
  catch (err) { 
    next(err);
  }
};

export const getCourse = async (req, res, next) => {
  try {
    const userId = req.user.id || req.user._id;
    console.log("🔍 Searching for ID:", req.params.id, "for User:", userId);
    
    // Test the query directly
    const course = await Course.findOne({ _id: req.params.id, user: userId }).lean();
    
    if (!course) {
        // Find out if the course exists at all, regardless of user
        const anyCourse = await Course.findById(req.params.id);
        console.log("❓ Does the course exist for ANY user?", !!anyCourse);
        return res.status(404).json({ error: "Course not found" });
    }
    res.json(course);
  } catch (err) { next(err); }
};

export const generateCourse = async (req, res) => {
  const topic = (req.body?.topic || "").trim();
  if (!topic) return res.status(400).json({ error: "topic is required" });

  if (!req.user) return res.status(401).json({ error: "Unauthorized" });

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
      id: courseId,       // Explicitly mapped to satisfy insertCourse query mapping!
      title: outline.title,
      description: outline.description,
      tags: outline.tags,
      modules: modulesWithIds,
      progress: 0,
      user: req.user.id || req.user._id,
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

export const markLessonDone = async (req, res, next) => {
  try {
    const { courseId, moduleIndex, lessonIndex } = req.params;
    const done = req.body?.done !== false;
    const updated = await setLessonDone(courseId, Number(moduleIndex), Number(lessonIndex), done, req.user.id || req.user._id);
    if (!updated) return res.status(404).json({ error: "Lesson not found" });
    res.json(updated);
  } catch (err) { next(err); }
};

export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    await Course.findByIdAndDelete(id);

    return res.status(200).json({ 
      success: true, 
      message: "Course deleted successfully." 
    });
  } catch (error) {
    console.error("Error in deleteCourse controller:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Internal server error." 
    });
  }
};
import { Course } from "../models/course.model.js";
import { LessonContent } from "../models/lesson.model.js";
import { YoutubeCache } from "../models/youtubecache.model.js";

// --- Course helpers ---------------------------------------------------
export async function insertCourse(course){
  await Course.create({
    _id: course.id,
    title: course.title,
    description: course.description,
    tags: course.tags ?? [],
    progress: course.progress ?? 0,
    modules: course.modules ?? [],
  });
}

export async function getAllCourses() {
  const docs = await Course.find().sort({ createdAt: -1 }).lean();
  return docs.map(docToCourse);
}

export async function getCourseById(id) {
  const doc = await Course.findById(id).lean();
  return doc ? docToCourse(doc) : null;
}

export async function updateCourseModules(id, modules) {
  await Course.updateOne({ _id: id }, { $set: { modules } });
}

export async function setLessonDone(courseId, moduleIndex, lessonIndex, done) {
  const course = await getCourseById(courseId);
  if (!course) return null;

  const modules = course.modules;
  const lesson = modules?.[moduleIndex]?.lessons?.[lessonIndex];
  if (!lesson) return null;

  lesson.done = done;

  const total = modules.reduce((n, m) => n + m.lessons.length, 0);
  const completed = modules.reduce((n, m) => n + m.lessons.filter((l) => l.done).length, 0);
  const progress = total ? Math.round((completed / total) * 100) : 0;

  await Course.updateOne({ _id: courseId }, { $set: { modules, progress } });
  return getCourseById(courseId);
}

function docToCourse(doc) {
  return {
    id: doc._id,
    title: doc.title,
    description: doc.description,
    tags: doc.tags,
    progress: doc.progress,
    modules: doc.modules,
    createdAt: doc.createdAt,
  };
}

// --- Lesson content helpers --------------------------------------------

export async function getLessonContent(lessonId) {
  const doc = await LessonContent.findById(lessonId).lean();
  return doc ? docToLesson(doc) : null;
}

// In queries.js
export async function insertLessonContent(lesson) {
  await LessonContent.findByIdAndUpdate(
    lesson.lessonId, // The ID to look for
    {
      $set: {
        courseId: lesson.courseId,
        title: lesson.title,
        objectives: lesson.objectives ?? [],
        content: lesson.content ?? [],
      }
    },
    { upsert: true, returnDocument: 'after' } // "Upsert: true" handles the duplicate error
  );
}

function docToLesson(doc) {
  return {
    lessonId: doc._id,
    courseId: doc.courseId,
    title: doc.title,
    objectives: doc.objectives,
    content: doc.content,
  };
}

// --- YouTube cache helpers ----------------------------------------------

export async function getCachedYoutubeResult(query) {
  const doc = await YoutubeCache.findById(query).lean();
  return doc ? { video_id: doc.videoId, title: doc.title } : null;
}

export async function cacheYoutubeResult(query, videoId, title) {
  await YoutubeCache.updateOne(
    { _id: query },
    { $set: { videoId, title } },
    { upsert: true }
  );
}
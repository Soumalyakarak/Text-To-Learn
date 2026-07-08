import { Router } from "express";
import { 
  getCourses, 
  getCourse, 
  generateCourse, 
  getLesson, 
  markLessonDone 
} from "../controllers/course.controller.js";

export const coursesRouter = Router();

coursesRouter.get("/", getCourses);
coursesRouter.get("/:id", getCourse);
coursesRouter.post("/generate", generateCourse);
coursesRouter.get("/:courseId/lessons/:moduleIndex/:lessonIndex", getLesson);
coursesRouter.patch("/:courseId/lessons/:moduleIndex/:lessonIndex/done", markLessonDone);
import { Router } from "express";
import { 
  getCourses, 
  getCourse, 
  generateCourse, 
  markLessonDone, 
  deleteCourse
} from "../controllers/course.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import { getLesson} from "../controllers/lesson.controller.js";

export const coursesRouter = Router();

coursesRouter.use(authenticateUser);

coursesRouter.get("/:courseId/module/:moduleIndex/lesson/:lessonIndex", getLesson);
coursesRouter.patch("/:courseId/lessons/:moduleIndex/:lessonIndex/done", markLessonDone);

coursesRouter.get("/", getCourses);
coursesRouter.post("/generate", generateCourse);

coursesRouter.get("/:id", getCourse);
coursesRouter.delete("/:id", deleteCourse);
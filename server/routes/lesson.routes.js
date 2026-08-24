import express from "express";
import { getLesson, getLessonAudio} from "../controllers/lesson.controller.js";

export const lessonRouter = express.Router();

lessonRouter.post("/audio/generate",getLessonAudio);

lessonRouter.get("/:courseId/module/:moduleIndex/lesson/:lessonIndex", getLesson);
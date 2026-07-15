import express from "express";
import { getOrGenerateLesson } from "../controllers/lesson.controller.js";

export const lessonRouter = express.Router();

lessonRouter.get("/:courseId/module/:moduleIndex/lesson/:lessonIndex", getOrGenerateLesson);
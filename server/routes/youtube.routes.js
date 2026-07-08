import { Router } from "express";
import { searchYoutube } from "../controllers/youtube.controller.js";

export const youtubeRouter = Router();

youtubeRouter.get("/", searchYoutube);
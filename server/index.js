import express from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
console.log("Current Directory:", process.cwd());
console.log("Is GEMINI_API_KEY defined?", !!process.env.GEMINI_API_KEY);
import { authRouter }  from "./routes/auth.routes.js";
import { coursesRouter } from "./routes/course.routes.js";
import { youtubeRouter } from "./routes/youtube.routes.js";
import { progressRouter } from "./routes/progress.routes.js";
import { lessonRouter } from "./routes/lesson.routes.js";
import passport from "passport";


const app = express();
app.set("trust proxy", 1);
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
/* ---------------- middleware ---------------- */
app.use(cookieParser());
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json()); 
app.use(passport.initialize());   
/* ---------------- routes ---------------- */
// app.use((req, res, next) => {
//   console.log(`🔍 Incoming Request: ${req.method} ${req.url}`);
//   next();
// });
app.use("/api/auth", authRouter);
app.use("/api/courses", coursesRouter);
app.use("/api/youtube", youtubeRouter);
app.use("/api/progress", progressRouter);
app.use("/api/lessons", lessonRouter);


/* ---------------- error handler ---------------- */

/* ---------------- http server ---------------- */
const server = http.createServer(app);





export default server;
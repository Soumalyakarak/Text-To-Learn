import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { coursesRouter } from "./routes/course.routes.js";
import { youtubeRouter } from "./routes/youtube.routes.js";


const app = express();
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
/* ---------------- middleware ---------------- */
// app.use(cookieParser());
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());    
/* ---------------- routes ---------------- */
app.get("/", (req,res) => {
    res.json({ message: "Welcome to Text-To-Learn!" });
})
app.use("/api/courses", coursesRouter);
app.use("/api/youtube", youtubeRouter);


/* ---------------- error handler ---------------- */

/* ---------------- http server ---------------- */
const server = http.createServer(app);





export default server;
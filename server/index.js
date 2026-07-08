import express from "express";
import http from "http";
// import cors from "cors";
import dotenv from "dotenv";
dotenv.config();


const app = express();
// const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";
/* ---------------- middleware ---------------- */
// app.use(cookieParser());
// app.use(
//   cors({
//     origin: CLIENT_URL,
//     credentials: true,
//   })
// );
app.use(express.json());    
/* ---------------- routes ---------------- */
app.get("/", (req, res) => {
    res.send("Server is running!");
});

/* ---------------- error handler ---------------- */

/* ---------------- http server ---------------- */
const server = http.createServer(app);





export default server;
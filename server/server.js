import dotenv from "dotenv";
// import mongoose from "mongoose";
import server from "./index.js";


dotenv.config();

const PORT = process.env.PORT || 5000;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

// mongoose.connect(process.env.MONGO_URI);

// mongoose.connection.on("connected", () => {
//   console.log("🟢 MongoDB connected");
// });

// mongoose.connection.on("disconnected", () => {
//   console.log("🔴 MongoDB disconnected");
// });

// mongoose.connection.on("error", (err) => {
//   console.error("MongoDB error:", err);
// });
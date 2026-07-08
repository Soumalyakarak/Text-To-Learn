import mongoose from "mongoose";

// content blocks are heterogeneous (heading/paragraph/code/video/mcq), so we
// store them as Mixed rather than modeling every block type as its own schema.
const LessonContentSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // lesson id, matches Course.modules[].lessons[].id
  courseId: { type: String, required: true, index: true },
  title: { type: String, required: true },
  objectives: { type: [String], default: [] },
  content: { type: [mongoose.Schema.Types.Mixed], default: [] },
  createdAt: { type: Date, default: Date.now },
});

export const LessonContent = mongoose.model("LessonContent", LessonContentSchema);
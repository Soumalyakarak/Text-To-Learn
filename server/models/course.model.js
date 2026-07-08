import mongoose from "mongoose";

const LessonSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    done: { type: Boolean, default: false },
  },
  { _id: false }
);

const ModuleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    lessons: { type: [LessonSchema], default: [] },
  },
  { _id: false }
);

const CourseSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // slugified title + short id, e.g. "intro-to-ml-a1b2c3"
  title: { type: String, required: true },
  description: { type: String, default: "" },
  tags: { type: [String], default: [] },
  progress: { type: Number, default: 0 },
  modules: { type: [ModuleSchema], default: [] },
  createdAt: { type: Date, default: Date.now },
});

export const Course = mongoose.model("Course", CourseSchema);
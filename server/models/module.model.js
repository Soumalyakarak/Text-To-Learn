import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  title: { type: String, required: true },
  order: { type: Number, required: true }, // Important for sorting
  lessons: [{ 
    title: String,
    lessonContentId: { type: String } // Links to your LessonContent model
  }],
});

export const Module = mongoose.model("Module", moduleSchema);
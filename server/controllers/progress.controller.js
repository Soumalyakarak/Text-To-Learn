import User from "../models/user.model.js";

// Fetch all progress for a specific course
export const getProgress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Return the array of completed lessons
    res.status(200).json({ completedLessons: user.completedLessons });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Toggle progress (Add or Remove)
export const toggleProgress = async (req, res) => {
  try {
    const { courseId, moduleIndex, lessonIndex, status } = req.body;
    const progressKey = `${courseId}-${moduleIndex}-${lessonIndex}`;

    if (status) {
      // Add to array if not already present
      await User.findByIdAndUpdate(req.user._id, {
        $addToSet: { completedLessons: progressKey },
      });
    } else {
      // Remove from array
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { completedLessons: progressKey },
      });
    }

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
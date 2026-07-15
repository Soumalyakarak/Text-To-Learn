import { getLessonContent, insertLessonContent, getCourseById } from "../lib/queries.js";
import { buildLessonPrompt } from "../lib/prompts.js";
import { generateJSON } from "../lib/gemini.js"; 

export const getOrGenerateLesson = async (req, res) => {
  const { courseId, moduleIndex, lessonIndex } = req.params;
  
  // 1. Create a unique ID for this specific position (so DB knows which lesson it is)
  const lessonId = `c-${courseId}-m-${moduleIndex}-l-${lessonIndex}`;

  try {
    let lessonData = await getLessonContent(lessonId);
    if (lessonData) return res.status(200).json(lessonData);

    // 2. Not in DB? Generate it.
    const course = await getCourseById(courseId);
    
    // ADD THIS SAFETY CHECK:
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    if (!course.modules || !course.modules[moduleIndex]) {
      console.log("DEBUG: Invalid module index:", moduleIndex, "in course:", courseId);
      return res.status(404).json({ error: "Module not found" });
    }
    if (!course.modules[moduleIndex].lessons || !course.modules[moduleIndex].lessons[lessonIndex]) {
      console.log("DEBUG: Invalid lesson index:", lessonIndex, "in module:", moduleIndex);
      return res.status(404).json({ error: "Lesson not found" });
    }

    const lessonTitle = course.modules[moduleIndex].lessons[lessonIndex].title;
    
    const prompt = buildLessonPrompt({
      courseTitle: course.title,
      courseDescription: course.description,
      moduleTitle: course.modules[moduleIndex].title,
      lessonTitle: lessonTitle
    });

    const aiResponse = await generateJSON({ prompt });

    // 3. Save it
    const newLesson = { lessonId, courseId, title: lessonTitle, ...aiResponse };
    await insertLessonContent(newLesson);
    
    res.status(201).json(newLesson);
  }catch (err) {
    console.error("DEBUG - Lesson Generation Error:", err); // ADD THIS
    res.status(500).json({ error: err.message }); // Send the actual error
  }
};
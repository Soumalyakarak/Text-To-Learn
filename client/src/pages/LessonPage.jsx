import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LessonRenderer from "../components/LessonRenderer";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { LessonPDF } from "../components/LessonPDF";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Download,
} from "lucide-react";

export default function LessonPage() {
  const { courseId, moduleIndex, lessonIndex } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lesson, setLesson] = useState(null);

  const [completedLessons, setCompletedLessons] = useState(() => {
    // Load from localStorage so it persists on refresh
    return JSON.parse(localStorage.getItem("completedLessons") || "{}");
  });

  const isCurrentLessonCompleted =
    !!completedLessons[`${courseId}-${moduleIndex}-${lessonIndex}`];

  const toggleMarkAsRead = () => {
    const key = `${courseId}-${moduleIndex}-${lessonIndex}`;
    const newCompleted = {
      ...completedLessons,
      [key]: !completedLessons[key], // Toggles between true and false
    };
    setCompletedLessons(newCompleted);
    localStorage.setItem("completedLessons", JSON.stringify(newCompleted));
  };

  const goToNext = () => {
    const currentModIdx = Number(moduleIndex);
    const currentLesIdx = Number(lessonIndex);
    const currentModLessons = course.modules?.[currentModIdx]?.lessons || [];

    if (currentLesIdx + 1 < currentModLessons.length) {
      navigate(
        `/course/${courseId}/module/${currentModIdx}/lesson/${
          currentLesIdx + 1
        }`
      );
    } else if (currentModIdx + 1 < (course.modules?.length || 0)) {
      navigate(`/course/${courseId}/module/${currentModIdx + 1}/lesson/0`);
    } else {
      navigate(`/course/${courseId}`);
    }
  };

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      //Fetch course outline
      const cRes = await fetch(
        `${import.meta.env.VITE_API_URL}/courses/${courseId}`
      );
      const courseData = await cRes.json();
      setCourse(courseData);

      //Fetch specific lesson content using the indices you already use
      const lRes = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/courses/${courseId}/module/${moduleIndex}/lesson/${lessonIndex}`
      );
      if (lRes.ok) {
        const lessonData = await lRes.json();
        setLesson(lessonData);
      }
      setLoading(false);
    };

    if (courseId) fetchAll();
  }, [courseId, moduleIndex, lessonIndex]);

  if (loading) {
    return (
      <div className="mx-auto max-w-230 px-10 pt-12 pb-20 text-text-secondary animate-pulse">
        Loading lesson content...
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="mx-auto max-w-230 px-10 pt-12 pb-20 text-red-400">
        Course or lesson data not found.
      </div>
    );
  }

  // Safely resolve module and lesson meta items using index offsets from parameters
  const mod = course.modules?.[Number(moduleIndex)];
  const lessonMeta = mod?.lessons?.[Number(lessonIndex)];

  if (!mod || !lessonMeta) {
    return (
      <div className="mx-auto max-w-230 px-10 pt-12 pb-20">
        Lesson sequence not found in this module configuration.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-230 px-10 pt-12 pb-20">
      <div className="mb-1.5 text-[13px] text-text-muted">
        Module {Number(moduleIndex) + 1} · {mod.title}
      </div>
      <div className="mb-1.5 text-[26px] font-semibold tracking-[-0.5px]">
        {lessonMeta.title}
      </div>
      <div className="mb-5 text-[13px] text-text-muted">
        Lesson {Number(lessonIndex) + 1} of {mod.lessons.length}
      </div>
      {/* Render objectives if Gemini generated them, or fall back smoothly */}
      {lessonMeta.objectives && lessonMeta.objectives.length > 0 && (
        <div className="mb-7 rounded-xl border border-hairline bg-surface-1 px-5 py-4.5">
          <h4 className="mb-2.5 text-xs tracking-wide text-text-muted uppercase">
            Objectives
          </h4>
          <ul>
            {lessonMeta.objectives.map((o, i) => (
              <li
                key={i}
                className="relative mb-1.5 pl-4.5 text-sm text-text-secondary before:absolute before:left-0 before:text-accent before:content-['→']"
              >
                {o}
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Passes content right down to your custom rendering components */}
      <div id="lesson-content">
        <LessonRenderer
          content={
            lesson?.content ||
            (error ? "Error loading content" : "Content is generating...")
          }
        />
      </div>
      {/* Updated Responsive Footer */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-hairline pt-6">
        {/* Left Action: Back */}
        <button
          onClick={() => navigate(`/course/${courseId}`)}
          className="flex items-center gap-2 whitespace-nowrap rounded-full border border-hairline px-4 py-2 text-sm font-semibold text-text-secondary transition-colors hover:text-text-primary w-full justify-center sm:w-auto"
        >
          <ArrowLeft size={16} />
          Back to Overview
        </button>

        {/* Right Actions: Mark Read, Next, Download */}
        <div className="flex flex-wrap items-center gap-3 w-full justify-center sm:w-auto sm:justify-end">
          {/* Mark as Read / Completed Button */}
          <button
            onClick={toggleMarkAsRead}
            className={`flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-all w-full justify-center sm:w-auto ${
              isCurrentLessonCompleted
                ? "bg-green-500 text-white border border-green-500 hover:bg-green-600"
                : "border border-hairline text-text-secondary hover:text-accent hover:border-accent"
            }`}
          >
            <Check size={16} />
            {isCurrentLessonCompleted ? "Completed" : "Mark as Read"}
          </button>

          {/* Next Lesson Button */}
          <button
            onClick={goToNext}
            className="flex items-center gap-2 whitespace-nowrap rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent/90 transition-all w-full justify-center sm:w-auto"
          >
            Next Lesson <ArrowRight size={16} />
          </button>

          {/* PDF Download Link */}
          <PDFDownloadLink
            document={
              <LessonPDF
                title={lesson?.title || "Lesson"}
                content={lesson?.content || []}
              />
            }
            fileName={`${lesson?.title || "lesson"}.pdf`}
            className="flex items-center gap-2 whitespace-nowrap rounded-full border border-hairline-strong px-4 py-2 text-sm font-semibold text-text-secondary transition-colors hover:text-text-primary w-full justify-center sm:w-auto"
          >
            {({ loading }) => (
              <>
                <Download size={16} />
                {loading ? "Preparing..." : "Download PDF"}
              </>
            )}
          </PDFDownloadLink>
        </div>
      </div>
    </div>
  );
}

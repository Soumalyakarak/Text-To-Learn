import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";

export default function CourseOverviewPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  // State to hold live database records
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/courses/${courseId}`
        );
        if (!response.ok) throw new Error("Course not found in database.");

        const data = await response.json();
        setCourse(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) fetchCourse();
  }, [courseId]);

  if (loading) {
    return (
      <div className="mx-auto max-w-[920px] px-10 pt-12 pb-20 text-text-secondary animate-pulse">
        Loading course layout...
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="mx-auto max-w-[920px] px-10 pt-12 pb-20 text-red-400">
        Course not found.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[920px] px-10 pt-12 pb-20">
      <div className="mb-8">
        <span className="rounded-md bg-accent-soft px-2 py-0.5 text-[11px] text-accent">
          {course.tags?.[0]}
        </span>
        <h1 className="mt-3 mb-2 text-[28px] font-semibold tracking-[-0.6px]">
          {course.title}
        </h1>
        <p className="max-w-[640px] text-[14.5px] leading-relaxed text-text-secondary">
          {course.description}
        </p>
      </div>

      {course.modules?.map((mod, mi) => (
        <div
          key={mi}
          className="mb-3 overflow-hidden rounded-xl border border-hairline"
        >
          <div className="flex items-center justify-between bg-surface-1 px-4.5 py-4">
            <h4 className="text-[14.5px] font-semibold">
              {mi + 1}. {mod.title}
            </h4>
            <span className="text-xs text-text-muted">
              {mod.lessons?.length} lessons
            </span>
          </div>
          {mod.lessons?.map((lesson, li) => {
            // Retrieve completed lessons from local storage
            const completedLessons = JSON.parse(
              localStorage.getItem("completedLessons") || "{}"
            );
            const isCompleted = completedLessons[`${courseId}-${mi}-${li}`];

            return (
              <div
                key={lesson.id}
                onClick={() =>
                  navigate(`/course/${courseId}/module/${mi}/lesson/${li}`)
                }
                className="flex cursor-pointer items-center gap-3 border-t border-hairline px-4.5 py-3 text-[13.5px] text-text-secondary transition-colors hover:bg-surface-1 hover:text-text-primary"
              >
                {/* Indicator Circle */}
                <div
                  className={`h-4 w-4 flex-shrink-0 rounded-full border-[1.5px] flex items-center justify-center 
        ${isCompleted ? "bg-green-500 border-green-500" : "border-hairline"}`}
                >
                  {isCompleted && <Check size={10} className="text-white" />}
                </div>
                {lesson.title}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

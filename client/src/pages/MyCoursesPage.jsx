import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authenticatedFetch } from "../lib/api";

export default function MyCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        setLoading(true);
        const res = await authenticatedFetch(
          `${import.meta.env.VITE_API_URL}/courses`
        );
        if (!res.ok) throw new Error("Failed to load courses");

        const data = await res.json();
        setCourses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCourses();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-[920px] px-10 pt-12 pb-20 text-text-secondary animate-pulse">
        Loading your course library...
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-[920px] px-10 pt-12 pb-20 text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[920px] px-10 pt-12 pb-20">
      <div className="mb-8">
        <h1 className="text-[28px] font-semibold tracking-[-0.6px]">
          Your Courses
        </h1>
        <p className="mt-1 text-[14.5px] text-text-secondary">
          Select a course to continue learning or review generated modules.
        </p>
      </div>

      {courses.length === 0 ? (
        <div className="rounded-xl border border-hairline bg-surface-1 p-8 text-center text-text-secondary">
          No courses generated yet. Go to Home to create your first course!
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course._id || course.id}
              onClick={() => navigate(`/course/${course._id || course.id || course.slug || course.courseId}`)}
              className="group cursor-pointer rounded-xl border border-hairline bg-surface-1 p-5 transition-all hover:border-accent hover:shadow-md"
            >
              {course.tags?.[0] && (
                <span className="rounded-md bg-accent-soft px-2 py-0.5 text-[11px] text-accent">
                  {course.tags[0]}
                </span>
              )}
              <h3 className="mt-3 text-[16px] font-semibold group-hover:text-accent">
                {course.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-xs text-text-secondary">
                {course.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
import { memo } from "react";
import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Home, BookOpen, Trash2 } from "lucide-react"; // Added icons
import { authenticatedFetch } from "../lib/api";

export default function SidebarNavigation() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await authenticatedFetch(
          `${import.meta.env.VITE_API_URL}/courses`
        );
        if (res.ok) {
          const data = await res.json();
          setCourses(data);
        }
      } catch (err) {
        console.error("Failed to fetch courses for sidebar:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleDeleteCourse = async (e, courseId) => {
    e.preventDefault();
    e.stopPropagation();

    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      const res = await authenticatedFetch(
        `${import.meta.env.VITE_API_URL}/courses/${courseId}`,
        { method: "DELETE" }
      );

      if (res.ok) {
        // Remove the course from the sidebar state instantly
        setCourses((prev) => prev.filter((c) => c.id !== courseId));

        // If the user is currently on the deleted course's page, kick them back to home
        if (location.pathname.includes(`/course/${courseId}`)) {
          navigate("/");
        }
      } else {
        alert("Failed to delete the course from the server.");
        console.error("Server returned non-ok status for deletion.");
      }
    } catch (err) {
      alert("A network error occurred while deleting the course.");
      console.error("Error deleting course:", err);
    }
  };

  return (
    // Added border-r border-hairline to separate from main content
    <div className="flex h-screen w-62 shrink-0 flex-col border-r border-hairline bg-canvas p-3 pt-5">
      <div className="flex items-center gap-2 px-2 pb-5 text-[15px] font-semibold text-text-primary">
        <span className="h-2 w-2 rounded-full bg-accent" />
        Text-to-Learn
      </div>

      <NavItem to="/" icon={<Home size={16} />}>
        Home
      </NavItem>

      <div className="px-2 pt-6 pb-2 text-[11px] font-bold tracking-wider text-text-muted uppercase">
        Your Courses
      </div>

      <div className="flex flex-col gap-1">
        {loading ? (
          <div className="px-3 py-2 text-[12px] text-text-muted animate-pulse">
            Loading courses...
          </div>
        ) : courses.length > 0 ? (
          courses.map((c) => (
            <NavItem
              key={c.id}
              to={`/course/${c.id}`}
              onDelete={(e) => handleDeleteCourse(e, c.id)} // Pass the delete handler
            >
              {c.title}
            </NavItem>
          ))
        ) : (
          <div className="px-3 py-2 text-[12px] text-text-muted">
            No courses found.
          </div>
        )}
      </div>
    </div>
  );
}

const NavItem = memo(function NavItem({ to, icon, children, onDelete }) {
  return (
    <div className="group relative flex items-center">
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex w-full items-center gap-3 rounded-lg px-3 py-2 pr-8 text-[13.5px] no-underline transition-all duration-200 ${
            isActive
              ? "bg-surface-2 text-text-primary shadow-sm"
              : "text-text-secondary hover:bg-surface-1 hover:text-text-primary"
          }`
        }
      >
        {icon && <span className="flex shrink-0 items-center opacity-80">{icon}</span>}
        <span className="truncate">{children}</span>
      </NavLink>

      {onDelete && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDelete(e);
          }}
          className="absolute right-2 flex h-6 w-6 items-center justify-center rounded-md text-text-muted opacity-0 transition-all hover:bg-red-500/10 hover:text-red-400 group-hover:opacity-100"
          title="Delete course"
        >
          <Trash2 size={13} />
        </button>
      )}
    </div>
  );
});

export { NavItem };

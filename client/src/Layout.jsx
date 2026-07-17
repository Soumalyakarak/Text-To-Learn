import { Outlet, Link, useLocation } from "react-router-dom";
import SidebarNavigation from "./components/SidebarNavigation";
import { courses } from "./data/mockCourses";

export default function Layout() {
  const location = useLocation();

  return (
    <div className="flex h-screen">
      <SidebarNavigation courses={courses} />
      <div className="flex-1 overflow-y-auto">
        <Topbar path={location.pathname} />
        <Outlet />
      </div>
    </div>
  );
}

function Topbar({ path }) {
  return (
    <div className="sticky top-0 z-[5] flex h-14 items-center justify-between border-b border-hairline bg-[rgba(7,8,10,0.85)] px-7 backdrop-blur-sm">
      <span className="text-[13px] text-text-muted">
        <b className="font-medium text-text-primary">{crumbFor(path)}</b>
      </span>
      <Link
        to="/"
        className="rounded-full border border-hairline-strong px-4 py-2 text-sm font-semibold text-text-secondary no-underline transition-colors hover:text-text-primary"
      >
        ← Home
      </Link>
    </div>
  );
}

function crumbFor(path) {
  if (path === "/") return "Home";
  if (path.includes("/lesson/")) return "Lesson";
  if (path.includes("/course/")) return "Course";
  return "";
}

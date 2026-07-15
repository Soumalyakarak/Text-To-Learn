import { NavLink } from "react-router-dom";
import { Home, BookOpen} from "lucide-react"; // Added icons

export default function SidebarNavigation({ courses = [] }) {
  return (
    // Added border-r border-hairline to separate from main content
    <div className="flex h-screen w-62 shrink-0 flex-col border-r border-hairline bg-canvas p-3 pt-5">
      <div className="flex items-center gap-2 px-2 pb-5 text-[15px] font-semibold text-text-primary">
        <span className="h-2 w-2 rounded-full bg-accent" />
        Text-to-Learn
      </div>

      <NavItem to="/" icon={<Home size={16} />}>Home</NavItem>

      <div className="px-2 pt-6 pb-2 text-[11px] font-bold tracking-wider text-text-muted uppercase">
        Your Courses
      </div>
      
      <div className="flex flex-col gap-1">
        {courses.map((c) => (
          <NavItem key={c.id} to={`/course/${c.id}`} /*icon={<BookOpen size={16} />}*/>
            {c.title}
          </NavItem>
        ))}
      </div>
    </div>
  );
}

function NavItem({ to, icon, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-3 py-2 text-[13.5px] no-underline transition-all duration-200 ${
          isActive
            ? "bg-surface-2 text-text-primary shadow-sm"
            : "text-text-secondary hover:bg-surface-1 hover:text-text-primary"
        }`
      }
    >
      {/* Container for icon to keep alignment consistent */}
      <span className="flex items-center opacity-80">{icon}</span>
      {children}
    </NavLink>
  );
}
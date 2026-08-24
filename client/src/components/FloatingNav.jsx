import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function FloatingNav() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const handleGetStarted = () => {
    if (user) {
      // Scroll to the prompt form on the homepage
      const element = document.getElementById("prompt-form-section");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        document.getElementById("prompt-input")?.focus();
      } else {
        navigate("/");
      }
    } else {
      navigate("/signup");
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
          method: "GET",
          headers: {
            "Cache-Control": "no-cache", // Forces the browser to check the server
            Pragma: "no-cache",
          },
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user); // Set the user object from your backend response
        } else {
          setUser(null); // Keep as null if not logged in
        }
      } catch (err) {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        setUser(null);
        navigate("/");
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="fixed inset-x-0 top-0 z-50 flex justify-center px-5 pt-4">
      <nav className="flex w-full max-w-[960px] items-center justify-between gap-4 rounded-full border border-hairline-strong bg-[rgba(16,17,17,0.72)] py-2 pr-2 pl-5 backdrop-blur-2xl">
        <div className="flex items-center gap-2 text-[13.5px] font-semibold whitespace-nowrap">
          <span className="h-[7px] w-[7px] rounded-full bg-accent" />
          Text-to-Learn
        </div>

        <div className="hidden items-center gap-6 sm:flex">
          {/* Note: Keep these as <a> if they are smooth-scroll anchors on the same page */}
          <a
            href="#how-it-works"
            className="text-[12.5px] text-text-secondary transition-colors hover:text-text-primary"
          >
            How it works
          </a>
          <a
            href="#features"
            className="text-[12.5px] text-text-secondary transition-colors hover:text-text-primary"
          >
            Features
          </a>
          <Link
            to="/pricing"
            className="text-[12.5px] text-text-secondary transition-colors hover:text-text-primary"
          >
            Pricing
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <button
              onClick={handleLogout}
              className="text-[12.5px] text-text-secondary transition-colors hover:text-text-primary"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="text-[12.5px] text-text-secondary transition-colors hover:text-text-primary"
            >
              Login
            </Link>
          )}
          <button
            onClick={handleGetStarted}
            className="inline-flex items-center gap-1.5 rounded-full bg-cta-bg px-4 py-2 text-[12.5px] font-bold text-cta-text transition-transform hover:scale-105"
          >
            Get Started
          </button>
        </div>
      </nav>
    </div>
  );
}

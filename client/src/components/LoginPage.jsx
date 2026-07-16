import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Your httpOnly logic
    navigate("/courses");
  };

  return (
    <AuthLayout 
      title="Welcome back" 
      subtitle="Sign in to continue your learning journey."
    >
      <form onSubmit={handleLogin} className="flex flex-col gap-5">
        
        <div className="group relative">
          <input
            type="email"
            required
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="peer w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3.5 text-[14px] text-white outline-none transition-all placeholder:text-transparent focus:border-accent/50 focus:bg-white/[0.05]"
          />
          <label className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[14px] text-text-subtle transition-all peer-focus:-top-2 peer-focus:left-3 peer-focus:scale-75 peer-focus:bg-[#0A0A0A] peer-focus:px-1 peer-focus:text-accent peer-focus:opacity-100 peer-valid:-top-2 peer-valid:left-3 peer-valid:scale-75 peer-valid:bg-[#0A0A0A] peer-valid:px-1 peer-valid:opacity-100">
            Email address
          </label>
        </div>

        <div className="group relative">
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="peer w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3.5 text-[14px] text-white outline-none transition-all placeholder:text-transparent focus:border-accent/50 focus:bg-white/[0.05]"
          />
          <label className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[14px] text-text-subtle transition-all peer-focus:-top-2 peer-focus:left-3 peer-focus:scale-75 peer-focus:bg-[#0A0A0A] peer-focus:px-1 peer-focus:text-accent peer-focus:opacity-100 peer-valid:-top-2 peer-valid:left-3 peer-valid:scale-75 peer-valid:bg-[#0A0A0A] peer-valid:px-1 peer-valid:opacity-100">
            Password
          </label>
          <a href="#" className="absolute right-4 top-1/2 -translate-y-1/2 text-[12px] text-text-muted hover:text-white">
            Forgot?
          </a>
        </div>

        <button
          type="submit"
          className="mt-2 w-full rounded-xl bg-cta-bg py-3.5 text-[14px] font-bold text-cta-text transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
        >
          Sign in
        </button>
      </form>

      <div className="my-6 flex items-center gap-3 opacity-60">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/20" />
        <span className="text-[11px] font-medium text-text-muted uppercase tracking-wider">Or continue with</span>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/20" />
      </div>

      <a
        href={`${import.meta.env.VITE_API_URL}/auth/google`}
        className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] py-3 text-[14px] font-medium text-white transition-all hover:bg-white/[0.06]"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        Google
      </a>

      <p className="mt-8 text-center text-[13px] text-text-secondary">
        Don't have an account?{" "}
        <Link to="/signup" className="font-semibold text-white hover:text-accent">
          Create one
        </Link>
      </p>
    </AuthLayout>
  );
}
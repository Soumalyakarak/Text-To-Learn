import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    // Your registration logic
    navigate("/courses");
  };

  return (
    <AuthLayout 
      title="Create an account" 
      subtitle="Start generating full courses in seconds."
    >
      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        
        {/* Full Name Input */}
        <div>
          <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-text-muted">
            Full Name
          </label>
          <input
            type="text"
            required
            placeholder="Jane Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-[14.5px] text-white outline-none transition-all placeholder:text-white/20 focus:border-accent focus:bg-white/[0.06] focus:ring-1 focus:ring-accent/30"
          />
        </div>

        {/* Email Address Input */}
        <div>
          <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-text-muted">
            Email Address
          </label>
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-[14.5px] text-white outline-none transition-all placeholder:text-white/20 focus:border-accent focus:bg-white/[0.06] focus:ring-1 focus:ring-accent/30"
          />
        </div>

        {/* Password Input */}
        <div>
          <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-text-muted">
            Password
          </label>
          <input
            type="password"
            required
            placeholder="Create a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-[14.5px] text-white outline-none transition-all placeholder:text-white/20 focus:border-accent focus:bg-white/[0.06] focus:ring-1 focus:ring-accent/30"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 w-full rounded-xl bg-white py-3.5 text-[14px] font-bold text-black transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Create account
        </button>
      </form>

      <p className="mt-8 text-center text-[13px] text-text-secondary">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-white hover:text-accent">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
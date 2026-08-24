import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1 = Request OTP, 2 = Verify & Reset
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStep(2); // Move to OTP entry step
      } else {
        setError(data.message || "Failed to send OTP.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        // Automatically redirect to login after 2 seconds
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(data.message || "Failed to reset password.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-4">
      <div className="w-full max-w-[400px] rounded-2xl border border-hairline bg-surface-1 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        
        {/* Back to Login Link */}
        <Link
          to="/login"
          className="mb-6 inline-flex items-center gap-2 text-[13px] font-medium text-text-muted transition-colors hover:text-text-primary"
        >
          <ArrowLeft size={16} /> Back to login
        </Link>

        {success ? (
          <div className="text-center">
            <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-green-500" />
            <h2 className="mb-2 text-xl font-semibold text-text-primary">Password Reset!</h2>
            <p className="text-[14px] text-text-secondary">
              Your password has been successfully updated. Redirecting to login...
            </p>
          </div>
        ) : (
          <>
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-text-primary">
              {step === 1 ? "Reset Password" : "Enter OTP"}
            </h2>
            <p className="mb-6 text-[14px] leading-relaxed text-text-secondary">
              {step === 1
                ? "Enter your email address and we will send you a 6-digit code to reset your password."
                : `We sent a code to ${email}. Enter it below along with your new password.`}
            </p>

            {error && (
              <div className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-[13px] text-red-400">
                {error}
              </div>
            )}

            <form onSubmit={step === 1 ? handleRequestOtp : handleResetPassword}>
              {step === 1 ? (
                <div className="mb-5">
                  <label className="mb-1.5 block text-[13px] font-medium text-text-secondary">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-hairline bg-canvas px-4 py-2.5 text-[14px] text-text-primary outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
                    placeholder="you@example.com"
                  />
                </div>
              ) : (
                <>
                  <div className="mb-4">
                    <label className="mb-1.5 block text-[13px] font-medium text-text-secondary">
                      6-Digit OTP
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full rounded-lg border border-hairline bg-canvas px-4 py-2.5 font-mono text-[16px] tracking-widest text-text-primary outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
                      placeholder="123456"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="mb-1.5 block text-[13px] font-medium text-text-secondary">
                      New Password
                    </label>
                    <input
                      type="password"
                      required
                      minLength={8}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full rounded-lg border border-hairline bg-canvas px-4 py-2.5 text-[14px] text-text-primary outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
                      placeholder="••••••••"
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-accent py-2.5 text-[14px] font-semibold text-white transition-all hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading
                  ? "Processing..."
                  : step === 1
                  ? "Send OTP"
                  : "Reset Password"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
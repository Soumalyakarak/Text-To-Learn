import { Check, Sparkles } from "lucide-react";
import FloatingNav from "../components/FloatingNav";

export default function PricingPage() {
  return (
    <div className="relative min-h-screen w-full overflow-x-clip bg-canvas text-text-primary">
      {/* Ambient Red Top-Glow Background */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[600px] w-[1000px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,_rgba(255,99,99,0.12)_0%,_transparent_70%)] opacity-80 blur-3xl"></div>

      <FloatingNav />

      <div className="mx-auto max-w-5xl px-6 pb-24 pt-32 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Simple, transparent pricing
        </h1>
        <p className="mx-auto mb-16 max-w-2xl text-text-secondary">
          We're currently in early access. Enjoy the full power of Text-to-Learn
          for free while we build out our Pro features.
        </p>

        <div className="grid grid-cols-1 gap-8 text-left md:grid-cols-2 lg:gap-12">
          {/* Free Card (Subdued to contrast with Pro) */}
          <div className="relative rounded-2xl border border-hairline bg-surface-1 p-8 shadow-lg transition-colors hover:border-hairline-strong">
            <div className="mb-4 inline-block rounded-full bg-surface-2 px-3 py-1 text-xs font-semibold text-text-primary">
              Current Plan
            </div>
            <h2 className="mb-2 text-2xl font-bold">Free</h2>
            <div className="mb-6 text-3xl font-bold">
              $0{" "}
              <span className="text-sm font-normal text-text-muted">
                / forever
              </span>
            </div>
            <p className="mb-6 text-sm text-text-secondary">
              Everything you need to start generating and learning from
              structured courses instantly.
            </p>
            <button
              disabled
              className="mb-8 w-full cursor-not-allowed rounded-lg bg-surface-3 py-2.5 text-sm font-semibold text-text-muted transition-colors"
            >
              Your Active Plan
            </button>
            <div className="space-y-4">
              {[
                "Unlimited course generation",
                "Rich interactive lessons",
                "Standard PDF exports",
                "Save to learning history",
              ].map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 text-sm text-text-secondary"
                >
                  <Check className="h-4 w-4 text-success" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pro Card (Red/Accent Themed) */}
          <div className="relative overflow-hidden rounded-2xl border border-[rgba(255,99,99,0.3)] bg-surface-1 p-8 shadow-[0_0_40px_-10px_rgba(255,99,99,0.1)] transition-all duration-300 hover:border-[rgba(255,99,99,0.5)] hover:shadow-[0_0_60px_-15px_rgba(255,99,99,0.2)]">
            {/* Deep Red Corner Glow */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent opacity-15 blur-[60px]"></div>

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[rgba(255,99,99,0.25)] bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="flex items-center gap-1.5">
                <Sparkles className="h-3 w-3" /> Coming Soon
              </span>
            </div>
            <h2 className="mb-2 text-2xl font-bold">Pro</h2>
            <div className="mb-6 text-3xl font-bold">
              TBD{" "}
              <span className="text-sm font-normal text-text-muted">
                / month
              </span>
            </div>
            <p className="mb-6 text-sm text-text-secondary">
              Power-user features for those who want to take their learning and
              productivity to the next level.
            </p>

            <form
              className="mb-8 flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thanks for joining the waitlist!");
              }}
            >
              <input
                type="email"
                required
                placeholder="Enter email for waitlist"
                className="w-full rounded-lg border border-hairline bg-surface-2 px-3 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-[rgba(255,99,99,0.5)] focus:ring-1 focus:ring-[rgba(255,99,99,0.3)]"
              />
              <button
                type="submit"
                className="rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105 hover:bg-accent-hover"
              >
                Join
              </button>
            </form>

            <div className="space-y-4">
              {[
                "Advanced AI Models (e.g., GPT-4o)",
                "Priority generation queue",
                "Custom branding on exports",
                "Advanced progress analytics",
              ].map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 text-sm text-text-secondary"
                >
                  <Check className="h-4 w-4 text-accent" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
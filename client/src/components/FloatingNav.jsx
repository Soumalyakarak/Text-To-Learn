import { Link } from "react-router-dom";

export default function FloatingNav() {
  return (
    <div className="fixed inset-x-0 top-0 z-50 flex justify-center px-5 pt-4">
      <nav className="flex w-full max-w-[960px] items-center justify-between gap-4 rounded-full border border-hairline-strong bg-[rgba(16,17,17,0.72)] py-2 pr-2 pl-5 backdrop-blur-2xl">
        <div className="flex items-center gap-2 text-[13.5px] font-semibold whitespace-nowrap">
          <span className="h-[7px] w-[7px] rounded-full bg-accent" />
          Text-to-Learn
        </div>

        <div className="hidden items-center gap-6 sm:flex">
          {/* Note: Keep these as <a> if they are smooth-scroll anchors on the same page */}
          <a href="#how-it-works" className="text-[12.5px] text-text-secondary transition-colors hover:text-text-primary">How it works</a>
          <a href="#features" className="text-[12.5px] text-text-secondary transition-colors hover:text-text-primary">Features</a>
          <a href="#pricing" className="text-[12.5px] text-text-secondary transition-colors hover:text-text-primary">Pricing</a>
        </div>

        <div className="flex items-center gap-4">
          <Link 
            to="/login" 
            className="text-[12.5px] text-text-secondary transition-colors hover:text-text-primary"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="inline-flex items-center gap-1.5 rounded-full bg-cta-bg px-4 py-2 text-[12.5px] font-bold text-cta-text transition-transform hover:scale-105"
          >
            Get Started
          </Link>
        </div>
      </nav>
    </div>
  );
}
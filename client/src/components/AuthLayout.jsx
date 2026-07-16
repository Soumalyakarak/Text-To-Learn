import { Link } from "react-router-dom";

export default function AuthLayout({ children, title, subtitle }) {
  return (
    // Viewport-locked wrapper to keep the screen perfectly scroll-free
    <div className="relative flex h-[100dvh] w-full items-center justify-center overflow-hidden bg-canvas">
      
      {/* --- VIBRANT BACKGROUND ART --- */}
      {/* 1. Deep red ambient center glow radiating behind the cube */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(255,99,99,0.18),transparent_55%)]" />
      
      {/* 2. Secondary soft top-down light leak */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top,rgba(255,99,99,0.12),transparent_45%)]" />
      
      {/* 3. High-visibility bright Cube Asset */}
      {/* Opacity boosted to 45% and blur decreased to 1px for high fidelity */}
      <img
        src="/isolatedCube.webp"
        alt=""
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[750px] w-[750px] -translate-x-1/2 -translate-y-1/2 object-contain opacity-45 blur-[1px] transition-transform duration-700"
      />

      {/* --- OPTICALLY BALANCED CONTAINER --- */}
      {/* -translate-y-12 keeps the form perfectly centered on your screen */}
      <div className="relative z-10 w-full max-w-[400px] px-6 -translate-y-12 transition-transform">
        
        {/* Logo and Header */}
        <div className="mb-6 text-center">
          <h1 className="text-[24px] font-semibold tracking-[-0.4px] text-text-primary">
            {title}
          </h1>
          <p className="mt-1.5 text-[14px] text-text-secondary">
            {subtitle}
          </p>
        </div>

        {/* Glassmorphism Form Card */}
        {/* Slightly darkened to bg-black/70 and backdrop-blur-3xl to ensure inputs and labels stay incredibly readable over the bright background */}
        <div className="rounded-[20px] border border-white/[0.1] bg-black/70 p-7 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.95)] backdrop-blur-3xl">
          {children}
        </div>
      </div>
    </div>
  );
}
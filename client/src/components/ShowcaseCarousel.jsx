import { useEffect, useState } from "react";

const SLIDES = [
  {
    topic: "Introduction to Machine Learning",
    status: "✓ Generated 5 modules · 21 lessons",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
        <path d="M5 3v4" /><path d="M7 5H3" />
      </svg>
    ),
    modules: [
      { n: "01", title: "Basics of ML", meta: "4 lessons", tag: "core" },
      { n: "02", title: "Core Algorithms", meta: "5 lessons", tag: "core" },
      { n: "03", title: "Model Evaluation", meta: "3 lessons", tag: "advanced" },
    ],
  },
  {
    topic: "Intro to React Hooks",
    status: "✓ Generated 4 modules · 16 lessons",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    modules: [
      { n: "01", title: "Why Hooks Exist", meta: "3 lessons", tag: "core" },
      { n: "02", title: "useState & useEffect", meta: "5 lessons", tag: "core" },
      { n: "03", title: "Custom Hooks", meta: "4 lessons", tag: "advanced" },
    ],
  },
  {
    topic: "Basics of Copyright Law",
    status: "✓ Generated 4 modules · 12 lessons",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
      </svg>
    ),
    modules: [
      { n: "01", title: "What Copyright Protects", meta: "3 lessons", tag: "core" },
      { n: "02", title: "Fair Use Explained", meta: "4 lessons", tag: "core" },
      { n: "03", title: "Licensing Basics", meta: "3 lessons", tag: "advanced" },
    ],
  },
];

const SLIDE_DURATION = 4200; // ms

export default function ShowcaseCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setActive((a) => (a + 1) % SLIDES.length), SLIDE_DURATION);
    return () => clearTimeout(t);
  }, [active]);

  const slide = SLIDES[active];

  return (
    <div className="relative mx-auto w-full overflow-visible px-0 py-13">
      <div className="showcase-glow-backdrop pointer-events-none absolute inset-x-0 -top-[10%] bottom-[10%] z-0" />

      <div key={active} className="demo-glass-card relative z-[5] mx-auto w-full max-w-[650px] overflow-hidden rounded-[20px]">
        <div className="demo-glass-titlebar flex items-center gap-1.5 border-b border-white/5 px-[18px] py-3.5">
          <span className="h-2.25 w-2.25 rounded-full bg-[#ff5f57]" />
          <span className="h-2.25 w-2.25 rounded-full bg-[#febc2e]" />
          <span className="h-2.25 w-2.25 rounded-full bg-[#28c840]" />
          <span className="ml-2 font-mono text-[11.5px] text-text-muted">text-to-learn — generate</span>
        </div>

        <div className="flex w-fit min-w-0 items-center gap-2.5 border-b border-hairline px-[18px] py-4">
          <span className="text-sm text-text-muted">›</span>
          <span className="demo-typed-caret font-sans text-[15px] text-text-primary">{slide.topic}</span>
        </div>

        <div className="px-[18px] pt-4 pb-5">
          <div className="demo-status-fade mb-3 font-mono text-[11px] text-text-muted">{slide.status}</div>
          {slide.modules.map((m, i) => (
            <div
              key={m.title}
              className="demo-glass-module mb-2.5 flex items-center gap-3 rounded-xl border-l-2 border-l-accent px-3.5 py-3"
              style={{ animationDelay: `${0.15 + i * 0.12}s` }}
            >
              <span className="w-4 font-mono text-[11px] text-accent">{m.n}</span>
              <span className="flex-1">
                <b className="block text-[13.5px] font-medium">{m.title}</b>
                <small className="text-[11.5px] text-text-muted">{m.meta}</small>
              </span>
              <span className="rounded bg-surface-3 px-1.5 py-0.5 font-mono text-[10.5px] text-text-muted">{m.tag}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 mt-3 flex items-center justify-center">
        <div className="control-deck-glass flex items-center gap-2 rounded-[20px] p-2">
          {SLIDES.map((s, i) => (
            <button
              key={i}
              className={`deck-btn flex h-[42px] w-[50px] items-center justify-center rounded-xl p-0 text-text-muted transition-all ${
                i === active
                  ? "is-active !h-[50px] [&>svg]:h-[22px] [&>svg]:w-[22px]"
                  : "[&>svg]:h-[18px] [&>svg]:w-[18px]"
              }`}
              onClick={() => setActive(i)}
              aria-label={`Go to slide ${i + 1}`}
              title={s.topic}
            >
              {s.icon}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

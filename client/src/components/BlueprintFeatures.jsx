import { useRef } from "react";
import { IconPrompt, IconLayers, IconDownload, IconGlobe, IconLock, IconHistory } from "./icons";
import useReveal from "../hooks/useReveal";

const ROWS = [
  { Icon: IconPrompt, title: "Prompt to Course", desc: "Type any topic and get structured modules and lessons in seconds. No outline, no planning — just a topic." },
  { Icon: IconLayers, title: "Rich Lessons", desc: "Text, code, video references, and quizzes woven into every lesson, generated to match the topic automatically." },
  { Icon: IconDownload, title: "Download as PDF", desc: "Save any lesson as a formatted PDF for offline studying, with code blocks and quizzes preserved." },
  { Icon: IconGlobe, title: "Multilingual Explanations", desc: "AI-generated Hinglish audio explanations make every lesson accessible to more learners." },
  { Icon: IconLock, title: "Secure Login", desc: "Authentication handled through Auth0, out of the box — no auth code to write or maintain." },
  { Icon: IconHistory, title: "Persistent Courses", desc: "Every course you generate is saved automatically so you can pick up exactly where you left off." },
];

export default function BlueprintFeatures(){
  return (
    <div className="blueprint-grid-bg relative w-full overflow-hidden border-t border-b border-hairline">
      {ROWS.map((row, i) => (
        <BlueprintRow key={row.title} row={row} index={i} />
      ))}
    </div>
  );
}

function BlueprintRow({ row, index }){
  const { Icon, title, desc } = row;
  const revealRef = useReveal();
  const visualRef = useRef(null);
  const isEven = index % 2 === 1;

  const handleMouseMove = (e) => {
    const el = visualRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={revealRef}
      className="reveal flex flex-col border-b border-hairline last:border-b-0 transition-colors hover:bg-white/[0.015] md:flex-row md:items-stretch"
    >
      <div
        ref={visualRef}
        onMouseMove={handleMouseMove}
        className={`bp-visual-glow group relative flex min-h-[220px] w-full items-center justify-center overflow-hidden border-b border-hairline md:min-h-[340px] md:w-1/2 md:border-b-0 ${
          isEven ? "md:order-2 md:border-l" : "md:border-r"
        }`}
      >
        <span className="absolute top-5 left-6 z-[1] rounded bg-canvas px-1.5 py-0.5 font-mono text-[11px] tracking-wide text-text-muted">
          FIG_{String(index + 1).padStart(2, "0")}
        </span>
        <span className="absolute top-[18px] right-[22px] z-[1] text-base text-text-muted opacity-60 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100">
          ↗
        </span>
        <div className="relative z-[1] animate-[bp-icon-float_3.6s_ease-in-out_infinite]" style={{ animationDelay: `${index * 0.3}s` }}>
          <div
            className="flex h-[88px] w-[88px] items-center justify-center rounded-xl border text-[#7d9bff] transition-all duration-300 group-hover:scale-[1.08] group-hover:shadow-[0_12px_32px_-8px_rgba(90,130,255,0.35)] [&>svg]:h-[34px] [&>svg]:w-[34px]"
            style={{
              background:
                "radial-gradient(circle at 35% 30%, rgba(90,130,255,0.22), rgba(90,130,255,0.04) 70%), var(--color-canvas)",
              borderColor: "rgba(120,150,255,0.25)",
            }}
          >
            <Icon />
          </div>
        </div>
      </div>
      <div
        className={`relative z-[2] flex w-full flex-col justify-center bg-canvas px-6 py-8 md:w-1/2 md:px-14 md:py-12 ${
          isEven ? "md:order-1" : ""
        }`}
      >
        <h4 className="mb-3 text-[23px] font-medium tracking-[-0.3px]">{title}</h4>
        <p className="max-w-[360px] text-[13.5px] leading-relaxed text-text-secondary">{desc}</p>
      </div>
    </div>
  );
}

import { useNavigate } from "react-router-dom";
import FloatingNav from "../components/FloatingNav";
import StripeHero from "../components/StripeHero";
import KeyboardHero from "../components/KeyboardHero";
import KeyboardCTA from "../components/KeyboardCTA";
import ShowcaseCarousel from "../components/ShowcaseCarousel";
import BlueprintFeatures from "../components/BlueprintFeatures";
import PromptForm from "../components/PromptForm";
import { courses } from "../data/mockCourses";
import useReveal from "../hooks/useReveal";
import { useState } from "react";
import {
  IconPrompt,
  IconLayers,
  IconDownload,
  IconGlobe,
} from "../components/icons";

const BADGES = [
  {
    Icon: IconPrompt,
    title: "Instant.",
    sub: "10s to a full course.",
    pos: "top-[-10px] left-[-16px]",
    delay: "0.1s",
  },
  {
    Icon: IconLayers,
    title: "Structured.",
    sub: "3–6 modules, always.",
    pos: "top-10 right-[-24px]",
    delay: "0.3s",
  },
  {
    Icon: IconGlobe,
    title: "Accessible.",
    sub: "Hinglish audio built in.",
    pos: "bottom-2.5 left-[-24px]",
    delay: "0.5s",
  },
  {
    Icon: IconDownload,
    title: "Portable.",
    sub: "Export any lesson to PDF.",
    pos: "bottom-[-16px] right-0",
    delay: "0.7s",
  },
];

const COMMUNITY_CARDS = [
  {
    icon: "TL",
    title: "Learners",
    count: "37k members",
    body: "Get the inside track on new course drops and learn how others turn prompts into study paths.",
    action: "Join",
  },
  {
    icon: "X",
    title: "X/Twitter",
    count: "90k followers",
    body: "Keep up to date with the latest releases, feature updates and learning experiments.",
    action: "Follow",
  },
];

const VIDEO_CARDS = [
  {
    title: "101 things you can do with Text-to-Learn",
    tone: "from-[#311016] via-[#171719] to-[#060708]",
    mark: "101",
    youtubeId: "",
  },
  {
    title: "7 prompt tricks to level up your productivity",
    tone: "from-[#221944] via-[#1b2438] to-[#07080a]",
    mark: "7",
    youtubeId: "",
  },
  {
    title: "Build a full course from one prompt",
    tone: "from-[#46162c] via-[#2a1222] to-[#07080a]",
    mark: "AI",
    youtubeId: "",
  },
  {
    title: "12 months of Text-to-Learn Pro",
    tone: "from-[#151f2b] via-[#111217] to-[#07080a]",
    mark: "PRO",
    youtubeId: "",
  },
  {
    title: "Turn scattered notes into a finished path",
    tone: "from-[#102b2b] via-[#121818] to-[#07080a]",
    mark: "PDF",
    youtubeId: "",
  },
];

export default function HomePage() {
  const navigate = useNavigate();
  const communityRef = useReveal();
  const footerRef = useReveal();
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (topic) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/courses/generate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topic }),
        }
      );

      if (!response.ok) throw new Error("Generation failed");

      const data = await response.json();
      navigate(`/course/${data.id}`);
    } catch (error) {
      console.error("Error generating course:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="no-scrollbar w-full bg-canvas text-text-primary overflow-x-clip">
      <FloatingNav />

      <StripeHero>
        <div className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-[rgba(255,99,99,0.35)]  bg-cta-bg px-3 py-1.5 font-mono text-[11px] font-medium tracking-wide text-accent [text-shadow:0_2px_20px_rgba(0,0,0,0.6)]">
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent" />{" "}
          AI-generated, in seconds
        </div>
        <h1 className="mb-[22px] text-[clamp(38px,6vw,68px)] leading-[1.04] font-bold tracking-[-1.1px] [text-shadow:0_4px_40px_rgba(0,0,0,0.5)]">
          Type a topic.
          <br />
          Get a full course.
        </h1>
        <p className="mx-auto mb-9 max-w-[540px] text-[15.5px] leading-relaxed text-[#e8e8e8] [text-shadow:0_2px_20px_rgba(0,0,0,0.6)]">
          Modules, lessons, video, quizzes — structured and ready to learn from,
          instantly. No searching, no setup.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            className="rounded-full bg-cta-bg px-4 py-2 text-[13px] font-semibold text-cta-text transition-transform hover:-translate-y-px hover:bg-[#f0f0f0]"
            onClick={() => document.getElementById("prompt-input")?.focus()}
          >
            Try it free
          </button>
          <a
            href="#how-it-works"
            className="rounded-full border border-hairline-strong px-4 py-2 text-[13px] font-semibold text-text-secondary transition-colors hover:text-text-primary"
          >
            See how it works
          </a>
        </div>
        <div className="mt-5 font-mono text-xs text-text-secondary">
          v1.0 · Free forever · No credit card required
        </div>
      </StripeHero>

      <div className="mx-auto max-w-[1120px] px-12 pb-[120px]">
        <div className="-mt-5">
          <PromptForm onSubmit={handleGenerate} loading={loading} />
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {[
              "Intro to React Hooks",
              "Basics of Copyright Law",
              "Neural Networks Explained",
            ].map((s) => (
              <div
                key={s}
                onClick={() => handleGenerate(s)}
                className="cursor-pointer rounded-full border border-hairline bg-surface-1 px-3.5 py-1.5 text-[13px] text-text-secondary transition-colors hover:border-hairline-strong hover:text-text-primary"
              >
                {s}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-11 mb-3.5 text-xs tracking-wide text-text-muted uppercase">
          Continue learning
        </div>
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
          {courses.map((c) => (
            <div
              key={c.id}
              onClick={() => navigate(`/course/${c.id}`)}
              className="cursor-pointer rounded-lg border border-hairline bg-surface-1 p-5 transition-[border-color,transform] hover:-translate-y-px hover:border-hairline-strong"
            >
              <span
                className={`mb-2.5 inline-block rounded-md px-2 py-0.5 text-[11px] ${
                  c.progress === 0
                    ? "bg-surface-2 text-text-muted"
                    : "bg-accent-soft text-accent"
                }`}
              >
                {c.progress > 0 ? "In Progress" : "Not started"}
              </span>
              <h3 className="mb-1.5 text-base font-semibold tracking-[-0.2px]">
                {c.title}
              </h3>
              <p className="mb-3.5 text-[13px] leading-relaxed text-text-secondary">
                {c.description}
              </p>
              <div className="h-1 overflow-hidden rounded-full bg-surface-3">
                <div
                  className="h-full rounded-full bg-accent"
                  style={{ width: `${c.progress}%` }}
                />
              </div>
              <div className="mt-2 flex justify-between text-[11.5px] text-text-muted">
                <span>{c.modules.length} modules</span>
                <span>{c.progress}% complete</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        id="how-it-works"
        className="relative mx-auto max-w-[1040px] px-6 pt-[120px] pb-20 text-center"
      >
        <div className="showcase-glow-backdrop pointer-events-none absolute inset-x-0 -top-[10%] bottom-[10%] z-0" />

        <div className="relative z-[1] mx-auto mb-12 max-w-[600px]">
          <div className="mb-2 text-[28px] leading-tight font-normal">
            Type a topic, watch it build.
          </div>
          <div className="text-[14.5px] text-text-secondary">
            One prompt. A full course in seconds.
          </div>
        </div>

        <div className="showcase-neon-frame relative z-[2] mx-auto min-h-[530px] max-w-[880px] overflow-visible rounded-[30px]">
          <ShowcaseCarousel />
        </div>
      </div>

      <div className="mx-auto grid max-w-[1120px] grid-cols-1 items-center gap-10 px-6 py-[160px] text-center md:grid-cols-2 md:text-left">
        <div>
          <h3 className="mb-2.5 text-[23px] leading-[1.35] font-semibold tracking-[-0.35px]">
            It's not about the searching.
            <br />
            It's about getting there instantly.
          </h3>
          <p className="text-[14.5px] leading-relaxed text-text-secondary">
            No more piecing together five different tutorials. One prompt gives
            you a complete, structured path — built for how you actually learn.
          </p>
        </div>
        <div className="relative flex min-h-[340px] items-center justify-center md:justify-start">
          <KeyboardHero />
          {BADGES.map(({ Icon, title, sub, pos, delay }) => (
            <div
              key={title}
              style={{ animationDelay: delay }}
              className={`badge-float-in absolute z-[2] flex items-center gap-2.5 rounded-lg border border-hairline bg-surface-1 px-4 py-3 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)] ${pos}`}
            >
              <span className="text-accent">
                <Icon />
              </span>
              <div>
                <b className="block text-[13px] font-semibold">{title}</b>
                <span className="text-[11px] text-text-muted">{sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div id="features" className="mx-auto max-w-[1120px] px-12">
        <BlueprintFeatures />
      </div>
      <section
        ref={communityRef}
        className="reveal raycast-community relative mt-[170px] overflow-hidden px-6 pt-5 pb-24 text-center"
      >
        <div className="absolute left-1/2 top-[240px] z-0 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,99,99,0.18),transparent_55%)] pointer-events-none" />
        <div className="absolute left-1/2 top-[100px] z-0 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_top,rgba(255,99,99,0.12),transparent_45%)] pointer-events-none" />
        
        <img
          src="/isolatedCube.webp"
          alt=""
          className="raycast-community-cube pointer-events-none absolute left-1/2 top-6 z-0 h-[760px] w-[760px] -translate-x-1/2 object-contain opacity-45 blur-[1px] transition-transform duration-700"
        />

        <div className="relative z-[1] mx-auto max-w-[560px]">
          <h2 className="text-[19px] font-semibold leading-tight tracking-[-0.2px]">
            Stay in the loop.
          </h2>
          <p className="mt-1 text-[18px] font-semibold leading-[1.25] tracking-[-0.2px] text-text-muted">
            Join the community and learn how other people get the most out of
            Text-to-Learn.
          </p>
        </div>

        <div className="relative z-[2] mx-auto mt-14 grid max-w-[900px] grid-cols-1 gap-10 md:grid-cols-2 md:gap-10">
          {COMMUNITY_CARDS.map((card) => (
            <a
              key={card.title}
              href="#"
              className="group rounded-[12px] border border-white/[0.1] bg-black/70 p-6 text-left shadow-[0_30px_100px_-20px_rgba(0,0,0,0.95)] backdrop-blur-3xl transition-[border-color,transform,background] hover:-translate-y-1 hover:border-white/20 hover:bg-black/80"
            >
              <div className="mb-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="grid h-7 w-7 place-items-center rounded-md bg-accent text-[11px] font-bold text-white shadow-[0_0_28px_rgba(255,99,99,0.45)]">
                    {card.icon}
                  </span>
                  <h3 className="text-[18px] font-semibold tracking-[-0.2px]">
                    {card.title}
                  </h3>
                </div>
                <span className="font-mono text-[12px] text-text-muted">
                  {card.count}
                </span>
              </div>
              <p className="max-w-[360px] text-[14px] leading-[1.55] text-text-secondary">
                {card.body}
              </p>
              <span className="mt-4 inline-block text-[14px] font-semibold text-text-primary">
                {card.action}{" "}
                <span className="transition-transform group-hover:translate-x-1">
                  -&gt;
                </span>
              </span>
            </a>
          ))}
        </div>

        <div className="video-marquee relative z-[1] mx-auto mt-[168px] max-w-[1220px] overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
          <div className="video-marquee-track flex w-max gap-10 px-2">
            {[...VIDEO_CARDS, ...VIDEO_CARDS].map((card, index) => (
              <a
                key={`${card.title}-${index}`}
                href={
                  card.youtubeId
                    ? `https://www.youtube.com/watch?v=${card.youtubeId}`
                    : "#"
                }
                className="group w-[230px] text-left sm:w-[260px]"
              >
                <div
                  className={`learning-thumb relative mb-4 h-[130px] overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br ${card.tone}`}
                >
                  {card.youtubeId ? (
                    <img
                      src={`https://img.youtube.com/vi/${card.youtubeId}/hqdefault.jpg`}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.18),transparent_28%),linear-gradient(135deg,transparent_20%,rgba(255,99,99,0.42)_52%,transparent_74%)]" />
                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/75 to-transparent" />
                      <span className="absolute left-6 top-7 text-[40px] font-bold tracking-[-1.2px] text-white/90">
                        {card.mark}
                      </span>
                    </>
                  )}
                  <span className="absolute left-1/2 top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/92 text-[13px] text-cta-text shadow-[0_12px_34px_rgba(0,0,0,0.45)] transition-transform group-hover:scale-110">
                    ▶
                  </span>
                </div>
                <h3 className="text-[13px] font-semibold leading-[1.35] text-text-secondary transition-colors group-hover:text-text-primary">
                  {card.title}
                </h3>
              </a>
            ))}
          </div>
        </div>

        <div className="relative z-[2] mx-auto mt-12 max-w-[360px] text-center">
          <p className="text-[14px] leading-[1.45] text-text-secondary">
            Check out our YouTube channel to learn about features you did not
            even know existed.
          </p>
          <a
            href="#"
            className="mt-7 inline-flex items-center gap-2 text-[20px] font-bold tracking-[-0.4px] text-white"
          >
            <span className="grid h-6 w-8 place-items-center rounded-md bg-[#ff0000] text-[10px] text-white">
              ▶
            </span>
            YouTube <span className="text-base font-semibold">-&gt;</span>
          </a>
        </div>
      </section>

      <div className="mx-auto max-w-[1536px] px-6 pb-[120px]">
        <KeyboardCTA
          onStart={() => document.getElementById("prompt-input")?.focus()}
        />

        <div className="mx-auto max-w-[1120px] px-6">
          <div
            ref={footerRef}
            className="reveal mt-[168px] grid grid-cols-1 gap-6 border-t border-hairline pt-14 pb-5 sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr]"
          >
            <div>
              <div className="mb-2 flex items-center text-[14.5px] font-semibold">
                <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-accent" />
                Text-to-Learn
              </div>
              <div className="max-w-[220px] text-[12.5px] leading-relaxed text-text-muted">
                Turn any topic into a structured, ready-to-learn course —
                instantly.
              </div>
            </div>
            <div>
              <h5 className="mb-3 text-[11px] tracking-wide text-text-muted uppercase">
                Product
              </h5>
              <a
                href="#"
                className="mb-2.5 block text-[13px] text-text-secondary hover:text-text-primary"
              >
                Prompt to Course
              </a>
              <a
                href="#"
                className="mb-2.5 block text-[13px] text-text-secondary hover:text-text-primary"
              >
                Rich Lessons
              </a>
              <a
                href="#"
                className="mb-2.5 block text-[13px] text-text-secondary hover:text-text-primary"
              >
                PDF Export
              </a>
            </div>
            <div>
              <h5 className="mb-3 text-[11px] tracking-wide text-text-muted uppercase">
                Learn
              </h5>
              <a
                href="#"
                className="mb-2.5 block text-[13px] text-text-secondary hover:text-text-primary"
              >
                Browse Courses
              </a>
              <a
                href="#"
                className="mb-2.5 block text-[13px] text-text-secondary hover:text-text-primary"
              >
                Saved
              </a>
              <a
                href="#"
                className="mb-2.5 block text-[13px] text-text-secondary hover:text-text-primary"
              >
                History
              </a>
            </div>
            <div>
              <h5 className="mb-3 text-[11px] tracking-wide text-text-muted uppercase">
                Account
              </h5>
              <a
                href="#"
                className="mb-2.5 block text-[13px] text-text-secondary hover:text-text-primary"
              >
                Sign in
              </a>
              <a
                href="#"
                className="mb-2.5 block text-[13px] text-text-secondary hover:text-text-primary"
              >
                Sign up
              </a>
              <a
                href="#"
                className="mb-2.5 block text-[13px] text-text-secondary hover:text-text-primary"
              >
                Settings
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

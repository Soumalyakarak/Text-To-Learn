import { useMemo } from "react";

const ROWS = [
  // [
  //   { label: "esc", wide: 1.3 },
  //   { label: "F1" },
  //   { label: "F2" },
  //   { label: "F3" },
  //   { label: "F4" },
  //   { label: "F5" },
  //   { label: "F6" },
  //   { label: "F7" },
  //   { label: "F8" },
  //   { label: "F9" },
  //   { label: "F10" },
  //   { label: "F11" },
  //   { label: "F12" },
  // ],
  [
    { label: "§" },
    { label: "1" },
    { label: "2" },
    { label: "3" },
    { label: "4" },
    { label: "5" },
    { label: "6" },
    { label: "7" },
    { label: "8" },
    { label: "9" },
    { label: "0" },
    { label: "-" },
    { label: "=" },
    { label: "delete", wide: 1.6 },
  ],
  [
    { label: "tab", wide: 1.45 },
    { label: "Q" },
    { label: "W" },
    { label: "E" },
    { label: "R" },
    { label: "T" },
    { label: "Y" },
    { label: "U" },
    { label: "I" },
    { label: "O" },
    { label: "P" },
    { label: "[" },
    { label: "]" },
    { label: "\\", wide: 1.2 },
  ],
  [
    { label: "caps", wide: 1.75 },
    { label: "A" },
    { label: "S" },
    { label: "D" },
    { label: "F" },
    { label: "G" },
    { label: "H" },
    { label: "J" },
    { label: "K" },
    { label: "L" },
    { label: ";" },
    { label: "'" },
    { label: "return", wide: 1.9 },
  ],
  [
    { label: "shift", wide: 2.2 },
    { label: "Z" },
    { label: "X" },
    { label: "C" },
    { label: "V" },
    { label: "B" },
    { label: "N" },
    { label: "M" },
    { label: "," },
    { label: "." },
    { label: "/" },
    { label: "shift", wide: 2.4 },
  ],
  [
    { label: "fn", wide: 1.1 },
    { label: "control", wide: 1.45 },
    { label: "option", wide: 1.45 },
    { label: "command", wide: 1.9, active: true },
    { label: "", wide: 6.1, active: true },
    { label: "command", wide: 1.9 },
    { label: "option", wide: 1.45 },
  ],
];

export default function KeyboardCTA({ onStart }) {
  return (
    <section className="keyboard-cta relative overflow-hidden px-6 pt-24 pb-10 text-center">
      <div className="relative z-[2] mx-auto max-w-[520px]">
        <h2 className="text-[34px] font-semibold leading-[1.05] tracking-[-0.7px] sm:text-[42px]">
          Take the short way.
        </h2>
        <p className="mx-auto mt-4 max-w-[420px] text-[15px] leading-relaxed text-text-secondary">
          Type one topic and get a structured course you can start learning from immediately.
        </p>
        {/* <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onStart}
            className="rounded-full bg-cta-bg px-4 py-2 text-[13px] font-semibold text-cta-text transition-transform hover:-translate-y-px hover:bg-[#f0f0f0]"
          >
            Generate a course
          </button>
          <a
            href="#how-it-works"
            className="rounded-full border border-hairline-strong px-4 py-2 text-[13px] font-semibold text-text-secondary transition-colors hover:text-text-primary"
          >
            See how it works
          </a>
        </div> */}
      </div>

      <div className="keyboard-stage pointer-events-none relative z-[2] mx-auto mt-10 w-[min(1100px,94vw)]">
        <KeyboardSVG />
      </div>
    </section>
  );
}

const KEY_H = 55;
const GAP = 6;
const UNIT = 46;

function layoutRows(rows) {
  const laid = rows.map((row, ri) => {
    let x = 0;
    const keys = row.map((k) => {
      const w = (k.wide || 1) * UNIT;
      const key = { ...k, x, y: ri * (KEY_H + GAP), w, h: KEY_H };
      x += w + GAP;
      return key;
    });
    return { keys, width: x - GAP };
  });
  const width = Math.max(...laid.map((r) => r.width));
  const height = rows.length * KEY_H + (rows.length - 1) * GAP;
  return { laid, width, height };
}

function KeyboardSVG() {
  const { laid, width, height } = useMemo(() => layoutRows(ROWS), []);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="block h-auto w-full overflow-visible">
      <defs>
        <linearGradient id="kbKey" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(20,21,22,0.92)" />
          <stop offset="100%" stopColor="rgba(8,9,10,0.95)" />
        </linearGradient>
        <linearGradient id="kbKeyActive" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(34,17,19,0.96)" />
          <stop offset="100%" stopColor="rgba(15,9,10,0.97)" />
        </linearGradient>
        <filter id="kbGlow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="9" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {laid.map((row, ri) =>
        row.keys.map((k, ki) => (
          <g key={`${ri}-${ki}`} filter={k.active ? "url(#kbGlow)" : undefined}>
            <rect
              x={k.x}
              y={k.y}
              width={k.w}
              height={k.h}
              rx="9"
              fill={k.active ? "url(#kbKeyActive)" : "url(#kbKey)"}
              stroke={k.active ? "rgba(255,99,99,0.5)" : "rgba(255,255,255,0.06)"}
              strokeWidth="1"
            />
            {k.label && (
              <text
                x={k.x + k.w / 2}
                y={k.y + k.h / 2 + 1}
                textAnchor="middle"
                dominantBaseline="central"
                fill={k.active ? "rgba(255,214,222,0.75)" : "rgba(255,255,255,0.3)"}
                fontSize={k.label.length > 1 ? 13 : 18}
                fontWeight="600"
                fontFamily="Inter, system-ui, sans-serif"
              >
                {k.label}
              </text>
            )}
          </g>
        ))
      )}
    </svg>
  );
}

const ROW1 = ["esc", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"];
const ROW2 = ["§", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "+", "delete"];
const ROW3 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}", "|"];
const ROW4 = ["A", "S", "D", "F", "G", "H", "J", "K", "L", ":", '"'];
const ROW5 = ["Z", "X", "C", "V", "B", "N", "M", "<", ">", "?"];

// Keys that light up in the typing-ripple animation, in order, with delay (seconds)
const RIPPLE = ["T", "E", "X", "T", "-", "T", "O", "-", "L", "E", "A", "R", "N"];

const KEY_BASE =
  "flex h-[30px] min-w-[22px] flex-1 items-center justify-center rounded-[5px] border border-hairline bg-surface-2 font-mono text-[11px] text-text-secondary select-none";

export default function KeyboardHero() {
  return (
    <div
      className="flex flex-col gap-1.5 rounded-xl p-5 opacity-90"
      style={{
        background: "radial-gradient(ellipse at 30% 20%, rgba(255,99,99,0.10), transparent 60%)",
        transform: "perspective(900px) rotateX(8deg) rotateY(-4deg)",
      }}
    >
      <Row keys={ROW1} fnRow />
      <Row keys={ROW2} />
      <Row keys={ROW3} />
      <Row keys={ROW4} />
      <Row keys={ROW5} />
      <div className="flex gap-1.5">
        <span className={`${KEY_BASE} flex-[2.2] font-sans text-[10.5px]`}>fn</span>
        <span className={`${KEY_BASE} flex-[2.2] font-sans text-[10.5px]`}>control</span>
        <span className={`${KEY_BASE} flex-[2.2] font-sans text-[10.5px]`}>option</span>
        <span className={`${KEY_BASE} kb-key-glow flex-[2.2] font-sans text-[10.5px]`}>command</span>
        <span className={`${KEY_BASE} flex-[6]`} />
        <span className={`${KEY_BASE} kb-key-glow flex-[2.2] font-sans text-[10.5px]`}>command</span>
        <span className={`${KEY_BASE} flex-[2.2] font-sans text-[10.5px]`}>option</span>
      </div>
    </div>
  );
}

function Row({ keys, fnRow = false }) {
  return (
    <div className="flex gap-1.5">
      {keys.map((k, i) => {
        const rippleIndex = RIPPLE.indexOf(k);
        const style = rippleIndex > -1 ? { animationDelay: `${rippleIndex * 0.12}s` } : undefined;
        return (
          <span
            key={k + i}
            className={`${KEY_BASE} ${fnRow ? "h-5 text-[9px] opacity-50" : ""} ${rippleIndex > -1 ? "kb-key-ripple" : ""}`}
            style={style}
          >
            {k}
          </span>
        );
      })}
    </div>
  );
}

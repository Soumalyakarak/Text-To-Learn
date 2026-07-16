import { useState } from "react";

export default function MCQBlock({
  question,
  options = [],
  answer,
  explanation,
}) {
  const [selected, setSelected] = useState(null);
  const revealed = selected !== null;

  return (
    <div className="mb-6 rounded-xl border border-hairline bg-surface-1 p-5">
      <div className="mb-3.5 text-[14.5px] font-medium">{question}</div>
      {options.map((opt, i) => {
        const isCorrect = i === answer;
        const isChosen = i === selected;

        //Base class
        let stateClasses = "border-hairline bg-canvas text-text-secondary";

        //If revealed (user picked an answer)...
        if (revealed){
          if (isCorrect){
            stateClasses = "border-green-500 bg-green-100 text-green-900";
          } else if (isChosen && !isCorrect) {
            stateClasses = "border-red-500 bg-red-100 text-red-900";
          }
        }

        return (
          <button
            key={i}
            onClick={() => !revealed && setSelected(i)}
            className={`mb-2 block w-full rounded-lg border px-3.5 py-2.5 text-left font-sans text-[13.5px] transition-colors ${stateClasses} ${
              revealed
                ? "cursor-default"
                : "cursor-pointer hover:border-text-muted"
            }`}
          >
            {opt}
          </button>
        );
      })}
      {revealed && explanation && (
        <div className="mt-2.5 border-t border-hairline pt-2.5 text-[12.5px] text-text-muted">
          {explanation}
        </div>
      )}
    </div>
  );
}

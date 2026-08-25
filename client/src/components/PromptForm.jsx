import { Loader2, Sparkles } from "lucide-react";
import { useState } from "react";

export default function PromptForm({ onSubmit, loading }) {
  const [value, setValue] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (value.trim() && !loading) onSubmit(value.trim());
  };

  return (
    <form
      onSubmit={submit}
      className=" mx-auto mt-8 flex max-w-[640px] items-center gap-2 rounded-xl border border-hairline bg-surface-1 p-1.5 transition-[border-color,box-shadow] focus-within:border-accent focus-within:shadow-[0_0_0_3px_var(--color-accent-soft)]"
    >
      <input
        id="prompt-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="e.g. Introduction to Machine Learning"
        disabled={loading}
        className="min-w-0 flex-1 bg-transparent px-2.5 py-3 font-sans text-[15px] text-text-primary outline-none placeholder:text-text-muted"
      />
      <button
        type="submit"
        disabled={loading}
        className="shrink-0 rounded-[5px] border border-hairline-strong bg-surface-3 px-2.5 py-1.5 font-mono text-[11px] font-medium text-text-secondary disabled:cursor-default"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="animate-spin h-4 w-4" /> Generating…
          </span>
        ) : (
          <span className="flex items-center gap-2">
            Generate <Sparkles className="h-4 w-4" />
          </span>
        )}
      </button>
    </form>
  );
}

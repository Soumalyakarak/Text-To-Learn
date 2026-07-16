import { useState } from "react";
import { Copy, Check } from "lucide-react"; // Import icons

export default function CodeBlock({ language = "text", text }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mb-6 overflow-hidden rounded-xl border border-hairline bg-surface-1">
      <div className="flex items-center justify-between border-b border-hairline px-3.5 py-2 text-[11.5px] text-text-muted">
        <span>{language}</span>
        <button 
          onClick={copy} 
          className="flex items-center gap-1.5 bg-transparent transition-colors hover:text-text-primary"
          title="Copy to clipboard"
        >
          {copied ? (
            <Check size={14} className="text-green-500" />
          ) : (
            <Copy size={14} />
          )}
        </button>
      </div>
      <pre className="m-0 overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-[#c9c9d1]">
        <code>{text}</code>
      </pre>
    </div>
  );
}
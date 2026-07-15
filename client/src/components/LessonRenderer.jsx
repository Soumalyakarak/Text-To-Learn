import ReactMarkdown from "react-markdown";
import HeadingBlock from "./blocks/HeadingBlock";
import ParagraphBlock from "./blocks/ParagraphBlock";
import CodeBlock from "./blocks/CodeBlock";
import VideoBlock from "./blocks/VideoBlock";
import MCQBlock from "./blocks/MCQBlock";

const BLOCK_MAP = {
  heading: HeadingBlock,
  paragraph: ParagraphBlock,
  code: CodeBlock,
  video: VideoBlock,
  mcq: MCQBlock,
};

export default function LessonRenderer({ content }) {
  if (!content) {
    return <div className="text-sm text-text-muted">No content available for this lesson.</div>;
  }

  // 1. Render Gemini's plain Markdown strings smoothly using the new package
  if (typeof content === "string") {
    return (
      <div className="prose prose-invert max-w-none text-[14.5px] leading-relaxed text-text-secondary">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    );
  }

  // 2. Render your original custom mock array structure
  if (Array.isArray(content)) {
    return (
      <div>
        {content.map((block, i) => {
          const Block = BLOCK_MAP[block.type];
          if (!Block) return null;
          return <Block key={i} {...block} />;
        })}
      </div>
    );
  }

  return <div className="text-sm text-text-muted">Unsupported content format.</div>;
}
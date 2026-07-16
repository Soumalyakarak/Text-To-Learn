import { useEffect, useState } from "react";

export default function VideoBlock({ query }) {
  const [video, setVideo] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | error

  useEffect(() => {
    let cancelled = false;

    // Use the backend API URL from environment variables
    const apiUrl = `${import.meta.env.VITE_API_URL}/youtube?query=${encodeURIComponent(query)}`;

    fetch(apiUrl)
      .then((r) => {
        if (!r.ok) throw new Error("Network response was not ok");
        return r.json();
      })
      .then((data) => {
        if (cancelled) return;
        setVideo(data);
        setStatus("ready");
      })
      .catch((err) => {
        console.error("VideoBlock fetch error:", err);
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [query]);

  return (
    <div className="mb-6 rounded-xl border border-hairline bg-surface-1 p-4">
      {status === "loading" && (
        <div className="flex aspect-video items-center justify-center rounded-lg bg-surface-3 text-[13px] text-text-muted">
          Finding a video for "{query}"…
        </div>
      )}
      
      {status === "error" && (
        <div className="flex aspect-video items-center justify-center rounded-lg bg-surface-3 text-[13px] text-text-muted">
          Couldn't load a video for this lesson.
        </div>
      )}
      
      {status === "ready" && video?.embedUrl && (
        <iframe
          src={video.embedUrl}
          title={query}
          className="aspect-video w-full rounded-lg border-none"
          allowFullScreen
        />
      )}
    </div>
  );
}
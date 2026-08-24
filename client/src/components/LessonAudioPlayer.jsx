import { useEffect, useState } from "react";
import { Volume2, Loader2, Pause } from "lucide-react";
import { authenticatedFetch } from "../lib/api";

export default function LessonAudioPlayer({ lessonText }) {
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioObj, setAudioObj] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("hinglish");

  useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  const handleFetchAndPlayAudio = async () => {
    // If the audio is already loaded for the CURRENT language, just toggle play/pause
    if (audioUrl && audioObj && !loading) {
      if (isPlaying) {
        audioObj.pause();
      } else {
        audioObj.play();
      }
      return;
    }

    // Helper to safely extract text from your specific array structure
    const extractText = (data) => {
      if (!data) return "";
      if (typeof data === "string") return data;

      // Handle the rich-text array of objects
      if (Array.isArray(data)) {
        return data
          .map((block) => block.text || block.question || "") // Grab text or MCQ questions
          .filter((text) => text.trim() !== "") // Remove empty strings
          .join(".\n"); // Stitch them together with a period and newline
      }

      // Fallback for standard objects
      return data.content || data.text || "";
    };

    const safeText = extractText(lessonText);

    // Prevent empty requests
    if (!safeText) {
      alert("Lesson content is empty or hasn't fully loaded yet.");
      return;
    }

    try {
      setLoading(true);
      const res = await authenticatedFetch(
        `${import.meta.env.VITE_API_URL}/lessons/audio/generate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: safeText, language: selectedLanguage }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Audio generation failed");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const newAudio = new Audio(url);

      newAudio.onplay = () => setIsPlaying(true);
      newAudio.onpause = () => setIsPlaying(false);
      newAudio.onended = () => setIsPlaying(false);

      if (audioUrl) URL.revokeObjectURL(audioUrl);

      setAudioUrl(url);
      setAudioObj(newAudio);

      await newAudio.play();
    } catch (err) {
      console.error("Error playing audio:", err);
      alert(`Could not load ${selectedLanguage} explanation. ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Reset audio if the user changes the language while listening
  const handleLanguageChange = (e) => {
    if (audioObj) {
      audioObj.pause();
      setAudioObj(null);
      setIsPlaying(false);
    }
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
    setSelectedLanguage(e.target.value);
  };

  return (
    <div className="my-4 flex items-center gap-4 rounded-lg border border-hairline bg-surface-1 p-3">
      <button
        onClick={handleFetchAndPlayAudio}
        disabled={loading}
        className="flex shrink-0 items-center gap-2 rounded-md bg-accent/10 px-3 py-1.5 text-[13px] font-medium text-accent transition-colors hover:bg-accent/20"
      >
        {loading ? (
          <Loader2 size={16} className="animate-spin" />
        ) : isPlaying ? (
          <Pause size={16} />
        ) : (
          <Volume2 size={16} />
        )}
        <span>{isPlaying ? "Pause Audio" : "Listen"}</span>
      </button>

      <select
        value={selectedLanguage}
        onChange={handleLanguageChange}
        disabled={loading || isPlaying}
        className="cursor-pointer rounded-md border border-hairline bg-surface-2 px-2 py-1 text-[13px] text-text-primary outline-none focus:border-accent"
      >
        <option value="english">English</option>
        <option value="bengali">Bengali</option>
        <option value="hinglish">Hinglish</option>
        <option value="hindi">Hindi</option>
        <option value="tamil">Tamil</option>
        <option value="spanish">Spanish</option>
      </select>

      <span className="hidden text-[12px] text-text-muted sm:inline-block">
        AI-generated audio summary
      </span>
    </div>
  );
}

import { getCachedYoutubeResult, cacheYoutubeResult } from "../lib/queries.js";

export const searchYoutube = async (req, res) => {
  const query = (req.query.query || "").toString().trim();
  if (!query) return res.status(400).json({ error: "query is required" });

  try {
    const cached = await getCachedYoutubeResult(query);
    if (cached?.video_id) {
      return res.json({
        videoId: cached.video_id,
        title: cached.title,
        embedUrl: `https://www.youtube.com/embed/${cached.video_id}`,
      });
    }

    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) {
      return res.status(503).json({
        error: "YOUTUBE_API_KEY is not set. Add it to server/.env to enable video embeds.",
      });
    }

    const url = new URL("https://www.googleapis.com/youtube/v3/search");
    url.searchParams.set("part", "snippet");
    url.searchParams.set("type", "video");
    url.searchParams.set("maxResults", "1");
    url.searchParams.set("q", query);
    url.searchParams.set("key", apiKey);

    const ytRes = await fetch(url);
    if (!ytRes.ok) {
      const body = await ytRes.text().catch(() => "");
      throw new Error(`YouTube API error (${ytRes.status}): ${body || ytRes.statusText}`);
    }

    const data = await ytRes.json();
    const item = data.items?.[0];
    if (!item?.id?.videoId) throw new Error("No video found for this query.");

    const videoId = item.id.videoId;
    const title = item.snippet?.title || query;

    await cacheYoutubeResult(query, videoId, title);
    res.json({ videoId, title, embedUrl: `https://www.youtube.com/embed/${videoId}` });
  } catch (err) {
    console.error("YouTube search failed:", err);
    res.status(502).json({ error: err.message || "YouTube search failed" });
  }
};
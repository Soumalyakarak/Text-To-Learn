import mongoose from "mongoose";

// Caches one video result per search query so the same lesson topic doesn't
// re-hit the YouTube Data API (which has a fairly low daily free quota) every
// time a lesson is reopened.
const YoutubeCacheSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // the search query, used as the cache key
  videoId: { type: String, required: true },
  title: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

export const YoutubeCache = mongoose.model("YoutubeCache", YoutubeCacheSchema);
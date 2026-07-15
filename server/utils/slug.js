export function slugify(text) {
  if (!text) return "";
  
  return text
    .toLowerCase()
    .trim()
    .replace(/\+\+/g, "pp")   // Explicitly convert ++ to pp (C++ -> cpp)
    .replace(/#/g, "sharp")   // Explicitly convert # to sharp (C# -> csharp)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}
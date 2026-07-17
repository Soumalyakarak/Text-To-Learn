const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models";

// 1. Define your primary and fallback models
const PRIMARY_MODEL = process.env.GEMINI_MODEL || "gemini-3.5-flash";
const FALLBACK_MODEL = "gemini-3.1-flash-lite";

// Helper function to make the HTTP request
async function makeRequest(model, apiKey, prompt, temperature) {
  const url = `${GEMINI_API_URL}/${model}:generateContent?key=${apiKey}`;
  const body = {
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: {
      temperature,
      responseMimeType: "application/json",
    },
  };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const error = new Error(`API Error (${response.status}): ${errorData.error?.message || response.statusText}`);
    error.status = response.status;
    throw error;
  }

  return response.json();
}

export async function generateJSON({ systemInstruction, prompt, temperature = 0.7 }) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set.");
  }

  const parseAIResponse = (text) => {
    const cleaned = text
      .replace(/```json\s*/g, '') // Remove opening ```json
      .replace(/```\s*$/g, '')    // Remove closing ```
      .trim();                   // Remove extra newlines or spaces
    return JSON.parse(cleaned);
  };

  try {
    // Attempt 1: Try the primary model
    const data = await makeRequest(PRIMARY_MODEL, apiKey, prompt, temperature);
    return JSON.parse(data.candidates[0].content.parts[0].text);
  } catch (error) {
    // Attempt 2: If the primary model is overloaded (503) or rate-limited (429), fall back to Lite
    if (error.status === 503 || error.status === 429) {
      console.warn(`⚠️ ${PRIMARY_MODEL} busy (${error.status}). Switching to fallback: ${FALLBACK_MODEL}...`);
      const fallbackData = await makeRequest(FALLBACK_MODEL, apiKey, prompt, temperature);
      return JSON.parse(fallbackData.candidates[0].content.parts[0].text);
    }
    
    // If it is a different type of error (like 400 Bad Request or 403 Unauthorized), rethrow it
    throw error;
  }
}
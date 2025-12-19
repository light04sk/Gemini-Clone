import { GoogleGenAI } from "@google/genai";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_API_KEY,
});

async function runAi(prompt) {

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = response.text || "No response text received.";

    return { success: true, data: text };
  } catch (error) {

    let message =
      "⚠️ Gemini API error occurred. Please check your usage or try again later.";

    if (
      error.message?.includes("quota") ||
      error.message?.includes("exceeded")
    ) {
      message =
        "🚫 Daily quota exceeded for Gemini API (limit ~250 requests/day). Try again after midnight PT.";
    } else if (
      error.message?.includes("rate") ||
      error.message?.includes("Requests per minute")
    ) {
      message =
        "⏱️ Too many requests in a short time. Gemini API allows ~10 requests/minute. Please wait and retry.";
    }

    return { success: false, data: message };
  }
}

export default runAi;


/*
import { GoogleGenAI } from "@google/genai";

// Vite exposes client env variables through import.meta.env and
// client-exposed vars must start with VITE_. Use VITE_GEMINI_API_KEY.
const API_KEY = (import.meta as any)?.env?.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.warn("VITE_GEMINI_API_KEY not set. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

/**
 * Generates an icebreaker question using the Gemini API.
 * @param interests - An array of shared interests to base the question on.
 * @returns A promise that resolves to a string containing the icebreaker.
 */
/*
export const generateIcebreaker = async (interests: string[]): Promise<string> => {
  if (!API_KEY) {
    return "What's a fun fact about you?"; // Fallback question
  }
  
  try {
    const interestsText = interests.join(', ');
    const prompt = `Generate an icebreaker based on these shared interests: ${interestsText}.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are a friendly and creative assistant helping people make new friends. Your task is to generate one short, friendly, and open-ended icebreaker question. The question should be something one person could ask another to start a conversation after connecting in an app. It should be safe for all audiences, positive, and avoid sensitive topics. Do not include any intro or outro text, just the question.",
      },
    });

    const text = response.text.trim();
    return text || "What's something you're passionate about?"; // Fallback for empty response
  } catch (error) {
    console.error("Error generating icebreaker:", error);
    return "What's the best thing that happened to you this week?"; // Fallback question on error
  }
};
*/

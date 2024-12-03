import type { Part, GenerateContentResult } from "@google/generative-ai";
import { apiKey, generativeModel } from "$lib/genlang/init";

async function generateContentLocal(
  apiKey: string,
  request: string | Array<string | Part>,
): Promise<GenerateContentResult> {
  const model = generativeModel(apiKey, null);
  const response = await model.generateContent(request);
  return response;
}

export async function fetchText(request: string | Array<string | Part>): Promise<string | null> {
  let text: string | null;
  if (apiKey) {
    // local
    try {
      const response = await generateContentLocal(apiKey, request);
      text = response.response.text();
    } catch (error) {
      console.error("Failed to receive text in local:", error);
      return null;
    }
  } else {
    // production
    console.warn("Unavailable to receive text in production:");
    return null;
  }
  return text;
}

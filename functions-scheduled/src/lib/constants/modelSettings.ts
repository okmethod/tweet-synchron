import type { ModelParams } from "@google/generative-ai";
import { HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const DEFAULT_MODEL_NAME = "gemini-2.0-flash";

const TOO_LOOSE_BLOCK = [
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
];

export const defaultModelParams: ModelParams = {
  model: DEFAULT_MODEL_NAME,
  safetySettings: TOO_LOOSE_BLOCK,
};

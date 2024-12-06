import type { GenerateContentRequest, GenerateContentResult, Part } from "@google/generative-ai";

export interface RequestGenTextJson {
  request: GenerateContentRequest | string | Array<string | Part>;
}

export interface ResponseGenTextJson {
  content: GenerateContentResult | string | null;
}

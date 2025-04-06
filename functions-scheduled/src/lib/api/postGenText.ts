import { constructRequestInit, fetchApi } from "../utils/request.js";
import type { ModelParams } from "@google/generative-ai";
import { pathGenText } from "../constants/paths.js";
import type { RequestGenTextJson, ResponseGenTextJson } from "../types/gemini";
import { defaultModelParams } from "../constants/modelSettings.js";

async function postGenText(
  fetchFunction: typeof window.fetch,
  promptText: string,
  modelParams?: ModelParams | undefined,
): Promise<ResponseGenTextJson> {
  const url = pathGenText;
  const headers: HeadersInit = { "Content-Type": "application/json" };
  const requestInit = constructRequestInit(headers);
  const requestBody: RequestGenTextJson = {
    modelParams: modelParams || defaultModelParams,
    promptText,
  };
  const requestConfig = {
    ...requestInit,
    method: "POST",
    body: JSON.stringify(requestBody),
  };
  try {
    const response = await fetchApi(fetchFunction, url, requestConfig);
    return (await response.json()) as ResponseGenTextJson;
  } catch {
    return { content: null };
  }
}

export default postGenText;

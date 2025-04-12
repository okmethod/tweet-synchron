import { getEnv } from "../utils/getEnv.js";

export function constructRequestInit(headers?: HeadersInit): RequestInit {
  // const apiKey = getEnv("API_KEY");
  const requestInit: RequestInit = {
    credentials: "same-origin",
    headers: {
      ...headers,
      // "x-api-key": apiKey,
    },
  };
  return requestInit;
}

export async function fetchApi(
  fetchFunction: typeof fetch,
  url: string,
  requestConfig: RequestInit,
): Promise<Response> {
  const isAbsoluteUrl = /^https?:\/\//i.test(url);

  try {
    const baseApiUrl = process.env.NODE_ENV === "production" ? getEnv("API_BASE_URL") : process.env.LOCAL_API_BASE_URL;
    const fullUrl = isAbsoluteUrl ? url : `${baseApiUrl}${url}`;

    const response = await fetchFunction(fullUrl, requestConfig);
    if (!response.ok) {
      console.error("API response:", response.status);
      throw new Error(`Failed to fetch: ${requestConfig.method} ${url}`);
    }
    return response;
  } catch (e) {
    console.error("API error:", e);
    throw new Error(`Failed to fetch: ${requestConfig.method} ${url}`);
  }
}

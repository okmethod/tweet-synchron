import { constructRequestInit, fetchApi } from "../utils/request.js";
import { pathPostTweet } from "../constants/paths.js";
import type { RequestPostTweetJson, ResponsePostTweetJson } from "../types/twitter";

async function postPostTweet(
  fetchFunction: typeof window.fetch,
  accountPassphrase: string,
  tweetText: string,
  imageUrl: string | null = null,
  inReplyToTweetId: string | null = null,
): Promise<ResponsePostTweetJson> {
  const url = pathPostTweet;
  const mediaData = imageUrl ? await imageUrlToBase64(fetchFunction, imageUrl) : null;
  const mediaFileBase64 = mediaData?.base64String ?? null;
  const mediaMimeType = mediaData?.mimeType ?? null;
  const headers: HeadersInit = { "Content-Type": "application/json" };
  const requestInit = constructRequestInit(headers);
  const requestBody: RequestPostTweetJson = {
    accountPassphrase,
    tweetText,
    mediaFileBase64: mediaFileBase64 ?? undefined,
    mediaMimeType: mediaMimeType ?? undefined,
    inReplyToTweetId: inReplyToTweetId ?? undefined,
  };
  const requestConfig = {
    ...requestInit,
    method: "POST",
    body: JSON.stringify(requestBody),
  };
  try {
    const response = await fetchApi(fetchFunction, url, requestConfig);
    return (await response.json()) as ResponsePostTweetJson;
  } catch {
    return { tweetId: null };
  }
}

async function imageUrlToBase64(
  fetchFunction: typeof fetch,
  imageUrl: string,
): Promise<{ base64String: string; mimeType: string }> {
  const response = await fetchFunction(imageUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch image from URL: ${imageUrl}`);
  }

  const blob = await response.blob();
  const arrayBuffer = await blob.arrayBuffer();
  const base64String = Buffer.from(arrayBuffer).toString("base64");
  const mimeType = blob.type;
  return { base64String, mimeType };
}

export default postPostTweet;

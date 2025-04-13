import { constructRequestInit, fetchApi } from "../utils/request.js";
import { pathPostTweet } from "../constants/paths.js";
import type { RequestPostTweetJson, ResponsePostTweetJson } from "../types/twitter";
import { imageUrlToBase64 } from "../utils/processImage.js";

async function postPostTweet(
  fetchFunction: typeof window.fetch,
  accountPassphrase: string,
  tweetText: string,
  imageUrl: string | null = null,
  inReplyToTweetId: string | null = null,
): Promise<ResponsePostTweetJson> {
  const url = pathPostTweet;
  const mediaData = imageUrl ? await imageUrlToBase64(fetchFunction, imageUrl, 400) : null;
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

export default postPostTweet;

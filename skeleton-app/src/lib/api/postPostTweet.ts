import { constructRequestInit, fetchApi } from "$lib/utils/request";
import { pathPostTweet } from "$lib/constants/paths";
import type { RequestPostTweetJson, ResponsePostTweetJson } from "$lib/types/twitter";

async function postPostTweet(fetchFunction: typeof window.fetch, tweetText: string): Promise<ResponsePostTweetJson> {
  const url = pathPostTweet;
  const headers: HeadersInit = { "Content-Type": "application/json" };
  const requestInit = constructRequestInit(headers);
  const requestBody: RequestPostTweetJson = { tweetText };
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

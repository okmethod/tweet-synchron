import { browser } from "$app/environment";

export function redirectTweetByNewTab(tweetText: string): void {
  if (!browser) return;
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
  window.open(tweetUrl, "_blank");
}

export interface RequestPostTweetJson {
  tweetText: string;
}

export interface ResponsePostTweetJson {
  tweetId: string | null;
}

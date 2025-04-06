export interface RequestPostTweetJson {
  accountPassphrase: string;
  tweetText: string;
  inReplyToTweetId?: string;
}

export interface ResponsePostTweetJson {
  tweetId: string | null;
}

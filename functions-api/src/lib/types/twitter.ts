export interface RequestPostTweetJson {
  accountPassphrase: string;
  tweetText: string;
  mediaFileBase64?: string;
  mediaMimeType?: string;
  inReplyToTweetId?: string;
}

export interface ResponsePostTweetJson {
  tweetId: string | null;
}

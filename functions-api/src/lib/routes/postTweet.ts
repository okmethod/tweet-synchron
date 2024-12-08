import type { Request, Response } from "express";
import type { TweetV2PostTweetResult } from "twitter-api-v2";
import type { RequestPostTweetJson, ResponsePostTweetJson } from "../types/postTweet";
import twitterApiClient from "../services/twitterApiClient.js";

const postTweet = async (req: Request, res: Response) => {
  const requestBody: RequestPostTweetJson = req.body;
  const { tweetText } = requestBody;
  if (!tweetText) {
    console.warn("Missing required parameters:", requestBody);
    res.status(400).json({
      error: "Missing required parameters",
      details: requestBody,
    });
    return;
  }

  let tweetResult: TweetV2PostTweetResult;
  try {
    tweetResult = await twitterApiClient().v2.tweet(tweetText);
  } catch (error) {
    console.error("Failed to post tweet:", error);
    res.status(500).json({ error: "Failed to post tweet" });
    return;
  }

  const response: ResponsePostTweetJson = {
    tweetId: tweetResult.data.id,
  };
  res.json(response);
};

export default postTweet;

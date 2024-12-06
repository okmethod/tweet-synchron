import type { Request, Response } from "express";
import { TwitterApi, type TweetV2PostTweetResult } from "twitter-api-v2";
import { defineString } from "firebase-functions/params";
import type { RequestPostTweetJson, ResponsePostTweetJson } from "../types/postTweet";

const twitterApiKey = defineString("TWITTER_API_KEY");
const twitterApiSecretKey = defineString("TWITTER_API_SECRET_KEY");
const twitterAccessToken = defineString("TWITTER_ACCESS_TOKEN");
const twitterAccessTokenSecret = defineString("TWITTER_ACCESS_TOKEN_SECRET");

const postTweet = async (req: Request, res: Response) => {
  const twitterApiKeyValue =
    process.env.NODE_ENV === "production" ? twitterApiKey.value() : process.env.TWITTER_API_KEY;
  const twitterApiSecretKeyValue =
    process.env.NODE_ENV === "production" ? twitterApiSecretKey.value() : process.env.TWITTER_API_SECRET_KEY;
  const twitterAccessTokenValue =
    process.env.NODE_ENV === "production" ? twitterAccessToken.value() : process.env.TWITTER_ACCESS_TOKEN;
  const twitterAccessTokenSecretValue =
    process.env.NODE_ENV === "production" ? twitterAccessTokenSecret.value() : process.env.TWITTER_ACCESS_TOKEN_SECRET;
  if (!twitterApiKeyValue || !twitterApiSecretKeyValue || !twitterAccessTokenValue || !twitterAccessTokenSecretValue) {
    res.status(500).json({ error: "Twitter API credentials not configured" });
    return;
  }

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

  let twitterApi: TwitterApi | null = null;
  try {
    twitterApi = new TwitterApi({
      appKey: twitterApiKeyValue,
      appSecret: twitterApiSecretKeyValue,
      accessToken: twitterAccessTokenValue,
      accessSecret: twitterAccessTokenSecretValue,
    });
  } catch (err) {
    console.error(err);
  }
  if (!twitterApi) {
    res.status(500).json({ error: "Failed to initialize TwitterApi" });
    return;
  }

  let tweetResult: TweetV2PostTweetResult;
  try {
    tweetResult = await twitterApi.v2.tweet(tweetText);
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

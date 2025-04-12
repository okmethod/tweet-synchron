import type { Request, Response } from "express";
import type { TweetV2PostTweetResult } from "twitter-api-v2";
import type { RequestPostTweetJson, ResponsePostTweetJson } from "../types/twitter";
import TwitterApiSingletonMap from "../services/TwitterApiSingleton.js";

const postTweet = async (req: Request, res: Response) => {
  const requestBody: RequestPostTweetJson = req.body;
  const { accountPassphrase, tweetText, mediaFileBase64, mediaMimeType, inReplyToTweetId } = requestBody;
  if (!accountPassphrase || !tweetText) {
    console.warn("Missing required parameters:", requestBody);
    res.status(400).json({
      error: "Missing required parameters",
      details: requestBody,
    });
    return;
  }

  let tweetResult: TweetV2PostTweetResult;
  try {
    const twitterApi = TwitterApiSingletonMap.getInstance(accountPassphrase);

    let mediaId: string | undefined;
    if (mediaFileBase64 && mediaMimeType) {
      const mediaBuffer = Buffer.from(mediaFileBase64, "base64");
      mediaId = await twitterApi.v1.uploadMedia(mediaBuffer, { mimeType: mediaMimeType });
    }

    const mediaObj = mediaId ? { media: { media_ids: [mediaId] as [string] } } : undefined;
    tweetResult = inReplyToTweetId
      ? await twitterApi.v2.reply(tweetText, inReplyToTweetId, mediaObj)
      : await twitterApi.v2.tweet(tweetText, mediaObj);
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

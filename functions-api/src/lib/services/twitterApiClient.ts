import { TwitterApi } from "twitter-api-v2";
import { defineString } from "firebase-functions/params";

const twitterApiKey = defineString("TWITTER_API_KEY");
const twitterApiSecretKey = defineString("TWITTER_API_SECRET_KEY");
const twitterAccessToken = defineString("TWITTER_ACCESS_TOKEN");
const twitterAccessTokenSecret = defineString("TWITTER_ACCESS_TOKEN_SECRET");

const twitterApiClient = (): TwitterApi => {
  const twitterApiKeyValue =
    process.env.NODE_ENV === "production" ? twitterApiKey.value() : process.env.TWITTER_API_KEY;
  const twitterApiSecretKeyValue =
    process.env.NODE_ENV === "production" ? twitterApiSecretKey.value() : process.env.TWITTER_API_SECRET_KEY;
  const twitterAccessTokenValue =
    process.env.NODE_ENV === "production" ? twitterAccessToken.value() : process.env.TWITTER_ACCESS_TOKEN;
  const twitterAccessTokenSecretValue =
    process.env.NODE_ENV === "production" ? twitterAccessTokenSecret.value() : process.env.TWITTER_ACCESS_TOKEN_SECRET;
  if (!twitterApiKeyValue || !twitterApiSecretKeyValue || !twitterAccessTokenValue || !twitterAccessTokenSecretValue) {
    throw new Error("Twitter API credentials not configured.");
  }

  let twitterApiClient: TwitterApi | null = null;
  try {
    twitterApiClient = new TwitterApi({
      appKey: twitterApiKeyValue,
      appSecret: twitterApiSecretKeyValue,
      accessToken: twitterAccessTokenValue,
      accessSecret: twitterAccessTokenSecretValue,
    });
  } catch (err) {
    console.error(err);
    throw new Error("Failed to initialize TwitterApi");
  }
  if (!twitterApiClient) {
    throw new Error("Failed to initialize TwitterApi");
  }

  return twitterApiClient;
};

export default twitterApiClient;

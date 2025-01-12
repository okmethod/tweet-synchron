import { TwitterApi, type TwitterApiTokens } from "twitter-api-v2";
import { defineString } from "firebase-functions/params";

const apiKey = defineString("TWITTER_API_KEY");
const apiSecretKey = defineString("TWITTER_API_SECRET_KEY");
const accessToken = defineString("TWITTER_ACCESS_TOKEN");
const accessTokenSecret = defineString("TWITTER_ACCESS_TOKEN_SECRET");

class TwitterApiSingleton {
  private static instance: TwitterApi | null = null;

  // Singleton pattern
  private constructor() {}

  public static getInstance(): TwitterApi {
    if (!TwitterApiSingleton.instance) {
      const tokens = TwitterApiSingleton.getCredentials();
      TwitterApiSingleton.instance = TwitterApiSingleton.initializeInstance(tokens);
    }
    return TwitterApiSingleton.instance;
  }

  private static getCredentials(): TwitterApiTokens {
    const getEnvValue = (key: string, fallback: string | undefined) =>
      process.env.NODE_ENV === "production" ? key : fallback;

    const apiKeyValue = getEnvValue(apiKey.value(), process.env.TWITTER_API_KEY);
    const apiSecretKeyValue = getEnvValue(apiSecretKey.value(), process.env.TWITTER_API_SECRET_KEY);
    const accessTokenValue = getEnvValue(accessToken.value(), process.env.TWITTER_ACCESS_TOKEN);
    const accessTokenSecretValue = getEnvValue(accessTokenSecret.value(), process.env.TWITTER_ACCESS_TOKEN_SECRET);

    if (!apiKeyValue || !apiSecretKeyValue || !accessTokenValue || !accessTokenSecretValue) {
      throw new Error("Failed to get Twitter API credentials");
    }
    return {
      appKey: apiKeyValue,
      appSecret: apiSecretKeyValue,
      accessToken: accessTokenValue,
      accessSecret: accessTokenSecretValue,
    };
  }

  private static initializeInstance(tokens: TwitterApiTokens): TwitterApi {
    try {
      const newInstance = new TwitterApi(tokens);
      return newInstance;
    } catch (err) {
      console.error(err);
      throw new Error("Failed to initialize TwitterApi");
    }
  }
}

export default TwitterApiSingleton;

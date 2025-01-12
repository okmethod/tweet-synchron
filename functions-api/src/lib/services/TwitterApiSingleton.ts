import { TwitterApi, type TwitterApiTokens } from "twitter-api-v2";
import { getEnv } from "../utils/getEnv.js";

const appKey = getEnv("TWITTER_API_KEY");
const appSecret = getEnv("TWITTER_API_SECRET_KEY");
const accessToken = getEnv("TWITTER_ACCESS_TOKEN");
const accessSecret = getEnv("TWITTER_ACCESS_TOKEN_SECRET");

class TwitterApiSingleton {
  private static instance: TwitterApi | null = null;

  // Singleton pattern
  private constructor() {}

  public static getInstance(): TwitterApi {
    if (!TwitterApiSingleton.instance) {
      TwitterApiSingleton.instance = TwitterApiSingleton.initializeInstance({
        appKey,
        appSecret,
        accessToken,
        accessSecret,
      });
    }
    return TwitterApiSingleton.instance;
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

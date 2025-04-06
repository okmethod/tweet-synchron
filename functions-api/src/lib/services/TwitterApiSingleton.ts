import { TwitterApi, type TwitterApiTokens } from "twitter-api-v2";
import { getEnv } from "../utils/getEnv.js";

class TwitterApiSingletonMap {
  private static instances: Record<string, TwitterApi> = {};

  // Singleton pattern
  private constructor() {}

  public static getInstance(accountPassphrase: string): TwitterApi {
    if (!(accountPassphrase in TwitterApiSingletonMap.instances)) {
      const tokens = TwitterApiSingletonMap.getTokens(accountPassphrase);
      const instance = TwitterApiSingletonMap.initializeInstance(tokens);
      TwitterApiSingletonMap.instances[accountPassphrase] = instance;
    }
    return TwitterApiSingletonMap.instances[accountPassphrase];
  }

  private static getTokens(accountPassphrase: string): TwitterApiTokens {
    const tokenMap: Record<string, TwitterApiTokens> = {
      tweet_synchron: {
        appKey: getEnv("TWITTER_API_KEY"),
        appSecret: getEnv("TWITTER_API_SECRET_KEY"),
        accessToken: getEnv("TWITTER_ACCESS_TOKEN"),
        accessSecret: getEnv("TWITTER_ACCESS_TOKEN_SECRET"),
      },
    };
    if (!(accountPassphrase in tokenMap)) {
      throw new Error("Unkown accountPassphrase");
    }
    return tokenMap[accountPassphrase];
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

export default TwitterApiSingletonMap;

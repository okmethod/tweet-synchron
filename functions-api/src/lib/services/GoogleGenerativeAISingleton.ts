import { GoogleGenerativeAI } from "@google/generative-ai";
import { defineString } from "firebase-functions/params";

const apiKey = defineString("GEMINI_API_KEY");

class GoogleGenerativeAISingleton {
  private static instance: GoogleGenerativeAI | null = null;

  // Singleton pattern
  private constructor() {}

  public static getInstance(): GoogleGenerativeAI {
    if (!GoogleGenerativeAISingleton.instance) {
      const apiKeyValue = GoogleGenerativeAISingleton.getApiKey();
      GoogleGenerativeAISingleton.instance = GoogleGenerativeAISingleton.initializeInstance(apiKeyValue);
    }
    return GoogleGenerativeAISingleton.instance;
  }

  private static getApiKey(): string {
    const apiKeyValue = process.env.NODE_ENV === "production" ? apiKey.value() : process.env.GEMINI_API_KEY;

    if (!apiKeyValue) {
      throw new Error("Failed to get Gemini API key");
    }

    return apiKeyValue;
  }

  private static initializeInstance(apiKey: string): GoogleGenerativeAI {
    try {
      return new GoogleGenerativeAI(apiKey);
    } catch (err) {
      console.error("Failed to initialize GoogleGenerativeAI:", err);
      throw new Error("Failed to initialize GoogleGenerativeAI");
    }
  }
}

export default GoogleGenerativeAISingleton;

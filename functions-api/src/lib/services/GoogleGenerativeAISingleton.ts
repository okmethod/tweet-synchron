import { GoogleGenerativeAI } from "@google/generative-ai";
import { getEnv } from "../utils/getEnv.js";

class GoogleGenerativeAISingleton {
  private static instance: GoogleGenerativeAI | null = null;

  // Singleton pattern
  private constructor() {}

  public static getInstance(): GoogleGenerativeAI {
    if (!GoogleGenerativeAISingleton.instance) {
      const apiKey = getEnv("GEMINI_API_KEY");
      GoogleGenerativeAISingleton.instance = GoogleGenerativeAISingleton.initializeInstance(apiKey);
    }
    return GoogleGenerativeAISingleton.instance;
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

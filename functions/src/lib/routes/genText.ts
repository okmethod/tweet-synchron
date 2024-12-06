import type { Request, Response } from "express";
import { defineString } from "firebase-functions/params";
import { GoogleGenerativeAI } from "@google/generative-ai";
import type { GenerateContentResult } from "@google/generative-ai";
import type { RequestGenTextJson, ResponseGenTextJson } from "../types/genText";

const geminiApiKey = defineString("GEMINI_API_KEY");

const genText = async (req: Request, res: Response) => {
  const apiKeyValue = process.env.NODE_ENV === "production" ? geminiApiKey.value() : process.env.GEMINI_API_KEY;
  if (!apiKeyValue) {
    res.status(500).json({ error: "Gemini API Key not configured" });
    return;
  }

  const requestBody: RequestGenTextJson = req.body;
  const { modelParams, promptText } = requestBody;
  if (!modelParams || !promptText) {
    console.warn("Missing required parameters:", requestBody);
    res.status(400).json({
      error: "Missing required parameters",
      details: requestBody,
    });
    return;
  }

  let genAI: GoogleGenerativeAI | null = null;
  try {
    genAI = new GoogleGenerativeAI(apiKeyValue);
  } catch (err) {
    console.error(err);
  }
  if (!genAI) {
    res.status(500).json({ error: "Failed to initialize GoogleGenerativeAI" });
    return;
  }

  let generatedContent: GenerateContentResult;
  try {
    const model = genAI.getGenerativeModel(modelParams);
    generatedContent = await model.generateContent(promptText);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "No response from GoogleGenerativeAI" });
    return;
  }

  const response: ResponseGenTextJson = {
    content: generatedContent.response.text(),
  };
  res.json(response);
};

export default genText;

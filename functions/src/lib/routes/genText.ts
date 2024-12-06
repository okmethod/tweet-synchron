import type { Request, Response } from "express";
import { defineString } from "firebase-functions/params";
import type { RequestGenTextJson, ResponseGenTextJson } from "../types/genText";

const geminiApiKey = process.env.NODE_ENV === "production"
 ? defineString("GEMINI_API_KEY")
 : process.env.GEMINI_API_KEY;

const genText = async (req: Request, res: Response) => {
  if (!geminiApiKey) {
    res.status(500).json({ error: "Gemini API Key not configured" });
    return;
  }
  const requestBody: RequestGenTextJson = req.body;
  // TODO: 型ガードする

  // TODO: テキスト生成する
  const response: ResponseGenTextJson = {
    content: requestBody.request as string,
  };
  res.json(response);
};



export default genText;

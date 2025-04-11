import type { Request, Response } from "express";
import fetch from "node-fetch";
import type { ResponseCardInfoJson } from "../types/parser";
import { TagTextExtractor } from "../utils/parseHtml.js";
import { encodeEucJp } from "../utils/parseUrl.js";

const ygoWikiUrl = "https://yugioh-wiki.net/index.php";

const fetchCardInfo = async (req: Request, res: Response) => {
  const { pageName } = req.params;
  if (!pageName) {
    console.warn("Missing required parameters:", req.params);
    res.status(400).json({
      error: "Missing required parameters",
      details: req.params,
    });
    return;
  }

  try {
    const encodedPageName = encodeEucJp(pageName);
    const url = `${ygoWikiUrl}?${encodedPageName}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${url}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    const htmlBuffer = Buffer.from(arrayBuffer);

    const h2TagExtractor = new TagTextExtractor();
    h2TagExtractor.parse(htmlBuffer, "euc-jp", "h2");
    const cardName = h2TagExtractor.extractedTexts[0];

    const cardTextsExtractor = new TagTextExtractor();
    cardTextsExtractor.parse(htmlBuffer, "euc-jp", "pre");
    const cardTexts = cardTextsExtractor.extractedTexts;

    const responseData: ResponseCardInfoJson = {
      name: cardName,
      cardTexts: cardTexts,
      wikiText: "",
    };
    res.json(responseData);
  } catch (error) {
    console.error("Error fetching card list:", error);
    res.status(500).json({
      error: "Failed to fetch card list",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export default fetchCardInfo;

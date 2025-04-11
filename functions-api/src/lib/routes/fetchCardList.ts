import type { Request, Response } from "express";
import fetch from "node-fetch";
import type { ResponseCardListJson } from "../types/parser";
import { StyleTableExtractor } from "../utils/parseHtml.js";
import { encodeEucJp } from "../utils/parseUrl.js";
import { removeAsteriskNumber, isEnclosedInBrackets } from "../utils/processRegex.js";

const ygoWikiUrl = "https://yugioh-wiki.net/index.php";

const fetchCardList = async (req: Request, res: Response) => {
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

    const extractor = new StyleTableExtractor();
    extractor.parse(htmlBuffer, "euc-jp");

    const cardNames = extractor.tableData
      .map((row) => removeAsteriskNumber(row[0]))
      .filter((name) => isEnclosedInBrackets(name));

    const responseData: ResponseCardListJson = {
      cardList: cardNames,
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

export default fetchCardList;

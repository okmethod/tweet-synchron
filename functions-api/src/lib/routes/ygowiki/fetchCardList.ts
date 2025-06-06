import type { Request, Response } from "express";
import fetch from "node-fetch";
import type { ResponseCardListJson } from "../../types/ygowiki";
import { StyleTableExtractor } from "../../utils/parseHtml.js";
import { encodeEucJp } from "../../utils/parseUrl.js";
import {
  removeAsteriskNumber,
  isEnclosedInAngleBrackets,
  fetchEnclosingAngleBrackets,
} from "../../utils/processRegex.js";

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

    const jaNames = extractor.tableData
      .map((row) => removeAsteriskNumber(row[0]))
      .filter((name) => isEnclosedInAngleBrackets(name))
      .map((name) => fetchEnclosingAngleBrackets(name, false));

    const responseData: ResponseCardListJson = { jaNames };
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

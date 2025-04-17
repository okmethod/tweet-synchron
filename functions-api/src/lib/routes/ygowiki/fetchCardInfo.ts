import type { Request, Response } from "express";
import fetch from "node-fetch";
import type { ResponseCardInfoJson } from "../../types/ygowiki";
import { TagTextExtractor, StorySectionExtractor, WikiTextExtractor } from "../../utils/parseHtml.js";
import { encodeEucJp } from "../../utils/parseUrl.js";
import { parseCardNames } from "../../utils/processRegex.js";

const ygoWikiUrl = "https://yugioh-wiki.net/index.php";

const fetchCardInfo = async (req: Request, res: Response) => {
  const { jaName } = req.params;
  if (!jaName) {
    console.warn("Missing required parameters:", req.params);
    res.status(400).json({
      error: "Missing required parameters",
      details: req.params,
    });
    return;
  }

  try {
    const encodedPageName = encodeEucJp(`《${jaName}》`);
    const url = `${ygoWikiUrl}?${encodedPageName}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${url}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    const htmlBuffer = Buffer.from(arrayBuffer);

    const h2TagExtractor = new TagTextExtractor();
    h2TagExtractor.parse(htmlBuffer, "euc-jp", "h2");
    const cardNamefullText = h2TagExtractor.extractedTexts[0];
    const cardNames = parseCardNames(cardNamefullText);

    const cardTextsExtractor = new TagTextExtractor();
    cardTextsExtractor.parse(htmlBuffer, "euc-jp", "pre");
    const cardTexts = cardTextsExtractor.extractedTexts;

    const storySectionExtractor = new StorySectionExtractor();
    storySectionExtractor.parse(htmlBuffer, "euc-jp");
    const storySectionContent = storySectionExtractor.getContent();

    const wikiTextExtractor = new WikiTextExtractor();
    wikiTextExtractor.parse(htmlBuffer, "euc-jp");
    const wikiText = wikiTextExtractor.getText();

    const responseData: ResponseCardInfoJson = {
      names: cardNames,
      cardTexts: cardTexts,
      storyDescription: storySectionContent,
      wikiText: wikiText,
      wikiUrl: url,
    };
    res.json(responseData);
  } catch (error) {
    console.error("Error fetching card info:", error);
    res.status(500).json({
      error: "Failed to fetch card info",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export default fetchCardInfo;

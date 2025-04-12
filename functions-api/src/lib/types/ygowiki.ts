import type { CardNames } from "./cards";

export interface ResponseCardListJson {
  jaNames: string[];
}

export interface ResponseCardInfoJson {
  names: CardNames;
  cardTexts: string[];
  storyDescription: string;
  wikiText: string;
}

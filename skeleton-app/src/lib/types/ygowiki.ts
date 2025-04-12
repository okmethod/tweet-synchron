import type { CardNames } from "$lib/types/cards";

export interface ResponseCardListJson {
  jaNames: string[];
}

export interface ResponseCardInfoJson {
  names: CardNames;
  cardTexts: string[];
  storyDescription: string;
  wikiText: string;
}

export interface ResponseCardListJson {
  jaNames: string[];
}

export interface CardNames {
  fullText: string;
  fullName: string;
  jaName: string;
  enName: string;
}

export interface ResponseCardInfoJson {
  names: CardNames;
  cardTexts: string[];
  storyDescription: string;
  wikiText: string;
}

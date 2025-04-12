export interface CardNames {
  fullText: string;
  fullName: string;
  jaName: string;
  enName: string;
}

export interface CardInfo {
  names: CardNames;
  cardTexts: string[];
  storyDescription: string;
  wikiText: string;
}

export const monsterTypes = [
  "儀式モンスター",
  "融合モンスター",
  "シンクロモンスター",
  "エクシーズモンスター",
  "ペンデュラムモンスター",
  "リンクモンスター",
] as const;

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

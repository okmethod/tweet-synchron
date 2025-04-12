import type { CardNames } from "$lib/types/ygowiki";

export const monsterTypes = [
  "儀式モンスター",
  "融合モンスター",
  "シンクロモンスター",
  "エクシーズモンスター",
  "ペンデュラムモンスター",
  "リンクモンスター",
] as const;

export interface CardInfo {
  names: CardNames;
  cardTexts: string[];
  storyDescription: string;
  wikiText: string;
}

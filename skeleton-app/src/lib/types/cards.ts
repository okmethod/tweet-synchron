export const monsterTypes = [
  "儀式モンスター",
  "融合モンスター",
  "シンクロモンスター",
  "エクシーズモンスター",
  "ペンデュラムモンスター",
  "リンクモンスター",
] as const;

export interface CardInfo {
  name: string;
  cardTexts: string[];
  wikiText: string;
}

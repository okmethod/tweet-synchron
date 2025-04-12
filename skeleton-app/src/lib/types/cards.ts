import type { CardNames } from "$lib/types/ygowiki";
import type { CardImage } from "$lib/types/ygoprodeck";

export const monsterTypes = [
  "儀式モンスター",
  "融合モンスター",
  "シンクロモンスター",
  "エクシーズモンスター",
  "ペンデュラムモンスター",
  "リンクモンスター",
] as const;

export interface UnifiedCardInfo {
  names: CardNames;
  cardTexts: string[];
  storyDescription: string;
  wikiText: string;

  id?: number;
  type?: string;
  frameType?: string;
  desc?: string;
  ygoprodeckUrl?: string;

  cardImages?: CardImage[];

  race?: string;
  atk?: number;
  def?: number;
  level?: number;
  attribute?: string;
}

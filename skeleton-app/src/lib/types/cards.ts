import type { CardNames, ResponseCardInfoJson as YgoWikiResponse } from "$lib/types/ygowiki";
import type { CardImage, ResponseCardInfoJson as YgoProDeckResponse } from "$lib/types/ygoprodeck";

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

export function uniteCardInfo(
  ygoWikiResponse: YgoWikiResponse,
  ygoProDeckResponse: YgoProDeckResponse,
): UnifiedCardInfo {
  const wikiData = ygoWikiResponse; // YgoWikiの最初のカードデータ
  const proDeckData = ygoProDeckResponse.data[0]; // YgoProDeckの最初のカードデータ

  return {
    names: wikiData.names,
    cardTexts: wikiData.cardTexts,
    storyDescription: wikiData.storyDescription,
    wikiText: wikiData.wikiText,

    id: proDeckData.id,
    type: proDeckData.type,
    frameType: proDeckData.frameType,
    desc: proDeckData.desc,
    ygoprodeckUrl: proDeckData.ygoprodeck_url,
    cardImages: proDeckData.card_images,
    race: proDeckData.race,
    atk: proDeckData.atk,
    def: proDeckData.def,
    level: proDeckData.level,
    attribute: proDeckData.attribute,
  };
}

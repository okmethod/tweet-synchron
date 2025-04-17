import type { UnifiedCardInfo } from "$lib/types/cards";
import type { ResponseCardInfoJson as YgoWikiResponse } from "$lib/types/ygowiki";
import type { ResponseCardInfoJson as YgoProDeckResponse } from "$lib/types/ygoprodeck";
import getYgoWikiFetchCardInfo from "$lib/api/ygowiki/getFetchCardInfo";
import getYgoProDeckCardInfo from "$lib/api/ygoprodeck/getFetchCardInfo";

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
    wikiUrl: wikiData.wikiUrl,

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

async function fetchCardInfo(fetchFunction: typeof window.fetch, jaName: string): Promise<UnifiedCardInfo | null> {
  try {
    const ygoWikiResponse = await getYgoWikiFetchCardInfo(fetchFunction, jaName);
    if (!ygoWikiResponse) return null;
    const ygoProDeckResponse = await getYgoProDeckCardInfo(fetchFunction, ygoWikiResponse.names.enName);
    return uniteCardInfo(ygoWikiResponse, ygoProDeckResponse);
  } catch (error) {
    console.error("Failed to fetch card info:", error);
    return null;
  }
}

export default fetchCardInfo;

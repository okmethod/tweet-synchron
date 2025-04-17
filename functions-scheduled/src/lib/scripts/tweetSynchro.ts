import getFetchCardList from "../api/ygowiki/getFetchCardList.js";
import fetchCardInfo from "../api/fetchCardInfo.js";
import postGenText from "../api/postGenText.js";
import postPostTweet from "../api/postPostTweet.js";
import type { UnifiedCardInfo } from "../types/cards";
import { pickRandomElementsFromArray } from "../utils/pickRandom.js";
import { promptTemplate, promptEmbedment } from "../constants/prompt.js";

async function tweetSynchro(accountPassphrase: string): Promise<void> {
  console.log("This script tweet about random synchro monster with summon remark.");

  // シンクロモンスターのリストを取得し、ランダムに10体選ぶ
  const monsterType = "シンクロモンスター";
  const { jaNames } = await getFetchCardList(fetch, monsterType);
  const pickedJaNames = pickRandomElementsFromArray(jaNames, 10);

  // 順番にカード情報を取得し、取得できたらループを抜ける
  let jaName = pickedJaNames[0];
  let cardInfo: UnifiedCardInfo | null = null;
  for (const pickedJaName of pickedJaNames) {
    jaName = pickedJaName;
    const fetchedCardInfo = await fetchCardInfo(fetch, pickedJaName);
    console.log("Fetched CardInfo:", fetchedCardInfo);
    if (fetchedCardInfo && fetchedCardInfo.cardImages?.length && fetchedCardInfo.cardImages[0].image_url_cropped) {
      cardInfo = fetchedCardInfo;
      break;
    }
  }
  if (!cardInfo) {
    console.error("Fetched monsters without CardInfo.");
    return;
  }

  // LLMでツイート本文を作成する
  const summonType = "シンクロ召喚";
  const prompt = promptTemplate + promptEmbedment(jaName, summonType, cardInfo);
  console.log("Generated prompt:", prompt);
  const { content } = await postGenText(fetch, prompt);
  if (!content) {
    console.error("Failed to generate text.");
    return;
  }
  console.log("Generated text:", content);

  // ツイートする
  const tweetText = `${content}\n${normalizedHashTag(jaName)} #遊戯王`;
  const cardImageUrl = cardInfo?.cardImages?.[0]?.image_url_cropped ?? null;
  const { tweetId } = await postPostTweet(fetch, accountPassphrase, tweetText, cardImageUrl);
  console.log("Tweeted by ID:", tweetId);

  // 追加情報をリプライする
  const replyText = `【${jaName}】\n\n${cardInfo.wikiUrl}\n\n${cardInfo.ygoprodeckUrl}`;
  const { tweetId: replyId } = await postPostTweet(fetch, accountPassphrase, replyText, null, tweetId);
  console.log("Replied by ID:", replyId);

  return;
}

function normalizedHashTag(text: string): string {
  const normalizedName = text
    .replace(/\s+/g, "") // スペースを削除
    .replace(/[^a-zA-Z0-9Ａ-Ｚａ-ｚ０-９一-龠ぁ-んァ-ヶー・]/g, "_"); // 「・」以外の記号を「_」に置き換え
  return `#${normalizedName}`;
}

export default tweetSynchro;

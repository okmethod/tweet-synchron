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
  const tweetText = (generatedText: string, monsterName: string) => `${generatedText}\n#${monsterName} #遊戯王`;
  const cardImageUrl = cardInfo?.cardImages?.[0]?.image_url_cropped ?? null;
  const { tweetId } = await postPostTweet(fetch, accountPassphrase, tweetText(content, jaName), cardImageUrl);
  console.log("Tweeted by ID:", tweetId);

  return;
}

export default tweetSynchro;

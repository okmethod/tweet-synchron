import getFetchCardList from "../api/ygowiki/getFetchCardList.js";
import getFetchCardInfo from "../api/fetchCardInfo.js";
import postGenText from "../api/postGenText.js";
import postPostTweet from "../api/postPostTweet.js";
import { pickRandomElementsFromArray } from "../utils/pickRandom.js";
import { promptTemplate, promptEmbedment } from "../constants/prompt.js";

async function tweetSynchro(accountPassphrase: string): Promise<void> {
  console.log("This script tweet about random synchro monster with summon remark.");

  // シンクロモンスターのリストを取得し、ランダムに1体選ぶ
  const monsterType = "シンクロモンスター";
  const { jaNames } = await getFetchCardList(fetch, monsterType);
  const jaName = pickRandomElementsFromArray(jaNames, 1)[0];

  // カード情報を取得する
  const cardInfo = await getFetchCardInfo(fetch, jaName);

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

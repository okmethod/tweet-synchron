import postGenText from "../api/postGenText.js";
import postPostTweet from "../api/postPostTweet.js";
import { promptTemplate, promptEmbedment } from "../constants/prompt.js";

async function tweetSynchro(accountPassphrase: string): Promise<void> {
  console.log("This script tweet about the latest video of specified channel.");

  // LLMでツイート本文を作成する
  const monsterName = "スターダスト・ドラゴン";
  const prompt = promptTemplate + promptEmbedment(monsterName, "シンクロ召喚");
  const { content } = await postGenText(fetch, prompt);
  if (!content) {
    console.error("Failed to generate text.");
    return;
  }
  console.log("Generated text:", content);

  // ツイートする
  const tweetText = (generatedText: string, monsterName: string) => `${generatedText}\n#${monsterName} #遊戯王`;
  const { tweetId } = await postPostTweet(fetch, accountPassphrase, tweetText(content, monsterName));
  console.log("Tweeted by ID:", tweetId);

  return;
}

export default tweetSynchro;

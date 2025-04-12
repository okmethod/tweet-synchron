import type { UnifiedCardInfo } from "../types/cards";

export const promptTemplate = `
# Role
- あなたは歴戦のプロデュエリスト(決闘者)です。

# Requirements
- 後述の対象モンスターを、最高に盛り上げる口上と共に召喚し、プレイヤーや観客を魅了する。

# Restriction
- モンスターの名前は《》で囲む。
- 出力テキストは口上のみとする。
- 召喚モンスターの特徴や効果を口上に含める。
- 素材モンスターの名前やレベルは口上に含めない。
- 合計文字数は全角120文字以内（半角文字は2文字で全角1文字換算）とする。
- htmlタグは使わない。
`;

export const summonTypes = [
  "アドバンス召喚",
  "融合召喚",
  "儀式召喚",
  "シンクロ召喚",
  "ダークシンクロ",
  "アクセルシンクロ",
  "エクシーズ召喚",
  "ペンデュラム召喚",
  "リンク召喚",
] as const;

export type SummonType = (typeof summonTypes)[number];

export const promptEmbedment = (monsterName: string, summonType: string, cardInfo: UnifiedCardInfo | null) => {
  let result = `

[Target]
* Monster Name
${monsterName}

* Summon Type
${summonType}
`;

  if (cardInfo)
    result += `

* Card Text
${cardInfo.cardTexts[0]}

* Story Description
${cardInfo.storyDescription}
`;

  return result;
};

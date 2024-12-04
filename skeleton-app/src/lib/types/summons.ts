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

export interface SummonRemark {
  monster: string;
  summonType: SummonType;
  text: string;
}

export interface LegendarySummonRemark extends SummonRemark {
  duelist: string;
}

export type SummonRemarksMap = Record<string, SummonRemark[]>;

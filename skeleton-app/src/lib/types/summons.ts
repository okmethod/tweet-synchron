export interface SummonRemark {
  monster: string;
  text: string;
}

export interface LegendarySummonRemark extends SummonRemark {
  duelist: string;
}

export type SummonRemarksMap = Record<string, SummonRemark[]>;

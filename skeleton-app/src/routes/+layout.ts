import type { LoadEvent } from "@sveltejs/kit";
import type { LegendarySummonRemark, SummonRemarksMap } from "$lib/types/summons";
import { loadCsv } from "$lib/utils/loadfile";

const legendaryFilePath = "legendary_summon_remarks.csv";

export async function load({ fetch }: LoadEvent): Promise<{
  summonRemarksMap: SummonRemarksMap;
}> {
  const legendarySummonRemarks = (await loadCsv(fetch, legendaryFilePath)) as LegendarySummonRemark[];

  const summonRemarksMap = legendarySummonRemarks.reduce((acc, remark) => {
    if (!acc[remark.duelist]) {
      acc[remark.duelist] = [];
    }
    acc[remark.duelist].push({ monster: remark.monster, summonType: remark.summonType, text: remark.text });
    return acc;
  }, {} as SummonRemarksMap);

  return { summonRemarksMap };
}

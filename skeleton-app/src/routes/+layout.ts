import type { LoadEvent } from "@sveltejs/kit";
import type { LegendarySummonRemark, SummonRemarksMap } from "$lib/types/summons";
import getHeartbeat from "$lib/api/getHeartbeat";
import { loadCsv } from "$lib/utils/loadfile";

const legendaryFilePath = "legendary_summon_remarks.csv";

export async function load({ fetch }: LoadEvent): Promise<{
  summonRemarksMap: SummonRemarksMap;
}> {
  const res = await getHeartbeat(fetch);
  console.log("Functions Health Check:", res);

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

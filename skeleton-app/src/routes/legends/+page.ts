import type { LoadEvent } from "@sveltejs/kit";
import type { SummonRemarksMap } from "$lib/types/summons";

export async function load({ parent }: LoadEvent): Promise<{ SummonRemarksMap: SummonRemarksMap }> {
  const parentData = await parent();
  return { SummonRemarksMap: parentData.SummonRemarksMap };
}

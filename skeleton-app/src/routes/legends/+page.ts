import type { LoadEvent } from "@sveltejs/kit";
import type { SynchroSpellsMap } from "$lib/types/spells";

export async function load({ parent }: LoadEvent): Promise<{ synchroSpellsMap: SynchroSpellsMap }> {
  const parentData = await parent();
  return { synchroSpellsMap: parentData.synchroSpellsMap };
}

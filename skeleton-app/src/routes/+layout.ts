import type { LoadEvent } from "@sveltejs/kit";
import type { LegendarySynchroSpell, SynchroSpellsMap } from "$lib/types/spells";
import { loadCsv } from "$lib/utils/loadfile";

const legendaryFilePath = "legendary_synchro_spells.csv";

export async function load({ fetch }: LoadEvent): Promise<{
  synchroSpellsMap: SynchroSpellsMap;
}> {
  const legendarySynchroSpells = (await loadCsv(fetch, legendaryFilePath)) as LegendarySynchroSpell[];

  const synchroSpellsMap = legendarySynchroSpells.reduce((acc, spell) => {
    if (!acc[spell.duelist]) {
      acc[spell.duelist] = [];
    }
    acc[spell.duelist].push({ monster: spell.monster, spellText: spell.spellText });
    return acc;
  }, {} as SynchroSpellsMap);

  return { synchroSpellsMap };
}

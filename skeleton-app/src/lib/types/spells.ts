export interface SynchroSpell {
  monster: string;
  spellText: string;
}

export interface LegendarySynchroSpell extends SynchroSpell {
  duelist: string;
}

export type SynchroSpellsMap = Record<string, SynchroSpell[]>;

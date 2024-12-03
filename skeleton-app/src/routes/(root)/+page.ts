import type { TransitionContent, TransitionButtonConfig } from "$lib/utils/transitions";
import { generateButtonConfigs } from "$lib/utils/transitions";
import { GITHUB_REPO_URL } from "$lib/constants/common";

const contentLinks: TransitionContent[] = [
  {
    label: "Synchro Spell Generator",
    symbolSrc: { type: "icon", key: "mdi:star-circle" },
    action: "navigate",
    target: "/generator",
  },
  {
    label: "Legendary Synchro Spells",
    symbolSrc: { type: "icon", key: "mdi:star-circle" },
    action: "navigate",
    target: "/legends",
  },
  {
    label: "Github Repository",
    symbolSrc: { type: "icon", key: "mdi:source-repository" },
    action: "redirectNewTab",
    target: GITHUB_REPO_URL,
  },
];

export async function load(): Promise<{ buttonConfigs: TransitionButtonConfig[] }> {
  const buttonConfigs = generateButtonConfigs(contentLinks);

  return { buttonConfigs };
}

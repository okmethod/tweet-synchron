import type { TransitionContent, TransitionButtonConfig } from "$lib/utils/transitions";
import { generateButtonConfigs } from "$lib/utils/transitions";
import { GITHUB_REPO_URL } from "$lib/constants/common";

const contentLinks: TransitionContent[] = [
  {
    label: "Synchro Spell Generator",
    symbolSrc: { type: "icon", key: "mdi:page-next" },
    action: "navigate",
    target: "/generator",
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

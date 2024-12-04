import type { TransitionContent, TransitionButtonConfig } from "$lib/utils/transitions";
import { generateButtonConfigs } from "$lib/utils/transitions";
import { GITHUB_REPO_URL } from "$lib/constants/common";

const contentLinks: TransitionContent[] = [
  {
    label: "Summon Remark Generator",
    symbolSrc: { type: "icon", key: "mdi:star-circle" },
    action: "navigate",
    target: "/generator",
  },
  {
    label: "Legendary Summon Remarks",
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

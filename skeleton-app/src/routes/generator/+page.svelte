<script lang="ts">
  import type { ModalComponent, ModalStore } from "@skeletonlabs/skeleton";
  import { getModalStore, type ModalSettings } from "@skeletonlabs/skeleton";
  import { ProgressBar } from "@skeletonlabs/skeleton";
  import { fetchText } from "$lib/genlang/generateContent";
  import { summonTypes, type SummonType } from "$lib/types/summons";
  import { redirectTweetByNewTab } from "$lib/utils/tweet";
  import SubmitModal from "$lib/components/modals/SubmitModal.svelte";
  import IconButton from "$lib/components/IconButton.svelte";

  // TODO: プロンプトを調整する
  const prompt = (input: string) =>
    `あなたは歴戦のプロデュエリスト(決闘者)です。
    あなたのエースモンスターである《${input}》を${currentSummonType}する際の、最高に盛り上がる口上を考えてください。
    出力テキストは口上だけになるようにしてください。htmlタグは使わないでください。`;

  let currentSummonType: SummonType = "シンクロ召喚";

  let inputText = "";
  let hashTag = "";
  let generatedText = "";
  let isLoading = false;
  async function generateSummonRemark(): Promise<void> {
    isLoading = true;
    hashTag = inputText;
    generatedText = (await fetchText(prompt(inputText))) ?? "Failed to generate.";
    isLoading = false;
  }

  const outputText = (text: string, hashTag: string) => `
${text}
#${hashTag}
`;
  const modalStore = getModalStore();
  function showTweetSubmitModal(modalStore: ModalStore): void {
    if (!generatedText) {
      return;
    }
    const tweetText = outputText(generatedText, hashTag);
    const modalComponent: ModalComponent = {
      ref: SubmitModal,
      props: { title: "Tweet this ?" },
      slot: tweetText,
    };
    const modal: ModalSettings = {
      type: "component",
      component: modalComponent,
      response: (isConfirm: boolean) => {
        if (isConfirm) {
          redirectTweetByNewTab(tweetText);
        }
      },
      backdropClasses: "fixed inset-0 !bg-gray-300/90",
    };
    modalStore.trigger(modal);
  }
</script>

<div class="cRouteBodyStyle">
  <div class="cTitlePartStyle">
    <h1 class="cTitleStyle">Summon Remark Generator</h1>
  </div>

  <div class="cContentPartStyle">
    <input type="text" bind:value={inputText} placeholder="Input name here" class="w-full" />
    <div class="w-full flex space-x-2">
      <select class="w-full" bind:value={currentSummonType}>
        {#each summonTypes as type}
          <option value={type}>{type}</option>
        {/each}
      </select>
      <button
        type="button"
        on:click={generateSummonRemark}
        class="btn variant-filled"
        disabled={isLoading || inputText == ""}
      >
        Summon
      </button>
    </div>
    <ProgressBar value={isLoading ? undefined : generatedText == "" ? 0 : 100} />
    <p class="w-96 h-60 bg-white border border-gray-500 p-4">{generatedText}</p>
    <IconButton icon="mdi:bird" label="Tweet ot @tweet_synchron" onClick={() => showTweetSubmitModal(modalStore)} />
  </div>
</div>

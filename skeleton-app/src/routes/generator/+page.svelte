<script lang="ts">
  import type { ModalComponent, ModalStore } from "@skeletonlabs/skeleton";
  import { getModalStore, type ModalSettings } from "@skeletonlabs/skeleton";
  // import { getToastStore, type ToastSettings } from "@skeletonlabs/skeleton";
  import { ProgressBar } from "@skeletonlabs/skeleton";
  import { page } from "$app/stores";
  import { summonTypes, type SummonType } from "$lib/types/summons";
  import getFetchCardInfo from "$lib/api/fetchCardInfo";
  import postGenText from "$lib/api/postGenText";
  // import postPostTweet from "$lib/api/postPostTweet";
  import { redirectTweetByNewTab } from "$lib/utils/tweet";
  import SubmitModal from "$lib/components/modals/SubmitModal.svelte";
  import IconButton from "$lib/components/IconButton.svelte";
  import type { PromptEmbedment } from "./+page";

  export let data: {
    promptTemplate: string;
    promptEmbedment: PromptEmbedment;
  };

  let inputText = "";
  let currentSummonType: SummonType = "シンクロ召喚";
  $: {
    const params = new URLSearchParams($page.url.search);
    inputText = params.get("name") ?? "";
  }

  let hashTag = "";
  let generatedText = "";
  let isLoading = false;
  async function generateSummonRemark(): Promise<void> {
    isLoading = true;
    hashTag = inputText;
    const cardInfo = await getFetchCardInfo(window.fetch, inputText);
    console.log("Card Info:", cardInfo);
    const prompt = data.promptTemplate + data.promptEmbedment(inputText, currentSummonType, cardInfo);
    console.log("Prompt:", prompt);
    const { content } = await postGenText(window.fetch, prompt);
    generatedText = content ?? "Failed to generate.";
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
      response: async (isConfirm: boolean) => {
        if (isConfirm) {
          redirectTweetByNewTab(tweetText);
          /*
          const tweetId = await postPostTweet(window.fetch, tweetText);
          if (tweetId) {
            showToast(`Tweeted successfully. Tweet ID: ${tweetId}`, "bg-green-100 text-black");
          } else {
            showToast("Failed to tweet.", "bg-red-100 text-black");
          }
          */
        }
      },
      backdropClasses: "fixed inset-0 !bg-gray-300/90",
    };
    modalStore.trigger(modal);
  }

  /*
  const toastStore = getToastStore();
  function showToast(message: string, cStyle: string): void {
    const toast: ToastSettings = {
      message,
      background: `${cStyle} select-none`,
      timeout: 3000,
    };
    toastStore.trigger(toast);
  }
  */
</script>

<div class="cRouteBodyStyle">
  <div class="cTitlePartStyle">
    <h1 class="cTitleStyle">Summon Remark Generator</h1>
  </div>

  <div class="cContentPartStyle">
    <input type="text" id="inputText" bind:value={inputText} placeholder="Input name here" class="w-full" />
    <div class="w-full flex space-x-2">
      <select id="selectSummonType" bind:value={currentSummonType} class="w-full">
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
    <textarea class="w-80 sm:w-96 h-60 bg-white border border-gray-500 p-4">{generatedText}</textarea>
    <IconButton
      icon="mdi:bird"
      label="Tweet on @your_account"
      onClick={() => showTweetSubmitModal(modalStore)}
      disabled={generatedText === ""}
    />
  </div>
</div>

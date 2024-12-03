<script lang="ts">
  import type { ModalComponent, ModalStore } from "@skeletonlabs/skeleton";
  import { getModalStore, type ModalSettings } from "@skeletonlabs/skeleton";
  import { fetchText } from "$lib/genlang/generateContent";
  import SubmitModal from "$lib/components/modals/SubmitModal.svelte";
  import IconButton from "$lib/components/IconButton.svelte";

  // TODO: プロンプトを調整する
  const prompt = (input: string) =>
    `${input} をシンクロ召喚する際の口上を考えてください。出力テキストは、シンクロ口上だけになるようにしてください。`;

  let inputText = "";
  let generatedText = "";
  async function generateSynchroSpell(): Promise<void> {
    generatedText = (await fetchText(prompt(inputText))) ?? "Failed to generate.";
  }

  const outputText = (text: string, hashTag: string) => `${text}
  #${hashTag}`;
  const modalStore = getModalStore();
  function showTweetSubmitModal(modalStore: ModalStore): void {
    const modalComponent: ModalComponent = {
      ref: SubmitModal,
      props: { title: "Tweet this spell?" },
      slot: outputText(generatedText, inputText),
    };
    const modal: ModalSettings = {
      type: "component",
      component: modalComponent,
      response: (isConfirm: boolean) => {
        if (isConfirm) {
          console.log("OK button clicked.");
        }
      },
      backdropClasses: "fixed inset-0 !bg-gray-300/90",
    };
    modalStore.trigger(modal);
  }
</script>

<div class="cRouteBodyStyle">
  <div class="cTitlePartStyle">
    <h1 class="cTitleStyle">Synchro Spell Generator</h1>
  </div>

  <div class="cContentPartStyle">
    <div class="w-full flex space-x-2">
      <input type="text" bind:value={inputText} placeholder="Input tuned materials." class="w-full" />
      <button type="button" on:click={generateSynchroSpell} class="btn variant-filled"> Summon </button>
    </div>
    <p class="w-96 h-80 bg-white border border-gray-500 p-4">{generatedText}</p>
    <IconButton icon="mdi:bird" label="Tweet ot @tweet_synchron" onClick={() => showTweetSubmitModal(modalStore)} />
  </div>
</div>

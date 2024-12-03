<script lang="ts">
  import type { ModalComponent, ModalStore } from "@skeletonlabs/skeleton";
  import { getModalStore, type ModalSettings } from "@skeletonlabs/skeleton";
  import SubmitModal from "$lib/components/modals/SubmitModal.svelte";
  import IconButton from "$lib/components/IconButton.svelte";

  const modalStore = getModalStore();
  function showSampleSubmitModal(modalStore: ModalStore): void {
    const modalComponent: ModalComponent = {
      ref: SubmitModal,
      props: { title: "Sample Modal" },
      slot: "Output Log?",
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
    <h1 class="cTitleStyle">Example route</h1>
  </div>

  <div class="cContentPartStyle">
    <IconButton icon="mdi:alert" label="Show Sample Modal" onClick={() => showSampleSubmitModal(modalStore)} />
    {#each Array.from({ length: 100 }, (_, i) => i) as line}
      <p>line {line}</p>
    {/each}
  </div>
</div>

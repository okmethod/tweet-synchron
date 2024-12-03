<script lang="ts">
  import "../app.postcss";
  import { onMount } from "svelte";
  import { Toast, Modal, initializeStores } from "@skeletonlabs/skeleton";
  import { storePopup } from "@skeletonlabs/skeleton";
  import { getModalStore, type ModalSettings } from "@skeletonlabs/skeleton";
  import { computePosition, autoUpdate, flip, shift, offset, arrow } from "@floating-ui/dom";
  import { applyTheme } from "$lib/stores/theme";
  import ThemeSwitchModal from "$lib/components/modals/ThemeSwitchModal.svelte";
  import IconButton from "$lib/components/IconButton.svelte";
  import { navigateTo } from "$lib/utils/navigation.client";

  initializeStores();
  storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

  let isLoaded = false;
  onMount(async () => {
    function wait(ms: number) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    await Promise.all([applyTheme(), wait(500)]);
    isLoaded = true;
  });

  const modalStore = getModalStore();
  function showThemeSwitchModal(): void {
    const m: ModalSettings = {
      type: "component",
      component: {
        ref: ThemeSwitchModal,
        props: {},
      },
      backdropClasses: "fixed inset-0 !bg-gray-300/90",
    };
    modalStore.trigger(m);
  }

  const cHeaderButton = "!space-x-0 !py-1 !px-2";
</script>

<svelte:head>
  <title>My Static WebSite</title>
</svelte:head>

<Modal />
<Toast position="tr" rounded="rounded-lg" />

{#if isLoaded}
  <div class="h-screen flex flex-col">
    <div class="relative border-b border-gray-400 bg-gray-100 p-1">
      <div class="h-full flex items-center justify-between">
        <IconButton icon="mdi:home-outline" label="Home" cButton={cHeaderButton} onClick={() => navigateTo("/")} />
        <div class="flex-grow"><!--spacer--></div>
        <IconButton icon="mdi:menu" label="Theme" cButton={cHeaderButton} onClick={showThemeSwitchModal} />
      </div>
    </div>

    <div class="w-screen mx-auto overflow-y-scroll scrollbar-gutter-stable sm:ml-2 pb-24">
      <slot />
    </div>
  </div>
{:else}
  <div class="h-screen flex items-center justify-center bg-gray-100">
    <div class="font-mono text-black text-2xl">Now Loading...</div>
  </div>
{/if}

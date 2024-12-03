<script lang="ts">
  import "../app.postcss";
  import { onMount } from "svelte";
  import { Toast, Modal, initializeStores } from "@skeletonlabs/skeleton";
  import { storePopup } from "@skeletonlabs/skeleton";
  import { computePosition, autoUpdate, flip, shift, offset, arrow } from "@floating-ui/dom";
  import { goto } from "$app/navigation";
  import IconButton from "$lib/components/IconButton.svelte";

  initializeStores();
  storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

  let isLoaded = false;
  onMount(async () => {
    isLoaded = true;
  });

  const cHeaderButton = "!space-x-0 !py-1 !px-2";
</script>

<svelte:head>
  <title>Tweet Synchron</title>
</svelte:head>

<Modal />
<Toast position="tr" rounded="rounded-lg" />

{#if isLoaded}
  <div class="h-screen flex flex-col">
    <div class="relative border-b border-gray-400 bg-gray-100 p-1">
      <div class="h-full flex items-center justify-between">
        <IconButton icon="mdi:home-outline" label="Home" cButton={cHeaderButton} onClick={() => goto("/")} />
        <div class="flex-grow"><!--spacer--></div>
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

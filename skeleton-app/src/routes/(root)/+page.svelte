<script lang="ts">
  import { isImageConfig, isIconConfig, type TransitionButtonConfig } from "$lib/utils/transitions";
  import Icon from "@iconify/svelte";

  export let data: {
    buttonConfigs: Array<TransitionButtonConfig>;
  };
</script>

<div class="cRouteBodyStyle">
  <div class="cTitlePartStyle">
    <h1 class="cTitleStyle">Welcome to My Static Site !</h1>
  </div>

  <div class="cContentPartStyle">
    <div class="space-y-4">
      {#each data.buttonConfigs as config}
        <div class="">
          <button on:click|preventDefault={config.onClick} class="flex items-center">
            <div class="w-6 h-6 mr-2">
              {#if config.symbol === null}
                <!-- no symbol -->
              {:else if isImageConfig(config.symbol)}
                <img src={config.symbol.src} alt={config.symbol.alt} class="w-full h-full" />
              {:else if isIconConfig(config.symbol)}
                <Icon icon={config.symbol.icon} class="w-full h-full" />
              {/if}
            </div>
            <span class="hover:underline text-lg md:text-2xl">{config.label}</span>
          </button>
        </div>
      {/each}
    </div>
  </div>
</div>

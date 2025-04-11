<script lang="ts">
  import { ProgressBar } from "@skeletonlabs/skeleton";
  import { monsterTypes } from "$lib/types/cards";
  import getFetchCardList from "$lib/api/getFetchCardList";

  let currentMonsterType = "";

  let isLoading = false;
  let cardList: string[] = [];
  async function fetchCardList() {
    if (!currentMonsterType) return;
    isLoading = true;
    try {
      const response = await getFetchCardList(window.fetch, currentMonsterType);
      cardList = response.cardList || [];
    } catch (error) {
      console.error("Failed to fetch card list:", error);
      cardList = [];
    } finally {
      isLoading = false;
    }
  }
</script>

<div class="cRouteBodyStyle">
  <div class="cTitlePartStyle">
    <h1 class="cTitleStyle">Card Info Extractor</h1>
  </div>

  <div class="cContentPartStyle">
    <div class="w-full flex space-x-2">
      <select
        id="selectMonsterType"
        bind:value={currentMonsterType}
        class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="" disabled selected>Select Type</option>
        {#each monsterTypes as type}
          <option value={type}>{type}</option>
        {/each}
      </select>
      <button
        type="button"
        on:click={fetchCardList}
        class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-300"
        disabled={isLoading || currentMonsterType === ""}
      >
        {isLoading ? "Loading..." : "Fetch Cards"}
      </button>
    </div>
    <ProgressBar value={isLoading ? undefined : cardList.length == 0 ? 0 : 100} />
    <textarea class="w-80 sm:w-96 h-60 bg-white border border-gray-500 p-4">{cardList}</textarea>
  </div>
</div>

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

  let selectedCard: string | null = null;
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

    <p class="mt-2 text-gray-700">
      {cardList.length > 0 ? `Found ${cardList.length} cards` : isLoading ? "Loading cards..." : "No cards found"}
    </p>

    <ul class="h-80 w-96 bg-white border border-gray-300 rounded-md divide-y divide-gray-200 mt-4 overflow-y-auto">
      {#each cardList as card}
        <li class="flex items-center p-2">
          <input type="radio" id={card} name="cardList" value={card} bind:group={selectedCard} class="mr-2" />
          <label for={card} class="text-gray-700">{card}</label>
        </li>
      {/each}
    </ul>

    {#if selectedCard}
      <p class="mt-4 text-gray-700">Selected Card: {selectedCard}</p>
    {/if}
  </div>
</div>

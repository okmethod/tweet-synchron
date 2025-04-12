<script lang="ts">
  import { ProgressBar } from "@skeletonlabs/skeleton";
  import { monsterTypes, type CardInfo } from "$lib/types/cards";
  import getFetchCardList from "$lib/api/getFetchCardList";
  import getFetchCardInfo from "$lib/api/getFetchCardInfo";

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
  let selectedCardInfo: CardInfo | null = null;
  async function fetchCardInfo(cardName: string) {
    try {
      const response = await getFetchCardInfo(window.fetch, cardName);
      selectedCardInfo = response || null;
    } catch (error) {
      console.error("Failed to fetch card info:", error);
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

    <p class="mt-2 text-gray-700">
      {cardList.length > 0 ? `Found ${cardList.length} cards` : isLoading ? "Loading cards..." : "No cards found"}
    </p>

    <ul class="h-80 w-96 bg-white border border-gray-300 rounded-md divide-y divide-gray-200 mt-4 overflow-y-auto">
      {#each cardList as cardName}
        <li class="flex items-center p-2">
          <input
            type="radio"
            id={cardName}
            name="cardList"
            value={cardName}
            bind:group={selectedCard}
            on:change={() => fetchCardInfo(cardName)}
            class="mr-2"
          />
          <label for={cardName} class="text-gray-700">{cardName}</label>
        </li>
      {/each}
    </ul>

    <div class="mt-4">
      {#if selectedCardInfo}
        <div class="flex flex-col items-center space-y-2">
          <p class="text-gray-700">《{selectedCardInfo.names.fullName}》</p>
          <pre class="bg-gray-100 text-xs p-4 rounded-md">{selectedCardInfo.cardTexts[0]}</pre>
          <pre class="bg-gray-100 text-xs p-4 rounded-md">{selectedCardInfo.storyDescription}</pre>
        </div>
      {:else if selectedCard}
        <p class="text-gray-700">Fetching card info...</p>
      {/if}
    </div>
  </div>
</div>

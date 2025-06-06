<script lang="ts">
  import { ProgressBar } from "@skeletonlabs/skeleton";
  import { monsterTypes, type UnifiedCardInfo } from "$lib/types/cards";
  import getFetchCardList from "$lib/api/ygowiki/getFetchCardList";
  import getFetchCardInfo from "$lib/api/fetchCardInfo";

  let currentMonsterType = "";

  let isLoading = false;
  let jaNames: string[] = [];
  async function fetchCardList() {
    if (!currentMonsterType) return;
    isLoading = true;
    try {
      const response = await getFetchCardList(window.fetch, currentMonsterType);
      jaNames = response.jaNames || [];
    } catch (error) {
      console.error("Failed to fetch card list:", error);
      jaNames = [];
    } finally {
      isLoading = false;
    }
  }

  let selectedCard: string | null = null;
  let selectedCardInfo: UnifiedCardInfo | null = null;
  async function fetchCardInfo(cardName: string) {
    selectedCardInfo = await getFetchCardInfo(window.fetch, cardName);
    console.log("Card Info:", selectedCardInfo);
  }

  function navigateToGenerator() {
    if (selectedCard) {
      window.location.href = `/generator?name=${encodeURIComponent(selectedCard)}`;
    }
  }
</script>

<div class="cRouteBodyStyle">
  <div class="cTitlePartStyle">
    <h1 class="cTitleStyle">Card Info Extractor</h1>
  </div>

  <div class="cContentPartStyle">
    <div class="w-full max-w-96 flex space-x-2">
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
        class="w-full max-w-96 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-300"
        disabled={isLoading || currentMonsterType === ""}
      >
        {isLoading ? "Loading..." : "Fetch Cards"}
      </button>
    </div>

    <ProgressBar value={isLoading ? undefined : jaNames.length == 0 ? 0 : 100} />

    <p class="mt-2 text-gray-700">
      {jaNames.length > 0 ? `Found ${jaNames.length} cards` : isLoading ? "Loading cards..." : "No cards found"}
    </p>

    <ul class="h-80 w-96 bg-white border border-gray-300 rounded-md divide-y divide-gray-200 mt-4 overflow-y-auto">
      {#each jaNames as jaName}
        <li class="flex items-center p-2">
          <input
            type="radio"
            id={jaName}
            name="cardList"
            value={jaName}
            bind:group={selectedCard}
            on:change={() => fetchCardInfo(jaName)}
            class="mr-2"
          />
          <label for={jaName} class="text-gray-700">《{jaName}》</label>
        </li>
      {/each}
    </ul>

    <div class="mt-4">
      {#if selectedCardInfo}
        <div class="flex flex-col items-center space-y-2">
          <p class="text-gray-700">《{selectedCardInfo.names.fullName}》</p>
          <img
            src={selectedCardInfo.cardImages ? selectedCardInfo.cardImages[0].image_url : ""}
            alt={selectedCardInfo.names.fullName}
            class="w-64 h-auto rounded-md border border-gray-300"
          />
          <pre class="bg-gray-100 text-xs p-4 rounded-md">{selectedCardInfo.cardTexts[0]}</pre>
          <pre class="bg-gray-100 text-xs p-4 rounded-md">{selectedCardInfo.storyDescription}</pre>
          <a href={selectedCardInfo.wikiUrl} target="_blank" class="text-blue-500 hover:underline">
            View on YGO Wiki
          </a>
          <button
            type="button"
            on:click={navigateToGenerator}
            class="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-300"
            disabled={!selectedCard}
          >
            Go to Generator
          </button>
        </div>
      {:else if selectedCard}
        <p class="text-gray-700">Fetching card info...</p>
      {/if}
    </div>
  </div>
</div>

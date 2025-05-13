<script lang="ts">
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import getFetchCardInfo from "$lib/api/fetchCardInfo";
  import type { UnifiedCardInfo } from "$lib/types/cards";
  import { Accordion, AccordionItem } from "@skeletonlabs/skeleton";

  const synchronNames = [
    "アンノウン・シンクロン",
    "サイバース・シンクロン",
    "ジェット・シンクロン",
    "ターボ・シンクロン",
    "チェンジ・シンクロン",
    "モノ・シンクロン",
    "ヴァレット・シンクロン",
    "アサルト・シンクロン",
    "ＥＭオッドアイズ・シンクロン",
    "サテライト・シンクロン",
    "ニトロ・シンクロン",
    "ネクロ・シンクロン",
    "フルール・シンクロン",
    "ジャンク・シンクロン",
    "スチーム・シンクロン",
    "ドリル・シンクロン",
    "レボリューション・シンクロン",
    "スターダスト・シンクロン",
    "ハイパー・シンクロン",
    "ブライ・シンクロン",
    "ロード・シンクロン",
    "クイック・シンクロン",
    "ＳＲウィング・シンクロン",
    "ホイール・シンクロン",
    "シンクロン・エクスプローラー",
    "シンクロン・キャリアー",
    "フォーミュラ・シンクロン",
    "アクセル・シンクロン",
  ];

  let cardInfos: UnifiedCardInfo[] = [];
  let isLoading = false;

  async function fetchAllCardInfos() {
    isLoading = true;
    cardInfos = [];
    try {
      const fetchedInfos = await Promise.all(
        synchronNames.map(async (cardName) => {
          try {
            return await getFetchCardInfo(window.fetch, cardName);
          } catch (error) {
            console.error(`Failed to fetch card info for ${cardName}:`, error);
            return null;
          }
        }),
      );
      cardInfos = fetchedInfos.filter((info) => info !== null);
    } catch (error) {
      console.error("Failed to fetch card info:", error);
    } finally {
      isLoading = false;
    }
  }

  onMount(() => {
    fetchAllCardInfos();
  });
</script>

<div class="cRouteBodyStyle">
  <div class="cTitlePartStyle">
    <h1 class="cTitleStyle">Synchrons Explorer</h1>
  </div>

  {#if isLoading}
    <p>Loading card information...</p>
  {:else if cardInfos.length > 0}
    <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {#each cardInfos as cardInfo}
        <li class="border p-4 rounded-md shadow-md">
          <h2 class="font-bold text-lg">《{cardInfo.names.jaName}》</h2>
          <img
            src={cardInfo.cardImages ? cardInfo.cardImages[0].image_url_cropped : ""}
            alt={cardInfo.names.fullName}
            class="w-full h-auto rounded-md border border-gray-300"
          />
          <Accordion>
            <AccordionItem>
              <svelte:fragment slot="lead">
                <Icon icon="mdi:cards-outline" class="w-full h-full" />
              </svelte:fragment>
              <svelte:fragment slot="summary">Card Text</svelte:fragment>
              <svelte:fragment slot="content">
                <pre class="bg-gray-100 text-xs p-4 rounded-md whitespace-pre-wrap">{cardInfo.cardTexts[0]}</pre>
                <a href={cardInfo.wikiUrl} target="_blank" class="text-blue-500 hover:underline mt-2 block">
                  View on YGO Wiki
                </a>
              </svelte:fragment>
            </AccordionItem>
          </Accordion>
        </li>
      {/each}
    </ul>
  {:else}
    <p>No card information found.</p>
  {/if}
</div>

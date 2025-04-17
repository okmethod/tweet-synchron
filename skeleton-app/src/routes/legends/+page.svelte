<script lang="ts">
  import type { SummonRemarksMap } from "$lib/types/summons";

  export let data: {
    summonRemarksMap: SummonRemarksMap;
  };

  const cDivStyle = "w-full flex flex-col space-y-4";
  const cDuelistNameStyle = "text-xl bold underline";
  const cListStyle = "list-disc space-y-2";
</script>

<div class="cRouteBodyStyle">
  <div class="cTitlePartStyle">
    <h1 class="cTitleStyle">Legendary Summon Remarks</h1>
  </div>

  <div class="cContentPartStyle !space-y-6 !px-6">
    {#each Object.entries(data.summonRemarksMap) as [duelist, remarks]}
      <div class={cDivStyle}>
        <h2 class={cDuelistNameStyle}>《{duelist}》</h2>
        <ul class={cListStyle}>
          {#each remarks as remark}
            <li>{remark.text}</li>
          {/each}
        </ul>
      </div>
    {/each}
  </div>
</div>

<script lang="ts">
  import type { SynchroSpellsMap } from "$lib/types/spells";

  export let data: {
    synchroSpellsMap: SynchroSpellsMap;
  };

  const cDivStyle = "w-full flex flex-col space-y-4";
  const cDuelistNameStyle = "text-xl bold underline";
  const cListStyle = "list-disc space-y-2";
</script>

<div class="cRouteBodyStyle">
  <div class="cTitlePartStyle">
    <h1 class="cTitleStyle">Legendary Synchro Spells</h1>
  </div>

  <div class="cContentPartStyle !space-y-6">
    {#each Object.entries(data.synchroSpellsMap) as [duelist, spells]}
      <div class={cDivStyle}>
        <h2 class={cDuelistNameStyle}>{duelist}</h2>
        <ul class={cListStyle}>
          {#each spells as spell}
            <li>{spell.spellText}</li>
          {/each}
        </ul>
      </div>
    {/each}
  </div>
</div>

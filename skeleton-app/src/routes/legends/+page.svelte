<script lang="ts">
  let spells_by_yuse = ["hoge", "fuga", "piyo"];
  let spells_by_jack = ["hoge", "fuga", "piyo"];

  const cDivStyle = "w-full flex flex-col items-center space-y-4";
  const cDuelistNameStyle = "text-xl bold underline";
  const cListStyle = "list-disc space-y-2";
</script>

<div class="cRouteBodyStyle">
  <div class="cTitlePartStyle">
    <h1 class="cTitleStyle">Legendary Synchro Spells</h1>
  </div>

  <div class="cContentPartStyle !space-y-6">
    <div class={cDivStyle}>
      <h2 class={cDuelistNameStyle}>不動 遊星</h2>
      <ul class={cListStyle}>
        {#each spells_by_yuse as spell}
          <li>{spell}</li>
        {/each}
      </ul>
    </div>
    <div class={cDivStyle}>
      <h2 class={cDuelistNameStyle}>ジャック・アトラス</h2>
      <ul class={cListStyle}>
        {#each spells_by_jack as spell}
          <li>{spell}</li>
        {/each}
      </ul>
    </div>
  </div>
</div>

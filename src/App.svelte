<script lang="ts">
  import List from "./components/data/list/List.svelte";
  import {readable, writable} from './stores/local-storage';
  import type {IList} from './model/list';
  import {defaultList} from './data/list';
  import CircleProgress from "./components/control/CircleProgress.svelte";

  const currentlyUsedList = defaultList;

  const data = writable<IList>(`list.${currentlyUsedList.key}`, defaultList);

  $: items = $data.groups.reduce((prev, curr) => [...prev, ...curr.items], []);
  $: relevantItems = items.filter(item => !item.irrelevant);
  $: doneItems = relevantItems.filter(item => item.state);
</script>

<style type="text/scss">
  $headerHeight: 50px;
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 5px;
    background: black;
    color: white;
    height: $headerHeight;
    z-index: 1000;

    .container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }

    &__title {
      flex: 1;
      margin: 0;

    }

    &__progress {
      font-size: 15px;
      line-height: 40px;
      padding-right: 10px;
    }
    &__progress-circle {
      width: 44px;
      height: 44px;
      font-size: 15px;
      margin-top: -2px;
      margin-bottom: -2px;
    }
  }

  .container {
    max-width: 1000px;
    margin: auto;
    padding-left: 10px;
    padding-right: 10px;
  }

  main {
    padding-top: $headerHeight;
  }
</style>

<header class="header">
    <div class="container">
        <h1 class="header__title">
            Packliste
        </h1>
        <div class="header__progress">
            {doneItems.length} / {relevantItems.length}
        </div>
        <div class="header__progress-circle">
            <CircleProgress percentage="{(doneItems.length / relevantItems.length) * 100}"/>
        </div>
    </div>
</header>
<main class="container">
    <List list="{data}"/>
</main>

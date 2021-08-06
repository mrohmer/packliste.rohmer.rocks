<script lang="ts">
  import List from "./components/data/list/List.svelte";
  import {readable, writable} from './stores/local-storage';
  import type {IList} from './model/list';
  import {defaultList} from './data/list';
  import BottomSheet from "./components/data/BottomSheet.svelte";
  import PoweredBy from "./components/PoweredBy.svelte";

  const currentlyUsedList = defaultList;

  const data = writable<IList>(`list.${currentlyUsedList.key}`, defaultList);
</script>

<style type="text/scss">
    main {
      padding-bottom: 50px;
    }
</style>

<svelte:head>
    <title>Packliste</title>
    <meta name="description" content="Digitale Packliste.">
    <meta name="robots" content="noindex nofollow" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
</svelte:head>

<main class="container">
    <List list="{data}"/>
    <PoweredBy />
</main>
<BottomSheet list="{data}" />

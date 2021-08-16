<script lang="ts">
  import List from "./components/data/list/List.svelte";
  import {readable, writable} from './stores/local-storage';
  import type {IList} from './model/list';
  import {defaultList} from './data/list';
  import BottomSheet from "./components/data/BottomSheet.svelte";
  import {PoweredBy} from "@rohmer/svelte-base";

  const currentlyUsedList = defaultList;
  const name = 'Matthias Rohmer';
  const url = 'https://matthias.rohmer.rocks';
  const technologies = ['svelte', 'netlify'];
  const sourceCodeUrl = 'https://github.com/mrohmer/packing.rohmer.rocks';

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
    <meta name="theme-color" content="#4F29F0" />
    <link rel="manifest" href="manifest.json" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-title" content="Packliste" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />

    <script>
      if ('navigator' in window) {
        navigator.serviceWorker.register("/sw.js");
      }
    </script>
</svelte:head>

<main class="container">
    <List list="{data}"/>
    <PoweredBy {name} {url} {technologies} {sourceCodeUrl} />
</main>
<BottomSheet list="{data}" />

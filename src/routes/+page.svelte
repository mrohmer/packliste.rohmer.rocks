<script lang="ts">
  import List from "$lib/components/data/list/List.svelte";
  import {readable, writable} from '$lib/stores/local-storage';
  import type {IList} from '$lib/model/list';
  import {defaultList} from '$lib/data/list';
  import BottomSheet from "$lib/components/data/BottomSheet.svelte";
  import PoweredBy from "@rohmer/svelte-base/PoweredBy.svelte";

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

<main class="container">
    <List list="{data}"/>
    <PoweredBy {name} {url} {technologies} {sourceCodeUrl} />
</main>
<BottomSheet list="{data}" />

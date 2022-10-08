<script lang="ts">
  import List from "$lib/components/data/list/List.svelte";
  import type {IList} from '$lib/model/list';
  import {defaultList} from '$lib/data/list';
  import BottomSheet from "$lib/components/data/BottomSheet.svelte";
  import PoweredBy from "@rohmer/svelte-base/PoweredBy.svelte";
  import {onMount} from 'svelte';

  const currentlyUsedList = defaultList;
  const name = 'Matthias Rohmer';
  const url = 'https://matthias.rohmer.rocks';
  const technologies = ['svelte', 'netlify'];
  const sourceCodeUrl = 'https://github.com/mrohmer/packing.rohmer.rocks';

  let mounted = false;

  onMount(() => (mounted = true));

</script>

<style type="text/scss">
  main {
    padding-bottom: 50px;
  }
</style>

<main class="pb-14 max-w-4xl mx-auto px-2.5">
    <List list="{defaultList}"/>
    <PoweredBy {name} {url} {technologies} {sourceCodeUrl} />
</main>
<BottomSheet list="{defaultList}" />

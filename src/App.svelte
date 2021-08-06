<script lang="ts">
  import List from "./components/data/list/List.svelte";
  import {readable, writable} from './stores/local-storage';
  import type {IList} from './model/list';
  import {defaultList} from './data/list';
  import BottomSheet from "./components/data/BottomSheet.svelte";

  const currentlyUsedList = defaultList;

  const data = writable<IList>(`list.${currentlyUsedList.key}`, defaultList);
</script>

<style type="text/scss">
    main {
      padding-bottom: 50px;
    }
</style>

<main class="container">
    <List list="{data}"/>
</main>
<BottomSheet list="{data}" />

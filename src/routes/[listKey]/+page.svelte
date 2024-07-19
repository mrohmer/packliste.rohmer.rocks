<script lang="ts">
  import List from "./_/components/List.svelte";
  import BottomSheet from "./_/components/BottomSheet.svelte";
  import type {PageData} from './$types';
  import Icon from "$lib/components/control/Icon.svelte";

  export let data: PageData;
</script>

{#if data}
    <div class="pt-8 pb-6 flex items-center">
        <a href="/" class="block py-3 px-5 -ml-2.5 mr-1.5">
            <Icon>chevron-left</Icon>
        </a>
        <h1 class="flex-1 text-2xl">{data.list.label}</h1>
    </div>

    <List list={data.list}></List>

    <BottomSheet list={data.list}></BottomSheet>
{:else}
    loading...
{/if}

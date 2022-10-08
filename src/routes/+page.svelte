<script lang="ts">
  import {onMount} from 'svelte';
  import {lists as listsObj} from "$lib/data/list/index.js";
  import type {Observable} from 'dexie';
  import type {IList} from '$lib/model/list';
  import {liveQuery} from 'dexie';
  import {db} from '$lib/db';
  import ListLink from "./components/ListLink.svelte";

  let mounted = false;
  onMount(() => (mounted = true));

  let lists: Observable<Record<'edited' | 'idle', IList[]>>;

  const isListEdited = async (listKey: string) => {
    const count = await db.items
      .where({listKey})
      .filter(({state, irrelevant}) => state || irrelevant)
      .count();
    return count > 0;
  }
  const getEditedLists = async () => {
    const promises = Object.keys(listsObj)
      .map(async key => (await isListEdited(key)) ? key : undefined);

    const results = await Promise.all(promises);
    return results
      .filter(i => !!i)
  }

  $: {
    if (mounted) {
      lists = liveQuery(async () => {
        const editedLists = await getEditedLists();
        return {
          edited: Object.entries(listsObj)
            .filter(([key]) => editedLists.includes(key))
            .map(([, value]) => value)
          ,
          idle: Object.entries(listsObj)
            .filter(([key]) => !editedLists.includes(key))
            .map(([, value]) => value),
        }
      })
    }
  }
</script>

{#if $lists}
    <div class="pt-20 flex justify-center items-center">
        <img class="block invert h-14 w-14" src="/icons/icon_100.png" alt="checkbox"/>
        <div class="pl-5">
            <div class="text-5xl font-extralight">Packliste</div>
        </div>
    </div>
    <div class="max-w-xl mx-auto mt-20">
        {#if $lists.edited.length}
            <div class="mb-5">
                {#if $lists.idle.length}
                    <h2 class="font-bold mb-2">Deine Listen</h2>
                {/if}

                {#each $lists.edited as list}
                    <ListLink {list} edited={true}/>
                {/each}
            </div>
        {/if}

        {#if $lists.idle.length}
            <div class="mb-5">
                {#if $lists.edited.length}
                    <h2 class="font-bold mb-2">Andere Listen</h2>
                {/if}

                {#each $lists.idle as list}
                    <ListLink {list}/>
                {/each}
            </div>
        {/if}
    </div>
{:else}
    loading...
{/if}


<script lang="ts">
  import {onMount} from 'svelte';
  import type {Observable} from 'dexie';
  import type {IList} from '$lib/model/list';
  import {liveQuery} from 'dexie';
  import {db} from '$lib/db';
  import ListLink from "./_/components/ListLink.svelte";
  import type {PageData} from './$types';
  import Header from "$lib/components/Header.svelte";

  export let data: PageData;

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
    const promises = data.lists.map(({key}) => key)
      .map(async key => (await isListEdited(key)) ? key : undefined);

    const results = await Promise.all(promises);
    return results
      .filter(i => !!i)
  }

  $: {
    if (mounted && data?.lists) {
      lists = liveQuery(async () => {
        const editedLists = await getEditedLists();
        return {
          edited: data.lists
            .filter(({key}) => editedLists.includes(key))
          ,
          idle: data.lists
            .filter(({key}) => !editedLists.includes(key)),
        }
      })
    }
  }

  $: edited = $lists?.edited ?? [];
  $: idle = $lists?.idle ?? data?.lists ?? [];
</script>

{#if data.lists}
    <Header />
    <div class="max-w-xl mx-auto mt-20">
        {#if edited.length}
            <div class="mb-5">
                {#if idle.length}
                    <h2 class="mb-2">Deine Listen</h2>
                {/if}

                {#each edited as list}
                    <ListLink {list} edited={true}/>
                {/each}
            </div>
        {/if}

        {#if idle.length}
            <div class="mb-5">
                {#if edited.length}
                    <h2 class="mb-2">Andere Listen</h2>
                {/if}

                {#each idle as list}
                    <ListLink {list}/>
                {/each}
            </div>
        {/if}
    </div>
{:else}
    loading...
{/if}


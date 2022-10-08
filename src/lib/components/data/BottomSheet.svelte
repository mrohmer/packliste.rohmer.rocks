<script lang="ts">
  import {slide} from 'svelte/transition';
  import type {IList} from '../../model/list';
  import CircleProgress from "../control/CircleProgress.svelte";
  import Icon from "../control/Icon.svelte";
  import Button from "../control/Button.svelte";
  import {db} from '../../db';
  import {onMount} from 'svelte';
  import type {Observable} from 'dexie';
  import {liveQuery} from 'dexie';

  export let list: IList;

  let menuOpen = false;

  const onResetStateClick = () =>
    db.items.where({listKey: list.key}).modify({state: false});
  const onResetAllClick = () =>
    db.items.where({listKey: list.key}).modify({state: false, irrelevant: false});

  let done: Observable<number>;
  let irrelevant: Observable<number>;
  let total: Observable<number>;
  let anyItemsChanged: Observable<boolean>;

  let mounted = false;
  onMount(() => (mounted = true));

  $: {
    if (mounted && list) {
      done = liveQuery(() =>
        db.items.where({listKey: list.key})
          .filter(({state, irrelevant}) => state && !irrelevant)
          .count()
      );
      total = liveQuery(async () => {
        const irrelevantItems = await db.items
          .where({listKey: list.key})
          .filter(({irrelevant}) => irrelevant)
          .toArray();
        const items = list?.groups?.reduce((prev, curr) => [...prev, ...curr.items], []) ?? [];

        const relevantItems = items.filter(({key}) => !irrelevantItems.some(({itemKey}) => itemKey === key));

        return relevantItems.length;
      });
      irrelevant = liveQuery(() => db.items.where({listKey: list.key}).filter(({irrelevant}) => irrelevant).count());
      anyItemsChanged = liveQuery(async () => {
          const count = await db.items
            .where({listKey: list.key})
            .and(({state, irrelevant}) => state || irrelevant)
            .count();
          return count > 0;
        }
      );
    }
  }
</script>

{#if $anyItemsChanged}
    <div class="pt-2 fixed left-0 right-0 bottom-0 bg-white border-t border-neutral-100" transition:slide|local>
        <div class="px-2.5 pb-1 flex items-center max-w-4xl mx-auto">
            <div class="h-10 w-10 mr-2.5 text-xs">
                <CircleProgress percentage="{(($done ?? 0) / ($total ?? 0)) * 100}"/>
            </div>
            <div class="h-full flex-1 text-sm py-1">
                <div>
                    <span class="text-primary font-semibold">{$done ?? 0}</span> Aufgaben erledigt
                </div>
                <div class="text-neutral-400">
                    von insgesamt {($total ?? 0)}
                </div>
            </div>
            <div class="text-neutral-300 px-2.5 transition-colors cursor-pointer leading-10 hover:text-neutral-500" class:hidden={menuOpen} on:click={() => menuOpen = !menuOpen}>
                <Icon>ellipsis-v</Icon>
            </div>
            <div class="text-neutral-300 px-2.5 transition-colors cursor-pointer hover:text-neutral-500 -mr-1" class:hidden={!menuOpen}
                 on:click={() => menuOpen = !menuOpen}>
                <Icon>times</Icon>
            </div>
        </div>
        {#if menuOpen}
            <div class="px-10 pb-1 mt-4 block md:flex" transition:slide|local>
                <div class="w-full">
                    <Button class="w-full" disabled="{!$done}" on:click={onResetStateClick}>
                        Auswahl zurücksetzen
                    </Button>
                </div>
                <div class="w-full">
                    <Button class="w-full" disabled="{!$done && !$irrelevant}" on:click={onResetAllClick}>
                        Alles zurücksetzen
                    </Button>
                </div>
            </div>
        {/if}
    </div>
{/if}

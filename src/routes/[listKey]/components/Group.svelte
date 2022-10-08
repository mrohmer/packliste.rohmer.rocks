<script lang="ts">
  import ExpansionPanel from "$lib/components/control/ExpansionPanel.svelte";
  import type {IListItem} from '$lib/model/list';
  import SwipeAction from "$lib/components/control/swipe/SwipeAction.svelte";
  import Checkbox from "$lib/components/control/Checkbox.svelte";
  import {createEventDispatcher} from 'svelte';
  import {slide} from 'svelte/transition';
  import CircleProgress from "$lib/components/control/CircleProgress.svelte";
  import type {ItemState} from '$lib/model/item-state';
  import type {Color} from '$lib/components/control/swipe/SwipeActionIndicator.svelte';

  export let label: string;
  export let items: (IListItem & ItemState)[];
  export let swipeActionColor: Color = 'gray';

  const dispatcher = createEventDispatcher();

  $: finishedItems = items?.filter(({state}) => state) ?? [];
</script>

{#if label}
    <ExpansionPanel disabled="{!items?.length}">
        <div slot="header" class="flex">
            <div class="h-9 w-9 text-[10px] mr-2.5">
                <CircleProgress percentage="{(finishedItems.length / items.length) * 100}"/>
            </div>
            <div class="flex-1">
                <div>
                    {label}
                </div>
                <div class="text-neutral-500 text-[10px] leading-[7px]">
                    {finishedItems.length} / {items.length}
                </div>
            </div>
        </div>
        {#each items as item}
            <div class="sm:pl-10" transition:slide|local>
                <SwipeAction on:right={() => dispatcher('right', {itemKey: item.key})} rightColor={swipeActionColor}>
                    {#key item.key}
                        <Checkbox class="checkbox" checked="{item.state}"
                                  on:change={e => dispatcher('change', {checked: e.target.checked, itemKey: item.key})}>
                            {item.label}
                        </Checkbox>
                    {/key}
                    <slot slot="right" name="right"/>
                </SwipeAction>
            </div>
        {/each}
    </ExpansionPanel>
{/if}

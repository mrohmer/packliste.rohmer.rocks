<script lang="ts">
  import ExpansionPanel from "../../control/ExpansionPanel.svelte";
  import type {IListItem} from '../../../model/list';
  import SwipeAction from "../../control/SwipeAction.svelte";
  import Checkbox from "../../control/Checkbox.svelte";
  import {createEventDispatcher} from 'svelte';
  import {slide} from 'svelte/transition';
  import CircleProgress from "../../control/CircleProgress.svelte";
  import type {ItemState} from '../../../model/item-state';

  export let label: string;
  export let items: (IListItem & ItemState)[];

  const dispatcher = createEventDispatcher();

  $: finishedItems = items?.filter(({state}) => state) ?? [];
</script>

<style type="text/scss">
  .header {
    &__circle, &__label {
      display: inline-block;
      vertical-align: middle;
    }

    &__circle {
      height: 35px;
      width: 35px;
      font-size: 10px;
      margin-right: 10px;
    }

    &__label {
      display: inline-flex;
      flex-direction: column;

      &__line2 {
        color: #666666;
        font-size: 10px;
        line-height: 7px;
      }
    }
  }
</style>

{#if label}
    <ExpansionPanel disabled="{!items?.length}">
        <span slot="header">
            <span class="header__circle">
                <CircleProgress percentage="{(finishedItems.length / items.length) * 100}"/>
            </span>
            <span class="header__label">
                <span class="header__label__line1">
                    {label}
                </span>
                <span class="header__label__line2">
                    {finishedItems.length} / {items.length}
                </span>
            </span>
        </span>
        {#each items as item}
            <div class="item" transition:slide|local>
                <SwipeAction on:right={() => dispatcher('right', {itemKey: item.key})}>
                    {#key item.key}
                        <Checkbox class="checkbox" checked="{item.state}"
                                  on:change={e => dispatcher('change', {checked: e.target.checked, itemKey: item.key})}>
                            {item.label} {item.key}
                        </Checkbox>
                    {/key}
                    <slot slot="right" name="right"/>
                </SwipeAction>
            </div>
        {/each}
    </ExpansionPanel>
{/if}

<script lang="ts">
  import ExpansionPanel from "../../control/ExpansionPanel.svelte";
  import type {IListGroup, IListItem} from '../../../model/list';
  import SwipeAction from "../../control/SwipeAction.svelte";
  import Checkbox from "../../control/Checkbox.svelte";
  import {createEventDispatcher} from 'svelte';
  import {slide} from 'svelte/transition';
  import CircleProgress from "../../control/CircleProgress.svelte";

  export let group: IListGroup;
  export let itemFilter: (item: IListItem) => boolean = () => true;

  const dispatcher = createEventDispatcher();

  $: totalItems = group?.items.filter(itemFilter) ?? [];
  $: finishedItems = totalItems.filter(item => item.state);
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

{#if group}
    <ExpansionPanel disabled="{!group.items?.length}">
        <span slot="header">
            <span class="header__circle">
                <CircleProgress percentage="{(finishedItems.length / totalItems.length) * 100}"/>
            </span>
            <span class="header__label">
                <span class="header__label__line1">
                    {group.label}
                </span>
                <span class="header__label__line2">
                    {finishedItems.length} / {totalItems.length}
                </span>
            </span>
        </span>
        {#each group.items as item}
            {#if itemFilter(item)}
                <div class="item" transition:slide|local>
                    <SwipeAction on:right={() => dispatcher('right', {groupKey: group.key, itemKey: item.key})}>
                        <Checkbox class="checkbox" checked="{item.state}"
                                  on:change={e => dispatcher('change', {checked: e.target.checked, groupKey: group.key, itemKey: item.key})}>
                            {item.label} {item.key}
                        </Checkbox>
                        <slot slot="right" name="right"/>
                    </SwipeAction>
                </div>
            {/if}
        {/each}
    </ExpansionPanel>
{/if}

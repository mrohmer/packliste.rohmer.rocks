<script lang="ts">
  import type {Writable} from 'svelte/store';
  import {writable} from 'svelte/store';
  import type {IList, IListGroup, IListItem} from '../../../model/list';
  import ExpansionPanelGroup from "../../control/ExpansionPanelGroup.svelte";
  import Button from "../../control/Button.svelte";
  import Icon from "../../control/Icon.svelte";
  import Group from "./Group.svelte";
  import {slide} from 'svelte/transition';

  export let list: Writable<IList> = writable({});

  const updateItem = (groupKey: string, itemKey: string, hasChanged: (item: IListItem) => boolean, map: (item: IListItem) => IListItem) => {
    const tmpGroups = [...$list.groups]
    const groupIndex = tmpGroups
      .findIndex(group => group.key === groupKey);
    if (!(groupIndex >= 0)) {
      return;
    }
    const group: IListGroup = {
      ...tmpGroups[groupIndex],
    };

    const items: IListItem[] = group.items ?? [];
    const itemIndex = items
      ?.findIndex(item => item.key === itemKey);
    if (!(itemIndex >= 0)) {
      return;
    }
    const item = items[itemIndex];

    if (!item || !hasChanged(item)) {
      return;
    }

    items[itemIndex] = map(item);
    group.items = [...items];
    tmpGroups[groupIndex] = group;

    list.set({
      ...($list as IList),
      groups: [...tmpGroups],
    })
  };
  const onChange = (state: boolean, groupKey: string, itemKey: string) =>
    updateItem(
      groupKey,
      itemKey,
      item => item.state !== state,
      item => ({
        ...item,
        state,
      }),
    );
  const onChangeIrrelevant = (irrelevant: boolean, groupKey: string, itemKey: string) =>
    updateItem(
      groupKey,
      itemKey,
      item => item.irrelevant !== irrelevant,
      item => ({
        ...item,
        irrelevant,
      }),
    );

  $: irrelevantGroups = $list.groups.filter(group => group.items.some(item => item.irrelevant));

</script>

<style type="text/scss">
  .body {
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 50px);
    padding: 10px;

    &__main {
        flex: 1;
    }
  }

  :global(.swipe__action--right) {
    .list & {
      background: rgb(180, 10, 10);
      color: white;
      line-height: 40px;
    }

    .list--irrelevant & {
      background: rgb(10, 180, 10);
    }
  }

  .list {
    &--irrelevant {
      opacity: 0.5;
      margin-top: 100px;

      h3 {
        text-transform: uppercase;
        text-align: center;
      }
    }
  }
</style>

<div class="body">
    <div class="body__main">
        <div class="list">
            <ExpansionPanelGroup multipleOpen="{true}">
                {#each $list.groups as group}
                    <Group group="{group}"
                           itemFilter="{item => !item.irrelevant}"
                           on:right={({detail}) => onChangeIrrelevant(true, detail.groupKey, detail.itemKey)}
                           on:change={({detail}) => onChange(detail.checked, detail.groupKey, detail.itemKey)}
                    >
                        <div slot="right">
                            <Icon>times</Icon>
                        </div>
                    </Group>
                {/each}
            </ExpansionPanelGroup>
        </div>

        {#if irrelevantGroups.length }
            <div class="list list--irrelevant" transition:slide|local>
                <h3>Irrelevant</h3>
                <ExpansionPanelGroup multipleOpen="{true}">
                    {#each irrelevantGroups as group}
                        <Group group="{group}"
                               itemFilter="{item => item.irrelevant}"
                               on:right={({detail}) => onChangeIrrelevant(false, detail.groupKey, detail.itemKey)}
                               on:change={({detail}) => onChange(detail.checked, detail.groupKey, detail.itemKey)}
                        >
                            <div slot="right">
                                <Icon>plus</Icon>
                            </div>
                        </Group>
                    {/each}
                </ExpansionPanelGroup>
            </div>
        {/if}
    </div>
</div>

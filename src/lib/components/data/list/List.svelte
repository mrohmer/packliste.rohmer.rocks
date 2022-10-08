<script lang="ts">
  import type {IList, IListGroup, IListItem} from '../../../model/list';
  import ExpansionPanelGroup from "../../control/ExpansionPanelGroup.svelte";
  import Icon from "../../control/Icon.svelte";
  import Group from "./Group.svelte";
  import {slide} from 'svelte/transition';
  import {db} from '../../../db';
  import {onMount} from 'svelte';
  import {liveQuery} from 'dexie';
  import type {Observable} from 'dexie';
  import type {ItemState} from '../../../model/item-state';

  type ItemWithState = IListItem & ItemState;
  type GroupWithState = Omit<IListGroup, 'items'> & Record<'items', ItemWithState[]>
  export let list: IList;
  let groups: Observable<Record<'normal' | 'irrelevant', GroupWithState[]>>;
  let irrelevantGroups: Observable<(Omit<IListGroup, 'items'> & Record<'items', (IListItem & ItemState)[]>)[]>;

  const updateItem = (groupKey: string, itemKey: string, {
    state,
    irrelevant
  }: Partial<Record<'state' | 'irrelevant', boolean>>) => db.transaction('rw', db.items, async () => {

    const item = await db.items.get({itemKey, groupKey, listKey: list.key});
    if (item) {
      await db.items.where({itemKey, groupKey, listKey: list.key}).modify((item) => {
        if (typeof state !== 'undefined') {
          item.state = state;
        }
        if (typeof irrelevant !== 'undefined') {
          item.irrelevant = irrelevant;
        }
      });
    } else if (state || irrelevant) {
      await db.items.add({
        itemKey,
        groupKey,
        listKey: list.key,
        state: state ?? false,
        irrelevant: irrelevant ?? false,
      });
    }
  })
  const onChange = (state: boolean, groupKey: string, itemKey: string) =>
    updateItem(groupKey, itemKey, {state});
  const onChangeIrrelevant = (irrelevant: boolean, groupKey: string, itemKey: string) =>
    updateItem(groupKey, itemKey, {irrelevant});

  const buildGroupWithState = async (group: IListGroup): Promise<GroupWithState> => {
    const itemStates = await db.items.where({groupKey: group.key, listKey: list.key}).toArray();
    return {
      ...group,
      items: group.items.map((item) => ({
        ...item,
        ...(
          itemStates.find(({itemKey}) => item.key === itemKey)
          ?? {state: false, irrelevant: false, itemKey: item.key, groupKey: group.key, listKey: list.key}
        ),
      })),
    };
  }
  const filterGroupsByIrrelevant = (groups: GroupWithState[], irrelevant: boolean): GroupWithState[] => {
    return groups.map(({items, ...group}) => ({
      ...group,
      items: items.filter(({irrelevant: state}) => state === irrelevant)
    }))
      .filter(({items}) => items.length);
  }

  let mounted = false;
  onMount(() => (mounted = true));


  $: {
    if (mounted && list) {
      groups = liveQuery(async () => {
        const promises = list.groups.map(group => buildGroupWithState(group));
        const results = await Promise.all(promises);

        return {
          normal: filterGroupsByIrrelevant(results, false),
          irrelevant: filterGroupsByIrrelevant(results, true),
        };
      });
    }
  }

</script>

<style lang="postcss">
  .body {
    min-height: calc(100vh - 50px);
  }
</style>

{#if $groups}
    <div class="body flex flex-col py-2.5">
        <div class="flex-1">
            {#if $groups.normal.length }
                <div>
                    <ExpansionPanelGroup multipleOpen="{true}">
                        {#each $groups.normal as group}
                            <div transition:slide|local>
                                <Group {...group}
                                       on:right={({detail}) => onChangeIrrelevant(true, group.key, detail.itemKey)}
                                       on:change={({detail}) => onChange(detail.checked, group.key, detail.itemKey)}
                                       swipeActionColor="red"
                                >
                                    <div slot="right">
                                        <Icon>times</Icon>
                                    </div>
                                </Group>
                            </div>
                        {/each}
                    </ExpansionPanelGroup>
                </div>
            {/if}

            {#if $groups.irrelevant.length }
                <div class="opacity-50 mt-24" transition:slide|local>
                    <h3 class="uppercase text-center text-xl">Irrelevant</h3>
                    <ExpansionPanelGroup multipleOpen="{true}">
                        {#each $groups.irrelevant as group}
                            <div transition:slide|local>
                                <Group {...group}
                                       on:right={({detail}) => onChangeIrrelevant(false, group.key, detail.itemKey)}
                                       on:change={({detail}) => onChange(detail.checked, group.key, detail.itemKey)}
                                       swipeActionColor="green"
                                >
                                    <div slot="right">
                                        <Icon>plus</Icon>
                                    </div>
                                </Group>
                            </div>
                        {/each}
                    </ExpansionPanelGroup>
                </div>
            {/if}
        </div>
    </div>
{/if}

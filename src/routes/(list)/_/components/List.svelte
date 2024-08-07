<script lang="ts">
	import type { IList, IListGroup, IListItem } from '$lib/model/list';
	import ExpansionPanelGroup from '$lib/components/control/ExpansionPanelGroup.svelte';
	import Group from './Group.svelte';
	import { slide } from 'svelte/transition';
	import { db } from '$lib/db';
	import { onMount } from 'svelte';
	import type { Observable } from 'dexie';
	import { liveQuery } from 'dexie';
	import type { ItemState } from '$lib/model/item-state';
	import { receiveContext } from '../context/list';

	type ItemWithState = IListItem & ItemState;
	type GroupWithState = Omit<IListGroup, 'items'> & Record<'items', ItemWithState[]>

	export let list: IList;

	let groups: Observable<Record<'normal' | 'irrelevant', GroupWithState[]>>;

	const { isEdit } = receiveContext();

	const updateItem = (groupKey: string, itemKey: string, {
		state,
		irrelevant
	}: Partial<Record<'state' | 'irrelevant', boolean>>) => db.transaction('rw', db.items, async () => {

		const item = await db.items.get({ itemKey, groupKey, listKey: list.key });
		if (item) {
			await db.items.where({ itemKey, groupKey, listKey: list.key }).modify((item) => {
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
				irrelevant: irrelevant ?? false
			});
		}
	});
	const onChange = (state: boolean, groupKey: string, itemKey: string) =>
		updateItem(groupKey, itemKey, { state });
	const onChangeItemIrrelevant = (irrelevant: boolean, groupKey: string, itemKey: string) => {
		console.log(irrelevant, groupKey, itemKey);
		return updateItem(groupKey, itemKey, { irrelevant });
	};

	const buildGroupWithState = async (group: IListGroup): Promise<GroupWithState> => {
		const itemStates = await db.items.where({ groupKey: group.key, listKey: list.key }).toArray();
		return {
			...group,
			items: group.items.map((item) => ({
				...item,
				...(
					itemStates.find(({ itemKey }) => item.key === itemKey)
					?? { state: false, irrelevant: false, itemKey: item.key, groupKey: group.key, listKey: list.key }
				)
			}))
		};
	};
	const filterGroupsByIrrelevant = (groups: GroupWithState[], irrelevant: boolean): GroupWithState[] => {
		return groups.map(({ items, ...group }) => ({
			...group,
			items: items.filter(({ irrelevant: state }) => state === irrelevant)
		}))
			.filter(({ items }) => items.length);
	};

	let mounted = false;
	onMount(() => (mounted = true));

	$: {
		if (mounted && list) {
			groups = liveQuery(async () => {
				const promises = list.groups.map(group => buildGroupWithState(group));
				const results = await Promise.all(promises);

				return {
					normal: filterGroupsByIrrelevant(results, false),
					irrelevant: filterGroupsByIrrelevant(results, true)
				};
			});
		}
	}
</script>

{#if $groups}
	<div class="flex flex-col py-2.5 px-4">
		<div class="flex-1">
			{#if $groups.normal.length }
				<div>
					<ExpansionPanelGroup multipleOpen="{true}">
						{#each $groups.normal as group (group.key)}
							<div transition:slide|local>
								<Group {...group}
											 on:remove-item={({detail}) => onChangeItemIrrelevant(true, group.key, detail.itemKey)}
											 on:change={({detail}) => onChange(detail.checked, group.key, detail.itemKey)}
								/>
							</div>
						{/each}
					</ExpansionPanelGroup>
				</div>
			{/if}

			{#if $groups.irrelevant.length && $isEdit }
				<div class="opacity-50 mt-24 dark:opacity-80 transition-opacity" transition:slide|local>
					<h3 class="uppercase text-center text-xl">Entfernt</h3>
					<ExpansionPanelGroup multipleOpen="{true}">
						{#each $groups.irrelevant as group (group.key)}
							<div transition:slide|local>
								<Group {...group}
											 on:remove-item={({detail}) => onChangeItemIrrelevant(false, group.key, detail.itemKey)}
											 on:change={({detail}) => onChange(detail.checked, group.key, detail.itemKey)}
											 isRemovedItems
								/>
							</div>
						{/each}
					</ExpansionPanelGroup>
				</div>
			{/if}
		</div>
	</div>
{/if}

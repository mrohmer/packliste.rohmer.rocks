<script lang="ts">
	import ExpansionPanel from '$lib/components/control/ExpansionPanel.svelte';
	import type { IListItem } from '$lib/model/list';
	import { createEventDispatcher } from 'svelte';
	import CircleProgress from '$lib/components/control/CircleProgress.svelte';
	import type { ItemState } from '$lib/model/item-state';
	import { receiveContext } from '../context/list';
	import Item from './Item.svelte';

	export let label: string;
	export let key: string;
	export let items: (IListItem & ItemState)[];
	export let isRemovedItems = false;

	const dispatcher = createEventDispatcher();

	const { isEdit } = receiveContext();

	const onChange = (itemKey: string) => (e: any) =>
		dispatcher('change', { checked: e.target.checked, itemKey });

	const onRemove = (itemKey: string) => () => dispatcher('remove-item', { itemKey });

	$: finishedItems = items?.filter(({ state }) => state) ?? [];
</script>

{#if label}
	<ExpansionPanel disabled="{!items?.length}">
		<div slot="header" class="flex">
			<div class="h-9 w-9 text-[10px] mr-2.5">
				<CircleProgress percentage="{(finishedItems.length / items.length) * 100}" />
			</div>
			<div class="flex-1">
				<div>
					{label}
				</div>
				<div class="text-neutral-500 text-[10px] leading-[7px] dark:text-neutral-300 transition-colors">
					{finishedItems.length} / {items.length}
				</div>
			</div>
		</div>
		{#each items as item (item.key)}
			<Item {...item}
						groupKey={key}
						isRemovedItem={isRemovedItems}
						isEdit={$isEdit}
						on:remove={onRemove(item.key)}
						on:change={onChange(item.key)} />
		{/each}
	</ExpansionPanel>
{/if}

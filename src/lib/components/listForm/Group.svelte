<script lang="ts">
	import type { PageData } from '../../$types';
	import Input from '$lib/components/Input.svelte';
	import Item from './Item.svelte';
	import GroupBorder from './GroupBorder.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatcher = createEventDispatcher();
	const dispatch = (event: string, detail?: unknown) => () => dispatcher(event, detail);

	export let value: PageData['form']['data']['groups'][number];
	export let index: number;
</script>

<GroupBorder
	title={value.name?.trim() ? value.name : `Gruppe ${index + 1}`}
	subTitle={value.items?.length ? `${value.items.length} Elemente` : undefined}
	hasDelete={true}
	on:delete
	on:add
>
	{#if value.id}
		<input type="hidden" name="id" value={value.id} />
	{/if}
	<Input bind:value={value.name} placeholder="Gruppenname" slot="head" />
	<div class="flex flex-col gap-4">
		{#each value.items ?? [] as _, index}
			<Item bind:value={value.items[index]} on:delete={dispatch('deleteItem', index)} />
		{/each}
	</div>
</GroupBorder>

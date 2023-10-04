<script lang="ts">
	import type { PageData } from '../../$types';
	import Input from '$lib/components/Input.svelte';
	import NumberInput from '$lib/components/NumberInput.svelte';
	import { createEventDispatcher } from 'svelte';
	import GroupBorder from '$lib/components/listForm/GroupBorder.svelte';

	const dispatcher = createEventDispatcher();
	const dispatch = (event: string) => () => dispatcher(event);

	export let value: PageData['form']['data']['items'][number];
</script>

<div class="flex gap-2">
	{#if value.id}
		<input type="hidden" name="id" value={value.id} />
	{/if}
	<div class="w-14">
		<NumberInput bind:value={value.count} min="1" max="9" step="1" />
	</div>
	<div class="flex-1">
		<Input bind:value={value.name} placeholder="Elementname" />
	</div>
	<button type="button" class="btn btn-square btn-outline btn-error" on:click={dispatch('delete')}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-6 w-6"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M6 18L18 6M6 6l12 12"
			/></svg
		>
	</button>
</div>

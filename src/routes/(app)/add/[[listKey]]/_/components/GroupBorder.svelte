<script lang="ts">
	import { slide } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

	const dispatcher = createEventDispatcher();
	const dispatch = (event: string) => () => dispatcher(event);

	export let expanded = false;
	export let title: string;
	export let subTitle: string;
	export let hasDelete = false;

	const toggleExpand = () => () => (expanded = !expanded);
</script>

<div class="border-2 rounded-lg flex flex-col gap-2">
	<div class="bg-neutral-200 px-2 py-3 flex gap-2 items-center">
		<button class="p-2" on:click={toggleExpand()}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6 transition-transform"
				class:rotate-90={expanded}
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
			</svg>
		</button>
		<div class="flex-1">
			{#if expanded && $$slots.head}
				<slot name="head" />
			{:else}
				<div class="cursor-pointer" on:click={toggleExpand()}>
					<h2 class="text-xl">{title ?? ''}</h2>
					{#if subTitle?.trim()}
						<h2 transition:slide|local class="text-xs text-neutral-400">{subTitle}</h2>
					{/if}
				</div>
			{/if}
		</div>
		{#if hasDelete}
			<button class="btn btn-square btn-outline btn-error" on:click={dispatch('delete')}>
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
		{/if}
	</div>
	{#if expanded}
		<div transition:slide|local class="flex flex-col gap-4 p-2">
			<slot />

			<button class="btn" type="button" on:click={dispatch('add')}> Element hinzufügen </button>
		</div>
	{/if}
</div>

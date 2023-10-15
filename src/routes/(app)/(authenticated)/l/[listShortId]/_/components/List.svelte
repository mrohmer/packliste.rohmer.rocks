<script lang="ts">
	import type { ListItem } from '@prisma/client';
	import Item from './Item.svelte';
	import { calcProgressInItems } from '$lib/utils/progress';

	export let items: ListItem[];
	export let disabled = false;
	export let loading = false;
	let changes = 0;

	$: progress = !loading && changes >= 0 && calcProgressInItems(items);
</script>

<div class="flex flex-col gap-2 pt-5">
	{#each items as item (item.id)}
		<div>
			<Item {...item} on:update={() => changes++} {disabled} {loading} />
		</div>
	{/each}
	{#if loading || progress}
		<div class="flex flex-row-reverse px-3 pt-2 font-extralight" class:animate-pulse={loading}>
			<div class="w-20 text-center text-xs text-neutral-500">
				{#if loading}
					<div class="flex gap-1 items-center justify-center">
						<div class="w-12 h-4 bg-base-200 rounded-full" />
					</div>
				{:else}
					{progress.done} / {progress.total}
				{/if}
			</div>
		</div>
	{/if}
</div>

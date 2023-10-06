<script lang="ts">
	import type { ListItem } from '@prisma/client';
	import Item from './Item.svelte';
	import { calcProgressInItems } from '$lib/utils/progress';

	export let items: ListItem[];
	export let disabled = false;
	let changes = 0;

	$: progress = changes >= 0 && calcProgressInItems(items);
</script>

<div class="flex flex-col gap-2 pt-5">
	{#each items as item (item.id)}
		<div>
			<Item {...item} on:update={() => changes++} {disabled} />
		</div>
	{/each}
	<div class="flex flex-row-reverse px-3 pt-2">
		<div class="w-20 text-center text-xs text-neutral-500">
			{progress.done} / {progress.total}
		</div>
	</div>
</div>

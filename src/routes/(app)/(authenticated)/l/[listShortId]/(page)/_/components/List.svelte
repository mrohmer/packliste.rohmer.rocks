<script lang="ts">
	import type { ListItem } from '@prisma/client';
	import Item from './Item.svelte';

	export let items: ListItem[];
</script>

<div class="flex flex-col gap-2 pt-5">
	{#each items as item (item.id)}
		<div>
			<Item {...item} />
		</div>
	{/each}
</div>

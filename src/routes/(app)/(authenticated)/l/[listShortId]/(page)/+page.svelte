<script lang="ts">
	import type { PageData } from './$types';
	import Content from '$lib/components/Content.svelte';
	import List from './_/components/List.svelte';

	export let data: PageData;
</script>

{#if data.list}
	<Content>
		<div class="flex flex-col gap-4">
			{#if data.list.items?.length}
				<List items={data.list.items} />
			{/if}
			{#each data.list.groups as group (group.id)}
				<a href="/l/{data.list.shortId}/g/{group.shortId}" class="flex gap-2">
					<div class="flex-1">
						{group.name}
					</div>
				</a>
			{/each}
		</div>
	</Content>
{/if}

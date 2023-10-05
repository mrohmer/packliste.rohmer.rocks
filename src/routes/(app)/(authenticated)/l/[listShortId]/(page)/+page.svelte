<script lang="ts">
	import type { PageData } from './$types';
	import Navbar from '$lib/components/Navbar.svelte';
	import Content from '$lib/components/Content.svelte';
	import List from './_/components/List.svelte';

	export let data: PageData;
</script>

<Navbar user={data?.user}>
	<a href="/" class="block p-3 -ml-3">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-6 h-6"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
		</svg>
	</a>
	<div class="flex-1 text-2xl">
		{data.list?.name}
	</div>
</Navbar>

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

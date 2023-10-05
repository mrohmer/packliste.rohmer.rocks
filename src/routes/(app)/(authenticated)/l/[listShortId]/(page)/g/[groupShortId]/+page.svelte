<script lang="ts">
	import type { PageData } from './$types';
	import Navbar from '$lib/components/Navbar.svelte';
	import Content from '$lib/components/Content.svelte';
	import List from '../../_/components/List.svelte';

	export let data: PageData;
</script>

<Navbar user={data?.user}>
	<a href="/l/{data.list?.shortId}" class="block p-3 -ml-3">
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
	<div class="flex-1 flex flex-col items-start">
		<div class="text-2xl leading-8">
			{data.group?.name}
		</div>
		<div class="text-xs -mt-px">
			aus Liste <a href="/l/{data.list?.shortId}">{data.list?.name}</a>
		</div>
	</div>
</Navbar>

{#if data.group?.items?.length}
	<Content>
		<div class="flex flex-col gap-4">
			<List items={data.group.items} />
		</div>
	</Content>
{/if}

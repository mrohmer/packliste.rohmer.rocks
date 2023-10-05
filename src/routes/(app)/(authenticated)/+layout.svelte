<script lang="ts">
	import type { PageData } from './$types';
	import Navbar from '$lib/components/Navbar.svelte';
	import Content from '$lib/components/Content.svelte';
	import { page } from '$app/stores';

	export let data: PageData;

	$: isListPage = $page?.route?.id?.includes('/l/[listShortId]/(page)');
</script>

{#if isListPage}
	<slot />
{:else}
	<Navbar user={data?.user}>
		<a href="/" class="flex-1 pt-3 pb-5 flex items-center">
			<img class="block invert h-8 w-8 transition-all" src="/icons/icon_100.png" alt="checkbox" />
			<div class="pl-5">
				<h1 class="text-3xl font-extralight">Packliste</h1>
			</div>
		</a>
	</Navbar>

	<Content>
		<slot />
	</Content>
{/if}

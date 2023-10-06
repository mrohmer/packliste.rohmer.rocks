<script lang="ts">
	import type { LayoutData } from './$types';
	import Navbar from '$lib/components/Navbar.svelte';
	import Content from '$lib/components/Content.svelte';
	import { page } from '$app/stores';
	import Logo from '$lib/components/Logo.svelte';

	export let data: LayoutData;

	$: isListPage = $page?.route?.id?.includes('/l/[listShortId]/(owner)/(page)');
</script>

{#if isListPage}
	<slot />
{:else}
	<Navbar user={data?.user}>
		<a href="/" class="flex-1 pt-3 pb-5">
			<Logo />
		</a>
	</Navbar>

	<Content>
		<slot />
	</Content>
{/if}

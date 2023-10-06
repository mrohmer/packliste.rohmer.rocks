<script lang="ts">
	import type { PageData } from './$types';
	import { ListPageContext } from '$lib/contexts/list-page';
	import Navbar from '$lib/components/Navbar.svelte';
	import { calcProgressInList } from '$lib/utils/progress';
	import Progress from './_/components/Progress.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import Drawer from './_/components/Drawer.svelte';
	import Navigation from './_/components/navigation/Navigation.svelte';

	export let data: PageData;

	let changes = 0;
	ListPageContext.create(data.list, () => {
		changes++;
	});

	let drawerOpen = false;

	$: listProgress = changes >= 0 && calcProgressInList(data.list);
</script>

<Progress percentage={listProgress.percentage} />
<Navbar user={data?.user} wide>
	<div class="flex-1 flex gap-3 items-center">
		<button class="lg:hidden" on:click={() => (drawerOpen = !drawerOpen)}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-8 h-8"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
				/>
			</svg>
		</button>
		<a href="/" class="flex-1 pt-3 pb-5">
			<Logo />
		</a>
	</div>
</Navbar>

<Drawer bind:open={drawerOpen}>
	<slot />
	<Navigation slot="sidebar" {changes} list={data.list} />
</Drawer>

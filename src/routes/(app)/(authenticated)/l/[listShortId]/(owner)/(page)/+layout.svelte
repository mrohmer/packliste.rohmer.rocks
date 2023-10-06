<script lang="ts">
	import type { PageData } from './$types';
	import { ListPageContext } from '$lib/contexts/list-page';
	import Navbar from '$lib/components/Navbar.svelte';
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';
	import { calcProgressInList } from '$lib/utils/progress';
	import Progress from './_/components/Progress.svelte';
	import Logo from '$lib/components/Logo.svelte';

	export let data: PageData;

	let changes = 0;
	ListPageContext.create(data.list, () => {
		changes++;
	});

	$: isGroupPage = !!$page?.data?.group?.id;
	$: backLink = isGroupPage ? `/l/${data.list.shortId}` : '/';
	$: title = isGroupPage ? `Gruppe ${$page?.data?.group?.name}` : data.list.name;

	$: listProgress = changes >= 0 && calcProgressInList(data.list);
</script>

<Progress percentage={listProgress.percentage} />
<Navbar user={data?.user}>
	<a href={backLink} class="block p-3 -ml-3 flex gap-2">
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
		<div>
			<Logo withName={false} />
		</div>
	</a>
	<div class="flex-1 flex flex-col items-start">
		<div class="text-2xl leading-8">
			{title}
		</div>
		<div class="text-xs -mt-px">
			<span class="text-primary">{listProgress.done}</span> / {listProgress.total} Aufgaben
			{#if isGroupPage}
				<span transition:fly>
					| aus Liste
					<a href="/l/{data.list?.shortId}" class="text-secondary">
						{data.list?.name}
					</a>
				</span>
			{/if}
		</div>
	</div>
</Navbar>

<slot />

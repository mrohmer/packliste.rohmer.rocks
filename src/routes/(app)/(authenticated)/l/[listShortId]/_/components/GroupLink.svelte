<script lang="ts">
	import type { ListGroupWithItemsAndState } from '$lib/model/db-types-with-includes';
	import { calcProgressInGroup } from '$lib/utils/progress';
	import ProgressBar from './ProgressBar.svelte';

	export let listId: string;
	export let loading = false;
	export let group: ListGroupWithItemsAndState;
	$: progress = calcProgressInGroup(group);
</script>

{#if loading}
	<div
		class="animate-pulse flex items-center gap-4 py-3 px-5 bg-neutral-200 rounded-xl overflow-hidden text-base-300"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-6 h-6"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
			/>
		</svg>
		<div class="flex flex-col gap-1 flex-1">
			<div class="max-w-[50%] h-5 bg-base-200 rounded-full" />
			<div class="max-w-[33%] h-3 bg-base-200 rounded-full" />
		</div>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-6 h-6"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
		</svg>
	</div>
{:else}
	<a
		href="/l/{listId}/g/{group.shortId}"
		class="flex items-center gap-4 py-3 px-5 bg-neutral-200 hover:bg-neutral-300 cursor-pointer rounded-xl overflow-hidden"
	>
		<ProgressBar percentage={progress.percentage} condensed />
		<div class="z-10">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
				/>
			</svg>
		</div>
		<div class="flex-1">
			<div>
				{group.name}
			</div>
			{#if progress}
				<div class="text-xs">
					{#if progress.done}
						<span class="text-primary">{progress.done}</span> /
					{/if}
					{progress.total} Aufgabe{progress.total === 1 ? '' : 'n'}
				</div>
			{/if}
		</div>
		<div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
			</svg>
		</div>
	</a>
{/if}

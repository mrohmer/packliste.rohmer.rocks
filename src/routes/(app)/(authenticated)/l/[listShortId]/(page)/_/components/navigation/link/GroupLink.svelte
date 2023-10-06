<script lang="ts">
	import { calcProgressInGroup } from '$lib/utils/progress.js';
	import Link from './Link.svelte';
	import ProgressCircle from '../../ProgressCircle.svelte';
	import type { ListGroup } from '@prisma/client';
	import { fade } from 'svelte/transition';

	export let listId: string;
	export let group: ListGroup;
	export let changes: number;

	$: progress = changes >= 0 && calcProgressInGroup(group);
	$: percentage = progress.percentage;
</script>

<Link href="/l/{listId}/g/{group.shortId}">
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		stroke="currentColor"
		class="w-5 h-5"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
		/>
	</svg>

	<div class="flex-1">{group.name}</div>
	{#if percentage}
		<div transition:fade|local>
			<ProgressCircle {percentage} />
		</div>
	{/if}
</Link>

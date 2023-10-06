<script lang="ts">
	import { calcProgressInList } from '$lib/utils/progress.js';
	import Link from './Link.svelte';
	import ProgressCircle from '../../ProgressCircle.svelte';
	import { slide, fade } from 'svelte/transition';
	import type { List } from '@prisma/client';

	export let list: List;
	export let changes: number;

	$: progress = changes >= 0 && calcProgressInList(list);
	$: percentage = progress.percentage;
	$: done = progress.done;
	$: total = progress.total;
</script>

<Link href="/l/{list.shortId}" suppressHighlight>
	<div class="flex-1">
		<div class="text-xl">
			{list.name ?? 'Liste'}
		</div>
		{#if done}
			<div transition:slide|local class="text-xs">
				<span class="text-primary">{done}</span> / {total} Aufgabe{total === 1 ? '' : 'n'}
			</div>
		{/if}
	</div>

	{#if percentage}
		<div transition:fade|local>
			<ProgressCircle {percentage} />
		</div>
	{/if}
</Link>

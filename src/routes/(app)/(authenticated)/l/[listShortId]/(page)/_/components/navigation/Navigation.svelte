<script lang="ts">
	import LinkGroup from './LinkGroup.svelte';
	import ListLink from './link/ListLink.svelte';
	import type { List } from '@prisma/client';
	import GroupLink from './link/GroupLink.svelte';

	export let list: List;
	export let changes: number;
</script>

<div class="flex flex-col text-base font-light gap-1">
	<LinkGroup>
		<ListLink {list} {changes} />
	</LinkGroup>
	{#if list.groups?.length}
		<div class="divider my-0 opacity-50" />
		<LinkGroup>
			{#each list.groups ?? [] as group (group.id)}
				<GroupLink {group} {changes} listId={list.shortId} />
			{/each}
		</LinkGroup>
	{/if}
</div>

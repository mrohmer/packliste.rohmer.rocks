<script lang="ts">
	import LinkGroup from './LinkGroup.svelte';
	import ListLink from './link/ListLink.svelte';
	import type { List } from '@prisma/client';
	import GroupLink from './link/GroupLink.svelte';
	import Link from './link/Link.svelte';

	export let list: List;
	export let changes: number;
	export let canEdit = false;
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
	{#if canEdit}
		<div class="divider my-0 opacity-50" />
		<LinkGroup>
			<Link href="/l/{list.shortId}/edit">
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
						d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
					/>
				</svg>
				<div>Bearbeiten</div>
			</Link>
		</LinkGroup>
	{/if}
</div>

<script lang="ts">
	import LinkGroup from './LinkGroup.svelte';
	import ListLink from './link/ListLink.svelte';
	import type { List } from '@prisma/client';
	import GroupLink from './link/GroupLink.svelte';
	import Link from './link/Link.svelte';
	import { goto } from '$app/navigation';

	export let list: List;
	export let changes: number;
	export let canEdit = false;
	export let canDelete = false;

	const handleDelete = () => async (event) => {
		event.preventDefault();
		if (confirm(`Sicher, dass du ${list.name} und alle Aufgaben löschen willst?`)) {
			await goto(`/l/${list.shortId}/delete`);
		}
		return false;
	};
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
	{#if canEdit || canDelete}
		<div class="divider my-0 opacity-50" />
		<LinkGroup>
			{#if canEdit}
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
			{/if}
			{#if canDelete}
				<Link href="/" on:click={handleDelete()} class="text-error">
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
							d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
						/>
					</svg>

					<div>Löschen</div>
				</Link>
			{/if}
		</LinkGroup>
	{/if}
</div>

<script lang="ts">
	import type { PageData } from './$types';
	import Content from '$lib/components/Content.svelte';
	import List from './_/components/List.svelte';
	import GroupLink from './_/components/GroupLink.svelte';

	export let data: PageData;
</script>

{#if data.list}
	<Content>
		<div class="flex flex-col gap-4">
			{#if data.list.items?.length}
				<List items={data.list.items} disabled={!data.permissions.canCheck} />
			{/if}

			{#if data.list.groups?.length}
				<div class="pt-4 flex flex-col gap-4">
					{#each data.list.groups as group (group.id)}
						<GroupLink {group} listId={data.list.shortId} />
					{/each}
				</div>
			{/if}
		</div>
	</Content>
{/if}

<script lang="ts">
	import type { PageServerData } from './$types';
	import CreateShareLink from './_/components/CreateShareLink.svelte';

	export let data: PageServerData;
</script>

<div class="flex flex-col gap-4 py-4">
	<CreateShareLink listId={data.list.id} invitations={data.invitations} />
	{#each data.list?.shares ?? [] as { id, sharedWith, role } (id)}
		<div>
			<div>
				{JSON.stringify(sharedWith)}
			</div>
			<div>
				{JSON.stringify(role)}
			</div>
		</div>
	{/each}
</div>

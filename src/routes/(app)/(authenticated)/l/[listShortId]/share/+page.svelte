<script lang="ts">
	import type { PageServerData } from './$types';
	import CreateShareLink from './_/components/CreateShareLink.svelte';
	import UserRow from './_/components/UserRow.svelte';

	export let data: PageServerData;
	$: console.log(data);
</script>

<div class="flex flex-col gap-8 py-4">
	<CreateShareLink listId={data.list.id} invitations={data.invitations} />
	<div class="flex flex-col gap-4">
		<UserRow name={data.listOwner.name} />
		{#each data.list?.shares ?? [] as { id, sharedWith, role } (id)}
			<UserRow
				name={sharedWith.name}
				{role}
				shareId={id}
				canEditPermissions={data.permissions.canEditPermissions}
				userRole={data.role}
			/>
		{/each}
	</div>
</div>

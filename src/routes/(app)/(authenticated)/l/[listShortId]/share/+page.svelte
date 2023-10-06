<script lang="ts">
	import type { PageServerData } from './$types';
	import CreateShareLink from './_/components/CreateShareLink.svelte';
	import Avatar from '$lib/components/avatar/Avatar.svelte';
	import { translateRole } from './_/utils/role';

	export let data: PageServerData;
</script>

<div class="flex flex-col gap-8 py-4">
	<CreateShareLink listId={data.list.id} invitations={data.invitations} />
	<div class="flex flex-col gap-4">
		<div class="flex gap-4 items-center">
			<div>
				<Avatar username={data.listOwner.name} />
			</div>
			<div class="text-xl flex-1 font-light">
				{data.listOwner.name}
			</div>
			<div class="text-xl font-light">Original Eigentümer</div>
		</div>
		{#each data.list?.shares ?? [] as { id, sharedWith, role } (id)}
			<div class="flex gap-4 items-center">
				<div>
					<Avatar username={sharedWith.name} />
				</div>
				<div class="text-xl flex-1 font-light">
					{sharedWith.name}
				</div>
				<div class="text-xl font-light">
					{translateRole(role)}
				</div>
			</div>
		{/each}
	</div>
</div>

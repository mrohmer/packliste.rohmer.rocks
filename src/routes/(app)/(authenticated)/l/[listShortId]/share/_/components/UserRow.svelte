<script lang="ts">
	import Select from './Select.svelte';
	import { translateRole } from '../utils/role';
	import Avatar from '$lib/components/avatar/Avatar.svelte';
	import { ShareRole } from '@prisma/client';
	import { isAtLeastRole } from '$lib/utils/roles';
	import { minTime } from '$lib/utils/min-time.js';

	export let shareId: string | undefined;
	export let name: string;
	export let role: ShareRole | undefined;
	export let userRole: ShareRole | undefined;
	export let canEditPermissions = false;

	let loading = false;

	let value = role;
	const resetValue = (input?: ShareRole) => {
		value = input;
	};

	const handleRoleChange = () => async () => {
		try {
			if (loading) {
				return;
			}
			loading = true;

			const response = await minTime(
				() =>
					fetch(`/api/shares/${shareId}/role`, {
						method: 'PUT',
						body: JSON.stringify({ role: value })
					}),
				1500
			);

			if (!response.ok || Math.floor(response.status / 100) !== 2) {
				throw new Error((await response.text()) || `${response.status}`);
			}

			role = value;
		} catch (e) {
			value = role;
			alert(e.message);
		} finally {
			loading = false;
		}
	};

	$: isOwner = !userRole;
	$: resetValue(role);
</script>

<div class="flex gap-4 items-center">
	<div>
		<Avatar username={name} />
	</div>
	<div class="text-xl flex-1 font-light">
		{name}
	</div>
	<div class="text-xl font-light">
		{#if !role}
			Original Eigentümer
		{:else if canEditPermissions}
			<Select id="role-{shareId}" bind:value on:change={handleRoleChange()} {loading}>
				<svelte:fragment slot="options">
					{#if isOwner || isAtLeastRole(ShareRole.SEE, userRole)}
						<option value="SEE">Nur Ansehen</option>
						{#if isOwner || isAtLeastRole(ShareRole.CHECK, userRole)}
							<option value="CHECK">Mitarbeiten</option>
							{#if isOwner || isAtLeastRole(ShareRole.EDIT, userRole)}
								<option selected value="EDIT">Bearbeiten</option>
								{#if isOwner || isAtLeastRole(ShareRole.OWNER, userRole)}
									<option value="OWNER">Eigentümer</option>
								{/if}
							{/if}
						{/if}
					{/if}
				</svelte:fragment>
			</Select>
		{:else}
			{translateRole(role)} {canEditPermissions}
		{/if}
	</div>
</div>

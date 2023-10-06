<script lang="ts">
	import type { ShareRole, ListInvite } from '@prisma/client';
	import { invalidate } from '$app/navigation';
	import ShareLinkModal from './ShareLinkModal.svelte';

	export let invitations: ListInvite[];
	export let listId: string;

	let loading = false;
	let role: ShareRole;
	let modal: HTMLDialogElement;

	const createShareLink = async () => {
		const response = await fetch(`/api/lists/${listId}/invite`, {
			method: 'POST',
			body: JSON.stringify({ role })
		});

		if (!response.ok || response.status !== 200) {
			throw new Error(await response.text());
		}
	};
	const onCreateShareLink = async () => {
		loading = true;
		modal.showModal();
		const invitation = getInvitation(invitations, role);

		if (!invitation) {
			await createShareLink();
			await invalidate(`list:${listId}:invitations`);
			return onCreateShareLink();
		}

		loading = false;
	};

	const getInvitation = (i: ListInvite[], r: ShareRole) => i?.find((i) => i.role === r);
</script>

<div>
	<h2 class="text-xl">Liste freigeben</h2>
	<div class="mt-4 flex gap-4 items-end">
		<div class="flex-1">
			<div class="form-control w-full">
				<label class="label" for="role">
					<span class="label-text">Rolle</span>
				</label>
				<select id="role" class="select select-bordered" bind:value={role}>
					<option value="SEE">Nur Ansehen</option>
					<option value="CHECK">Mitarbeiten</option>
					<option selected value="EDIT">Bearbeiten</option>
					<option value="OWNER">Eigentümer</option>
				</select>
			</div>
		</div>
		<button class="btn btn-primary" on:click={onCreateShareLink}> Link erzeugen </button>
	</div>
</div>

<ShareLinkModal
	bind:this={modal}
	{loading}
	invitation={role ? getInvitation(invitations, role) : undefined}
/>

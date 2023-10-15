<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import ListForm from '$lib/components/listForm/ListForm.svelte';
	import List from '../_/components/List.svelte';
	import GroupLink from '../_/components/GroupLink.svelte';

	export let data: PageData;

	// Client API:
	const { form, enhance, capture, restore, delayed, submitting } = superForm(data.form, {
		dataType: 'json',
		taintedMessage: null
	});

	export const snapshot = { capture, restore };
</script>

<div class="flex flex-col gap-2 pt-3">
	{#if $submitting || $delayed}
		<div class="flex flex-col gap-4">
			{#if $form.items?.length}
				<List items={$form.items} disabled={!data.permissions.canCheck} loading />
			{/if}

			{#if $form.groups?.length}
				<div class="pt-4 flex flex-col gap-4">
					{#each $form.groups as group}
						<GroupLink {group} loading />
					{/each}
				</div>
			{/if}
		</div>
	{:else}
		<ListForm {form} {enhance} />
	{/if}
</div>

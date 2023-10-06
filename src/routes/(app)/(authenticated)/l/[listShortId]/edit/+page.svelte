<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import ListForm from '$lib/components/listForm/ListForm.svelte';

	export let data: PageData;

	// Client API:
	const { form, enhance, capture, restore } = superForm(data.form, {
		dataType: 'json',
		taintedMessage: null
	});

	export const snapshot = { capture, restore };
</script>

<div class="flex flex-col gap-2 pt-3">
	<ListForm {form} {enhance} />
</div>

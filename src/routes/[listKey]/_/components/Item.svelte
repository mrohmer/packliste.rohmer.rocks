<script lang="ts">
	import Checkbox from '$lib/components/control/Checkbox.svelte';
	import { slide } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

	const dispatcher = createEventDispatcher();

	export let isEdit: boolean;
	export let key: string;
	export let label: string;
	export let state: boolean;
	export let isRemovedItem = false;
</script>

<div class="sm:pl-10" transition:slide|local>
	<div>
		{#key key}
			<div class="flex items-center pr-1">
				<Checkbox class="checkbox flex-1"
									checked="{state}"
									on:change
				>
					{label}
				</Checkbox>
				{#if isEdit && isRemovedItem}
					<button class="btn btn-sm" on:click={() => dispatcher('remove')}>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
								 stroke="currentColor" class="size-4 mr-1">
							<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
						</svg>
						hinzufügen
					</button>
				{:else if isEdit}
					<button class="btn btn-sm" on:click={() => dispatcher('remove')}>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
								 stroke="currentColor" class="size-4 mr-1">
							<path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
						</svg>
						entfernen
					</button>
				{/if}
			</div>
		{/key}
	</div>
</div>

<script lang="ts">
	import { slide } from 'svelte/transition';
	import { createEventDispatcher, getContext, onMount } from 'svelte';

	export let open = false;
	export let disabled = false;

	const dispatch = createEventDispatcher();

	export const close = () => toggleOpen(false);
	const toggleOpen = (force?: boolean) => {
		if (disabled) {
			return;
		}
		if (typeof force !== 'boolean') {
			return toggleOpen(!open);
		}
		if (open === force) {
			return;
		}
		open = force;
		dispatch('toggle', { open });
		dispatch(open ? 'open' : 'close', { open });
		if (open) {
			openPanel(thisPanel);
		}
	};

	const context = getContext('expansion-panel-group');
	const addPanel = context?.addPanel ?? ((a: any) => undefined);
	const removePanel = context?.removePanel ?? ((a: any) => undefined);
	const openPanel = context?.openPanel ?? ((a: any) => undefined);
	const thisPanel = { close };


	onMount(() => {
		addPanel(thisPanel);
		return () => removePanel(thisPanel);
	});
</script>

<div>
	<button
		class="flex w-full cursor-pointer bg-none leading-none border-none m-0 outline-[none] py-3 text-left active:bg-none"
		class:panel__header--empty={$$slots.header}
		on:click={() => toggleOpen()}
	>
        <span class="flex-1 leading-6">
            <slot name="header" />
        </span>
		<i class="leading-[0.5] transition-all" class:rotate-180={open && !disabled} class:opacity-50={disabled}>
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
					 class="size-4">
				<path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
			</svg>
		</i>
	</button>

	{#if open && !disabled}
		<div class="m-0 pb-4" transition:slide|local>
			<slot />
		</div>
	{/if}
</div>

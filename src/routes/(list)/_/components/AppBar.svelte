<script lang="ts">
	import Button from '$lib/components/control/Button.svelte';
	import type { Writable } from 'svelte/store';

	export let isEdit: Writable<boolean>;
</script>

<div class="py-1 px-2 my-6 flex items-center sticky top-0 bg-white dark:bg-zinc-800 z-10 transition-colors">
	<a href="/" class="block py-3 px-5 -ml-2.5 mr-1.5">
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
			<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
		</svg>
	</a>

	<h1 class="flex-1 text-2xl"><slot /></h1>

	<div class="hidden sm:block">
		{#if $isEdit}
			<Button sm on:click={() => isEdit.set(!$isEdit)}>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
						 stroke="currentColor"
						 class="size-4 mr-1">
					<path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
				</svg>
				speichern
			</Button>
		{:else}
			<Button sm on:click={() => isEdit.set(!$isEdit)}>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
						 stroke="currentColor"
						 class="size-4 mr-1">
					<path stroke-linecap="round" stroke-linejoin="round"
								d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />

				</svg>
				bearbeiten
			</Button>
		{/if}
	</div>
	<div class="block sm:hidden">
		{#if $isEdit}
			<Button sm on:click={isEdit.set(!$isEdit)}>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
						 stroke="currentColor"
						 class="size-4 mr-1">
					<path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
				</svg>
			</Button>
		{:else}
			<Button sm on:click={isEdit.set(!$isEdit)}>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
						 stroke="currentColor"
						 class="size-4 mr-1">
					<path stroke-linecap="round" stroke-linejoin="round"
								d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />

				</svg>
			</Button>
		{/if}
	</div>
</div>

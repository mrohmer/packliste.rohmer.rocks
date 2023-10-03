<script lang="ts">
	import Icon from './Icon.svelte';

	let klass: string;
	export let disabled = false;
	export let variant: 'button' | 'icon' = 'button';

	export { klass as class };
</script>

<button
	on:click
	{disabled}
	class="bg-transparent border border-neutral-500 rounded px-4 py-2.5 cursor-pointer mr-2.5 mb-2.5 transition-colors hover:bg-gray-100 dark:border-neutral-400 dark:hover:bg-gray-700 {klass}"
>
	{#if variant === 'icon'}
		<Icon>
			<slot />
		</Icon>
	{:else}
		<slot />
	{/if}
</button>

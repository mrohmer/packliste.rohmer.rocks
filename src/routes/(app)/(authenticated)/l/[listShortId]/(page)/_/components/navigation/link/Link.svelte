<script lang="ts">
	import { page } from '$app/stores';

	export let href: string;
	export let suppressHighlight = false;
	$: highlight = !suppressHighlight && $page?.url?.pathname === href;
</script>

<a
	{href}
	class="lnk flex gap-2 px-3 py-2 items-center min-h-12 rounded-xl transition-colors"
	class:highlight
>
	<slot />
</a>

<style lang="postcss">
	.lnk {
		@apply hover:bg-base-200/50;
	}
	.lnk.highlight {
		@apply bg-base-200;
	}
</style>

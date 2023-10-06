<script lang="ts">
	import { navigating } from '$app/stores';

	export let open = false;

	$: $navigating !== null && (open = false);
</script>

<div class="drawer md:drawer-open">
	<input id="my-drawer-2" type="checkbox" class="drawer-toggle" bind:checked={open} />
	<div class="drawer-content">
		<slot />
	</div>
	<div class="drawer-side">
		<label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay" />
		<ul class="menu w-80 min-h-full bg-base-100 md:bg-base-200/20 md:border-r text-base-content">
			<slot name="sidebar" />
		</ul>
	</div>
</div>

<style lang="postcss">
	@media (max-width: 1023px) {
		.drawer:not(.drawer-open) .drawer-side {
			@apply top-20;
		}
	}
</style>

<script lang="ts">
	export let withName = true;
</script>

<div class="root flex items-center gap-5 w-fit">
	<img class="logo block invert h-8 w-8 transition-all" src="/icons/icon_100.png" alt="checkbox" />
	{#if withName}
		<div class="claim">
			<h1 class="text-3xl font-extralight">Packliste</h1>
		</div>
	{/if}
</div>

<style lang="postcss">
	.root {
		view-transition-name: logo;
	}
</style>

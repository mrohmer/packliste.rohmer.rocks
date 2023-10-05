<script lang="ts">
	export let withName = true;
</script>

<div class="flex items-center gap-5">
	<img class="block invert h-8 w-8 transition-all" src="/icons/icon_100.png" alt="checkbox" />
	{#if withName}
		<div>
			<h1 class="text-3xl font-extralight">Packliste</h1>
		</div>
	{/if}
</div>

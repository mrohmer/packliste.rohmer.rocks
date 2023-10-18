<script lang="ts">
	export let count: number | undefined;
</script>

<div class="grid grid-cols-1 gap-4 w-full" class:min-[400px]:grid-cols-2={count > 3}>
	<slot />
</div>

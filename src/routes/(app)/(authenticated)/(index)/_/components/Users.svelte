<script lang="ts">
	export let prefix: string;
</script>

<div class="flex items-end">
	<div class="text-xs text-neutral-500">{prefix}</div>
	<slot />
</div>

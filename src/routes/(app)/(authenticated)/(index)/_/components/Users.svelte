<script lang="ts">
	export let prefix: string;
</script>

<div class="flex items-end">
	<div class="text-xs text-neutral-500 font-extralight">{prefix}</div>
	<slot />
</div>

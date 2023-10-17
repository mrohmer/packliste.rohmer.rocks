<script lang="ts">
	import ProgressBar from './ProgressBar.svelte';

	export let percentage: number;
</script>

<div class="w-full h-1 bg-base-100 z-30 fixed inset-x-0">
	<ProgressBar {percentage} />
</div>
<div class="h-1" />

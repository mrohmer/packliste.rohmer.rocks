<script lang="ts">
	import type { Progress } from '$lib/utils/progress';

	export let percentage: Progress['percentage'];
	export let condensed = false;
</script>

<div
	class="h-full absolute left-0 inset-y-0 transition-all"
	style:width={`${percentage}%`}
	class:opacity-20={condensed}
	class:rounded-xl={condensed}
	class:bg-primary={percentage < 100}
	class:bg-green-500={percentage === 100}
/>

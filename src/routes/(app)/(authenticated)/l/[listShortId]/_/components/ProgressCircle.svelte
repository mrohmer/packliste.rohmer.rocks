<script lang="ts">
	import type { Progress } from '$lib/utils/progress';

	export let percentage: Progress['percentage'];
</script>

<div
	class="radial-progress font-light"
	class:text-primary={percentage < 100}
	class:text-green-500={percentage === 100}
	style="--value:{percentage}; --size:2rem; --thickness: 1.5px;"
>
	<span class="text-center text-base-content"
		><span class="text-[10px]">{percentage}</span><span class="text-[5px]">%</span></span
	>
</div>

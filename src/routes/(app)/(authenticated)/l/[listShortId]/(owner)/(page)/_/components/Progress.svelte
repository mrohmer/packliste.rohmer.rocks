<script lang="ts">
	export let percentage: number;
</script>

<div class="w-full h-1 bg-base-100">
	<div
		class="bg-primary h-full absolute left-0 inset-y-0 transition-all"
		style:width={`${percentage}%`}
	/>
</div>

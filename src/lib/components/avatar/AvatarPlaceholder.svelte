<script lang="ts">
	import AvatarBase from '$lib/components/avatar/AvatarBase.svelte';

	export let title: string;
	export let small = false;
</script>

<AvatarBase placeholder {title} {small}>
	<div class="bg-neutral-focus text-neutral-content rounded-full w-full h-full">
		<span class:text-lg={!small} text-sm={small}>
			<slot />
		</span>
	</div>
</AvatarBase>

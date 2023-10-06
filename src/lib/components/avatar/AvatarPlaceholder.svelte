<script lang="ts">
	import AvatarBase from '$lib/components/avatar/AvatarBase.svelte';

	export let title: string;
</script>

<AvatarBase placeholder {title}>
	<div class="bg-neutral-focus text-neutral-content rounded-full w-10 h-10">
		<span class="text-lg">
			<slot />
		</span>
	</div>
</AvatarBase>

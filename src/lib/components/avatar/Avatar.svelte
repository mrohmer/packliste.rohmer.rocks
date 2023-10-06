<script lang="ts">
	import AvatarPlaceholder from '$lib/components/avatar/AvatarPlaceholder.svelte';

	export let username: string;
	export let small = false;
	$: initials = username
		?.split(' ')
		.filter(Boolean)
		.map((i) => i.charAt(0).toUpperCase())
		.join('');
</script>

{#if initials?.length}
	<AvatarPlaceholder title={username} {small}>
		{initials ?? ''}
	</AvatarPlaceholder>
{/if}

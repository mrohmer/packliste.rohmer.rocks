<script lang="ts">
	import AvatarPlaceholder from '$lib/components/avatar/AvatarPlaceholder.svelte';

	export let username: string;
	$: initials = username
		?.split(' ')
		.filter(Boolean)
		.map((i) => i.charAt(0).toUpperCase())
		.join('');
</script>

{#if initials?.length}
	<AvatarPlaceholder title={username}>
		{initials ?? ''}
	</AvatarPlaceholder>
{/if}

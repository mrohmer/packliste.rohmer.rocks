<script lang="ts">
	import { onMount } from 'svelte';
	import { signOut } from '@auth/sveltekit/client';

	onMount(async () => {
		await signOut({ callbackUrl: '/auth/login' });
	});
</script>

<svelte:head>
	<title>Logout</title>
</svelte:head>

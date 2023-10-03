<script>
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
</script>

<h1>SvelteKit Auth Example</h1>
<div>
	{#if $page.data.session}
		{#if $page.data.session.user?.image}
			<div style="background-image: url('{$page.data.session.user.image}')" class="avatar" />
		{/if}
		<div class="signedInText">
			<small>Signed in as</small><br />
			<strong>{$page.data.session.user?.name ?? 'User'}</strong>
		</div>
		<button on:click={() => signOut()} class="button">Sign out</button>
	{:else}
		<div class="notSignedInText">You are not signed in</div>
		<button on:click={() => signIn('google')}>Sign In with Google</button>
	{/if}
</div>

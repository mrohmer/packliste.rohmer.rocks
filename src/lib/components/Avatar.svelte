<script lang="ts">
	export let username: string;
	$: initials = username
		?.split(' ')
		.filter(Boolean)
		.map((i) => i.charAt(0).toUpperCase())
		.join('');
</script>

<div class="bg-neutral-focus text-neutral-content rounded-full w-10">
	<span class="text-lg">{initials ?? ''}</span>
</div>

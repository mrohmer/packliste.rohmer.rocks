<script lang="ts">
	export let placeholder = false;
	export let small = false;
	export let title: string;
</script>

<div
	class="avatar"
	class:placeholder
	class:w-10={!small}
	class:h-10={!small}
	class:h-8={small}
	class:w-8={small}
	class:border-2={small}
	{title}
>
	<slot />
</div>

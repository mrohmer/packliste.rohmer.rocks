<script lang="ts">
	export let placeholder = false;
	export let title: string;
</script>

<div class="avatar" class:placeholder {title}>
	<slot />
</div>

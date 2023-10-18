<script lang="ts">
	export let id: string;
	export let value: string;
	export let loading = false;
</script>

<div class="form-control w-full overflow-hidden rounded-lg">
	{#if $$slots.default}
		<label class="label" for={id}>
			<span class="label-text">
				<slot />
			</span>
		</label>
	{/if}
	<select {id} class="select select-bordered" bind:value on:change>
		<slot name="options" />
	</select>
	{#if loading}
		<progress class="top-0 opacity-75 progress h-1 absolute bg-transparent inset-x-px w-auto" />
	{/if}
</div>

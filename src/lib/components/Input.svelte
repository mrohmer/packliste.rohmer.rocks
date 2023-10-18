<script lang="ts">
	export let id = `input-${Math.floor(Math.random() * 10000000000)}`;
	export let value = '';
	export let placeholder: string | undefined;
</script>

<div class="form-control w-full">
	{#if $$slots.default || $$slots.labelTopRight}
		<label class="label" for={id}>
			{#if $$slots.default}
				<span class="label-text">
					<slot />
				</span>
			{/if}
			{#if $$slots.labelTopRight}
				<span class="label-text-alt">
					<slot name="labelTopRight" />
				</span>
			{/if}
		</label>
	{/if}
	<input {id} type="text" bind:value {placeholder} class="input input-bordered w-full" />
	{#if $$slots.labelBottomLeft || $$slots.labelBottomRight}
		<label class="label" for={id}>
			{#if $$slots.labelBottomLeft}
				<span class="label-text-alt">
					<slot name="labelBottomLeft" />
				</span>
			{/if}
			{#if $$slots.labelBottomRight}
				<span class="label-text-alt">
					<slot name="labelBottomRight" />
				</span>
			{/if}
		</label>
	{/if}
</div>

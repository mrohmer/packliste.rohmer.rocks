<script lang="ts">
	import type { ListItemState } from '@prisma/client';
	import { ListPageContext, type Operation } from '$lib/contexts/list-page';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let id: string;
	export let name: string;
	export let count: number;
	export let state: ListItemState | undefined;

	export let disabled = false;
	export let loading = false;

	const { change } = ListPageContext.use();
	const handleChange = async (id: string, operation: Operation) => {
		if (disabled || loading) {
			return;
		}
		await change(id, operation, (value) => {
			state = {
				...(state ?? {}),
				state: value
			};
			dispatch('update');
		});
	};
	const increment = () => handleChange(id, 'increment');
	const decrement = () => handleChange(id, 'decrement');
	const toggle = (event) => (event.target.checked ? increment() : decrement());
</script>

{#if loading}
	<div class="animate-pulse flex gap-2 px-3 items-center">
		<div class="flex-1">
			<div class="max-w-[50%] h-5 bg-base-200 rounded-full" />
		</div>
		<div class="w-20 flex justify-center">
			<div class="w-6 h-6 bg-base-200 rounded-lg" />
		</div>
	</div>
{:else}
	{#key id}
		<div
			class="flex gap-2 px-3 items-center transition-opacity select-none"
			class:cursor-pointer={!disabled}
			class:cursor-not-allowed={disabled}
			class:py-1={count === 1}
			class:opacity-50={state?.state === count}
		>
			{#if count === 1}
				<label for="item-{id}" class="flex-1 text-lg strike" class:cursor-not-allowed={disabled}>
					<span class="strike" class:strike-through={state?.state === count}>{name}</span>
				</label>
				<div class="w-20 flex justify-center">
					<input
						id="item-{id}"
						type="checkbox"
						checked={state?.state === 1}
						class="checkbox"
						on:change={toggle}
						{disabled}
					/>
				</div>
			{:else}
				<button
					class="flex-1 text-lg text-left"
					class:cursor-not-allowed={disabled}
					on:click={increment}
					{disabled}
				>
					<span class="strike" class:strike-through={state?.state === count}>{name}</span>
				</button>
				<div class="w-20 flex justify-center">
					<div class="join scale-75 origin-center">
						<button class="btn join-item py-1 px-3" on:click={decrement} {disabled}>-</button>
						<input
							class="input input-bordered join-item w-10 p-0 text-center !bg-white"
							disabled
							type="text"
							value={state?.state ?? 0}
						/>
						<button class="btn join-item py-0 px-3" on:click={increment} {disabled}>+</button>
					</div>
				</div>
			{/if}
		</div>
	{/key}
{/if}

<style lang="postcss">
	.strike {
		@apply line-through transition-colors;
		text-decoration-color: transparent;
	}

	.strike-through {
		text-decoration-color: black;
	}
</style>

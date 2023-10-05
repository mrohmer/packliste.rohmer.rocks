<script lang="ts">
	import type { ListItemState } from '@prisma/client';
	import { ListPageContext, type Operation } from '$lib/contexts/list-page';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let id: string;
	export let name: string;
	export let count: number;
	export let state: ListItemState | undefined;

	const { change } = ListPageContext.use();
	const handleChange = (id: string, operation: Operation) =>
		change(id, operation, (value) => {
			state = {
				...(state ?? {}),
				state: value
			};
			dispatch('update');
		});
	const increment = () => handleChange(id, 'increment');
	const decrement = () => handleChange(id, 'decrement');
	const toggle = (event) => (event.target.checked ? increment() : decrement());
</script>

{#key id}
	<div
		class="flex gap-2 px-3 cursor-pointer items-center transition-opacity select-none"
		class:py-1={count === 1}
		class:opacity-50={state?.state === count}
	>
		{#if count === 1}
			<label for="item-{id}" class="flex-1 text-lg strike">
				<span class="strike" class:strike-through={state?.state === count}>{name}</span>
			</label>
			<div class="w-20 flex justify-center">
				<input
					id="item-{id}"
					type="checkbox"
					checked={state?.state === 1}
					class="checkbox"
					on:change={toggle}
				/>
			</div>
		{:else}
			<button class="flex-1 text-lg text-left" on:click={increment}>
				<span class="strike" class:strike-through={state?.state === count}>{name}</span>
			</button>
			<div class="w-20 flex justify-center">
				<div class="join scale-75 origin-center">
					<button class="btn join-item py-1 px-3" on:click={decrement}>-</button>
					<input
						class="input input-bordered join-item w-10 p-0 text-center !bg-white"
						disabled
						type="text"
						value={state?.state ?? 0}
					/>
					<button class="btn join-item py-0 px-3" on:click={increment}>+</button>
				</div>
			</div>
		{/if}
	</div>
{/key}

<style lang="postcss">
	.strike {
		@apply line-through transition-colors;
		text-decoration-color: transparent;
	}

	.strike-through {
		text-decoration-color: black;
	}
</style>

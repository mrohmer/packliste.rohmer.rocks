<script lang="ts">
	export type Color = 'green' | 'red' | 'gray';
	export type Side = 'left' | 'right';
	export let color: Color = 'gray';
	export let panning = false;
	export let threshold = 0;
	export let transform = 0;
	export let side: Side = 'left';
</script>

<div
	class="absolute top-0 bottom-0 w-24 bg-neutral-100 text-center rounded-tl rounded-bl leading-10"
	class:transition-all={!panning}
	class:text-white={['red', 'green'].includes(color)}
	class:bg-red-700={color === 'red'}
	class:bg-green-500={color === 'green'}
	class:rounded-tl={side === 'right'}
	class:rounded-bl={side === 'right'}
	class:rounded-tr={side === 'left'}
	class:rounded-br={side === 'left'}
	style="width: {threshold}px; left: {side === 'left'
		? `-${threshold - transform}px;`
		: `calc(100% + ${transform}px)`};"
>
	<slot />
</div>

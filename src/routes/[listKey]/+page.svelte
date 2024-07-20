<script lang="ts">
	import List from './_/components/List.svelte';
	import BottomSheet from './_/components/BottomSheet.svelte';
	import type { PageData } from './$types';
	import Icon from '$lib/components/control/Icon.svelte';
	import { writable } from 'svelte/store';
	import { setContext } from 'svelte';
	import { createContext } from './_/context/list';

	let isEdit = writable(false);

	createContext(isEdit);

	export let data: PageData;
</script>

{#if data}
	<div class="py-1 px-2 my-6 flex items-center sticky top-0 bg-white dark:bg-zinc-800 z-10 transition-colors">
		<a href="/" class="block py-3 px-5 -ml-2.5 mr-1.5">
			<Icon>chevron-left</Icon>
		</a>
		<h1 class="flex-1 text-2xl">{data.list.label}</h1>

		<button on:click={isEdit.set(!$isEdit)}>
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
					 class="size-5">
				{#if $isEdit}
					<path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
				{:else}
					<path stroke-linecap="round" stroke-linejoin="round"
								d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />

				{/if}
			</svg>
		</button>
	</div>

	<List list={data.list}></List>

	<BottomSheet list={data.list} disabled={$isEdit}></BottomSheet>
{:else}
	loading...
{/if}

<script lang="ts">
	import List from '../_/components/List.svelte';
	import BottomSheet from '../_/components/BottomSheet.svelte';
	import type { PageData } from './$types';
	import { writable } from 'svelte/store';
	import { createContext } from '../_/context/list';
	import AppBar from '../_/components/AppBar.svelte';

	let isEdit = writable(false);

	createContext(isEdit);

	export let data: PageData;
</script>

{#if data}
	<AppBar {isEdit}>{data.list.label}</AppBar>

	<List list={data.list}></List>

	<BottomSheet list={data.list} disabled={$isEdit}></BottomSheet>
{:else}
	loading...
{/if}

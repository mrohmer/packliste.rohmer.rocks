<script lang="ts">
	import type { PageData } from './$types';
	import List from '../../_/components/List.svelte';

	export let data: PageData;
</script>

{#if data.group?.items?.length}
	<div class="flex flex-col gap-4">
		<List items={data.group.items} disabled={!data.permissions.canCheck} />
	</div>
{/if}

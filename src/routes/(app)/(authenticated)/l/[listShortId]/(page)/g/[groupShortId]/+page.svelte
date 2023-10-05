<script lang="ts">
	import type { PageData } from './$types';
	import Content from '$lib/components/Content.svelte';
	import List from '../../_/components/List.svelte';

	export let data: PageData;
</script>

{#if data.group?.items?.length}
	<Content>
		<div class="flex flex-col gap-4">
			<List items={data.group.items} />
		</div>
	</Content>
{/if}

<script lang="ts">
	import type { PageData } from './$types';
	import { ListPageContext } from '$lib/contexts/list-page';

	export let data: PageData;

	ListPageContext.create(data.list);
</script>

<slot />

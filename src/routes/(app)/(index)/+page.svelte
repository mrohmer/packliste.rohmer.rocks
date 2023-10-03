<script lang="ts">
	import type { PageData } from './$types';
	import Header from './_/components/Header.svelte';
	import ListItem from './_/components/ListItem.svelte';
	import ListList from './_/components/ListList.svelte';

	export let data: PageData;
</script>

<div class="w-full max-w-2xl px-2 mx-auto flex flex-col gap-2">
	<Header />
	<div>
		<h2 class="text-2xl mb-2">Meine Listen</h2>

		<div class="flex flex-col gap-4">
			{#if data?.lists?.length}
				<ListList count={data.lists.length}>
					{#each data.lists as { id, name }}
						<ListItem href="/list/{id}">
							{name}
						</ListItem>
					{/each}
				</ListList>
			{:else}
				<div class="text-lg">Noch keine Listen angelegt</div>
			{/if}
			<div class="divider my-1 h-px" />
			<a href="/add" class="btn"> Neue Liste anlegen </a>
			<div class="min-h-16">
				{#await data?.streamed?.templates}
					<div class="h-16 w-full flex items-center justify-center absolute left-0 right-0 top-0">
						<div class="loading loading-spinner loading-md" />
					</div>
				{:then templates}
					{#if templates?.length}
						<div class="pt-4">
							<div class="text-md mb-2">Lass dich von diesen Vorlagen inspirieren</div>
							<ListList count={templates.length}>
								{#each templates as { label, groups, key, path } (key)}
									<ListItem
										href="/add/{path}"
										itemCount={groups?.reduce((prev, curr) => prev + (curr?.items?.length ?? 0), 0)}
									>
										{label}
									</ListItem>
								{/each}
							</ListList>
						</div>
					{/if}
				{/await}
			</div>
		</div>
	</div>
</div>

<script lang="ts">
	import Item from './Item.svelte';
	import Group from './Group.svelte';
	import GroupBorder from './GroupBorder.svelte';
	import Input from '$lib/components/Input.svelte';
	import type { SuperForm } from 'sveltekit-superforms/client';

	export let form: SuperForm<any>['form'];
	export let enhance: SuperForm<any>['enhance'];

	const fb = (value: string, fallback) => (value?.trim() ? value : fallback);
	const confirmDelete = (name: string) => confirm(`Willst du ${name.trim()} wirklich löschen?`);

	const onAddGroup = () => () => {
		$form.groups = [...($form.groups ?? []), {}];
	};
	const onAddItemInGroup = (index: number) => () => {
		if (!$form.groups.length) {
			return;
		}
		$form.groups = $form.groups.map((group, i) =>
			i === index
				? {
						...group,
						items: [
							...(group.items ?? []),
							{
								count: 1
							}
						]
				  }
				: group
		);
	};
	const onAddItem = () => () => {
		$form.items = [
			...($form.items ?? []),
			{
				count: 1
			}
		];
	};
	const onDeleteGroup = (index: number) => () => {
		const group = $form.groups?.[index];
		if (!group) {
			return;
		}
		if (!confirmDelete(fb(group.name, `Gruppe ${index + 1}`))) {
			return;
		}

		$form.groups = $form.groups.filter((_, i) => index !== i);
	};
	const onDeleteItemInGroup =
		(groupIndex: number) =>
		({ detail: itemIndex }) => {
			const group = $form.groups?.[groupIndex];
			const item = group?.items?.[itemIndex];
			if (!group || !item) {
				return;
			}
			const name = `${fb(item.name, `Element ${itemIndex + 1}`)} in ${fb(
				group.name,
				`Gruppe ${groupIndex + 1}`
			)}`;
			if (!confirmDelete(name)) {
				return;
			}

			group.items = group.items.filter((_, i) => itemIndex !== i);
			$form.groups = $form.groups.map((g, i) => (groupIndex === i ? group : g));
		};
	const onDeleteItem = (index: number) => () => {
		const item = $form.items?.[index];
		if (!item) {
			return;
		}

		if (!confirmDelete(fb(item.name, `Element ${index + 1}`))) {
			return;
		}

		$form.items = $form.items.filter((_, i) => index !== i);
	};
</script>

<form method="POST" use:enhance class="flex flex-col gap-4">
	{#if $form.id}
		<input type="hidden" name="id" value={$form.id} />
	{/if}

	<Input bind:value={$form.name}>Name</Input>

	<GroupBorder
		title="Elemente"
		subTitle={$form.items?.length ? `${$form.items.length} Elemente` : undefined}
		on:add={onAddItem()}
	>
		{#each $form.items ?? [] as _, index}
			<Item bind:value={$form.items[index]} on:delete={onDeleteItem(index)} />
		{/each}
	</GroupBorder>

	{#each $form.groups ?? [] as _, index (index)}
		<Group
			bind:value={$form.groups[index]}
			{index}
			on:add={onAddItemInGroup(index)}
			on:delete={onDeleteGroup(index)}
			on:deleteItem={onDeleteItemInGroup(index)}
		/>
	{/each}

	<button class="btn" type="button" on:click={onAddGroup()}> Gruppe hinzufügen</button>

	<button class="btn btn-primary" type="submit">Submit</button>
</form>

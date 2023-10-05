import { getContext, setContext } from 'svelte';
import type { List, ListGroup, ListItem, ListItemState } from '@prisma/client';

const onChangeKey = '[ListPage] onChange';

const findItem = (list: CompleteList, id: string): ListItemWithState | undefined =>
	list?.items?.find((item) => item.id === id) ??
	list?.groups?.reduce(
		(prev, curr) => prev ?? curr.items?.find((item) => item.id === id),
		undefined as ListItemWithState | undefined
	);

const onChangeHandler =
	(list: CompleteList) => async (id: string, operation: Operation, update: UpdateCallback) => {
		const item = findItem(list, id);
		if (!item) {
			return;
		}

		const oldValue = item.state?.state ?? 0;

		if (!item.state) {
			item.state = {};
		}
		item.state.state = Math.min(
			Math.max(oldValue + (operation === 'increment' ? 1 : -1), 0),
			item.count
		);

		if (item.state.state === oldValue) {
			return;
		}

		update(item.state.state);

		try {
			await fetch(`/api/items/${id}/state`, {
				method: 'PATCH',
				body: JSON.stringify([
					{
						operation,
						path: '/state'
					}
				])
			});
		} catch (e) {
			console.error(e);
			item.state.state = oldValue;
		}
	};

export const ListPageContext = {
	create: (list: CompleteList) => setContext(onChangeKey, onChangeHandler(list)),
	use: () => ({
		change: getContext<ReturnType<typeof onChangeHandler>>(onChangeKey)
	})
};

type ListItemWithState = ListItem & Partial<Record<'state', Partial<ListItemState>>>;
type WithListItems<T> = T & Partial<Record<'items', ListItemWithState[]>>;
type WithGroups<T> = T & Partial<Record<'groups', WithListItems<ListGroup>[]>>;
type CompleteList = WithGroups<WithListItems<List>>;

export type Operation = 'increment' | 'decrement';
export type UpdateCallback = (value: number) => void;

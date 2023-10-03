import { db } from '../index';
import type { IList, IListItem } from '../../model/list';

const getComplete = (listKey: string): Promise<number> =>
	db.items
		.where({ listKey })
		.filter(({ state, irrelevant }) => state && !irrelevant)
		.count();
const getTotal = async (list: IList): Promise<number> => {
	const irrelevantItems = await db.items
		.where({ listKey: list.key })
		.filter(({ irrelevant }) => irrelevant)
		.toArray();
	return (
		list?.groups
			?.reduce((prev, curr) => [...prev, ...curr.items], [] as IListItem[])
			.filter(({ key }) => !irrelevantItems.some(({ itemKey }) => itemKey === key)).length ?? 0
	);
};

export const getListStatus = async (
	list: IList
): Promise<Record<'completed' | 'total', number>> => {
	const completed = await getComplete(list.key);
	const total = await getTotal(list);

	return { completed, total };
};

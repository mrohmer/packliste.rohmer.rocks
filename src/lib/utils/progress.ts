import type {
	ListGroupWithItemsAndState,
	ListItemWithState,
	ListWithItemsAndGroupsAndState
} from '$lib/model/db-types-with-includes';

type Count = Record<'total' | 'done', number>;
type Progress = Count & Record<'percentage', number>;
const createEmptyCount = (): Count => ({ total: 0, done: 0 });
const sumCounts = (counts: Count[] | undefined) => {
	if (!counts?.length) {
		return createEmptyCount();
	}
	return counts.filter(Boolean).reduce(
		(prev, curr) => ({
			total: prev.total + curr.total,
			done: prev.done + curr.done
		}),
		createEmptyCount()
	);
};
const calcProgress = (count: Count): Progress => ({
	...count,
	percentage: Math.round((count.total > 0 ? count.done / count.total : 0) * 100)
});

const countInItems = (items: ListItemWithState[] | undefined): Count =>
	items?.reduce(
		(prev, curr) => ({
			total: prev.total + curr.count,
			done: prev.done + (curr.state?.state ?? 0)
		}),
		createEmptyCount()
	) ?? createEmptyCount();
const countInGroup = (group: ListGroupWithItemsAndState | undefined) => {
	if (!group?.items?.length) {
		return createEmptyCount();
	}
	return countInItems(group.items);
};
const countInGroups = (groups: ListGroupWithItemsAndState[] | undefined): Count =>
	sumCounts(groups?.map((group) => countInGroup(group)));

const countInList = (list: ListWithItemsAndGroupsAndState): Count =>
	sumCounts([countInItems(list.items), countInGroups(list.groups)]);

export const calcProgressInList = (list: ListWithItemsAndGroupsAndState): Progress =>
	calcProgress(countInList(list));
export const calcProgressInGroup = (group: ListGroupWithItemsAndState): Progress =>
	calcProgress(countInGroup(group));
export const calcProgressInItems = (items: ListItemWithState[]): Progress =>
	calcProgress(countInItems(items));

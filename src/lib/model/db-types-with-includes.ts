import type { List, ListGroup, ListItem, ListItemState } from '@prisma/client';

type PR<Key extends string, Type> = Partial<Record<Key, Type>>;
export type ListItemWithState = ListItem & PR<'state', ListItemState>;
export type ListGroupWithItems = ListGroup & PR<'items', ListItem[]>;
export type ListGroupWithItemsAndState = ListGroup & PR<'items', ListItemWithState[]>;
export type ListWithItemsAndGroups = List &
	PR<'items', ListItem[]> &
	PR<'groups', ListGroupWithItems[]>;
export type ListWithItemsAndGroupsAndState = List &
	PR<'items', ListItemWithState[]> &
	PR<'groups', ListGroupWithItemsAndState[]>;

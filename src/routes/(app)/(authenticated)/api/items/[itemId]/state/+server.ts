import type { RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';
import { prisma } from '$lib/server/db';
import { getUserId } from '$lib/server/api/get-user-id';
import type { ListItem, ListItemState } from '@prisma/client';
import { diff } from 'deep-object-diff';

export const PATCH: RequestHandler = async ({ params, locals, request }) => {
	if (!params.itemId?.trim()) {
		throw error(404);
	}

	const userId = await getUserId(locals);

	const listParams = {
		OR: [
			{ userId },
			{
				shares: {
					some: {
						sharedWithUserId: userId,
						role: {
							in: ['OWNER', 'EDIT', 'CHECK']
						}
					}
				}
			}
		]
	};
	const item = await prisma.listItem.findUnique({
		where: {
			id: params.itemId,
			OR: [
				{
					list: listParams
				},
				{
					group: {
						list: listParams
					}
				}
			]
		}
	});
	if (!item) {
		throw error(404);
	}

	let state = (await prisma.listItemState.findUnique({
		where: {
			itemId: params.itemId
		}
	})) as ListItemState;

	if (!state) {
		state = {
			itemId: item.id,
			state: 0
		} as ListItemState;
	}

	const operations = (await request.json()) as Op[];
	const changedState = operations
		.filter(
			({ operation, path }) => operation in SUPPORTED_OPERATIONS && SUPPORTED_PATHS.includes(path)
		)
		.reduce((prev, { operation, path }) => applyOp(item, prev, operation, path), state);

	const diffState = diff(state, changedState);
	const result = await prisma.listItemState.upsert({
		where: {
			itemId: item.id
		},
		create: {
			...diffState,
			itemId: item.id,
			updatedAt: new Date(),
			changedByUserId: userId
		},
		update: {
			...diffState,
			updatedAt: new Date(),
			changedByUserId: userId
		}
	});

	return json(result);
};
const applyOp = (
	item: ListItem,
	state: ListItemState,
	operation: SupportedOperation,
	path: SupportedPath
): ListItemState => {
	switch (operation) {
		case 'increment':
			return applyIncrement(item, state, path);
		case 'decrement':
			return applyDecrement(item, state, path);
		default:
			return state;
	}
};
const applyIncrement = (
	item: ListItem,
	state: ListItemState,
	path: SupportedPath
): ListItemState => {
	switch (path) {
		case '/state':
			return {
				...state,
				state: Math.min(state.state + 1, item.count)
			};
		default:
			return state;
	}
};
const applyDecrement = (
	item: ListItem,
	state: ListItemState,
	path: SupportedPath
): ListItemState => {
	switch (path) {
		case '/state':
			return {
				...state,
				state: Math.max(state.state - 1, 0)
			};
		default:
			return state;
	}
};

const SUPPORTED_PATHS = ['/state'] as const;
type SupportedPath = typeof SUPPORTED_PATHS[number];
const SUPPORTED_OPERATIONS = {
	increment: 'increment',
	decrement: 'decrement'
} as const;
type SupportedOperation = typeof SUPPORTED_OPERATIONS[keyof typeof SUPPORTED_OPERATIONS];

interface BaseOp<Operation extends SupportedOperation> {
	operation: Operation;
	path: SupportedPath;
}

type IncrementOp = BaseOp<typeof SUPPORTED_OPERATIONS.increment>;
type DecrementOp = BaseOp<typeof SUPPORTED_OPERATIONS.decrement>;
type Op = IncrementOp | DecrementOp;

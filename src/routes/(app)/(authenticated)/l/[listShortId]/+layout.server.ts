import type { LayoutServerLoad } from './$types';
import { prisma } from '$lib/server/db';
import { error } from '@sveltejs/kit';
import { getUserId } from '$lib/server/api/get-user-id';
import type { ListWithItemsAndGroupsAndState } from '$lib/model/db-types-with-includes';

export const load: LayoutServerLoad = async ({ params, locals }) => {
	if (!params?.listShortId?.trim()) {
		throw error(404);
	}

	const userId = await getUserId(locals);
	const list = (await prisma.list.findUnique({
		where: {
			userId,
			shortId: params.listShortId
		},
		include: {
			items: {
				orderBy: {
					order: 'asc'
				},
				include: {
					state: true
				}
			},
			groups: {
				orderBy: {
					order: 'asc'
				},
				include: {
					items: {
						orderBy: {
							order: 'asc'
						},
						include: {
							state: true
						}
					}
				}
			}
		}
	})) as ListWithItemsAndGroupsAndState;

	if (!list) {
		throw error(404);
	}

	return {
		list
	};
};

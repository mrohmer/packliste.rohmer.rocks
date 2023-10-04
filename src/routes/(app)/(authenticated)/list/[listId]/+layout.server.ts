import type { PageLoad } from './$types';
import { prisma } from '$lib/server/db';
import { error } from '@sveltejs/kit';
import { getUserId } from '$lib/server/api/get-user-id';

export const load: PageLoad = async ({ params, locals }) => {
	if (!params?.listId?.trim()) {
		throw error(404);
	}

	const userId = await getUserId(locals);
	const list = await prisma.list.findUnique({
		where: {
			userId,
			id: params.listId
		},
		include: {
			items: true,
			groups: {
				include: {
					items: true
				}
			}
		}
	});

	if (!list) {
		throw error(404);
	}

	return {
		list
	};
};

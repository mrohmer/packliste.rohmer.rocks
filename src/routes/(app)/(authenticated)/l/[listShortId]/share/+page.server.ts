import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/db';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ parent, depends }) => {
	const { list, permissions } = await parent();

	if (!permissions.canEditPermissions) {
		throw error(403);
	}

	depends(`list:${list.id}:invitations`);

	return {
		invitations: prisma.listInvite.findMany({
			where: {
				listId: list.id
			}
		})
	};
};

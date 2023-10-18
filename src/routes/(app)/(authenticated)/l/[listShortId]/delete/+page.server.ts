import type { PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/db';

export const load: PageServerLoad = async ({ params, parent }) => {
	if (!params.listShortId) {
		throw error(404);
	}

	const { permissions } = await parent();
	if (!permissions.canDelete) {
		throw error(403);
	}

	await prisma.list.delete({
		where: {
			shortId: params.listShortId
		}
	});

	throw redirect(303, '/');
};

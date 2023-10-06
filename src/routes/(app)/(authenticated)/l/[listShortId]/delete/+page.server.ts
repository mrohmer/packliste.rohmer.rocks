import type { PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/db';

export const load: PageServerLoad = async ({ params }) => {
	if (!params.listShortId) {
		throw error(404);
	}

	await prisma.list.delete({
		where: {
			shortId: params.listShortId
		}
	});

	throw redirect(303, '/');
};

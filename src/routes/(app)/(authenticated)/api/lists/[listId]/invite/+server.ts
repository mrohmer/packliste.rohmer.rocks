import type { RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';
import { prisma } from '$lib/server/db';
import { getUserId } from '$lib/server/api/get-user-id';
import { ShareRole } from '@prisma/client';
import { nanoid } from 'nanoid';

export const POST: RequestHandler = async ({ request, params, locals }) => {
	if (!params.listId) {
		throw error(404);
	}

	const { role } = await request.json();
	if (!role || !Object.values(ShareRole).includes(role)) {
		throw error(400);
	}

	const userId = await getUserId(locals);
	const list = await prisma.list.findUnique({
		where: {
			id: params.listId
		},
		include: {
			invites: {
				where: {
					role
				}
			},
			shares: {
				where: {
					sharedWithUserId: userId,
					role: {
						in: [ShareRole.OWNER]
					}
				}
			}
		}
	});

	if (!list) {
		throw error(404);
	}
	if (list.userId !== userId && !list.shares.length) {
		throw error(403);
	}

	if (list.invites.length) {
		return json(list.invites.at(0));
	}

	const result = await prisma.listInvite.create({
		data: {
			code: nanoid(5),
			listId: list.id,
			role
		}
	});

	return json(result);
};

import type { RequestHandler } from './$types';
import { error } from '@sveltejs/kit';
import { ShareRole } from '@prisma/client';
import { prisma } from '$lib/server/db';
import { getUserId } from '$lib/server/api/get-user-id';
import { getPermissions } from '$lib/server/utils/permissions';
import { isAtLeastRole } from '$lib/utils/roles';

export const PUT: RequestHandler = async ({ request, params, locals }) => {
	if (!params.shareId) {
		throw error(404);
	}

	const { role } = await request.json();
	if (!role || !Object.values(ShareRole).includes(role)) {
		throw error(400);
	}

	const userId = await getUserId(locals);
	const share = await prisma.listShare.findUnique({
		where: {
			id: params.shareId
		},
		include: {
			list: {
				include: {
					shares: {
						where: {
							sharedWithUserId: userId
						}
					}
				}
			}
		}
	});

	if (!share?.list) {
		throw error(404);
	}

	const isOwner = share.list.userId === userId;
	const userRole = share.list.shares?.at(0)?.role;

	const { canEditPermissions } = getPermissions(isOwner, userRole);

	if (!canEditPermissions || (!isOwner && !isAtLeastRole(userRole!, role))) {
		throw error(403);
	}

	const result = await prisma.listShare.update({
		where: {
			id: params.shareId
		},
		data: {
			role
		}
	});

	console.log(result);

	return new Response(undefined, { status: 204 });
};

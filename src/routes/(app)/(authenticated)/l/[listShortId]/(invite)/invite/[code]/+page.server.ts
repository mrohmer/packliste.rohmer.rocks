import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { prisma } from '$lib/server/db';
import { getUserId } from '$lib/server/api/get-user-id';

export const load: PageServerLoad = async ({ params, locals }) => {
	if (!params.listShortId?.length || !params.code?.length) {
		throw error(404);
	}

	const invite = await prisma.listInvite.findUnique({
		where: {
			list: {
				shortId: params.listShortId
			},
			code: params.code
		},
		include: {
			list: {
				include: {
					user: {
						select: {
							id: true,
							name: true
						}
					}
				}
			}
		}
	});

	if (!invite?.list) {
		throw error(404);
	}

	const userId = await getUserId(locals);

	if (userId === invite.list.userId) {
		return {
			list: invite.list,
			owner: invite.list.user,
			role: invite.role,
			error: {
				code: 'LIST_OWNER'
			}
		};
	}

	await prisma.listShare.upsert({
		where: {
			listId_sharedWithUserId: {
				sharedWithUserId: userId,
				listId: invite.list.id
			}
		},
		create: {
			sharedWithUserId: userId,
			role: invite.role,
			listId: invite.list.id
		},
		update: {
			role: invite.role
		}
	});

	return {
		list: invite.list,
		owner: invite.list.user,
		role: invite.role
	};
};

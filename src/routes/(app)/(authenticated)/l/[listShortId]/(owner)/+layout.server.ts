import type { LayoutServerLoad } from './$types';
import { prisma } from '$lib/server/db';
import { error } from '@sveltejs/kit';
import { getUserId } from '$lib/server/api/get-user-id';

export const load: LayoutServerLoad = async ({ params, locals }) => {
	if (!params?.listShortId?.trim()) {
		throw error(404);
	}

	const userId = await getUserId(locals);
	const list = await prisma.list.findFirst({
		where: {
			AND: [
				{
					OR: [
						{ userId },
						{
							shares: {
								some: {
									sharedWithUserId: userId
								}
							}
						}
					]
				},
				{
					shortId: params.listShortId
				}
			]
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
			},
			shares: {
				include: {
					sharedWith: {
						select: {
							id: true,
							name: true
						}
					}
				}
			}
		}
	});

	if (!list) {
		throw error(404);
	}

	const isOwner = list.userId === userId;
	const share = isOwner
		? undefined
		: list.shares.find(({ sharedWithUserId }) => sharedWithUserId === userId);

	if (!isOwner && !share) {
		throw error(403);
	}

	return {
		list,
		permissions: {
			canCheck: isOwner || ['OWNER', 'EDIT', 'CHECK'].includes(share!.role),
			canEdit: isOwner || ['OWNER', 'EDIT'].includes(share!.role),
			canEditPermissions: isOwner || ['OWNER'].includes(share!.role)
		}
	};
};

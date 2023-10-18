import type { PageServerLoad } from './$types';
import type { ContentList } from '$lib/model/content-list';
import { getUserId } from '$lib/server/api/get-user-id';
import { prisma } from '$lib/server/db';

export const load: PageServerLoad = async ({ fetch, locals }) => {
	const userId = await getUserId(locals);
	return {
		lists: prisma.list.findMany({
			where: {
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
			include: {
				items: {
					include: {
						state: true
					}
				},
				groups: {
					include: {
						items: {
							include: {
								state: true
							}
						}
					}
				},
				user: {
					select: {
						id: true,
						name: true
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
		}),
		streamed: {
			templates: fetch('/api/templates').then((r: Response) => r.json() as Promise<ContentList[]>)
		}
	};
};

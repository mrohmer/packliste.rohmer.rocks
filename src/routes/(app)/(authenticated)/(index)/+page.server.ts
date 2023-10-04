import type { PageLoad } from './$types';
import type { ContentList } from '$lib/model/content-list';
import { getUserId } from '$lib/server/api/get-user-id';
import { prisma } from '$lib/server/db';

export const load: PageLoad = async ({ fetch, locals }) => {
	const userId = await getUserId(locals);
	return {
		lists: prisma.list.findMany({
			where: { userId }
		}),
		streamed: {
			templates: fetch('/api/templates').then((r: Response) => r.json() as Promise<ContentList[]>)
		}
	};
};

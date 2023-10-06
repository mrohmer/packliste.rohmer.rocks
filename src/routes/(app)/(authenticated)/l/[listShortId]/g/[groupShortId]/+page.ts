import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params, parent }) => {
	if (!params.groupShortId) {
		throw error(404);
	}
	const { list } = await parent();
	const group = list?.groups?.find(({ shortId }) => shortId === params.groupShortId);

	if (!group) {
		throw error(404);
	}

	return {
		group
	};
};

import type { RequestHandler } from '@sveltejs/kit';
import { error, json } from '@sveltejs/kit';
import { readListFile } from '$lib/server/content/read-content';

export const GET: RequestHandler = async ({ params }) => {
	if (!params?.listKey) {
		throw error(400);
	}
	const result = await readListFile(params.listKey);
	if (!result) {
		throw error(404);
	}
	return json(result);
};

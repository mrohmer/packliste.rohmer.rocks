import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { readListFiles } from '$lib/server/content/read-content';

export const GET: RequestHandler = async () => json((await readListFiles()) ?? []);

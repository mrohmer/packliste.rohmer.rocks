import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { doAuth } from '$lib/server/auth';

const authorization: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/admin') || event.url.pathname === '/config.yml') {
		return resolve(event);
	}

	if (event.route.id?.includes('/(authenticated)')) {
		const session = await event.locals.getSession();
		if (!session) {
			throw redirect(303, '/auth/login');
		}
	}

	// If the request is still here, just proceed as normally
	return resolve(event);
};

export const handle = sequence(doAuth, authorization);

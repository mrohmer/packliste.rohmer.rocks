import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => ({
	user: event.locals.getSession().then((session) => ({
		name: session?.user?.name
	}))
});

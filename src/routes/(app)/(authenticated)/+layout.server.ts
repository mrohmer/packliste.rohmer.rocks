import type { LayoutServerLoad } from './$types';
import type { User } from '@auth/core/types';

export const load: LayoutServerLoad = async (event) => ({
	user: event.locals.getSession().then((session) => ({
		name: session?.user?.name
	}))
});

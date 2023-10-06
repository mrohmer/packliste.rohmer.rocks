import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => ({
	user: event.locals.getSession().then((session) =>
		session?.user
			? {
					name: session.user.name,
					id: session.user.id
			  }
			: undefined
	)
});

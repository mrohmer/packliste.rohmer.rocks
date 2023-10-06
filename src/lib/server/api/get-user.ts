import { error } from '@sveltejs/kit';
import type { User } from '@prisma/client';

export const getUser = async (locals: App.Locals): Promise<User> => {
	const session = await locals.getSession();
	if (!session) {
		throw error(403);
	}
	const user = session?.user as User;

	if (!user) {
		throw error(403);
	}

	return user;
};

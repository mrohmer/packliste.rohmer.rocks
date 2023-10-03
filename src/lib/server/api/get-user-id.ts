import { error } from '@sveltejs/kit';

export const getUserId = async (locals: App.Locals): Promise<string> => {
	const session = (await locals.getSession()) ?? {};
	const user = session?.user as Record<'id', string> | undefined;

	if (!user?.id) {
		throw error(403);
	}

	return user.id;
};

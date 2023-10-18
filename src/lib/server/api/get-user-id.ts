import { error } from '@sveltejs/kit';
import { getUser } from '$lib/server/api/get-user';

export const getUserId = async (locals: App.Locals): Promise<string> => {
	const user = await getUser(locals);

	if (!user?.id) {
		throw error(403);
	}

	return user.id;
};

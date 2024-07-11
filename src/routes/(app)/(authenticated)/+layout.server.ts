import type { LayoutServerLoad } from './$types';
import type { User } from '@prisma/client';
import { getUser } from '$lib/server/api/get-user';

const getTruncatedUser = async (locals: App.Locals): Promise<Pick<User, 'id' | 'name'>> => {
	const user = await getUser(locals);

	return {
		id: user.id,
		name: user.name
	};
};
export const load: LayoutServerLoad = async ({ locals }) => ({
	user: getTruncatedUser(locals)
});

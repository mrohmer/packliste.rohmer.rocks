import type { ShareRole, User } from '@prisma/client';
import type { ListWithSharesAndUsers } from '$lib/model/db-types-with-includes';

type CurrentUser = Pick<User, 'id' | 'name'>;
export type UserWithRole = CurrentUser & {
	role: ShareRole;
};
export interface UsersPerListResult {
	owner?: CurrentUser;
	shares?: UserWithRole[];
}
export const getUsersPerList = (
	list: ListWithSharesAndUsers,
	user: CurrentUser
): UsersPerListResult | undefined => {
	if (!list.user) {
		return undefined;
	}

	return {
		owner: list.user.id === user.id ? undefined : list.user,
		shares: list.shares
			?.filter(({ sharedWithUserId: id }) => id !== user.id)
			.map(({ sharedWith, role }) => ({
				...sharedWith,
				role
			})) as UserWithRole[]
	};
};

import { ShareRole } from '@prisma/client';

export const compareRoles = (a: ShareRole, b: ShareRole): -1 | 0 | 1 => {
	if (a === b) {
		return 0;
	}

	if (!a) {
		return -1;
	}
	if (!b) {
		return 1;
	}

	const order = [ShareRole.SEE, ShareRole.CHECK, ShareRole.EDIT, ShareRole.OWNER];
	return order.indexOf(a) < order.indexOf(b) ? -1 : 1;
};

export const isAtLeastRole = (atLeast: ShareRole, value: ShareRole) =>
	compareRoles(atLeast, value) >= 0;

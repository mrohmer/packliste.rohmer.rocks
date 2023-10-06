import type { ShareRole } from '@prisma/client';

export const translateRole = (role: ShareRole) => {
	switch (role) {
		case 'SEE':
			return 'Reporter';
		case 'CHECK':
			return 'Mitarbeiter';
		case 'EDIT':
			return 'Bearbeiter';
		case 'OWNER':
			return 'Eigentümer';
	}
};

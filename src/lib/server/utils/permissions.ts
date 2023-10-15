import type { ShareRole } from '@prisma/client';

export const getPermissions = (isOwner: boolean, role: ShareRole | undefined) => ({
	canCheck: isOwner || (!!role && ['OWNER', 'EDIT', 'CHECK'].includes(role)),
	canEdit: isOwner || (!!role && ['OWNER', 'EDIT'].includes(role)),
	canEditPermissions: isOwner || (!!role && ['OWNER'].includes(role)),
	canDelete: isOwner || (!!role && ['OWNER'].includes(role))
});

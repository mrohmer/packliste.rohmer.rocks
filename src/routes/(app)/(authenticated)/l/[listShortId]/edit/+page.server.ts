import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { error, fail, redirect } from '@sveltejs/kit';
import { getUserId } from '$lib/server/api/get-user-id';
import { prisma } from '$lib/server/db';
import { nanoid } from 'nanoid';

const itemSchema = z.object({
	id: z.string().optional(),
	shortId: z.string().optional(),
	name: z.string(),
	count: z.number().positive().max(9).optional()
});
const itemsSchema = z
	.array(itemSchema)
	.refine((items) => new Set(items.map(({ name }) => name)).size === items.length, {
		message: 'Namen müssen eindeutig sein'
	});
const groupSchema = z.object({
	id: z.string().optional(),
	shortId: z.string().optional(),
	name: z.string(),
	items: itemsSchema
});
const groupsSchema = z
	.array(groupSchema)
	.refine((items) => new Set(items.map(({ name }) => name)).size === items.length, {
		message: 'Namen müssen eindeutig sein'
	});

const schema = z.object({
	id: z.string(),
	shortId: z.string(),
	name: z.string(),
	items: itemsSchema.optional(),
	groups: groupsSchema.optional()
});

export const load: PageServerLoad = async ({ parent }) => {
	const { list, permissions } = await parent();

	if (!permissions.canEdit) {
		throw error(403);
	}

	return {
		list,
		form: superValidate(list, schema)
	};
};

export const actions: Actions = {
	default: async ({ request, locals, params }) => {
		if (!params.listShortId) {
			throw error(404);
		}

		const userId = await getUserId(locals);

		const list = await prisma.list.findFirst({
			where: {
				AND: [
					{
						shortId: params.listShortId
					},
					{
						OR: [
							{ userId },
							{
								shares: {
									some: {
										sharedWithUserId: userId,
										role: {
											in: ['OWNER', 'EDIT']
										}
									}
								}
							}
						]
					}
				]
			}
		});

		if (!list) {
			throw error(404);
		}

		const form = await superValidate(request, schema);

		// Convenient validation check:
		if (!form.valid) {
			// Again, always return { form } and things will just work.
			return fail(400, { form });
		}

		const { name, groups, items } = form.data;

		const itemsCount =
			(items?.length ?? 0) + (groups?.reduce((p, c) => p + (c.items?.length ?? 0), 0) ?? 0);

		if (!itemsCount) {
			setError(form, 'Liste muss mindestens eine Aufgabe enthalten');
			return fail(409, { form });
		}

		const update = createUpdateRequest(params.listShortId, name, items, groups);
		await prisma.list.update(update);

		throw redirect(303, `/l/${params.listShortId}`);
	}
};

const createCreateItemRequest = (item: z.infer<typeof itemSchema>, index: number) => ({
	shortId: nanoid(10),
	order: index * 100,
	name: item.name!,
	count: item.count ?? 1
});
const createUpsertItemRequest = (item: z.infer<typeof itemSchema>, index: number) => ({
	create: createCreateItemRequest(item, index),
	where: {
		id: item.id
	},
	update: {
		order: index * 100,
		name: item.name!,
		count: item.count ?? 1
	}
});

const createUpsertGroupRequest = (group: z.infer<typeof groupSchema>, index: number) => ({
	where: {
		id: group.id
	},
	create: {
		shortId: nanoid(10),
		name: group.name!,
		order: index * 100,
		items: group.items?.length
			? { create: group.items.map((item, ii) => createCreateItemRequest(item, ii)) }
			: undefined
	},
	update: {
		name: group.name!,
		order: index * 100,
		items: group.items?.length
			? {
					upsert: group.items
						.map((item, ii) => ({ item, ii }))
						.filter(({ item }) => !!item.id)
						.map(({ item, ii }) => createUpsertItemRequest(item, ii)),
					create: group.items
						.map((item, ii) => ({ item, ii }))
						.filter(({ item }) => !item.id)
						.map(({ item, ii }) => createCreateItemRequest(item, ii))
			  }
			: undefined
	}
});
const createUpdateRequest = (
	shortId: string,
	name: string,
	items?: z.infer<typeof itemsSchema>,
	groups?: z.infer<typeof groupsSchema>
) => ({
	where: {
		shortId
	},
	data: {
		name,
		updatedAt: new Date(),
		items: items?.length
			? {
					upsert: items.map((item, ii) => createUpsertItemRequest(item, ii))
			  }
			: undefined,
		groups: groups?.length
			? {
					upsert: groups.map((group, gi) => createUpsertGroupRequest(group, gi))
			  }
			: undefined
	}
});

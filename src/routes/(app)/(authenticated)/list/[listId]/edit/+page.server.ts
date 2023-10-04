import type { Actions, PageLoad } from './$types';
import { z } from 'zod';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { error, fail, redirect } from '@sveltejs/kit';
import { getUserId } from '$lib/server/api/get-user-id';
import { prisma } from '$lib/server/db';

const itemsSchema = z
	.array(
		z.object({
			id: z.string(),
			name: z.string(),
			count: z.number().positive().max(9).optional()
		})
	)
	.refine((items) => new Set(items.map(({ name }) => name)).size === items.length, {
		message: 'Namen müssen eindeutig sein'
	});
// Name has a default value just to display something in the form.
const schema = z.object({
	id: z.string(),
	name: z.string(),
	items: itemsSchema.optional(),
	groups: z
		.array(
			z.object({
				id: z.string(),
				name: z.string(),
				items: itemsSchema
			})
		)
		.refine((items) => new Set(items.map(({ name }) => name)).size === items.length, {
			message: 'Namen müssen eindeutig sein'
		})
		.optional()
});

export const load: PageLoad = async ({ parent }) => {
	const { list } = await parent();

	console.log(list);

	return {
		list,
		form: superValidate(list, schema)
	};
};

export const actions: Actions = {
	default: async ({ request, locals, params }) => {
		if (!params.listId) {
			throw error(404);
		}

		const userId = await getUserId(locals);

		const list = await prisma.list.findUnique({
			where: {
				id: params.listId,
				userId
			}
		});

		if (!list) {
			throw error(404);
		}

		const form = await superValidate(request, schema);
		console.log('POST', form);

		// Convenient validation check:
		if (!form.valid) {
			console.log('invalid', JSON.stringify(form.errors));
			// Again, always return { form } and things will just work.
			return fail(400, { form });
		}

		const { name, groups, items } = form.data;

		const itemsCount =
			(items?.length ?? 0) + (groups?.reduce((p, c) => p + (c.items?.length ?? 0), 0) ?? 0);

		if (!itemsCount) {
			console.log('items');
			setError(form, 'Liste muss mindestens ein Element enthalten');
			return fail(409, { form });
		}

		await prisma.list.update({
			where: {
				id: params.listId,
				userId
			},
			data: {
				name,
				items: items?.length
					? {
							update: items.map((item, ii) => ({
								data: {
									order: ii * 100,
									name: item.name,
									count: item.count ?? 1
								},
								where: {
									id: item.id
								}
							}))
					  }
					: undefined,
				groups: groups?.length
					? {
							update: groups.map((group, gi) => ({
								where: {
									id: group.id
								},
								data: {
									name: group.name,
									order: gi * 100,
									items: group.items?.length
										? {
												update: group.items.map((item, ii) => ({
													where: {
														id: item.id
													},
													data: {
														order: ii * 100,
														name: item.name,
														count: item.count ?? 1
													}
												}))
										  }
										: undefined
								}
							}))
					  }
					: undefined
			}
		});

		console.log('done');

		throw redirect(303, `/list/${params.listId}`);
	}
};

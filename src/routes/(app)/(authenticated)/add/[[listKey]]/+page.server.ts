import type { Actions, PageLoad } from './$types';
import type { ContentList } from '$lib/model/content-list';
import { z } from 'zod';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { error, fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/db';
import { getUserId } from '$lib/server/api/get-user-id';
import { nanoid } from 'nanoid';

const itemsSchema = z
	.array(
		z.object({
			name: z.string(),
			count: z.number().positive().max(9).optional()
		})
	)
	.refine((items) => new Set(items.map(({ name }) => name)).size === items.length, {
		message: 'Namen müssen eindeutig sein'
	});
// Name has a default value just to display something in the form.
const schema = z.object({
	name: z.string(),
	items: itemsSchema.optional(),
	groups: z
		.array(
			z.object({
				name: z.string(),
				items: itemsSchema
			})
		)
		.refine((items) => new Set(items.map(({ name }) => name)).size === items.length, {
			message: 'Namen müssen eindeutig sein'
		})
		.optional()
});

const loadApi = async <T>(fetch: PageLoad['fetch'], url: string): Promise<T> => {
	const response = await fetch(url);
	return response.json() as Promise<T>;
};

const prepareData = async (
	fetch: PageLoad['fetch'],
	listKey: string | undefined
): Promise<z.infer<typeof schema> | undefined> => {
	if (!listKey?.trim?.()) {
		return undefined;
	}
	const data = await loadApi<ContentList>(fetch, `/api/templates/${listKey}`);
	if (!data) {
		throw error(404);
	}

	return {
		name: data.label,
		groups: data.groups.map((group) => ({
			name: group.label,
			items: group.items.map((item) => ({
				name: item.label,
				count: 1
			}))
		}))
	};
};
export const load: PageLoad = async ({ fetch, params }) => {
	const data = await prepareData(fetch, params?.listKey);
	return {
		form: superValidate(data, schema),
		streamed: {
			templates: loadApi<ContentList[]>(fetch, '/api/templates')
		}
	};
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, schema);
		console.log('POST', form);

		// Convenient validation check:
		if (!form.valid) {
			// Again, always return { form } and things will just work.
			return fail(400, { form });
		}

		const { name, groups, items } = form.data;

		const itemsCount =
			(items?.length ?? 0) + (groups?.reduce((p, c) => p + (c.items?.length ?? 0), 0) ?? 0);

		if (!itemsCount) {
			setError(form, 'Liste muss mindestens ein Element enthalten');
			return fail(409, { form });
		}

		const userId = await getUserId(locals);

		const exists = await prisma.list.findMany({
			where: {
				name: {
					mode: 'insensitive',
					equals: name
				},
				userId
			}
		});

		if (exists?.length) {
			setError(form, 'name', 'Name existiert bereits');
			return fail(409, { form });
		}

		const list = await prisma.list.create({
			data: {
				name,
				userId,
				shortId: nanoid(10),
				items: items?.length
					? {
							create: items.map((item, ii) => ({
								order: ii * 100,
								name: item.name,
								count: item.count ?? 1,
								shortId: nanoid(10)
							}))
					  }
					: undefined,
				groups: groups?.length
					? {
							create: groups.map((group, gi) => ({
								name: group.name,
								order: gi * 100,
								shortId: nanoid(10),
								items: group.items?.length
									? {
											create: group.items.map((item, ii) => ({
												order: ii * 100,
												name: item.name,
												count: item.count ?? 1,
												shortId: nanoid(10)
											}))
									  }
									: undefined
							}))
					  }
					: undefined
			}
		});

		throw redirect(303, `/l/${list.shortId}`);
	}
};

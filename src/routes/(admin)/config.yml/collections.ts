import { postType, list, required, field } from 'netlify-cms-quick-fields';

export const getCollections = () => {
	const keyParams = (type: string) => ({
		label: false,
		pattern: ['^[a-z0-9\\-]*$', 'Must be valid slug.'],
		widget: 'uuid'
	});
	return [
		postType(
			'lists',
			[
				required('key', keyParams('List')),
				required('label', { label: 'Label' }),
				required('path', {
					label: 'Url identifier',
					hint: 'Url identifier of the list. Should not be changed without a redirect.'
				}),
				list(
					'groups',
					[
						required('key', keyParams('Group')),
						required('label', { label: 'Label' }),
						list(
							'items',
							[required('key', keyParams('Item')), required('label', { label: 'Label' })],
							{
								label: 'Items',
								summary: '{{label}}'
							}
						)
					],
					{
						label: 'Gruppen',
						summary: '{{label}}'
					}
				)
			],
			{
				extension: 'json',
				format: 'json',
				editor: {
					preview: false
				},
				summary: '{{label}}'
			}
		)
	];
};

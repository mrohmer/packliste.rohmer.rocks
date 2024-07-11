import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const lists = readdirSync(resolve('./src/content/lists'))
	.filter((name) => name.endsWith('.json'))
	.map((name) => name.replace(/\.json$/, ''));

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		prerender: {
			entries: ['*', '/api/templates/all', ...lists.map((l) => `/api/templates/${l}`)]
		}
	}
};

export default config;

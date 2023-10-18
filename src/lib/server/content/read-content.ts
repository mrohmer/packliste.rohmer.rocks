import path from 'path';
import { URL } from 'url';
import fs from 'fs';
import { promisify } from 'util';
import type { ContentList } from '$lib/model/content-list';
import { env } from '$env/dynamic/private';
import { cached } from '$lib/utils/cached';

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);

const getContentDir = () => {
	const rootDir =
		env.ROOT_DIR ?? path.resolve(new URL('.', import.meta.url).pathname, '../../../..');
	return path.resolve(rootDir, 'src/content');
};
const getListsDir = () => `${getContentDir()}/lists`;

const readContentFile = (file: string): Promise<ContentList> =>
	cached(`content.file.${file}`, async () => {
		const content = await readFile(path.resolve(getListsDir(), file));
		return JSON.parse(content.toString());
	});
const getFileList = () => cached('content.file.list', () => readdir(getListsDir()));
export const readListFiles = () =>
	cached(`content.list`, async (): Promise<ContentList[]> => {
		const fileList = await getFileList();
		return Promise.all(fileList.map((file) => readContentFile(file)));
	});
export const readListFile = (name: string): Promise<ContentList | undefined> =>
	cached(`content.${name}`, async () => {
		const fileList = await getFileList();
		const file = fileList.find((file) => file === `${name}.json`);

		if (!file) {
			return undefined;
		}

		return readContentFile(file);
	});

import path from 'path';
import {URL} from 'url';
import fs from 'fs';
import type {IList} from '../model/list';
import { ROOT_DIR } from '$env/static/private';

const getContentDir = () => {
  const rootDir =
    ROOT_DIR || path.resolve(new URL('.', import.meta.url).pathname, '../../..');
  return path.resolve(rootDir, 'src/content');
};
const getListsDir = () => `${getContentDir()}/lists`;

const readFile = (file: string): IList => {
  const content = fs.readFileSync(path.resolve(getListsDir(), file));
  return JSON.parse(content.toString());
}
export const readListFiles = (): IList[] => {
  return fs.readdirSync(getListsDir())
    .map(file => readFile(file));
}
export const readListFile = (name: string): IList|undefined => {
  const file = fs.readdirSync(getListsDir()).find((file) => file === `${name}.json`);

  if (!file) {
    return undefined;
  }

  return readFile(file);
}

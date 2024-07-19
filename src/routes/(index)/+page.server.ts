import type {PageServerLoad} from './$types';
import {readListFiles} from '$lib/utils/read-content';

export const prerender = true;

export const load: PageServerLoad = () => {
  const lists = readListFiles();

  return {
    lists,
  }
}

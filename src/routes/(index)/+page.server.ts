import type {PageLoad} from './$types';
import {readListFiles} from '$lib/utils/read-content';

export const prerender = true;

export const load: PageLoad = () => {
  const lists = readListFiles();
  
  return {
    lists,
  }
}

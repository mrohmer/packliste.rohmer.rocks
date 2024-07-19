import type {PageServerLoad} from './$types';
import { error } from '@sveltejs/kit';
import {readListFile} from '$lib/utils/read-content';

export const prerender = true;

export const load: PageServerLoad = ({params}) => {
  const {listKey} = params;

  if (!/^[a-z0-9-]*$/.test(listKey)) {
    throw error(404);
  }

  const list = readListFile(listKey);

  if (!list?.key || !list?.groups?.some(g => g.items?.length)) {
    throw error(404);
  }

  return {
    list,
  }
}

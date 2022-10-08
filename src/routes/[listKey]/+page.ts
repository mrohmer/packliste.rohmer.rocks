import type {PageLoad} from './$types';
import { error } from '@sveltejs/kit';
import {lists} from '../../lib/data/list';

export const load: PageLoad = ({params}) => {
  const {listKey} = params;

  if (!/^[a-zA-z0-9\-]*$/.test(listKey) || !(listKey in lists)) {
    throw error(404);
  }

  return {
    list: lists[listKey],
  }
}

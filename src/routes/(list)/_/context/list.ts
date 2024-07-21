import type { Readable } from 'svelte/store';
import { getContext, setContext } from 'svelte';

export const createContext = (isEdit: Readable<boolean>) => setContext('List', {isEdit});
export const receiveContext = () => getContext<Record<'isEdit', Readable<boolean>>>('List');

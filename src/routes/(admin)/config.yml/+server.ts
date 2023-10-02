import type {RequestHandler} from '@sveltejs/kit';
import {getBackend} from './backend';
import {getLocalBackend} from './localBackend';
import {getCollections} from './collections';

export const prerender = true;


export const GET: RequestHandler = ({url}) => {
  const config = {
    backend: getBackend(),
    local_backend: getLocalBackend(),
    collections: getCollections(),
    media_folder: 'static/uploads',
    public_folder: '/uploads',
    display_url: `${url.protocol}//${url.host}`,
    locale: 'de'
  };
  return new Response(JSON.stringify(config));
}

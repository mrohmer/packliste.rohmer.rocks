import {files, prerendered, build, version} from '$service-worker';
import {warmStrategyCache} from 'workbox-recipes';
import {setDefaultHandler} from 'workbox-routing';
import {CacheFirst} from 'workbox-strategies';

console.log(files, prerendered, build, version);
const strategy = new CacheFirst({cacheName: `static-${version}`});
const urls = [
  ...files,
  ...build,
  ...prerendered,
];

warmStrategyCache({urls, strategy});

setDefaultHandler(strategy);

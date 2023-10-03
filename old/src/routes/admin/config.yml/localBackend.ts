import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';

export const getLocalBackend = () => {
	if (!dev || !env.BACKEND_PORT) {
		return undefined;
	}

	return {
		url: `http://localhost:${env.BACKEND_PORT}/api/v1`
	};
};

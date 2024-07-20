import { dev } from '$app/environment';
import { BACKEND_PORT } from '$env/static/private';

export const getLocalBackend = () => {
	if (!dev || !BACKEND_PORT) {
		return undefined;
	}

	return {
		url: `http://localhost:${BACKEND_PORT}/api/v1`
	};
};

const cache: Record<string, Promise<unknown>> = {};
export const cached = <T>(key: string, cstr: () => Promise<T>): Promise<T> => {
	if (!cache[key]) {
		cache[key] = cstr();
	}
	return cache[key] as Promise<T>;
};

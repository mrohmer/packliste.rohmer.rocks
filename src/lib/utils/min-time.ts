export const minTime = async <T>(factory: () => Promise<T>, time: number) => {
	const [result] = await Promise.all([
		factory(),
		new Promise((resolve) => setTimeout(resolve, time))
	]);
	return result;
};

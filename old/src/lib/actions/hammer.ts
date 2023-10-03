const hammerAction =
	(...events: string[]) =>
	async (node: HTMLElement) => {
		if (typeof window === 'undefined') {
			return;
		}

		const { default: Hammer } = await import('hammerjs');

		const hammer = new Hammer(node);
		const handlers = events.map((event) => [
			event,
			(ev: any) => node.dispatchEvent(new CustomEvent(event, { detail: ev }))
		]);

		handlers.forEach(([event, handler]) => hammer.on(event, handler));

		return {
			destroy: () => {
				handlers.forEach(([event, handler]) => hammer.off(event, handler));
			}
		};
	};

export const pan = hammerAction('panleft', 'panright', 'panstart', 'panend');
export const doubleTap = hammerAction('doubletap');

<script lang="ts">
	import '../../app.pcss';
	import { onNavigate } from '$app/navigation';

	onNavigate(() => {
		if (!('startViewTransition' in document)) return;
		return new Promise((fulfil) => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(document as any).startViewTransition(() => new Promise(fulfil));
		});
	});
</script>

<slot />

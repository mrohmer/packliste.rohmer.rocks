<script lang="ts">
	import '../../app.pcss';
	import { onNavigate } from '$app/navigation';
	import { dev } from '$app/environment';
	import { page } from '$app/stores';

	onNavigate(() => {
		if (!('startViewTransition' in document)) return;
		return new Promise((fulfil) => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(document as any).startViewTransition(() => new Promise(fulfil));
		});
	});

	$: dev && console.log($page?.data);
</script>

<slot />

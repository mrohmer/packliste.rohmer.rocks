<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<div class="hero min-h-screen -mt-20">
	<div class="hero-content text-center">
		<div class="max-w-md">
			{#if ['LIST_OWNER'].includes(data.error?.code)}
				<div class="alert alert-error mb-10">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="stroke-current shrink-0 h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<span>
						{#if data.error.code === 'LIST_OWNER'}
							Du bist selbst der Eigentümer der Liste.
						{/if}
					</span>
				</div>
			{/if}

			{#if data.error}
				{#if data.list?.name}
					<p class="py-6">Einladung zu</p>

					<h1 class="text-5xl font-bold">
						{data.list.name}
					</h1>
					<p class="py-6">konnte nicht angenommen werden.</p>
				{:else if data.error.code === 'NOT_FOUND'}
					<p class="text-5xl font-bold">Einladung konnte nicht gefunden werden.</p>
				{:else}
					<p class="text-5xl font-bold">Einladung konnte nicht angenommen werden.</p>
				{/if}

				{#if data.error?.code === 'LIST_OWNER'}
					<a href="/l/{data.list.shortId}" class="btn btn-primary mt-10"> Zur Liste </a>
				{:else}
					<a href="/l/invitation" class="btn btn-primary mt-10"> Anderen Code eingeben </a>
				{/if}
			{:else}
				<p class="py-6">Einladung zu</p>

				<h1 class="text-5xl font-bold">
					{data.list.name}
				</h1>
				<p class="py-6">wurde angenommen</p>

				<a href="/l/{data.list.shortId}" class="btn btn-primary mt-10"> Zur Liste </a>
			{/if}
		</div>
	</div>
</div>

<script lang="ts">
	import { ListInvite } from '@prisma/client';
	import { page } from '$app/stores';
	import QRCode from 'qrcode';

	export let loading: boolean;
	export let invitation: ListInvite;

	let modal: HTMLDialogElement;
	let input: HTMLInputElement;

	export const showModal = () => modal.showModal();

	const copy = () => {
		input.select();
		input.setSelectionRange(0, 99999); // For mobile devices

		// Copy the text inside the text field
		navigator.clipboard.writeText(input.value);
		input.blur();
	};

	const createQrCode = async (url: string | undefined) => {
		if (!url) {
			return undefined;
		}
		return QRCode.toDataURL(url, {
			color: {
				light: '#f2f2f2'
			},
			margin: 2,
			width: 400
		});
	};

	$: host = `${$page.url.protocol}//${[$page.url.hostname, $page.url.port]
		.filter(Boolean)
		.join(':')}`;
	$: link = invitation ? `${host}/invite/${invitation.code}` : undefined;
	$: qrCode = createQrCode(link);
</script>

<dialog bind:this={modal} class="modal">
	<div class="modal-box p-2 min-h-[9rem]">
		<form method="dialog" class="z-10">
			<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
		</form>
		{#if loading}
			<div class="flex h-32 items-center justify-center">
				<div>
					<span class="loading loading-ring loading-md" />
				</div>
			</div>
		{:else}
			<div class="flex flex-col gap-4 py-2 px-3">
				<div class="text-xl">Freigabelink</div>
				{#await qrCode then src}
					<div class="flex justify-center">
						<div>
							<figure class="block w-52 h-52 bg-white">
								<img class="block w-full h-full" {src} alt="QR Code" />
							</figure>
						</div>
					</div>
				{/await}
				<div class="join w-full">
					<input
						bind:this={input}
						class="input input-bordered join-item flex-1"
						readonly
						value={link}
					/>
					<button class="btn join-item btn-square" on:click={copy}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6 pointer-events-none"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
							/>
						</svg>
					</button>
				</div>
			</div>
		{/if}
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>

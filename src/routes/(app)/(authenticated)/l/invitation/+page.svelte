<script lang="ts">
	import { goto } from '$app/navigation';

	let value = '';
	let joining = false;

	const handleSubmit = async () => {
		if (value.trim().length !== 5) {
			return;
		}
		joining = true;
		await goto(`/l/invitation/${value}`);
	};

	$: value?.trim?.().length === 5 && handleSubmit();
</script>

<div class="hero min-h-screen -mt-20">
	<div class="hero-content text-center">
		<div class="max-w-md w-full">
			<div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-200">
				<form class="card-body" on:submit|preventDefault={handleSubmit}>
					<div class="form-control">
						<label for="code" class="label">
							<span class="label-text">Code</span>
						</label>
						<input
							id="code"
							type="text"
							class="input input-bordered"
							minlength="5"
							maxlength="5"
							bind:value
							required
						/>
					</div>
					<div class="form-control mt-6">
						<button class="btn btn-primary">{joining ? 'tritt bei...' : 'beitreten'}</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

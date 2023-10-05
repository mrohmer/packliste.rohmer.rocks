<script lang="ts">
	import type { User } from '@auth/core/types';

	export let user: Pick<User, 'name'>;

	$: initials = user?.name
		?.split(' ')
		.filter(Boolean)
		.map((i) => i.charAt(0).toUpperCase())
		.join('');
</script>

<div class="navbar bg-base-100 w-full max-w-2xl px-2 mx-auto">
	<slot />
	<div class="flex-none">
		<div class="dropdown dropdown-end">
			<button tabindex="0" class="btn btn-ghost btn-circle avatar placeholder">
				<div class="bg-neutral-focus text-neutral-content rounded-full w-10">
					<span class="text-lg">{initials}</span>
				</div>
			</button>
			<!-- eslint-disable-next-line svelte/valid-compile -->
			<ul
				tabindex="0"
				class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
			>
				<li>
					<a href="/profile"> Profile </a>
				</li>
				<li><a href="/auth/logout">Logout</a></li>
			</ul>
		</div>
	</div>
</div>

<script lang="ts">
	import type { User } from '@auth/core/types';
	import Avatar from '$lib/components/avatar/Avatar.svelte';

	export let user: Pick<User, 'name'>;
</script>

<div class="navbar bg-base-100 w-full max-w-2xl px-2 py-1 mx-auto z-10">
	<slot />
	<div class="flex-none">
		<div class="dropdown dropdown-end">
			<button tabindex="0" class="btn btn-ghost btn-circle">
				<Avatar username={user?.name} />
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

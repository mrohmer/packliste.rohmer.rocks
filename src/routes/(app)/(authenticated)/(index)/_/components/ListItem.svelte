<script lang="ts">
	import type { Count } from '$lib/utils/progress';
	import Avatar from '$lib/components/avatar/Avatar.svelte';
	import AvatarPlaceholder from '$lib/components/avatar/AvatarPlaceholder.svelte';
	import type { UsersPerListResult } from '$lib/utils/shares';
	import Users from './Users.svelte';

	export let href: string;
	export let users: UsersPerListResult | undefined;
	export let count: Partial<Count>;
</script>

<a
	{href}
	class="flex flex-col gap-0.5 justify-center flex-1 py-3 px-5 bg-neutral-200 hover:bg-neutral-300 cursor-pointer rounded-xl w-full overflow-hidden"
>
	<div class="flex flex-1 items-center gap-4">
		<div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
				/>
			</svg>
		</div>
		<div class="flex-1 overflow-hidden">
			<div class="leading-4 w-full text-ellipsis">
				<slot />
			</div>
			{#if count?.total}
				<div class="text-xs font-light">
					{#if count.done}
						<span class="text-primary">{count.done}</span> /
					{/if}
					{count.total} Aufgabe{count.total === 1 ? '' : 'n'}
				</div>
			{/if}
		</div>
		{#if users?.owner || users?.shares?.length}
			<div class="hidden sm:block">
				{#if users.owner}
					<Users prefix="von">
						<div class="avatar-group -space-x-6">
							<Avatar username={users.owner.name} small />
						</div>
					</Users>
				{/if}
				{#if users.shares?.length}
					<Users prefix="mit">
						<div class="avatar-group -space-x-6">
							{#each users.shares.slice(0, 3) as { id, name } (id)}
								<Avatar username={name} small />
							{/each}
							{#if users.shares.length > 3}
								<AvatarPlaceholder small>
									+{users.length - 3}
								</AvatarPlaceholder>
							{/if}
						</div>
					</Users>
				{/if}
			</div>
		{/if}
	</div>
	{#if users?.owner || users?.shares?.length}
		<div class="sm:hidden flex justify-end">
			{#if users.owner}
				<Users prefix="von">
					<div class="avatar-group -space-x-6">
						<Avatar username={users.owner.name} small />
					</div>
				</Users>
			{/if}
			{#if users.shares?.length}
				<Users prefix="mit">
					<div class="avatar-group -space-x-6">
						{#each users.shares.slice(0, 3) as { id, name } (id)}
							<Avatar username={name} small />
						{/each}
						{#if users.shares.length > 3}
							<AvatarPlaceholder small>
								+{users.length - 3}
							</AvatarPlaceholder>
						{/if}
					</div>
				</Users>
			{/if}
		</div>
	{/if}
</a>

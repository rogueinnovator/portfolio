<script lang="ts">
	import { goto } from '$app/navigation';
	export let toggleSidebar: () => void;
	export let isActive: (path: string) => boolean;
</script>

<header class="fixed bg-gray-900 border-b border-gray-800 shadow-md w-full">
	<div class="flex items-center justify-between p-3">
		<div class="flex items-center gap-4">
			<button
				class="p-2 rounded-md hover:bg-gray-800 md:hidden"
				on:click={toggleSidebar}
				aria-label="Toggle sidebar"
			>
				<i class="fa-solid fa-bars"></i>
			</button>
			<h1 class="text-xl font-semibold pl-7">
				{#if isActive('/admin')}
					Dashboard
				{:else if isActive('/admin/projects')}
					Projects Management
				{:else if isActive('/admin/messages')}
					Messages
				{:else if isActive('/admin/settings')}
					Settings
				{:else}
					Admin Panel
				{/if}
			</h1>
		</div>
		<div>
			<button
				on:click={() => {
					goto('/');
				}}
				class="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-800 transition-colors duration-200"
			>
				<i class="fa-solid fa-external-link-alt"></i>
				<span>Back to portfolio</span>
			</button>
		</div>
	</div>
</header>

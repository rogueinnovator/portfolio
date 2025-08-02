<script lang="ts">
	import { goto } from '$app/navigation';
	import { authHandler } from '$lib/stores';
	//props
	export let isSidebarOpen: boolean;
	export let isActive: (path: string) => boolean;

	async function handleSignOut() {
		try {
			await authHandler.logOut();
			goto('/');
		} catch (error) {
			console.error('Error signing out:', error);
		}
	}
	const navItems = [
		{ name: 'Dashboard', href: '/admin', icon: 'fa-solid fa-chart-line' },
		{ name: 'Projects', href: '/admin/projects', icon: 'fa-solid fa-code' },
		{ name: 'Messages', href: '/admin/messages', icon: 'fa-solid fa-envelope' }
	];
</script>

<aside
	class="relative mt-16 flex flex-col w-64 h-full transition-all duration-300 bg-gray-900 border-r border-gray-800 shadow-lg {isSidebarOpen
		? 'translate-x-0'
		: '-translate-x-full md:w-20'} overflow-hidden"
>
<!-- header  -->
	<div class="flex items-center justify-between p-4 border-b border-gray-800">
		<div
			class="flex items-center gap-3 {isSidebarOpen
				? ''
				: 'hidden md:flex md:justify-center md:w-full'}"
		>
			<div class="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center">
				<i class="fa-solid fa-user-shield"></i>
			</div>
			<h2 class="text-lg font-semibold {isSidebarOpen ? '' : 'hidden'}">Admin Panel</h2>
		</div>
	</div>

	<!-- Navigation -->
	<nav class="flex-1 overflow-hidden py-4">
		<ul class="space-y-2 px-3">
			{#each navItems as item}
				<li>
					<a
						href={item.href}
						class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 {isActive(
							item.href
						)
							? 'bg-violet-600/20 text-violet-400'
							: 'hover:bg-gray-800/50'}"
					>
						<i class="{item.icon} w-5 text-center"></i>
						<span class={isSidebarOpen ? '' : 'hidden'}>{item.name}</span>
					</a>
				</li>
			{/each}
		</ul>
	</nav>
	<div class="p-4 border-t border-gray-800 mb-14">
		<button
			on:click={handleSignOut}
			class="flex items-center gap-3 w-full px-4 py-2 rounded-lg text-red-400 hover:bg-red-900/20 transition-colors duration-200"
		>
			<i class="fa-solid fa-sign-out-alt"></i>
			<span class={isSidebarOpen ? '' : 'hidden'}>Sign Out</span>
		</button>
	</div>
</aside>

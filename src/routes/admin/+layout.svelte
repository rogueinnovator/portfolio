<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { authHandler } from '$lib/stores';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import Header from '$lib/components/admin/Header.svelte';
	import Sidebar from '$lib/components/admin/Sidebar.svelte';

	// Navigation items
	const navItems = [
		{ name: 'Dashboard', href: '/admin', icon: 'fa-solid fa-chart-line' },
		{ name: 'Projects', href: '/admin/projects', icon: 'fa-solid fa-code' },
		{ name: 'Messages', href: '/admin/messages', icon: 'fa-solid fa-envelope' }
	];

	// State
	let isSidebarOpen = true;
	let isMobile = false;

	// Toggle sidebar
	function toggleSidebar() {
		isSidebarOpen = !isSidebarOpen;
	}

	// Handle sign out
	async function handleSignOut() {
		try {
			await authHandler.logOut();
			goto('/');
		} catch (error) {
			console.error('Error signing out:', error);
		}
	}
	// Check if current page is active
	$: isActive = (href: string) => $page.url.pathname === href;

	// Handle responsive layout
	onMount(() => {
		if (browser) {
			const handleResize = () => {
				isMobile = window.innerWidth < 768;
				if (isMobile) isSidebarOpen = false;
			};
			handleResize();
			window.addEventListener('resize', handleResize);
			return () => window.removeEventListener('resize', handleResize);
		}
	});
</script>

<div class="overflow-hidden fixed w-full h-full">
	<Header {toggleSidebar} {isActive} />
	<div class="flex w-screen h-full bg-gray-950 text-white">
		{#if isSidebarOpen}
			<Sidebar {isSidebarOpen} {isActive} />
		{/if}
		<div class="md:flex-1 flex flex-col mt-16 mb-2">
			<main class="flex w-full overflow-y-auto bg-gray-950 p-4">
				<slot />
			</main>
		</div>
	</div>
</div>

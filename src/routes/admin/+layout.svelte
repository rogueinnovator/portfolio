<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { authStore } from '$lib/stores';
  import { signOut } from 'firebase/auth';
  import { goto } from '$app/navigation';
  import { browser } from '$app/environment';
	import { auth } from '$lib/fireBaseConfig';

  // Navigation items
  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: 'fa-solid fa-chart-line' },
    { name: 'Projects', href: '/admin/projects', icon: 'fa-solid fa-code' },
    { name: 'Messages', href: '/admin/messages', icon: 'fa-solid fa-envelope' },
    { name: 'Settings', href: '/admin/settings', icon: 'fa-solid fa-gear' }
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
      await signOut(auth);
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

<div class="flex h-screen bg-gray-950 text-white">
  <!-- Sidebar -->
  <aside 
    class="fixed md:relative z-20 flex flex-col w-64 h-screen transition-all duration-300 bg-gray-900 border-r border-gray-800 shadow-lg {isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:w-20'}"
  >
    <!-- Sidebar Header -->
    <div class="flex items-center justify-between p-4 border-b border-gray-800">
      <div class="flex items-center gap-3 {isSidebarOpen ? '' : 'hidden md:flex md:justify-center md:w-full'}">
        <div class="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center">
          <i class="fa-solid fa-user-shield"></i>
        </div>
        <h2 class="text-lg font-semibold {isSidebarOpen ? '' : 'hidden'}">Admin Panel</h2>
      </div>
      <button 
        class="p-1 rounded-md hover:bg-gray-800 md:hidden"
        on:click={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        <i class="fa-solid fa-xmark"></i>
      </button>
      <button 
        class="p-1 rounded-md hover:bg-gray-800 hidden md:block"
        on:click={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        <i class="fa-solid {isSidebarOpen ? 'fa-chevron-left' : 'fa-chevron-right'}"></i>
      </button>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto py-4">
      <ul class="space-y-2 px-3">
        {#each navItems as item}
          <li>
            <a 
              href={item.href} 
              class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 {isActive(item.href) ? 'bg-violet-600/20 text-violet-400' : 'hover:bg-gray-800/50'}"
            >
              <i class="{item.icon} w-5 text-center"></i>
              <span class="{isSidebarOpen ? '' : 'hidden'}">{item.name}</span>
            </a>
          </li>
        {/each}
      </ul>
    </nav>

    <!-- Sidebar Footer -->
    <div class="p-4 border-t border-gray-800">
      <button 
        on:click={handleSignOut}
        class="flex items-center gap-3 w-full px-4 py-2 rounded-lg text-red-400 hover:bg-red-900/20 transition-colors duration-200"
      >
        <i class="fa-solid fa-sign-out-alt"></i>
        <span class="{isSidebarOpen ? '' : 'hidden'}">Sign Out</span>
      </button>
    </div>
  </aside>

  <!-- Main Content -->
  <div class="flex-1 flex flex-col overflow-hidden">
    <!-- Top Bar -->
    <header class="bg-gray-900 border-b border-gray-800 shadow-md">
      <div class="flex items-center justify-between p-4">
        <div class="flex items-center gap-4">
          <button 
            class="p-2 rounded-md hover:bg-gray-800 md:hidden"
            on:click={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <i class="fa-solid fa-bars"></i>
          </button>
          <h1 class="text-xl font-semibold">
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
          <a 
            href="/" 
            target="_blank" 
            class="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-800 transition-colors duration-200"
          >
            <i class="fa-solid fa-external-link-alt"></i>
            <span>View Site</span>
          </a>
        </div>
      </div>
    </header>

    <!-- Page Content -->
    <main class="flex-1 overflow-y-auto bg-gray-950 p-6">
      <slot />
    </main>
  </div>
</div> 
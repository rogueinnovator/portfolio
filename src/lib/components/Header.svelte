<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { scrollStore, navigationStore, authStore } from '$lib/stores';
  import { fade, slide } from 'svelte/transition';
  import { getStorage, ref, getDownloadURL } from 'firebase/storage';
  import { hoverAnimation } from '$lib/animations/gsap';
  import { browser } from '$app/environment';
  import { auth } from '$lib/config/firebase';

  // Navigation links
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/#projects' },
    { name: 'Skills', href: '/#skills' },
    { name: 'Contact', href: '/#contact' }
  ];

  // CV URL
  let cvUrl = '';
  let mobileMenuOpen = false;
  let isAuthenticated = false;

  // Get CV URL from Firebase Storage
  async function getCvUrl() {
    try {
      const storage = getStorage();
      const cvRef = ref(storage, 'gs://portfolio-65bfd.appspot.com/cv.pdf');
      cvUrl = await getDownloadURL(cvRef);
    } catch (error) {
      console.error('Error fetching CV:', error);
    }
  }

  // Initialize
  onMount(() => {
    getCvUrl();
    
    // Apply hover animations to buttons
    if (browser) {
      const buttons = document.querySelectorAll('.nav-button');
      buttons.forEach(button => {
        hoverAnimation(button as HTMLElement, 1.05);
      });
    }

    // Check authentication status
    const unsubscribe = auth.onAuthStateChanged(user => {
      isAuthenticated = !!user;
    });

    return unsubscribe;
  });

  // Reactive declarations
  $: pathname = $page.url.pathname;
  $: scrolled = $scrollStore.y > 20;
  $: isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.includes(href) || (href.includes('#') && window?.location.hash === href.split('#')[1]);
  };

  // Toggle mobile menu
  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }

  // Scroll to section
  function scrollToSection(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      mobileMenuOpen = false;
    }
  }
</script>

<header 
  class="fixed top-0 w-full z-50 transition-all duration-300 {scrolled ? 'py-3 bg-black/90 backdrop-blur-md shadow-lg' : 'py-5 bg-transparent'}"
>
  <div class="container mx-auto px-4 md:px-6 flex items-center justify-between">
    <!-- Logo -->
    <div class="flex items-center gap-2">
      <a href="/" class="font-bold text-xl md:text-2xl tracking-tight group transition-all duration-300">
        <span class="text-white">MUHAMMAD</span>
        <span class="text-violet-400 group-hover:text-white transition-colors duration-300">HUZAIFA</span>
      </a>
    </div>

    <!-- Desktop Navigation -->
    <nav class="hidden md:flex items-center gap-6">
      {#each navLinks as link}
        <a 
          href={link.href}
          class="nav-button relative text-sm font-medium transition-colors duration-300 hover:text-violet-400 {isActive(link.href) ? 'text-violet-400' : 'text-white/80'}"
          on:click|preventDefault={() => {
            if (link.href.includes('#')) {
              scrollToSection(link.href.split('#')[1]);
            } else {
              window.location.href = link.href;
            }
          }}
        >
          {link.name}
          {#if isActive(link.href)}
            <span class="absolute -bottom-1 left-0 w-full h-0.5 bg-violet-400 rounded-full"></span>
          {/if}
        </a>
      {/each}
    </nav>

    <!-- CTA Buttons -->
    <div class="hidden md:flex items-center gap-3">
      <!-- Sign In Button -->
      <a 
        href={isAuthenticated ? '/admin' : '/signIn'} 
        class="nav-button inline-flex items-center gap-2 px-3 py-2 rounded-full bg-gray-800 hover:bg-gray-700 text-white font-medium text-sm transition-all duration-300"
        title={isAuthenticated ? 'Admin Dashboard' : 'Sign In'}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
        <span class="sr-only">{isAuthenticated ? 'Admin Dashboard' : 'Sign In'}</span>
      </a>

      <!-- Resume Button -->
      <a 
        href={cvUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        class="nav-button inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-600 hover:bg-violet-700 text-white font-medium text-sm transition-all duration-300 shadow-lg hover:shadow-violet-500/20"
      >
        <span>Resume</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-download">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
      </a>
    </div>

    <!-- Mobile Menu Button -->
    <button 
      class="md:hidden flex items-center text-white"
      aria-label="Toggle menu"
      on:click={toggleMobileMenu}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        class="transition-transform duration-300 {mobileMenuOpen ? 'rotate-90' : ''}"
      >
        {#if mobileMenuOpen}
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        {:else}
          <line x1="4" y1="12" x2="20" y2="12"></line>
          <line x1="4" y1="6" x2="20" y2="6"></line>
          <line x1="4" y1="18" x2="20" y2="18"></line>
        {/if}
      </svg>
    </button>
  </div>

  <!-- Mobile Menu -->
  {#if mobileMenuOpen}
    <div 
      class="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-md shadow-lg py-4"
      transition:slide={{ duration: 300, axis: 'y' }}
    >
      <nav class="container mx-auto px-4 flex flex-col gap-4">
        {#each navLinks as link}
          <a 
            href={link.href}
            class="py-2 px-4 text-base font-medium transition-colors duration-300 hover:text-violet-400 {isActive(link.href) ? 'text-violet-400 bg-violet-900/20 rounded-lg' : 'text-white/80'}"
            on:click|preventDefault={() => {
              if (link.href.includes('#')) {
                scrollToSection(link.href.split('#')[1]);
              } else {
                window.location.href = link.href;
              }
            }}
          >
            {link.name}
          </a>
        {/each}
        
        <!-- Mobile Sign In Button -->
        <a 
          href={isAuthenticated ? '/admin' : '/signIn'} 
          class="py-2 px-4 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-medium text-base transition-all duration-300 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <span>{isAuthenticated ? 'Admin Dashboard' : 'Sign In'}</span>
        </a>
        
        <!-- Mobile CTA Button -->
        <a 
          href={cvUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          class="mt-2 py-2 px-4 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-medium text-base transition-all duration-300 flex items-center justify-center gap-2"
        >
          <span>Download Resume</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-download">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
        </a>
      </nav>
    </div>
  {/if}
</header>

<!-- Spacer to prevent content from being hidden under the fixed header -->
<div class="h-16 md:h-20"></div> 
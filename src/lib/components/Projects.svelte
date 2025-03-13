<script lang="ts">
  import { onMount } from 'svelte';
  import { staggerElements, fadeInUp } from '$lib/animations/gsap';
  import { projectsStore } from '$lib/stores';
  import type { Project } from '$lib/types';
  import { browser } from '$app/environment';
  import ProjectCard from './ProjectCard.svelte';

  let projectsSection: HTMLElement;
  let projectsHeading: HTMLElement;
  let projectsSubheading: HTMLElement;
  let projectCards: HTMLElement[] = [];
  let isLoading = true;

  // Initialize animations
  onMount(() => {
    if (browser) {
      // Animate section heading
      fadeInUp(projectsHeading, 0.2, 1);
      
      // Animate section subheading
      fadeInUp(projectsSubheading, 0.4, 1);
      
      // Staggered animation for project cards
      if (projectCards.length > 0) {
        staggerElements(projectCards, 0.15, 0.6);
      }

      // Set loading to false after a short delay
      setTimeout(() => {
        isLoading = false;
      }, 2000);
    }
  });

  // Get projects from store
  let projects: Project[] = [];
  projectsStore.subscribe(state => {
    projects = state.data;
    isLoading = state.loading;
  });
</script>

<section 
  id="projects" 
  bind:this={projectsSection}
  class="py-20 md:py-28"
>
  <div class="container mx-auto px-4 md:px-6">
    <!-- Section Header -->
    <div class="flex flex-col gap-4 text-center mb-16">
      <h2 
        bind:this={projectsHeading}
        class="text-3xl md:text-4xl lg:text-5xl font-bold"
      >
        Featured <span class="text-violet-400">Projects</span>
      </h2>
      <p 
        bind:this={projectsSubheading}
        class="text-lg text-gray-400 max-w-2xl mx-auto"
      >
        A collection of my recent work showcasing my skills and expertise in web development, blockchain, and more.
      </p>
    </div>
    
    <!-- Projects Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#if isLoading}
        <!-- Loading Placeholders -->
        {#each Array(3) as _, i}
          <div bind:this={projectCards[i]}>
            <div class="bg-gray-900/50 border border-gray-800 rounded-xl p-6 h-[400px] flex items-center justify-center">
              <div class="flex flex-col items-center gap-4">
                <div class="w-12 h-12 rounded-full border-4 border-violet-500/20 border-t-violet-500 animate-spin"></div>
                <p class="text-gray-500">Loading projects...</p>
              </div>
            </div>
          </div>
        {/each}
      {:else if projects.length > 0}
        <!-- Projects -->
        {#each projects as project, i}
          <div bind:this={projectCards[i]}>
            <ProjectCard {project} />
          </div>
        {/each}
      {:else}
        <!-- No Projects Message -->
        <div class="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col items-center justify-center py-16 bg-gray-900/30 rounded-xl border border-gray-800">
          <div class="text-6xl mb-4">😢</div>
          <h3 class="text-xl font-semibold text-violet-400 mb-2">No Projects Found</h3>
          <p class="text-gray-400 max-w-md text-center">
            There are currently no projects to display. Please check back later or contact me to learn more about my work.
          </p>
        </div>
      {/if}
    </div>
    
    <!-- View More Button -->
    <!-- {#if projects.length > 3}
      <div class="flex justify-center mt-12">
        <a 
          href="/projects" 
          class="px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-700 text-white font-medium transition-all duration-300 shadow-lg hover:shadow-violet-500/20 flex items-center gap-2"
        >
          View All Projects
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </a>
      </div>
    {/if} -->
  </div>
</section> 
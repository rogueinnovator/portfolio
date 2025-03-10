<script lang="ts">
  import { onMount } from 'svelte';
  import { hoverAnimation } from '$lib/animations/gsap';
  import type { Project } from '$lib/types';
  import { browser } from '$app/environment';
  import { truncateText } from '$lib/utils';

  // Props
  export let project: Project;

  // Local state
  let isHovered = false;
  let cardElement: HTMLElement;

  // Initialize animations
  onMount(() => {
    if (browser && cardElement) {
      hoverAnimation(cardElement, 1.03);
    }
  });

  // Toggle hover state
  function handleMouseEnter() {
    isHovered = true;
  }

  function handleMouseLeave() {
    isHovered = false;
  }
</script>

<div 
  bind:this={cardElement}
  class="group relative overflow-hidden rounded-xl bg-gray-900/50 border border-gray-800 h-full transition-all duration-300"
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
>
  <!-- Project Image -->
  <div class="aspect-video w-full overflow-hidden">
    {#if project.preview}
      <img 
        src={project.preview} 
        alt={project.name} 
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
    {:else}
      <div class="w-full h-full bg-violet-900/20 flex items-center justify-center">
        <span class="text-violet-400 text-4xl">
          <i class="fa-solid fa-code"></i>
        </span>
      </div>
    {/if}
  </div>
  
  <!-- Project Content -->
  <div class="p-6">
    <h3 class="text-xl font-bold mb-2 text-white group-hover:text-violet-400 transition-colors duration-300">
      {project.name}
    </h3>
    
    <p class="text-gray-400 mb-4">
      {truncateText(project.description, 120)}
    </p>
    
    <!-- Technologies -->
    {#if project.technologies && project.technologies.length > 0}
      <div class="flex flex-wrap gap-2 mb-4">
        {#each project.technologies as tech}
          <span class="px-2 py-1 text-xs rounded-full bg-violet-900/30 text-violet-300">
            {tech}
          </span>
        {/each}
      </div>
    {/if}
    
    <!-- Action Buttons -->
    <div class="flex items-center justify-between mt-4">
      <a 
        href={project.URL} 
        target="_blank" 
        rel="noopener noreferrer"
        class="text-violet-400 hover:text-violet-300 transition-colors duration-300 flex items-center gap-1 text-sm font-medium"
      >
        View Project
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
          <polyline points="15 3 21 3 21 9"></polyline>
          <line x1="10" y1="14" x2="21" y2="3"></line>
        </svg>
      </a>
      
      <a 
        href={project.URL.includes('github.com') ? project.URL : '#'} 
        target="_blank" 
        rel="noopener noreferrer"
        class="text-gray-400 hover:text-white transition-colors duration-300"
        class:pointer-events-none={!project.URL.includes('github.com')}
      >
        <i class="fa-brands fa-github text-lg"></i>
      </a>
    </div>
  </div>
  
  <!-- Hover Overlay -->
  <div 
    class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
  ></div>
</div> 
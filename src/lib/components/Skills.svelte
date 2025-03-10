<script lang="ts">
  import { onMount } from 'svelte';
  import { fadeInUp, staggerElements } from '$lib/animations/gsap';
  import type { SkillIcon } from '$lib/types';
  import { browser } from '$app/environment';

  // Skill categories
  const categories = [
    {
      name: 'Frontend',
      icons: [
        { src: 'https://img.icons8.com/?size=100&id=Mm35TzLKahiF&format=png&color=000000', alt: 'React', name: 'React' },
        { src: 'https://img.icons8.com/?size=100&id=Xf1sHBmY73hA&format=png&color=000000', alt: 'Svelte', name: 'Svelte' },
        { src: 'https://img.icons8.com/?size=100&id=egQrEphjrirz&format=png&color=FFFFFF', alt: 'TypeScript', name: 'TypeScript' },
        { src: 'https://img.icons8.com/?size=100&id=wPohyHO_qO1a&format=png&color=000000', alt: 'JavaScript', name: 'JavaScript' },
        { src: 'https://img.icons8.com/?size=100&id=111474&format=png&color=FFFFFF', alt: 'CSS', name: 'CSS' },
        { src: 'https://img.icons8.com/?size=100&id=MWiBjkuHeMVq&format=png&color=000000', alt: 'Tailwind CSS', name: 'Tailwind CSS' }
      ]
    },
    {
      name: 'Backend',
      icons: [
        { src: 'https://img.icons8.com/?size=100&id=9Gfx4Dfxl0JK&format=png&color=000000', alt: 'Node.js', name: 'Node.js' },
        { src: 'https://img.icons8.com/?size=100&id=CIAZz2CYc6Kc&format=png&color=000000', alt: 'Express', name: 'Express' },
        { src: 'https://img.icons8.com/?size=100&id=cdYUlRaag9G9&format=png&color=000000', alt: 'Firebase', name: 'Firebase' },
        { src: 'https://img.icons8.com/?size=100&id=17842&format=png&color=000000', alt: 'MongoDB', name: 'MongoDB' }
      ]
    },
    {
      name: 'Tools & Technologies',
      icons: [
        { src: 'https://archive.trufflesuite.com/assets/logo.png', alt: 'Truffle', name: 'Truffle' },
        { src: 'https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png', alt: 'Git', name: 'Git' },
        { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/2560px-Tailwind_CSS_Logo.svg.png', alt: 'Tailwind CSS', name: 'Tailwind CSS' },
        { src: 'https://img.icons8.com/?size=100&id=bosfpvRzNOG8&format=png&color=000000', alt: 'Docker', name: 'Docker' },
        { src: '/images/gsap.png', alt: 'GSAP', name: 'GSAP' }
      ]
    }
  ];

  // Elements for animation
  let skillsHeading: HTMLElement;
  let skillsSubheading: HTMLElement;
  let categoryElements: HTMLElement[] = [];
  let skillElements: HTMLElement[][] = [[], [], []];

  // Initialize animations
  onMount(() => {
    if (browser) {
      // Animate section heading
      fadeInUp(skillsHeading, 0.2, 1);
      
      // Animate section subheading
      fadeInUp(skillsSubheading, 0.4, 1);
      
      // Staggered animation for categories
      staggerElements(categoryElements, 0.2, 0.6);
      
      // Staggered animation for skills in each category
      categories.forEach((_, index) => {
        if (skillElements[index] && skillElements[index].length > 0) {
          staggerElements(skillElements[index], 0.1, 0.2);
        }
      });
    }
  });
</script>

<section id="skills" class="py-20 md:py-28 bg-black/30">
  <div class="container mx-auto px-4 md:px-6">
    <!-- Section Header -->
    <div class="flex flex-col gap-4 text-center mb-16">
      <h2 
        bind:this={skillsHeading}
        class="text-3xl md:text-4xl lg:text-5xl font-bold"
      >
        Technical <span class="text-violet-400">Skills</span>
      </h2>
      <p 
        bind:this={skillsSubheading}
        class="text-lg text-gray-400 max-w-2xl mx-auto"
      >
        A comprehensive overview of my technical expertise and the tools I use to build modern web applications.
      </p>
    </div>
    
    <!-- Skills Categories -->
    <div class="space-y-16">
      {#each categories as category, categoryIndex}
        <div bind:this={categoryElements[categoryIndex]} class="space-y-6">
          <h3 class="text-2xl font-semibold text-center text-white">
            {category.name}
          </h3>
          
          <div 
            class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
            style="background-image: url('/images/terminal.gif'); background-size: cover; padding: 2rem; border-radius: 1rem;"
          >
            {#each category.icons as icon, iconIndex}
              <div 
                bind:this={skillElements[categoryIndex][iconIndex]}
                class="flex flex-col items-center gap-3 p-4 rounded-lg bg-black/60 backdrop-blur-sm border border-violet-900/30 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/10"
              >
                <img 
                  src={icon.src} 
                  alt={icon.alt} 
                  class="w-16 h-16 object-contain"
                />
                {#if icon.name}
                  <span class="text-sm font-medium text-gray-300">{icon.name}</span>
                {/if}
              </div>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </div>
</section> 
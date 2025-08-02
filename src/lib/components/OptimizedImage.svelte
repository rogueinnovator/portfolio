<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  export let src: string;
  export let alt: string;
  export let class: string;
  export let width: number | undefined = undefined;
  export let height: number | undefined = undefined;
  export let loading: 'lazy' | 'eager' = 'lazy';
  export let placeholder: string = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNjY2Ii8+PC9zdmc+';

  let imgElement: HTMLImageElement;
  let loaded = false;
  let error = false;
  let observer: IntersectionObserver;

  onMount(() => {
    if (!browser || loading === 'eager') return;

    // Intersection Observer for lazy loading
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadImage();
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '50px' // Start loading 50px before entering viewport
      }
    );

    if (imgElement) {
      observer.observe(imgElement);
    }

    return () => {
      if (observer && imgElement) {
        observer.unobserve(imgElement);
      }
    };
  });

  function loadImage() {
    if (loaded || error) return;
    
    const img = new Image();
    img.onload = () => {
      loaded = true;
      if (imgElement) {
        imgElement.src = src;
      }
    };
    img.onerror = () => {
      error = true;
    };
    img.src = src;
  }

  function handleLoad() {
    loaded = true;
  }

  function handleError() {
    error = true;
  }
</script>

<img
  bind:this={imgElement}
  src={loading === 'eager' ? src : placeholder}
  {alt}
  {width}
  {height}
  class={`transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'} ${class}`}
  loading={loading}
  decoding="async"
  on:load={handleLoad}
  on:error={handleError}
/>

{#if error}
  <div class="flex items-center justify-center bg-gray-800 text-gray-400 {class}">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
    </svg>
  </div>
{/if}

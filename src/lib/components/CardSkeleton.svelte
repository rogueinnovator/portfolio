<script lang="ts">
  export let count: number = 3;
</script>

{#each Array(count) as _, i}
  <div class="bg-gray-900/50 border border-gray-800 rounded-xl p-6 h-[600px] overflow-hidden mt-7 ">
    <div class="animate-pulse flex flex-col h-full">
      <div class="bg-gray-800 rounded-lg h-48 w-full"></div>
      <div class="mt-4 space-y-3 flex-1 flex flex-col">
        <div class="h-5 bg-gray-800 rounded w-3/4"></div>
        <div class="h-4 bg-gray-800 rounded w-full"></div>
        <div class="h-4 bg-gray-800 rounded w-5/6"></div>
        <div class="h-4 bg-gray-800 rounded w-5/6"></div>
        <div class="h-4 bg-gray-800 rounded w-5/6"></div>
        <div class="h-4 bg-gray-800 rounded w-5/6"></div>
        <div class="flex-1"></div>
        <div class="flex gap-2 mt-auto pt-4">
          <div class="h-6 bg-gray-800 rounded-full w-16"></div>
          <div class="h-6 bg-gray-800 rounded-full w-16"></div>
          <div class="h-6 bg-gray-800 rounded-full w-16"></div>
        </div>
      </div>
    </div>
  </div>
{/each}
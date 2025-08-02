<script lang="ts">
  import { onMount } from 'svelte';
  import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
  import type { Project } from '$lib/types';
	import { db } from '$lib/fireBaseConfig';
  // State
  let projects: Project[] = [];
  let isLoading = true;
  let searchQuery = '';
  let showDeleteModal = false;
  let projectToDelete: Project | null = null;
  // Fetch projects
  async function fetchProjects() {
    isLoading = true;
    try {
      const projectsQuery = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
      const projectsSnapshot = await getDocs(projectsQuery);
      projects = projectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      isLoading = false;
    }
  }

  // Delete project
  async function deleteProject(id: string) {
    try {
      await deleteDoc(doc(db, 'projects', id));
      projects = projects.filter(project => project.id !== id);
      showDeleteModal = false;
      projectToDelete = null;
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  }

  // Confirm delete
  function confirmDelete(project: Project) {
    projectToDelete = project;
    showDeleteModal = true;
  }

  // Cancel delete
  function cancelDelete() {
    showDeleteModal = false;
    projectToDelete = null;
  }

  // Format date
  function formatDate(timestamp: any) {
    if (!timestamp) return 'N/A';
    
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  // Filter projects by search query
  $: filteredProjects = searchQuery 
    ? projects.filter(project => 
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        project.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : projects;

  // Initialize
  onMount(() => {
    fetchProjects();
  });
</script>

<div class="space-y-6 w-full">
  <!-- Header -->
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <h2 class="text-2xl font-bold">Projects Management</h2>
    <a 
      href="/admin/projects/new" 
      class="inline-flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors duration-200"
    >
      <i class="fa-solid fa-plus"></i>
      <span>Add New Project</span>
    </a>
  </div>

  <!-- Search and Filters -->
  <div class="bg-gray-900 rounded-lg p-4 border border-gray-800">
    <div class="flex flex-col sm:flex-row gap-4">
      <div class="flex-1">
        <div class="relative">
          <input 
            type="text" 
            bind:value={searchQuery}
            placeholder="Search projects..." 
            class="w-full px-4 py-2 pl-10 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 text-white"
          />
          <i class="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
        </div>
      </div>
      <div>
        <button 
          on:click={fetchProjects}
          class="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
        >
          <i class="fa-solid fa-rotate"></i>
          <span>Refresh</span>
        </button>
      </div>
    </div>
  </div>

  <!-- Projects Table -->
  <div class="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
    {#if isLoading}
      <div class="flex justify-center items-center py-20">
        <div class="w-12 h-12 border-4 border-violet-500/20 border-t-violet-500 rounded-full animate-spin"></div>
      </div>
    {:else if projects.length === 0}
      <div class="flex flex-col items-center justify-center py-20 text-gray-400">
        <div class="text-6xl mb-4">😢</div>
        <h3 class="text-xl font-semibold mb-2">No Projects Found</h3>
        <p class="max-w-md text-center mb-6">
          You haven't added any projects yet. Start showcasing your work by adding your first project.
        </p>
        <a 
          href="/admin/projects/new" 
          class="px-6 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors duration-200"
        >
          Add Your First Project
        </a>
      </div>
    {:else if filteredProjects.length === 0}
      <div class="flex flex-col items-center justify-center py-20 text-gray-400">
        <div class="text-6xl mb-4">🔍</div>
        <h3 class="text-xl font-semibold mb-2">No Matching Projects</h3>
        <p class="max-w-md text-center">
          No projects match your search query. Try a different search term or clear the search.
        </p>
      </div>
    {:else}
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-800/50 border-b border-gray-700">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Project</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date Added</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Technologies</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-800">
            {#each filteredProjects as project}
              <tr class="hover:bg-gray-800/30 transition-colors duration-150">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10 rounded overflow-hidden bg-gray-800">
                      {#if project.preview}
                        <img src={project.preview} alt={project.name} class="h-10 w-10 object-cover" />
                      {:else}
                        <div class="h-10 w-10 flex items-center justify-center text-violet-400">
                          <i class="fa-solid fa-code"></i>
                        </div>
                      {/if}
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-white">{project.name}</div>
                      <div class="text-sm text-gray-400">{project.description?.substring(0, 60)}...</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-300">{project.createdAt ? formatDate(project.createdAt) : 'N/A'}</div>
                </td>
                <td class="px-6 py-4">
                  <div class="flex flex-wrap gap-2">
                    {#if project.technologies && project.technologies.length > 0}
                      {#each project.technologies.slice(0, 3) as tech}
                        <span class="px-2 py-1 text-xs rounded-full bg-violet-900/30 text-violet-300">{tech}</span>
                      {/each}
                      {#if project.technologies.length > 3}
                        <span class="px-2 py-1 text-xs rounded-full bg-gray-800 text-gray-400">+{project.technologies.length - 3}</span>
                      {/if}
                    {:else}
                      <span class="text-sm text-gray-500">No technologies listed</span>
                    {/if}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex justify-end gap-2">
                    <a 
                      href={`/admin/projects/${project.id}`} 
                      class="text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
                      aria-label="Edit Project"
                    >
                      <i class="fa-solid fa-edit"></i>
                    </a>
                    <button 
                      on:click={() => confirmDelete(project)}
                      class="text-red-400 hover:text-red-300 transition-colors duration-200"
                      aria-label="Delete Project"
                    >
                      <i class="fa-solid fa-trash"></i>
                    </button>
                    <a 
                      href={project.URL} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      class="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                      aria-label="View Project"
                    >
                      <i class="fa-solid fa-external-link-alt"></i>
                    </a>
                  </div>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  </div>
</div>

<!-- Delete Confirmation Modal -->
{#if showDeleteModal}
  <div class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
    <div class="bg-gray-900 rounded-lg max-w-md w-full p-6 border border-gray-800 shadow-xl">
      <h3 class="text-xl font-semibold mb-4">Confirm Deletion</h3>
      <p class="text-gray-300 mb-6">
        Are you sure you want to delete the project <span class="font-semibold text-white">{projectToDelete?.name}</span>? This action cannot be undone.
      </p>
      <div class="flex justify-end gap-4">
        <button 
          on:click={cancelDelete}
          class="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200"
        >
          Cancel
        </button>
        <button 
          on:click={() => projectToDelete?.id && deleteProject(projectToDelete.id)}
          class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
{/if} 
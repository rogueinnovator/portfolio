<script lang="ts">
  import { onMount } from 'svelte';
  import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
  import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
  import { db } from '$lib/config/firebase';
  import { goto } from '$app/navigation';
  import type { Project } from '$lib/types';

  // Form state
  let name = '';
  let description = '';
  let url = '';
  let technologies = '';
  let previewImage: File | null = null;
  let previewImageName = '';
  let isSubmitting = false;
  let error = '';
  let success = '';

  // Handle file input change
  function handleFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      previewImage = input.files[0];
      previewImageName = previewImage.name;
    }
  }

  // Handle form submission
  async function handleSubmit() {
    // Validate form
    if (!name || !description || !url) {
      error = 'Please fill in all required fields.';
      return;
    }

    isSubmitting = true;
    error = '';
    success = '';

    try {
      let previewUrl = '';

      // Upload image if provided
      if (previewImage) {
        const storage = getStorage();
        const storageRef = ref(storage, `projects/${Date.now()}_${previewImage.name}`);
        await uploadBytes(storageRef, previewImage);
        previewUrl = await getDownloadURL(storageRef);
      }

      // Create project object
      const projectData: Omit<Project, 'id'> = {
        name,
        description,
        URL: url,
        preview: previewUrl,
        technologies: technologies.split(',').map(tech => tech.trim()).filter(tech => tech),
        createdAt: serverTimestamp()
      };

      // Add to Firestore
      await addDoc(collection(db, 'projects'), projectData);
      
      success = 'Project added successfully!';
      
      // Reset form
      name = '';
      description = '';
      url = '';
      technologies = '';
      previewImage = null;
      previewImageName = '';
      
      // Redirect after a short delay
      setTimeout(() => {
        goto('/admin/projects');
      }, 2000);
    } catch (err) {
      console.error('Error adding project:', err);
      error = 'An error occurred while adding the project. Please try again.';
    } finally {
      isSubmitting = false;
    }
  }
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex items-center justify-between">
    <h2 class="text-2xl font-bold">Add New Project</h2>
    <a 
      href="/admin/projects" 
      class="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200"
    >
      <i class="fa-solid fa-arrow-left"></i>
      <span>Back to Projects</span>
    </a>
  </div>

  <!-- Form Card -->
  <div class="bg-gray-900 rounded-lg border border-gray-800 p-6">
    <form on:submit|preventDefault={handleSubmit} class="space-y-6">
      <!-- Error Message -->
      {#if error}
        <div class="p-4 bg-red-900/30 border border-red-500 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      {/if}

      <!-- Success Message -->
      {#if success}
        <div class="p-4 bg-green-900/30 border border-green-500 rounded-lg text-green-400 text-sm">
          {success}
        </div>
      {/if}

      <!-- Project Name -->
      <div>
        <label for="name" class="block text-sm font-medium text-gray-400 mb-2">Project Name *</label>
        <input
          type="text"
          id="name"
          bind:value={name}
          required
          class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300 text-white"
          placeholder="Enter project name"
        />
      </div>

      <!-- Project Description -->
      <div>
        <label for="description" class="block text-sm font-medium text-gray-400 mb-2">Description *</label>
        <textarea
          id="description"
          bind:value={description}
          required
          rows="5"
          class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300 text-white resize-none"
          placeholder="Describe your project"
        ></textarea>
      </div>

      <!-- Project URL -->
      <div>
        <label for="url" class="block text-sm font-medium text-gray-400 mb-2">Project URL *</label>
        <input
          type="url"
          id="url"
          bind:value={url}
          required
          class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300 text-white"
          placeholder="https://github.com/yourusername/project"
        />
      </div>

      <!-- Technologies -->
      <div>
        <label for="technologies" class="block text-sm font-medium text-gray-400 mb-2">Technologies (comma separated)</label>
        <input
          type="text"
          id="technologies"
          bind:value={technologies}
          class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300 text-white"
          placeholder="React, TypeScript, Firebase, etc."
        />
      </div>

      <!-- Preview Image -->
      <div>
        <label for="preview" class="block text-sm font-medium text-gray-400 mb-2">Preview Image</label>
        <div class="flex items-center gap-4">
          <label 
            for="preview" 
            class="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors duration-200 flex items-center gap-2"
          >
            <i class="fa-solid fa-upload"></i>
            <span>Choose File</span>
            <input
              type="file"
              id="preview"
              accept="image/*"
              on:change={handleFileChange}
              class="hidden"
            />
          </label>
          {#if previewImageName}
            <span class="text-sm text-gray-400">{previewImageName}</span>
          {:else}
            <span class="text-sm text-gray-500">No file chosen</span>
          {/if}
        </div>
      </div>

      <!-- Submit Button -->
      <div class="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          class="w-full px-6 py-3 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-medium transition-all duration-300 shadow-lg hover:shadow-violet-500/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {#if isSubmitting}
            <div class="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
            <span>Adding Project...</span>
          {:else}
            <i class="fa-solid fa-plus"></i>
            <span>Add Project</span>
          {/if}
        </button>
      </div>
    </form>
  </div>
</div> 
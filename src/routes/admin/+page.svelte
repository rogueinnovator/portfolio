<script lang="ts">
	import { authHandler, authStore } from '$lib/stores';
	import {
		collection,
		deleteDoc,
		addDoc,
		doc,
		getDocs,
		query,
		orderBy,
		limit
	} from 'firebase/firestore';
	import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import storage functions
	import { renameFile } from '../../utils/renameFile';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { db } from '$lib/fireBaseConfig';
	import type { Project } from '$lib/types';

	let newProject: Project = { name: '', description: '', preview: '', URL: '' };
	let loading: boolean = true;
	let projects: Project[] = [];
	let errorMessage: string = ':(';
	let file: File | null = null;
	let fileName: string = '';

	// Stats
	let totalProjects = 0;
	let totalMessages = 0;
	let totalVisits = 0;
	let recentProjects: Project[] = [];
	let recentMessages: any[] = [];
	let isLoading = true;

	authStore.subscribe((curr) => {
		projects = curr.data as Project[];
		loading = curr.loading;
		console.log(projects);
	});

	const deleteProject = async (projectId: string) => {
		try {
			await deleteDoc(doc(db, 'projects', projectId));
		} catch (error) {
			console.error('Error deleting project:', error);
		}
	};

	const logOut = () => {
		authHandler.logOut();
		goto('/');
	};

	const createNewProject = async () => {
		if (!newProject.name || !newProject.description || !newProject.URL || !file) {
			errorMessage = 'Please fill all fields and select a file.';
			return;
		} else {
			errorMessage = ':)';
		}
		try {
			const storage = getStorage();
			fileName = renameFile(file);
			const fileRef = ref(storage, `project-previews/${fileName}`);
			const snapshot = await uploadBytes(fileRef, file);
			const fileURL = await getDownloadURL(snapshot.ref);

			// Add project document to Firestore
			const docRef = await addDoc(collection(db, 'projects'), {
				name: newProject.name,
				description: newProject.description,
				preview: fileURL,
				URL: newProject.URL
			});
			console.log('Project added with ID:', docRef.id);
		} catch (error) {
			console.error('Error creating new project:', error);
			errorMessage = 'Error creating project.';
		}
	};

	function truncateDescription(description: string) {
		const words = description.split(' ');
		return words.slice(0, 10).join(' ') + (words.length > 10 ? '...' : '');
	}

	// Fetch data
	onMount(async () => {
		try {
			// Fetch projects
			const projectsQuery = query(
				collection(db, 'projects'),
				orderBy('createdAt', 'desc'),
				limit(5)
			);
			const projectsSnapshot = await getDocs(projectsQuery);
			totalProjects = projectsSnapshot.size;
			recentProjects = projectsSnapshot.docs.map(
				(doc) => ({ id: doc.id, ...doc.data() }) as Project
			);

			// Fetch messages
			try {
				const messagesQuery = query(
					collection(db, 'messages'),
					orderBy('createdAt', 'desc'),
					limit(5)
				);
				const messagesSnapshot = await getDocs(messagesQuery);
				totalMessages = messagesSnapshot.size;
				recentMessages = messagesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
			} catch (error) {
				console.log('No messages collection found');
				totalMessages = 0;
			}

			// Fetch visits (assuming you have a visits collection)
			try {
				const visitsQuery = collection(db, 'visits');
				const visitsSnapshot = await getDocs(visitsQuery);
				totalVisits = visitsSnapshot.size;
			} catch (error) {
				console.log('No visits collection found');
				totalVisits = 0;
			}
		} catch (error) {
			console.error('Error fetching data:', error);
		} finally {
			isLoading = false;
		}
	});

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
</script>

<div class="space-y-8">
	<!-- Stats Cards -->
	<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
		<!-- Projects Card -->
		<div class="bg-gray-900 rounded-xl p-6 border border-gray-800 shadow-lg">
			<div class="flex items-center justify-between">
				<h3 class="text-lg font-medium text-gray-300">Total Projects</h3>
				<div class="w-12 h-12 rounded-full bg-violet-900/30 flex items-center justify-center">
					<i class="fa-solid fa-code text-violet-400"></i>
				</div>
			</div>
			<p class="text-4xl font-bold mt-4 text-white">
				{isLoading ? '...' : totalProjects}
			</p>
			<p class="text-sm text-gray-400 mt-2">
				<a href="/admin/projects" class="text-violet-400 hover:underline">Manage Projects →</a>
			</p>
		</div>

		<!-- Messages Card -->
		<div class="bg-gray-900 rounded-xl p-6 border border-gray-800 shadow-lg">
			<div class="flex items-center justify-between">
				<h3 class="text-lg font-medium text-gray-300">Total Messages</h3>
				<div class="w-12 h-12 rounded-full bg-indigo-900/30 flex items-center justify-center">
					<i class="fa-solid fa-envelope text-indigo-400"></i>
				</div>
			</div>
			<p class="text-4xl font-bold mt-4 text-white">
				{isLoading ? '...' : totalMessages}
			</p>
			<p class="text-sm text-gray-400 mt-2">
				<a href="/admin/messages" class="text-indigo-400 hover:underline">View Messages →</a>
			</p>
		</div>

		<!-- Visits Card -->
		<div class="bg-gray-900 rounded-xl p-6 border border-gray-800 shadow-lg">
			<div class="flex items-center justify-between">
				<h3 class="text-lg font-medium text-gray-300">Total Visits</h3>
				<div class="w-12 h-12 rounded-full bg-blue-900/30 flex items-center justify-center">
					<i class="fa-solid fa-chart-line text-blue-400"></i>
				</div>
			</div>
			<p class="text-4xl font-bold mt-4 text-white">
				{isLoading ? '...' : totalVisits}
			</p>
			<p class="text-sm text-gray-400 mt-2">
				<span class="text-blue-400">Portfolio Analytics</span>
			</p>
		</div>
	</div>

	<!-- Recent Activity -->
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
		<!-- Recent Projects -->
		<div class="bg-gray-900 rounded-xl border border-gray-800 shadow-lg overflow-hidden">
			<div class="p-6 border-b border-gray-800">
				<h3 class="text-xl font-semibold">Recent Projects</h3>
			</div>
			<div class="p-6">
				{#if isLoading}
					<div class="flex justify-center py-8">
						<div
							class="w-10 h-10 border-4 border-violet-500/20 border-t-violet-500 rounded-full animate-spin"
						></div>
					</div>
				{:else if recentProjects.length === 0}
					<div class="text-center py-8 text-gray-400">
						<div class="text-4xl mb-2">😢</div>
						<p>No projects found</p>
					</div>
				{:else}
					<ul class="divide-y divide-gray-800">
						{#each recentProjects as project}
							<li class="py-4">
								<div class="flex justify-between">
									<div>
										<h4 class="font-medium text-white">{project.name}</h4>
										<p class="text-sm text-gray-400 mt-1">
											{project.description?.substring(0, 60)}...
										</p>
									</div>
									<div class="text-sm text-gray-500">
										{project.createdAt ? formatDate(project.createdAt) : 'N/A'}
									</div>
								</div>
							</li>
						{/each}
					</ul>
				{/if}
			</div>
			<div class="bg-gray-900/50 p-4 border-t border-gray-800">
				<a href="/admin/projects" class="text-violet-400 hover:underline text-sm"
					>View all projects →</a
				>
			</div>
		</div>

		<!-- Recent Messages -->
		<div class="bg-gray-900 rounded-xl border border-gray-800 shadow-lg overflow-hidden">
			<div class="p-6 border-b border-gray-800">
				<h3 class="text-xl font-semibold">Recent Messages</h3>
			</div>
			<div class="p-6">
				{#if isLoading}
					<div class="flex justify-center py-8">
						<div
							class="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"
						></div>
					</div>
				{:else if recentMessages.length === 0}
					<div class="text-center py-8 text-gray-400">
						<div class="text-4xl mb-2">📭</div>
						<p>No messages yet</p>
					</div>
				{:else}
					<ul class="divide-y divide-gray-800">
						{#each recentMessages as message}
							<li class="py-4">
								<div class="flex justify-between">
									<div>
										<h4 class="font-medium text-white">{message.name}</h4>
										<p class="text-sm text-gray-400 mt-1">{message.message?.substring(0, 60)}...</p>
									</div>
									<div class="text-sm text-gray-500">
										{message.createdAt ? formatDate(message.createdAt) : 'N/A'}
									</div>
								</div>
							</li>
						{/each}
					</ul>
				{/if}
			</div>
			<div class="bg-gray-900/50 p-4 border-t border-gray-800">
				<a href="/admin/messages" class="text-indigo-400 hover:underline text-sm"
					>View all messages →</a
				>
			</div>
		</div>
	</div>

	<!-- Quick Actions -->
	<div class="bg-gray-900 rounded-xl border border-gray-800 shadow-lg p-6">
		<h3 class="text-xl font-semibold mb-4">Quick Actions</h3>
		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
			<a
				href="/admin/projects/new"
				class="flex items-center gap-3 p-4 rounded-lg bg-violet-900/20 border border-violet-800/30 hover:bg-violet-900/30 transition-colors duration-200"
			>
				<div class="w-10 h-10 rounded-full bg-violet-900/50 flex items-center justify-center">
					<i class="fa-solid fa-plus text-violet-400"></i>
				</div>
				<span class="font-medium">Add Project</span>
			</a>

			<a
				href="/admin/messages"
				class="flex items-center gap-3 p-4 rounded-lg bg-indigo-900/20 border border-indigo-800/30 hover:bg-indigo-900/30 transition-colors duration-200"
			>
				<div class="w-10 h-10 rounded-full bg-indigo-900/50 flex items-center justify-center">
					<i class="fa-solid fa-envelope-open text-indigo-400"></i>
				</div>
				<span class="font-medium">Check Messages</span>
			</a>

			<a
				href="/"
				target="_blank"
				class="flex items-center gap-3 p-4 rounded-lg bg-blue-900/20 border border-blue-800/30 hover:bg-blue-900/30 transition-colors duration-200"
			>
				<div class="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center">
					<i class="fa-solid fa-eye text-blue-400"></i>
				</div>
				<span class="font-medium">View Portfolio</span>
			</a>

			<a
				href="/admin/settings"
				class="flex items-center gap-3 p-4 rounded-lg bg-gray-800/50 border border-gray-700 hover:bg-gray-800 transition-colors duration-200"
			>
				<div class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
					<i class="fa-solid fa-gear text-gray-400"></i>
				</div>
				<span class="font-medium">Settings</span>
			</a>
		</div>
	</div>
</div>

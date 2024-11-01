<script lang="ts">
	import { authHandler, authStore } from '../../store/store';
	import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';
	import { collection, deleteDoc, addDoc, doc } from 'firebase/firestore';
	import { db } from '$lib/fireBaseConfig';
	import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import storage functions
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { renameFile } from '../../utils/renameFile';

	type Project = {
		id?: string;
		name: string;
		description: string;
		preview: string;
		URL?: string;
	};
	let newProject: Project = { name: '', description: '', preview: '', URL: '' };
	let loading: boolean = true;
	let projects: Project[] = [];
	let errorMessage: string = ':(';
	let file: File | null = null;
	let fileName: string = '';

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
		window.location.href = '/';
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
</script>

<div class="w-full h-screen">
	<div class="flex flex-row h-full">
		<div class="relative basis-1/3 bg-transparent border border-slate-700 h-full">
			<button
				on:click={logOut}
				class="absolute bottom-4 left-4 bg-transparent text-red-700 px-4 py-2 rounded-full flex items-center duration-300 hover:bg-red-600 hover:text-white"
			>
				<i class="fas fa-sign-out-alt mr-2"></i> logout
			</button>
		</div>
		<div class="basis-2/3 bg-slate-700">
			<table class="w-full m-4">
				<thead>
					<tr class="border-b border-gray-600">
						<td class="text-white font-extrabold pl-4 pb-4">Preview</td>
						<td class="text-white font-extrabold pl-4 pb-4">Name</td>
						<td class="text-white font-extrabold pl-14 pb-4">Description</td>
						<td></td>
					</tr>
				</thead>
				<tbody>
					{#each projects as project}
						<tr class="border-b border-gray-600">
							<td class="p-3">
								{#if loading}
									<Skeleton class="h-32 w-52 rounded-lg" />
								{:else}
									<a href={project.URL}
										><img
											src={project.preview}
											alt="Project Preview"
											class="rounded-lg object-cover z-[2]"
											width="200"
											height="200"
										/></a
									>
								{/if}
							</td>
							<td class="text-white font-semibold">{project.name}</td>
							<td class="text-white font-semibold">{truncateDescription(project.description)}</td>
							<td>
								<Button
									on:click={() => project.id && deleteProject(project.id)}
									class="rounded-full duration-300 hover:bg-red-700"
								>
									Delete
								</Button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
			<div class="flex justify-center">
				<Dialog.Root>
					<Dialog.Trigger class="bg-slate-900 px-3 py-2 duration-300 rounded-full hover:bg-blue-600"
						>Add Project</Dialog.Trigger
					>
					<Dialog.Content class="sm:max-w-[600px] bg-slate-700">
						<Dialog.Header>
							<Dialog.Title>Add Project</Dialog.Title>
							<Dialog.Description class="text-red-600">{errorMessage}</Dialog.Description>
						</Dialog.Header>
						<div class="grid gap-4 py-4">
							<div class="grid grid-cols-4 items-center gap-4">
								<Label for="name" class="text-right">Name</Label>
								<Input id="name" bind:value={newProject.name} class="col-span-3" />
							</div>
							<div class="grid grid-cols-4 items-center gap-4">
								<Label for="description" class="text-right">Description</Label>
								<Input id="description" bind:value={newProject.description} class="col-span-3" />
							</div>
							<div class="grid grid-cols-4 items-center gap-4">
								<Label for="URL" class="text-right">URL</Label>
								<Input id="URL" bind:value={newProject.URL} class="col-span-3" />
							</div>
							<div class="grid grid-cols-4 items-center gap-4">
								<Label for="file" class="text-right">File</Label>
								<Input
									type="file"
									id="file"
									on:change={(e) => (file = e.target.files?.[0] || null)}
									class="col-span-3"
								/>
							</div>
						</div>
						<Dialog.Footer>
							<Button
								class="rounded-full duration-300 hover:bg-blue-600"
								on:click={createNewProject}>Save project</Button
							>
						</Dialog.Footer>
					</Dialog.Content>
				</Dialog.Root>
			</div>
		</div>
	</div>
</div>

<script lang="ts">
	import { onMount } from 'svelte';
	import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
	import { db } from '$lib/fireBaseConfig';
	// State
	let messages: any[] = [];
	let isLoading = true;
	let searchQuery = '';
	let showDeleteModal = false;
	let messageToDelete: any = null;
	let selectedMessage: any = null;
	let showMessageModal = false;

	// Fetch messages
	async function fetchMessages() {
		isLoading = true;
		try {
			const messagesQuery = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
			const messagesSnapshot = await getDocs(messagesQuery);
			messages = messagesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
		} catch (error) {
			console.error('Error fetching messages:', error);
			messages = [];
		} finally {
			isLoading = false;
		}
	}

	// Delete message
	async function deleteMessage(id: string) {
		try {
			await deleteDoc(doc(db, 'messages', id));
			messages = messages.filter((message) => message.id !== id);
			showDeleteModal = false;
			messageToDelete = null;
		} catch (error) {
			console.error('Error deleting message:', error);
		}
	}

	// Confirm delete
	function confirmDelete(message: any) {
		messageToDelete = message;
		showDeleteModal = true;
	}

	// Cancel delete
	function cancelDelete() {
		showDeleteModal = false;
		messageToDelete = null;
	}

	// View message details
	function viewMessage(message: any) {
		selectedMessage = message;
		showMessageModal = true;
	}

	// Close message modal
	function closeMessageModal() {
		showMessageModal = false;
		selectedMessage = null;
	}

	// Format date
	function formatDate(timestamp: any) {
		if (!timestamp) return 'N/A';

		const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	// Filter messages by search query
	$: filteredMessages = searchQuery
		? messages.filter(
				(message) =>
					message.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
					message.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
					message.message?.toLowerCase().includes(searchQuery.toLowerCase())
			)
		: messages;

	// Initialize
	onMount(() => {
		fetchMessages();
	});
</script>

<div class="space-y-6">
	<!-- Header -->
	<div class="flex items-center justify-between">
		<h2 class="text-2xl font-bold">Messages</h2>
		<button
			on:click={fetchMessages}
			class="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200"
		>
			<i class="fa-solid fa-rotate"></i>
			<span>Refresh</span>
		</button>
	</div>

	<!-- Search -->
	<div class="bg-gray-900 rounded-lg p-4 border border-gray-800">
		<div class="relative">
			<input
				type="text"
				bind:value={searchQuery}
				placeholder="Search messages..."
				class="w-full px-4 py-2 pl-10 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
			/>
			<i class="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
		</div>
	</div>

	<!-- Messages List -->
	<div class="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
		{#if isLoading}
			<div class="flex justify-center items-center py-20">
				<div
					class="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"
				></div>
			</div>
		{:else if messages.length === 0}
			<div class="flex flex-col items-center justify-center py-20 text-gray-400">
				<div class="text-6xl mb-4">📭</div>
				<h3 class="text-xl font-semibold mb-2">No Messages Yet</h3>
				<p class="max-w-md text-center">
					You haven't received any messages yet. When visitors submit the contact form, their
					messages will appear here.
				</p>
			</div>
		{:else if filteredMessages.length === 0}
			<div class="flex flex-col items-center justify-center py-20 text-gray-400">
				<div class="text-6xl mb-4">🔍</div>
				<h3 class="text-xl font-semibold mb-2">No Matching Messages</h3>
				<p class="max-w-md text-center">
					No messages match your search query. Try a different search term or clear the search.
				</p>
			</div>
		{:else}
			<div class="overflow-x-auto">
				<table class="w-full">
					<thead class="bg-gray-800/50 border-b border-gray-700">
						<tr>
							<th
								class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
								>Sender</th
							>
							<th
								class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
								>Message</th
							>
							<th
								class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
								>Date</th
							>
							<th
								class="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider"
								>Actions</th
							>
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-800">
						{#each filteredMessages as message}
							<tr class="hover:bg-gray-800/30 transition-colors duration-150">
								<td class="px-6 py-4 whitespace-nowrap">
									<div class="flex items-center">
										<div
											class="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-900/30 flex items-center justify-center text-indigo-400"
										>
											<i class="fa-solid fa-user"></i>
										</div>
										<div class="ml-4">
											<div class="text-sm font-medium text-white">{message.name || 'Unknown'}</div>
											<div class="text-sm text-gray-400">{message.email || 'No email'}</div>
										</div>
									</div>
								</td>
								<td class="px-6 py-4">
									<div class="text-sm text-gray-300 line-clamp-2">
										{message.message?.substring(0, 100)}...
									</div>
								</td>
								<td class="px-6 py-4 whitespace-nowrap">
									<div class="text-sm text-gray-300">
										{message.createdAt ? formatDate(message.createdAt) : 'N/A'}
									</div>
								</td>
								<td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
									<div class="flex justify-end gap-2">
										<button
											on:click={() => viewMessage(message)}
											class="text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
											aria-label="View message"
										>
											<i class="fa-solid fa-eye"></i>
										</button>

										<button
											on:click={() => confirmDelete(message)}
											class="text-red-400 hover:text-red-300 transition-colors duration-200"
											aria-label="Delete message"
										>
											<i class="fa-solid fa-trash"></i>
										</button>

										{#if message.email}
											<a
												href={`mailto:${message.email}`}
												class="text-blue-400 hover:text-blue-300 transition-colors duration-200"
												aria-label="Reply to message"
											>
												<i class="fa-solid fa-reply"></i>
											</a>
										{/if}
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
				Are you sure you want to delete this message from <span class="font-semibold text-white"
					>{messageToDelete?.name || 'Unknown'}</span
				>? This action cannot be undone.
			</p>
			<div class="flex justify-end gap-4">
				<button
					on:click={cancelDelete}
					class="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200"
				>
					Cancel
				</button>
				<button
					on:click={() => messageToDelete?.id && deleteMessage(messageToDelete.id)}
					class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
				>
					Delete
				</button>
			</div>
		</div>
	</div>
{/if}

<!-- Message Details Modal -->
{#if showMessageModal && selectedMessage}
	<div class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
		<div class="bg-gray-900 rounded-lg max-w-2xl w-full p-6 border border-gray-800 shadow-xl">
			<div class="flex justify-between items-start mb-4">
				<h3 class="text-xl font-semibold">Message Details</h3>
				<button
					on:click={closeMessageModal}
					class="text-gray-400 hover:text-white transition-colors duration-200"
					aria-label="close Message Modal"
				>
					<i class="fa-solid fa-times"></i>
				</button>
			</div>

			<div class="space-y-4">
				<!-- Sender Info -->
				<div class="bg-gray-800/50 p-4 rounded-lg">
					<div class="flex items-center gap-4 mb-2">
						<div
							class="w-12 h-12 rounded-full bg-indigo-900/30 flex items-center justify-center text-indigo-400"
						>
							<i class="fa-solid fa-user"></i>
						</div>
						<div>
							<h4 class="font-medium text-white">{selectedMessage.name || 'Unknown'}</h4>
							{#if selectedMessage.email}
								<a href={`mailto:${selectedMessage.email}`} class="text-indigo-400 hover:underline">
									{selectedMessage.email}
								</a>
							{:else}
								<p class="text-gray-500">No email provided</p>
							{/if}
						</div>
					</div>
					<div class="text-sm text-gray-400">
						Received: {selectedMessage.createdAt ? formatDate(selectedMessage.createdAt) : 'N/A'}
					</div>
				</div>

				<!-- Message Content -->
				<div class="bg-gray-800/50 p-4 rounded-lg">
					<h4 class="font-medium text-white mb-2">Message</h4>
					<p class="text-gray-300 whitespace-pre-line">{selectedMessage.message}</p>
				</div>
			</div>

			<!-- Actions -->
			<div class="flex justify-end gap-4 mt-6">
				{#if selectedMessage.email}
					<a
						href={`mailto:${selectedMessage.email}`}
						class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
					>
						<i class="fa-solid fa-reply"></i>
						<span>Reply</span>
					</a>
				{/if}
				<button
					on:click={() => confirmDelete(selectedMessage)}
					class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
				>
					<i class="fa-solid fa-trash"></i>
					<span>Delete</span>
				</button>
				<button
					on:click={closeMessageModal}
					class="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200"
				>
					Close
				</button>
			</div>
		</div>
	</div>
{/if}

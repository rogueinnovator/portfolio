<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { fadeInUp } from '$lib/animations/gsap';
	import { browser } from '$app/environment';
	import { authHandler } from '$lib/stores';

	// Form data
	let email = '';
	let password = '';
	let isSubmitting = false;
	let error = '';

	// Elements for animation
	let formContainer: HTMLElement;

	// Handle sign in
	async function handleSignIn() {
		if (!email || !password) {
			error = 'Please enter both email and password.';
			return;
		}

		isSubmitting = true;
		error = '';
		try {
			const data = await authHandler.signIn(email, password);
			console.log('this is data', data);
			goto('/admin');
		} catch (err: any) {
			console.error('Error signing in:', err);
			// Handle different Firebase auth errors
			if (err.code === 'auth/invalid-credential') {
				error = 'Invalid email or password. Please try again.';
			} else if (err.code === 'auth/user-not-found') {
				error = 'No user found with this email address.';
			} else if (err.code === 'auth/wrong-password') {
				error = 'Incorrect password. Please try again.';
			} else {
				error = 'Failed to sign in. Please try again later.';
			}
		} finally {
			isSubmitting = false;
		}
	}

	// Initialize animations
	onMount(() => {
		if (browser && formContainer) {
			fadeInUp(formContainer, 0.3, 1);
		}
	});
</script>

<svelte:head>
	<title>Sign In | Admin Panel</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-black px-4">
	<div
		bind:this={formContainer}
		class="max-w-md w-full bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-800 shadow-xl p-8"
	>
		<!-- Header -->
		<div class="text-center mb-8">
			<div
				class="w-16 h-16 bg-violet-600 rounded-full flex items-center justify-center mx-auto mb-4"
			>
				<i class="fa-solid fa-user-shield text-2xl"></i>
			</div>
			<h1 class="text-2xl font-bold">Admin Sign In</h1>
			<p class="text-gray-400 mt-2">Sign in to access the admin dashboard</p>
		</div>

		<!-- Form -->
		<form on:submit|preventDefault={handleSignIn} class="space-y-6">
			<!-- Error Message -->
			{#if error}
				<div class="p-4 bg-red-900/30 border border-red-500 rounded-lg text-red-400 text-sm">
					{error}
				</div>
			{/if}

			<!-- Email Input -->
			<div>
				<label for="email" class="block text-sm font-medium text-gray-400 mb-2">Email</label>
				<input
					type="email"
					id="email"
					bind:value={email}
					required
					class="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300 text-white"
					placeholder="example@gmail.com"
				/>
			</div>

			<!-- Password Input -->
			<div>
				<label for="password" class="block text-sm font-medium text-gray-400 mb-2">Password</label>
				<input
					type="password"
					id="password"
					bind:value={password}
					required
					class="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300 text-white"
					placeholder=""
				/>
			</div>

			<!-- Submit Button -->
			<button
				type="submit"
				disabled={isSubmitting}
				class="w-full px-6 py-3 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-medium transition-all duration-300 shadow-lg hover:shadow-violet-500/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
			>
				{#if isSubmitting}
					<div
						class="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"
					></div>
					<span>Signing In...</span>
				{:else}
					<i class="fa-solid fa-sign-in-alt"></i>
					<span>Sign In</span>
				{/if}
			</button>

			<!-- Back to Home -->
			<div class="text-center mt-6">
				<a href="/" class="text-violet-400 hover:text-violet-300 transition-colors duration-300">
					← Back to Portfolio
				</a>
			</div>
		</form>
	</div>
</div>

<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { fadeInUp } from '$lib/animations/gsap';
	import { browser } from '$app/environment';
	import { authHandler } from '$lib/stores';
	import { fade } from 'svelte/transition';

	let email = 'theehuzaifa@gmail.com';
	let password = '';
	let isSubmitting = false;
	let error = '';
	//FOR ANIMATION
	let formContainer: HTMLElement;
	let passwordInput: HTMLInputElement;

	function triggerShake() {
		if (passwordInput) {
			passwordInput.classList.add('shake');
			setTimeout(() => {
				passwordInput.classList.remove('shake');
			}, 400);
		}
	}

	// HANDLE SIGN IN
	async function handleSignIn() {
		if (!email || !password) {
			error = 'Please enter both email and password.';
			return;
		}
		isSubmitting = true;
		error = '';
		try {
			await authHandler.signIn(email, password);
			goto('/admin');
		} catch (err: any) {
			console.error('Error signing in:', err);
			if (err.code === 'auth/invalid-credential') {
				error = 'Invalid email or password. Please try again.';
				triggerShake();
			} else if (err.code === 'auth/user-not-found') {
				error = 'No user found with this email address.';
				triggerShake();
			} else if (err.code === 'auth/wrong-password') {
				error = 'Incorrect password. Please try again.';
				triggerShake();
			} else {
				error = 'Failed to sign in. Please try again later.';
			}
		} finally {
			isSubmitting = false;
		}
	}

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
	<div bind:this={formContainer} class="max-w-md w-full backdrop-blur-sm rounded-xl p-8">
		<div class="text-center mb-8">
			<img
				src="images/avatar.jpg"
				alt="Admin Avatar"
				class="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
			/>
			<h1 class="text-2xl font-bold">HUZAIFA</h1>
		</div>

		<form on:submit|preventDefault={handleSignIn} class="space-y-6">
			<div class="flex justify-center items-center">
				<a href="/" class="text-white transition-colors duration-300 -mr-4"> ← </a>
				<input
					type="password"
					id="password"
					bind:this={passwordInput}
					bind:value={password}
					required
					class="w-full mx-9 px-4 py-1.5 bg-black/50 border border-gray-500 rounded-lg focus:outline-none focus:border-gray-700 transition-all duration-300 text-white"
					placeholder="password"
				/>
			</div>
			{#if password}
				<div
					class="absolute bottom-0 left-0 right-0 flex items-center justify-center pointer-events-none"
					in:fade={{ duration: 600 }}
				>
					{#if error}
						<p class="text-center text-sm font-light text-red-500">{error}</p>
					{:else}
						<p class="text-center text-sm font-light">
							{#if isSubmitting}
								Loading ...
							{:else}
								Press Enter
							{/if}
						</p>
					{/if}
				</div>
			{/if}
		</form>
	</div>
</div>

<style lang="scss">
	@keyframes shake {
		0% {
			transform: translateX(0);
		}
		20% {
			transform: translateX(-7px);
		}
		40% {
			transform: translateX(7px);
		}
		60% {
			transform: translateX(-7px);
		}
		80% {
			transform: translateX(7px);
		}
		100% {
			transform: translateX(0);
		}
	}
	:global(.shake) {
		animation: shake 0.3s ease-in-out;
	}
</style>

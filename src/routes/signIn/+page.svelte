<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { authHandler } from '../../store/store';
	import { goto } from '$app/navigation';
	let email: string = '';
	let password: string = '';
	let errorMessage: string = '';

	async function handleSignIn() {
		try {
			console.log('handle function called with values', password, email);

			await authHandler.signIn(email, password);
			goto('/admin');
			errorMessage = 'Successfully Signed in';
		} catch (error) {
			errorMessage = 'Error while signingIn';
			console.error(error);
		}
	}
</script>

<div class="pt-48 flex justify-center items-center">
	<div class="w-[700px] h-[400px] bg-transparent border rounded-2xl">
		<div>
			<form on:submit|preventDefault={handleSignIn} class="flex justify-center pt-28">
				<div class="grid w-64 items-center gap-4 pt-5">
					<input
						type="email"
						bind:value={email}
						placeholder="email"
						required
						class="border py-1 bg-transparent rounded-xl pl-4"
					/>
					<input
						type="password"
						bind:value={password}
						placeholder="password"
						required
						class="border py-1 bg-transparent rounded-xl pl-4"
					/>
					<button class="bg-white rounded-xl py-1 text-black" type="submit">SIGNIN</button>
				</div>
			</form>
		</div>
		<div class="flex justify-center">
			<h2>message</h2>
			{#if errorMessage}
				<p class="text-red-600">{errorMessage}</p>
			{/if}
		</div>
	</div>
</div>

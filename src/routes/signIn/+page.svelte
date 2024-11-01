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

<div class="pt-48 flex justify-center">
	<Card.Root class="w-[700px] h-[400px] bg-transparent">
		<Card.Content>
			<form on:submit|preventDefault={handleSignIn} class="flex justify-center pt-28">
				<div class="grid w-64 items-center gap-4">
					<div class="flex flex-col space-y-1.5 text-white">
						<Input type="email" bind:value={email} placeholder="email" required />
					</div>
					<div class="flex flex-col space-y-1.5 text-white">
						<Input type="password" bind:value={password} placeholder="password" required />
					</div>
					<Button type="submit" variant="outline">signIn</Button>
				</div>
			</form>
		</Card.Content>
		<Card.Footer class="flex justify-center pt-5">
			<div class="flex justify-center">
				{#if errorMessage}
					<p class="text-red-600">{errorMessage}</p>
				{/if}
			</div>
		</Card.Footer>
	</Card.Root>
</div>

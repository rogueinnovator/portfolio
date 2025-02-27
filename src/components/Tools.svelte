<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	// Reactive pathname from SvelteKit's store
	$: pathname = $page.url.pathname;
</script>

<button
	class={`fas fa-sign-out-alt mr-2 cursor-pointer ${pathname === '/signIn' ? 'rotate-180' : ''}`}
	aria-label="Sign out"
	on:click={() => goto(pathname === '/' ? '/signIn' : '/')}
></button>

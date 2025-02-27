<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { getDownloadURL, getStorage, ref } from 'firebase/storage';

	let cvUrl = '';
	export let y: number;
	async function getURL() {
		try {
			const storage = getStorage();
			const cvRef = ref(storage, 'gs://portfolio-65bfd.appspot.com/cv.pdf');
			cvUrl = await getDownloadURL(cvRef);
		} catch (error) {
			console.error('Error fetching data', error);
		}
	}
	getURL();
	$: pathname = $page.url.pathname;
</script>

<header
	class={'sticky z-[10] top-0 duration-200 px-6 flex items-center justify-between border-b border-solid ' +
		(y > 0 ? ' py-4 bg-slate-950 border-violet-950' : ' py-6 bg-transparent border-transparent')}
>
	<h1 class="font-medium inline-flex justify-between items-center gap-2">
		<b class="font-bold poppins">MUHAMMAD</b> <span class="">HUZAIFA</span>
		<img
			class="w-30 h-10 ml-3"
			src="https://d3frb2mbny706b.cloudfront.net/rogueinnovator"
			alt="git"
		/>
		<button
			class={`fas fa-sign-out-alt mr-2 cursor-pointer ${pathname === '/signIn' ? 'rotate-180' : ''}`}
			aria-label="Sign out"
			onclick={() => goto(pathname === '/signIn' ? '/' : '/signIn')}
		></button>
	</h1>
	<div class="md:flex items-center gap-4 hidden">
		<button
			onclick={() => window.open(cvUrl, '_blank')}
			disabled={!cvUrl}
			class="blueShadow relative overflow-hidden px-5 py-2 group rounded-full bg-white text-slate-950"
		>
			<h4 class="relative z-9">
				MY <span class="font-extrabold poppins text-violet-800 animate-pulse duration-200">CV</span>
				is here
			</h4>
		</button>
		<button
			class="blueShadow hidden relative overflow-hidden px-5 py-2 group rounded-full bg-white text-slate-950"
		>
			<h4 class="relative z-9">Get in touch</h4>
		</button>
	</div>
</header>

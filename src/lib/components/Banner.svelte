<script lang="ts">
	import '../../styles/banner.scss';
	export let showContent: boolean;
</script>

<div class={`splash ${showContent ? 'moveUp' : ''}`}>
	<div class="logoContainer">
		<h1 class="logoText">MUHAMMAD HUZAIFA Here...</h1>
	</div>
</div>

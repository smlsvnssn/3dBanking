<script>
	export const prerender = true
	import '../style.css'
	import ThreeDBanking from './ThreeDBanking.svelte'
</script>

<svelte:head>
	<title>3DBanking™</title>
</svelte:head>

<main>
	<ThreeDBanking />
</main>

<style lang="scss">
	:global(body) {
		background: radial-gradient(
				50% 50% at 50% 50%,
				rgba(0, 66, 122, 0) 0%,
				rgba(0, 36, 66, 0.1) 100%
			),
			linear-gradient(
				180deg,
				rgba(0, 0, 0, 0.5) 0%,
				rgba(129, 129, 129, 0) 66.67%,
				rgba(255, 255, 255, 0.245) 100%
			),
			#00427a !important;
		height: 100svh;
	}

	main {
		--bottom: 8rem;
		display: flex;
		flex-direction: column;
		position: relative;
		inset: 0;
		min-height: 100svh;
		width: 100%;
		//max-width: 32rem;
		margin: 0 auto var(--bottom);
		box-sizing: border-box;
	}
</style>

<script>
	import { fly } from 'svelte/transition';
	import arrow from '$lib/assets/icons/arrow_medium_left_32.svg';
	import * as ö from 'ouml';

	export let isOpen = false;
</script>

<div class="createNew" transition:fly={{ x: 200, duration: 200 }}>
	<div class="back" on:click={() => (isOpen = false)}>
		<img src={arrow} alt="Stäng" />
	</div>
	<slot />
</div>

<style lang="scss">
	.createNew {
		z-index: 10;
		position: fixed;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		inset: 0;
		max-width: 32rem;
		margin: auto;
		padding: 1rem;
		padding-bottom: 5rem;
		background: var(--white);
		overflow-y: auto;
		overflow-x: hidden;
		overscroll-behavior: contain;

		.back {
			cursor: pointer;
			border-bottom: 1px solid var(--smoke);
			position: sticky;
			z-index: 2;
			top: -1rem;
			background: var(--white);
			margin: -1rem;
			margin-bottom: 2rem;
			padding: 0.5rem;
			img {
				width: 2rem;
				height: 2rem;
			}
		}
	}
</style>

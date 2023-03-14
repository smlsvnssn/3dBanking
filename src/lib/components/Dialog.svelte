<script>
	import { fly, fade } from 'svelte/transition';
	import { backOut, sineOut } from 'svelte/easing';
	import { afterUpdate, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import * as ö from 'ouml';

	export let isOpen = false;

	$: isFirstUpdate = isOpen;

	let modalElement;

	// this is the GOOD method, all other methods were BAD methods. Lifecycle hooks FTW
	afterUpdate(() => {
		// Hack to break out of DOM tree
		if (browser && isOpen && isFirstUpdate) {
			document.body.appendChild(modalElement);
			document.body.classList.add('noScroll');
			isFirstUpdate = false;
		} else document.body.classList.remove('noScroll')
	});

	onDestroy(() => browser && document.body.classList.remove('noScroll'));
</script>

{#if isOpen}
	<aside
		class="dialog"
		on:click={() => (isOpen = false)}
		on:keydown
		bind:this={modalElement}
		transition:fade={{ duration: 300, easing: sineOut }}
	>
		<div
			on:click|stopPropagation
			on:keydown
			transition:fly={{ y: 200, duration: 300, easing: backOut }}
			class:isOpen
		>
			<slot {isOpen} />
		</div>
	</aside>
{/if}
<style lang="scss">
	aside {
		z-index: 100;
		position: fixed;
		inset: 0;
		background: #0008;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
		overscroll-behavior: contain;

		:global(div > h5) {
			margin: 0;
			text-align: center;
		}

		div {
			background: var(--white);
			border-radius: 0.25rem;
			position: relative;
			max-width: 30rem;
			padding: 1rem;
			box-shadow: 0 4px 8px #0003;
			display: flex;
			flex-direction: column;
			gap: 1rem;

			// &:after {
			// 	content: '';
			// 	position: absolute;
			// 	inset: 0;
			// 	background: #0f0;
			// 	margin-top: 1rem;
			// 	z-index: -1;
			// 	pointer-events: none;
			// }
		}
	}
</style>


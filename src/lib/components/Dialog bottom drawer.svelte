<script>
	import { fly, fade } from 'svelte/transition';
	import { backOut, sineOut } from 'svelte/easing';
	import { afterUpdate, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import * as ö from 'ouml';

	export let isOpen = false;

	let modalElement;

	// this is the GOOD method, all other methods were BAD methods. Lifecycle hooks FTW
	afterUpdate(() => {
		// Hack to break out of DOM tree
		if (browser && isOpen) {
			document.body.appendChild(modalElement);
			document.body.classList.add('noScroll');
		}
	});

	onDestroy(() => browser && document.body.classList.remove('noScroll'));
</script>

{#if isOpen}
	<aside
		on:click={() => (isOpen = false)}
		on:keydown
		bind:this={modalElement}
		transition:fade={{ duration: 300, easing: sineOut }}
	>
		<div
			on:click|stopPropagation
			on:keydown
			transition:fly={{ y: -200, duration: 300, easing: backOut }}
			class:isOpen
		>
			<span class="draghandle" />

			<slot {isOpen} />
		</div>
	</aside>
{/if}

<style lang="scss">
	aside.dialog {
		z-index: 100;
		position: fixed;
		inset: 0;
		background: #0008;
		display: flex;
		align-items: center;
		justify-content: center;
		//padding: 1rem;
		overscroll-behavior: contain;

		:global(h5) {
			margin: 0;
			text-align: center;
		}

		.draghandle {
			width: 25%;
			height: 0.25rem;
			background: var(--smoke);
			margin: 0.5rem auto 0;
			border-radius: 1rem;
		}

		div {
			background: var(--white);
			border-radius: 1rem 1rem 0 0;
			position: absolute;
			bottom: -2rem;
			max-width: 32rem;
			width: 100%;
			padding: 1rem;
			padding-bottom: 3rem;
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

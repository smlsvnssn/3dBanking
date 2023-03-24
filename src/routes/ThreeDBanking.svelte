<script>
	import AmountOfStuff from './AmountOfStuff.svelte'
	import SelectStuff from './SelectStuff.svelte'
	import Logo from './Logo.svelte'
	import StuffEmitter from '$lib/stuffEmitter/StuffEmitter.svelte'
	import Slider from '../lib/Slider.svelte'
	import { stuff } from './stuff.js'

	import * as ö from 'ouml'

	import { fly } from 'svelte/transition'
	import { backOut, backIn } from 'svelte/easing'
	import { onMount } from 'svelte'

	const accounts = [{ name: 'Lönekontot' }, { name: 'Sparkontot' }]

	let selectedStuff = 0
	let selectedAccount = 0
	let lön = 35000
	let spar = 200000

	let intro = true
	let firstLoad = true

	onMount(() => (firstLoad = false))

	$: {
		accounts[0].amount = lön
		accounts[1].amount = spar
	}

	$: amountOfStuff =
		accounts[selectedAccount].amount / stuff[selectedStuff].price
</script>

<Logo bind:intro />

<StuffEmitter
	stuff={stuff[selectedStuff]}
	amountOfStuff={!intro && amountOfStuff}
/>

{#if intro && !firstLoad}
	<div
		class="wrapper"
		in:fly={{ y: -200, duration: 600, delay: 700, easing: backOut }}
		out:fly={{ y: 200, duration: 600, easing: backIn }}
	>
		<Slider
			transIn={{ y: -200, duration: 600, delay: 900, easing: backOut }}
			transOut={{ y: 200, duration: 600, easing: backIn }}
			title="Hur mycket har du på lönekontot ungefär?"
			max="100000"
			bind:value={lön}
		/>
		<Slider
			transIn={{ y: -200, duration: 600, delay: 800, easing: backOut }}
			transOut={{ y: 200, duration: 500, easing: backIn }}
			title="Hur mycket har du på sparkontot ungefär?"
			max="1000000"
			bind:value={spar}
		/>
		<button
			on:click={() => (intro = false)}
			in:fly={{ y: -200, duration: 600, delay: 700, easing: backOut }}
			out:fly={{ y: 200, duration: 400, easing: backIn }}
		>
			3Dfiera
		</button>
	</div>
{:else if !intro}
	<div
		class="wrapper"
		in:fly={{ y: -200, duration: 600, delay: 700, easing: backOut }}
		out:fly={{ y: 200, duration: 600, easing: backIn }}
	>
		<SelectStuff
			{stuff}
			{accounts}
			bind:selectedStuff
			bind:selectedAccount
		/>
		<AmountOfStuff name={stuff[selectedStuff].name} {amountOfStuff} />
	</div>
{/if}

<style lang="scss">
	.wrapper {
		pointer-events: none;
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		align-items: center;

		gap: 1.5rem;

		color: var(--white);
		margin: 8rem auto;
		max-width: 32rem;
		perspective: 20rem;

		@media (max-width: 35rem) {
			margin: 8rem 1.5rem;
		}
	}

	button {
		pointer-events: all;
		flex: 0 1 auto;
		margin: 0 2rem;
		text-align: left;
		padding: 1rem 2rem;
		border-radius: 8px;
		background: var(--blue);
		border: none;
		color: var(--white);
		font-weight: 700;
		transition: all 0.3s;
		&:hover {
			transform: scale(1.1) rotateX(22.5deg);
			background: var(--sky);
		}
	}
</style>

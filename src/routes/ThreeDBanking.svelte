<script>
	import AmountOfStuff from './AmountOfStuff.svelte'
	import SelectStuff from './SelectStuff.svelte'
	import Logo from './Logo.svelte'
	import StuffEmitter from '$lib/stuffEmitter/StuffEmitter.svelte'
	import * as ö from 'ouml'

	import { fly } from 'svelte/transition'
	import { backOut, backIn } from 'svelte/easing'

	import burger from '$lib/models/Hamburger.glb'
	import bike from '$lib/models/Bike.glb'
	import crisps from '$lib/models/Crisps.glb'
	import puppy from '$lib/models/Puppy.glb'
	import guitar from '$lib/models/Electric guitar.glb'
	import halibut from '$lib/models/Halibut.glb'
	import sofa from '$lib/models/Sofa.glb'
	import shoe from '$lib/models/Trainer.glb'
	import latte from '$lib/models/Coffee.glb'
	import cheese from '$lib/models/Cheese.glb'

	import Slider from '../lib/Slider.svelte'
	import { onMount } from 'svelte'

	const stuff = [
		{
			name: 'Chipspåsar',
			price: 30,
			model: crisps,
			boxSize: [0.125, 0.5, 0.3],
			position: { y: 0 },
			scale: 0.5,
		},
		{
			name: 'Latte',
			price: 52,
			model: latte,
			boxSize: [0.15, 0.4, 0.15],
			position: { y: -0.2 },
			scale: 0.45,
		},
		{
			name: 'Hamburgare',
			price: 120,
			model: burger,
			boxSize: [0.25, 0.165, 0.25],
			position: { y: -0.2 },
			scale: 6,
		},
		{
			name: 'Prästostar',
			price: 140,
			model: cheese,
			boxSize: [0.2, 0.165, 0.2],
			position: { y: 0 },
			scale: 4,
		},
		{
			name: 'Skor',
			price: 800,
			model: shoe,
			boxSize: [0.8, 0.3, 0.3],
			position: { y: -0.3 },
			scale: 0.15,
		},
		{
			name: 'Färska hälleflundror',
			price: 3600,
			model: halibut,
			boxSize: [0.7, 0.2, 2.3],
			position: { y: 0 },
			scale: 0.03,
		},
		{
			name: 'Elgitarrer',
			price: 4000,
			model: guitar,
			boxSize: [0.15, 2.5, 0.8],
			position: { y: -0.9, x: -0.2 },
			scale: 0.2,
		},
		{
			name: 'Cyklar',
			price: 7500,
			model: bike,
			boxSize: [0.2, 1, 2],
			position: { y: -1, z: 1 },
			scale: 3,
		},
		{
			name: 'Hundvalpar',
			price: 8500,
			model: puppy,
			boxSize: [0.2, 0.6, 0.8],
			position: { y: 0 },
			scale: 0.025,
		},
		{
			name: 'Hörnsoffor',
			price: 12900,
			model: sofa,
			boxSize: [3, 0.9, 3],
			position: { x: 3.5, z: -3.5, y: -0.9 },
			scale: 5,
		},
	]

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

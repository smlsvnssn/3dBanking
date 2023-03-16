<script>
	import AmountOfStuff from './AmountOfStuff.svelte'
	import SelectStuff from './SelectStuff.svelte'
	import Logo from './Logo.svelte'
	import StuffEmitter from '$lib/stuffEmitter/StuffEmitter.svelte'
	import * as ö from 'ouml'

	import burger from '$lib/models/Hamburger.glb'
	import bike from '$lib/models/Bike.glb'
	import crisps from '$lib/models/Crisps.glb'
	import puppy from '$lib/models/Puppy.glb'
	import guitar from '$lib/models/Electric guitar.glb'
	import halibut from '$lib/models/Halibut.glb'
	import sofa from '$lib/models/Sofa.glb'
	import shoe from '$lib/models/Trainer.glb'

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
			name: 'Hamburgare',
			price: 120,
			model: burger,
			boxSize: [0.25, 0.165, 0.25],
			position: { y: -0.2 },
			scale: 6,
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

	const accounts = [
		{ name: 'Lönekontot', amount: 36419 },
		{ name: 'Sparkontot', amount: 259412 },
	]

	let selectedStuff = 0
	let selectedAccount = 0

	$: amountOfStuff =
		accounts[selectedAccount].amount / stuff[selectedStuff].price
</script>

<Logo />

<StuffEmitter stuff={stuff[selectedStuff]} {amountOfStuff} />

<div class="wrapper">
	<SelectStuff {stuff} {accounts} bind:selectedStuff bind:selectedAccount />
	<AmountOfStuff name={stuff[selectedStuff].name} {amountOfStuff} />
</div>

<style lang="scss">
	.wrapper {
		pointer-events: none;
		position: absolute;
		inset: 0;
		color: var(--white);
		margin: 8rem auto;
		max-width: 32rem;
	}
</style>

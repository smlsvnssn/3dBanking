<script>
	import SelectStuff from './SelectStuff.svelte'

	import Logo from './Logo.svelte'
	import * as ö from 'ouml'

	const stuff = [
		{ name: 'Chipspåsar', price: 30, model: 'TODO' },
		{ name: 'Hamburgare', price: 120, model: 'TODO' },
		{ name: 'Gösar', price: 650, model: 'TODO' },
		{ name: 'Hundvalpar', price: 8500, model: 'TODO' },
		{ name: 'Hörnsoffor', price: 12900, model: 'TODO' },
	]

	const accounts = [
		{ name: 'Lönekontot', amount: 36419 },
		{ name: 'Sparkontot', amount: 259412 },
	]

	let selectedStuff = 0
	let selectedAccount = 0

	let percent = ö.randomNormal(0, 5)

	$: amountOfStuff = ö.prettyNumber(
		accounts[selectedAccount].amount / stuff[selectedStuff].price,
	)
</script>

<Logo />

<div class="wrapper">
	<SelectStuff {stuff} {accounts} bind:selectedStuff bind:selectedAccount />
	<div>
		<h1 class="display-1">{amountOfStuff}</h1>
		<h2 class="display-3">{stuff[selectedStuff].name}</h2>
		<div class="counter">
			<svg
				width="12"
				height="8"
				viewBox="0 0 16 12"
				style="transform:rotate({-percent * 2}deg);"
			>
				<path
					fill={percent <= 0 ? 'var(--color-success)' : 'var(--wine)'}
					d="M11.898 5.00007L8.32568 1.73846L9.67421 0.261475L15.9593 5.99997L9.67421 11.7385L8.32568 10.2615L11.8977 7.00007H0V5.00007H11.898Z"
				/>
			</svg>
			<small>
				{ö.prettyNumber(Math.abs(percent), 1)}% {percent >= 0
					? 'mer'
					: 'mindre'} än förra månaden
			</small>
		</div>
	</div>
</div>

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

	.wrapper {
		display: grid;
		gap: 3rem;
		color: var(--white);
		margin: 8rem 2.5rem;
	}

	.counter {
		text-align: center;
		margin-top: 1rem;
		color: var(--white);
	}

	h1,
	h2 {
		margin: 0;
		color: var(--white);
		text-align: center;
	}
	h1 {
		font-size: 3.5rem;
	}
	h2 {
		font-size: 1.5rem;
	}
	h6 {
		margin: -0.5rem 0 0;
		padding: 0 1rem 1rem;
	}
</style>

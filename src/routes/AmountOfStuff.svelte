<script>
	import * as ö from 'ouml'

	export let name
	export let amountOfStuff

	let percent = ö.randomNormal(0, 5)
</script>

<div class="amountOfStuff">
	<h1 class="display-1">{ö.prettyNumber(amountOfStuff)}</h1>
	<h2 class="display-3">{name}</h2>
	<div class="counter">
		<svg
			width="12"
			height="8"
			viewBox="0 0 16 12"
			style="transform:rotate({-percent * 2}deg);"
		>
			<path
				fill={percent >= 0 ? 'var(--color-success)' : 'var(--wine)'}
				d="M11.898 5.00007L8.32568 1.73846L9.67421 0.261475L15.9593 5.99997L9.67421 11.7385L8.32568 10.2615L11.8977 7.00007H0V5.00007H11.898Z"
			/>
		</svg>
		<small>
			{ö.prettyNumber(Math.abs(percent), 1)}% {percent >= 0
				? 'fler'
				: 'färre'} än förra månaden
		</small>
	</div>
</div>

<style lang="scss">
	.amountOfStuff {
		margin-top: 1.5rem;
		.counter {
			text-align: center;
			margin-top: 1rem;
			color: var(--white);
		}
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
</style>

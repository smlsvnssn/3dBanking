<script>
	import { fly } from 'svelte/transition'

	export let title = 'Title'
	export let value
	export let min = 0
	export let max = 100
	export let step = 1000

	export let transIn
	export let transOut

	// sanitize
	$: value = Math.max(min, Math.min(value, max))

	/*- (value % step)*/
</script>

<div in:fly={transIn} out:fly={transOut}>
	<legend> {title} </legend><span
		><input
			type="range"
			class="slider {title}"
			bind:value
			{min}
			{max}
			{step}
		/><input
			type="number"
			class="slider display-3"
			bind:value
			{min}
			{max}
			{step}
		/></span
	>
</div>

<style lang="scss">
	div {
		pointer-events: all;
		padding: 1rem 2rem 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;

		width: 100%;

		pointer-events: auto;
		font-size: 0.875rem;

		// text-align: center;

		background: rgba(255, 255, 255, 0.3);
		border-radius: 8px;

		input {
			-webkit-appearance: none;
			border: none;
			border-radius: 0.25rem;
			width: 100%;
			font-size: 1rem;

			&:focus-visible {
				outline: none;
			}
		}

		input::-webkit-outer-spin-button,
		input::-webkit-inner-spin-button {
			-webkit-appearance: none;
			//margin: 0;
		}

		legend {
			flex: 100%;
			padding-top: 0.7rem;
			padding-bottom: 0.2rem;
			font-size: 0.875rem;
		}

		span {
			display: flex;
			align-items: center;
			gap: 1rem;
		}

		input[type='range'] {
			flex: 0 1 auto;
			height: 0.5rem;
		}

		input[type='range'],
		input[type='range'] {
			&::-webkit-slider-thumb {
				-webkit-appearance: none;
				height: 2rem;
				width: 2rem;
				border-radius: 50%;
				cursor: pointer;
				background: var(--sky);
				box-shadow: 0 0.25rem 0.5rem #00000022;
				transition: all 0.3s;
				&:hover {
					transform: scale(1.1);
					background: var(--sky);
				}
			}
		}

		input[type='number'] {
			-moz-appearance: textfield;
			flex: 8rem;
			border: none;
			font-size: 1.5rem;
			text-align: right;
			background: none;
			color: var(--white);
		}
	}
</style>

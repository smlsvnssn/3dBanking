<script>
	import { is } from 'ouml';

	export let graphtype = 'amount';
	export let mode = 'day';
	export let isFiltered = false;
</script>

<!-- <div class="choice">
	<span>Period:</span>
	<input type="radio" id="day" bind:group={mode} value="day" />
	<label for="day">Day</label>

	<input type="radio" id="month" bind:group={mode} value="month" />
	<label for="month">Month</label>

	<input type="radio" id="year" bind:group={mode} value="year" />
	<label for="year">Year</label>
</div> -->
<div class="choice">
	<!-- <span>View:</span> -->
	<!-- <input type="radio" id="MeanBalance" bind:group={graphtype} value="meanBalance" />
	<label for="MeanBalance">Mean balance</label> -->

	<input type="radio" id="Balance" bind:group={graphtype} value="balance" />
	<label for="Balance">Belopp {!isFiltered ? 'på kontot' : ''}</label>

	<input type="radio" id="Amount" bind:group={graphtype} value="amount" />
	<label for="Amount">Netto per dag</label>

	<input type="radio" id="Transactions" bind:group={graphtype} value="numtransactions" />
	<label for="Transactions">Transaktioner per dag</label>
</div>

<style>
	input[type='radio'] {
		accent-color: var(--blue);
		margin-right: 0.125rem;
	}
	label,
	span {
		font-family: var(--sans-serif);
		font-weight: 500;
		font-size: 0.75rem;
		line-height: 1.5;
		color: 333;
		transform: translateY(2px);
		margin-right: 0.25rem;
	}
	.choice {
		font-size: 0.8rem;
		line-height: 1.5;
		display: flex;
		gap: 0.2rem;
		padding-bottom: 3.5rem;
		margin-top: -0.5rem;
		align-items: center;
	}
</style>

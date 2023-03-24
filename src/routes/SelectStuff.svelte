<script>
	import * as ö from 'ouml'
	import { fly } from 'svelte/transition'
	import { backOut, backIn } from 'svelte/easing'

	export let stuff
	export let accounts
	export let selectedStuff
	export let selectedAccount
</script>

<div
	class="form"
	in:fly={{ y: -200, duration: 600, delay: 800, easing: backOut }}
	out:fly={{ y: 200, duration: 500, easing: backIn }}
>
	Hur många
	<select name="stuff" bind:value={selectedStuff} id="stuff-select">
		{#each stuff as thing, i}
			<option value={i}>{thing.name}</option>
		{/each}
	</select>
	har jag på
	<select name="account" bind:value={selectedAccount} id="account-select">
		{#each accounts as account, i}
			<option value={i}>{account.name}</option>
		{/each}
	</select>
	just nu?
</div>

<style lang="scss">
	.form {
		padding: 1rem 2rem;
		margin: 0 2rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;

		width: 100%;

		pointer-events: auto;
		font-size: 0.875rem;

		// text-align: center;

		background: rgba(255, 255, 255, 0.3);
		border-radius: 8px;
	}

	select {
		padding: 0.5rem 3rem 0.5rem 1rem;
		-webkit-appearance: none;
		cursor: pointer;
		border: none;
		border-radius: 0.25rem;
		background: url('$lib/assets/chevron/chevron_down_24.svg') #fff;
		background-repeat: no-repeat;
		background-position: top 50% right 0.5rem;
		width: 100%;
		font-size: 1rem;

		&:focus-visible {
			outline: none;
		}
	}
</style>

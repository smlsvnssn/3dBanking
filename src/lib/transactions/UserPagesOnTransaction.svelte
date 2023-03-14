<script>
	import { browser } from '$app/environment';
	import { afterUpdate, onDestroy } from 'svelte';
	import { startPage, userPages } from '$lib/dataStores';
	import { filterUserPagesOnTransactionTagsAndCategory } from '$lib/functions/helpers';

	import * as ö from 'ouml';

	export let transaction;

	$: filteredUserPages = filterUserPagesOnTransactionTagsAndCategory($userPages, transaction);
</script>

<h6>Visas på sidorna:</h6>
<ul>
	<li>
		<a href="/">
			<div class="imgWrapper"><img src={$startPage.icon} alt="" /></div>
			<span>{$startPage.name}</span>
		</a>
	</li>
	{#each filteredUserPages as userPage, i}
		<li>
			<a href="/userPages/{userPage.id}">
				<div class="imgWrapper"><img src={userPage.icon} alt="" /></div>
				<span>{userPage.name}</span>
			</a>
		</li>
	{/each}
</ul>

<style lang="scss">
	ul {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: left;
		list-style: none;
		position: relative;
		padding: 0;
		overflow-y: scroll;
		transition: all 0.3s;

		background: var(--white);
		background-size: contain;
	}

	.imgWrapper {
		border-radius: 3rem;
		background: var(--cloud);
		padding: 0.5rem;
		transition: all 0.3s;

		&.new {
			background: var(--white);
		}
		img {
			width: 2rem;
		}
	}
	li {
		position: relative;
		display: flex;

		a {
			--time: 0.3s;
			min-width: 5rem;
			display: flex;
			flex: 0 1;
			flex-direction: column;
			align-items: center;
			font: 0.75rem/1 var(--lf-font-family-sans-serif);
			font-weight: bold;
			gap: 0.5rem;
			padding: 0.75rem 0.25rem;
			text-decoration: none;
			color: var(--gray);
			transition: all var(--time);
			text-align: center;
		}
		span {
			display: inline-block;
			transition: all var(--time);
			hyphens: auto;
			word-break: break-all;
		}
	}
</style>

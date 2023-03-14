<script>
	import { browser } from '$app/environment';
	import { afterUpdate, onDestroy } from 'svelte';
	import { startPage, userPages } from '$lib/dataStores';

	import * as ö from 'ouml';
	import Dialog from '$lib/components/Dialog.svelte';

	export let thisFunction;

	let isVerifyAddedToPage = false,
		currentUserPage = null;

	const addFunctionToUserPage = (userPage, isStartPage = false) => {
		let p = isStartPage ? userPage : $userPages.find((v) => v.name === userPage.name);
		p.tiles = ö.unique([...p.tiles, thisFunction.name]);
		isVerifyAddedToPage = true;
		currentUserPage = userPage.name;
	};
</script>

<Dialog bind:isOpen={isVerifyAddedToPage}>
	<h5>Nu ligger funktionen {thisFunction.name} på sidan {currentUserPage}</h5>
	<div class="btn" on:click={() => (isVerifyAddedToPage = false)}>Toppen!</div>
</Dialog>

<h6>Lägg till "{thisFunction.name}" på sidan:</h6>
<ul>
	<li>
		<a href="#" on:click|preventDefault={() => addFunctionToUserPage($startPage, true)}>
			<div class="imgWrapper"><img src={$startPage.icon} alt="" /></div>
			<span>{$startPage.name}</span>
		</a>
	</li>
	{#each $userPages as userPage, i}
		<li>
			<a href="#" on:click|preventDefault={() => addFunctionToUserPage(userPage)}>
				<div class="imgWrapper"><img src={userPage.icon} alt="" /></div>
				<span>{userPage.name}</span>
			</a>
		</li>
	{/each}
</ul>

<style lang="scss">
	h6 {
		margin-left: 1rem;
		margin-right: 1rem;
	}
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
				border-bottom: 2px solid var(--smoke);

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

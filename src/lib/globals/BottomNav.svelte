<script>
	import { page } from '$app/stores';
	import { functions } from '$lib/dataStores';
	import MenuIcon from '$lib/assets/24pixels/menu-24.svelte';
	import översikt from '$lib/assets/24pixels/bills-coins-24.svg';

	$: pageName = $page.params.function;
</script>

<nav>
	<ul>
		<li class:active={$page.url.pathname === '/'}>
			<a href="/"><img src={översikt} alt="" />Översikt</a>
		</li>
		{#each $functions as functionPage}
			{#if functionPage.inBottomNav}
				<li class:active={pageName === functionPage.name}>
					<a href="/functions/{functionPage.name}">
						<img src={functionPage.icon} alt="" />{functionPage.name}
					</a>
				</li>
			{/if}
		{/each}
		<li class:active={$page.url.pathname === '/moreMenu'}>
			<a href="/moreMenu"><MenuIcon />Tjänster</a>
		</li>
	</ul>
</nav>

<style lang="scss">
	nav {
		z-index: 9;
		position: fixed;
		bottom: 0;
		width: 100%;
		max-width: 32rem;
	}

	ul {
		display: flex;
		justify-content: space-evenly;
		list-style: none;
		margin: 0;
		padding: 0;
		width: 100%;
		background: var(--white);
		background-size: contain;
	}

	img {
		width: 1.5rem;
	}
	li {
		width: 100%;
	}
	li a {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		font: 0.2rem/1 var(--lf-font-family-base);
		font-size: 0.675rem;
		gap: 0.25rem;
		padding: 0.75rem;
		text-decoration: none;
		border-top: 2px solid var(--smoke);
		color: var(--gray);
		transition: all 0.3s;
	}

	li.active a {
		border-top: 2px solid var(--blue);
		background: var(--cloud);
		color: var(--blue);
		font-weight: bold;
	}
</style>

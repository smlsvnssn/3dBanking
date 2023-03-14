<script>
	import dots from '$lib/assets/24pixels/Meatballs24.svg';
	import right from '$lib/assets/chevron/chevron_right_24.svg';
	import Dialog from '$lib/components/Dialog.svelte';
	import { functions, userPages } from '$lib/dataStores';
	import { currentUserPage } from '$lib/globals';
	import * as ö from 'ouml';
	import ChooseCategories from './ChooseCategories.svelte';

	export let tile = '';
	export let isUserPage = false;

	let dialogIsOpen = false;

	$: thisFunction = ö.findDeep($functions, (v) => v.name === tile, 'functions');
	$: thisUserPage = $userPages.find((v) => v.name === $currentUserPage);
</script>

<section class="tile">
	<h5>{tile}</h5>

	<!-- component is imported and defined in $functions -->
	{#if thisFunction?.component}
		<div>
			<svelte:component this={thisFunction.component} view="tile" userPage={thisUserPage} />
		</div>
	{:else}
		<!-- Default fallback, no component defined for this function -->
		<p>
			<!-- Här ska det finnas en sammanfattning av innehållet på sidan du kommer till{#if isUserPage},
				styrt av vilka kategorier och taggar som är kopplade till sidan{/if}. -->
		</p>

		<ul class="templates">
			<li />
		</ul>
	{/if}

	<div class="dots" on:click={() => (dialogIsOpen = true)}>
		<img src={dots} alt="Inställningar" />
	</div>
	<hr />

	<a href="{isUserPage ? '/userPages/functions/' : /functions/}{tile}" class="showView">
		<span>Visa {tile}</span>
		<img src={right} alt="Visa {tile}" />
	</a>
</section>

<Dialog bind:isOpen={dialogIsOpen} let:isOpen>
	<h5>Inställningar för {tile}</h5>
	{#if thisFunction?.component}
		<div>
			<svelte:component
				this={thisFunction.component}
				view="tilesettings"
				bind:isOpenSettingsDialog={dialogIsOpen}
				userPage={thisUserPage}
			/>
		</div>
	{:else}
		<!-- Default fallback, no component defined for this function -->
		Den här funkar faktiskt, det trodde du inte va!
		<button class="btn" on:click={() => (dialogIsOpen = false)}> Spara </button>
	{/if}
</Dialog>

<style lang="scss">
	.tile {
		position: relative;
		z-index: 0;
		background: var(--white);
		border-bottom: 2px solid var(--smoke);
		margin-bottom: 1rem;
		padding-bottom: 1rem;

		.templates {
			display: grid;
			gap: 1rem;
			padding: 0 1rem;
			grid: auto-flow / 1fr;
			list-style: none;
			li {
				background: var(--cloud);
				min-height: 12rem;
				border-radius: 4px;
			}
		}
		& > * {
			padding: 1rem;
		}
		p {
			padding: 0;
			margin: 1rem;
		}
		hr {
			border-top: 1px solid var(--smoke);
			padding-bottom: 0;
			margin-bottom: 0;
		}
		h5 {
			text-align: center;
			border-bottom: 1px solid var(--smoke);
		}

		.showView {
			display: flex;
			padding: 0 1rem;
			color: var(--blue);
			text-decoration: none;
			span {
				flex: 1;
			}
		}
		.dots {
			cursor: pointer;
			position: absolute;
			right: 0.5rem;
			top: 1rem;
			transform: translateX(0rem);
			padding: 0;
		}
	}
</style>

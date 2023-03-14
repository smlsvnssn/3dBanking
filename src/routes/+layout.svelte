<script>
	import BottomNav from '$lib/globals/BottomNav.svelte'
	import '../style.css'
	import { fly, fade } from 'svelte/transition'
	import { onMount } from 'svelte'
	import { page } from '$app/stores'
	import { browser } from '$app/environment'
	import { userPages, labels, transactions, startPage } from '$lib/dataStores'
	import { currentUserPage } from '$lib/globals'

	import * as ö from 'ouml'

	let mounted = false

	onMount((readLocal = true) => {
		if (readLocal && localStorage.getItem('userPages')) {
			$userPages = ö.getLocal('userPages')
			$startPage = ö.getLocal('startPage')
			$labels = ö.getLocal('labels')
			$currentUserPage = ö.getLocal('currentUserPage')
			$transactions = ö.getLocal('transactions')
			ö.log('Local read')
		}

		// hack to force loading of manifest on chrome android, missing for ungoogleable reason
		browser &&
			document.head.appendChild(
				ö.createElement(
					'<link rel="manifest" href="./site.webmanifest" />',
				),
			)
		mounted = true
	})

	$: if (browser && mounted)
		ö.log('userPages saved to local'), ö.setLocal('userPages', $userPages)
	$: if (browser && mounted)
		ö.log('startPage saved to local'), ö.setLocal('startPage', $startPage)
	$: if (browser && mounted)
		ö.log('labels saved to local'), ö.setLocal('labels', $labels)
	$: if (browser && mounted)
		ö.log('currentUserPage saved to local', '\n' + $currentUserPage),
			ö.setLocal('currentUserPage', $currentUserPage)
	$: if (browser && mounted)
		ö.log('transactions saved to local'),
			ö.setLocal('transactions', $transactions)
</script>

<div class="app">
	<!-- <BottomNav /> -->

	<!-- {#key $page} -->
	<!-- <main in:fade={{ duration: 100 }}> -->
	<main>
		<slot />
	</main>
	<!-- {/key} -->
</div>

<style lang="scss">
	:global(.btn:not(.btn-secondary)) {
		background: var(--blue) !important;
		border-color: var(--blue) !important;
		color: var(--white) !important;
	}
	.btn {
		margin: 1rem;
	}
	:global(.small) {
		font-size: 0.9rem;
	}
	:global(body.noScroll) {
		overflow: hidden;
	}
	.app {
		--bottom: 8rem;
		display: flex;
		flex-direction: column;
		position: relative;
		inset: 0;
		min-height: calc(100vh - var(--bottom));
		width: 100%;
		max-width: 32rem;
		margin: 0 auto var(--bottom);
		box-sizing: border-box;
	}
</style>

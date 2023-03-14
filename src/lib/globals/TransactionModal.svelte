<script>
	import UserPagesOnTransaction from '../transactions/UserPagesOnTransaction.svelte';

	import CategoryOnTransaction from '../transactions/CategoryOnTransaction.svelte';
	import TagsOnTransaction from '$lib/transactions/TagsOnTransaction.svelte';
	import { fly, fade } from 'svelte/transition';
	import { backOut, sineOut } from 'svelte/easing';
	import close from '$lib/assets/navigation/cross-enclosed-20.svg';
	import { browser } from '$app/environment';
	import { afterUpdate, onDestroy } from 'svelte';

	import * as ö from 'ouml';

	export let isOpen = false,
		index = 0,
		transactionList;

	let modalElement, itemWidth;

	// Only scrolls to index if opened
	$: scrollToIndex = isOpen;
	$: scrollIndex = isOpen ? index : 0;

	const remToPx = (rem) => rem * parseFloat(getComputedStyle(document.documentElement).fontSize),
		niceDate = (d) =>
			new Date(d).toLocaleDateString('sv-SE', {
				month: 'long',
				day: 'numeric',
				year: 'numeric',
			}),
		setScroll = () => {
			modalElement.scrollTo(scrollIndex * itemWidth - remToPx(0.5), 0);
		},
		checkScroll = (e) => (scrollIndex = browser && Math.round(modalElement.scrollLeft / itemWidth));

	afterUpdate(() => {
		if (browser && isOpen && scrollToIndex) {
			document.body.appendChild(modalElement);
			document.body.classList.add('noScroll');
			// Hack to break out of DOM tree

			itemWidth = modalElement.offsetWidth - remToPx(2);
			setScroll();
			scrollToIndex = false;
		}
	});

	onDestroy(() => browser && document.body.classList.remove('noScroll'));
</script>

{#if isOpen}
	<aside
		bind:this={modalElement}
		transition:fade={{ duration: 300, easing: sineOut }}
		on:keydown
		on:click={() => (isOpen = false)}
		on:scroll={checkScroll}
	>
		{#each transactionList as thisTransaction, i}
			<div
				class="receipt"
				style="transform:rotate({ö.randomNormal(0, 0.25)}deg)"
				transition:fly={{ y: -200, duration: 300, easing: backOut }}
			>
				<div class="up" />
				<div class:isOpen class="middle">
					<!-- Only render visible, and the ones before and after -->
					{#if i >= scrollIndex - 1 && i <= scrollIndex + 1}
						<div class="topIcons">
							<div on:click={() => (isOpen = false)} on:keydown class="close">
								<img src={close} alt="" />
							</div>
						</div>

						<div on:click|stopPropagation on:keydown>
							<div class="text">
								<h1>{thisTransaction.text}</h1>
							</div>
							<hr />

							<div class="belopp">
								<p>{niceDate(thisTransaction.date)}</p>
								<h2
									style="color: {Number(thisTransaction.amount) > 0
										? `var(--color-risk-3)`
										: 'var(--gray)'}"
								>
									{ö.prettyNumber(thisTransaction.amount, 2)} kr
								</h2>
							</div>
							<hr />

							<CategoryOnTransaction transaction={thisTransaction} />
							<hr />

							<TagsOnTransaction transaction={thisTransaction} />
							<hr />

							<h6>Detaljer:</h6>
							<div class="detail">
								<p class="small">Transaktionsdatum:</p>
								<p class="small">{niceDate(thisTransaction.date)}</p>
							</div>
							<div class="detail">
								<p class="small">Konto:</p>
								<p class="small"><b>Lönekonto </b>000-000-00</p>
							</div>
							<div class="detail">
								<p class="small">Bokföringsdatum:</p>
								<p class="small">{niceDate(thisTransaction.date)}</p>
							</div>
							<hr />

							<UserPagesOnTransaction transaction={thisTransaction} />
							<hr />
						</div>
					{/if}
				</div>
				<div class="down" />
			</div>
		{/each}
	</aside>
{/if}

<style lang="scss">
	aside {
		z-index: 99;
		position: fixed;
		height: 100vh;
		max-width: 32rem;
		margin: auto;
		inset: 0;
		background: #0008;
		display: flex;
		gap: 1rem;
		overflow-x: scroll;
		align-items: center;
		justify-content: start;
		padding: 1rem;
		scroll-padding: 1.5rem;
		scroll-snap-type: x mandatory;
		overscroll-behavior: contain;

		.receipt {
			.topIcons {
				display: flex;
				margin-top: -1rem;
				margin-bottom: 2rem;
				.close {
					flex: 1;
					text-align: right;
				}
			}
			.belopp {
				margin-top: 2rem;
				margin-bottom: 0.5rem;
				display: flex;
				align-items: center;
				& > * {
					margin: 0;
				}
				h2 {
					flex: 1;
					text-align: right;
				}
			}
			.ikon {
				background: var(--cloud);
				width: 2.5rem;
				min-width: 2.5rem;
				padding: 0.5rem;
				border-radius: 100rem;
				margin-right: 0.25rem;
			}
			img {
				width: 1.25rem;
			}
			hr {
				border-top-width: 1px;
			}

			scroll-snap-align: start;
			position: relative;
			margin-top: -2rem;
			filter: drop-shadow(0 4px 8px #0003);
			min-width: calc(100% - 1rem);
			transform-origin: 50% 50%;
			height: calc(100% - 2rem);

			.middle {
				overflow-y: scroll;
				height: 100%;
				padding: 1rem;
				gap: 1rem;
				background: var(--white);
				display: flex;
				flex-direction: column;
			}

			.up,
			.down {
				content: '';
				display: block;
				width: 100%;
				background-size: 100% auto;
				height: 1rem;
				background-image: url('/src/lib/assets/images/transactionEdgeUp.svg');
			}
			.down {
				//outline: 1px solid #0ff;
				background-image: url('/src/lib/assets/images/transactionEdgeDown.svg');
				background-position: bottom;
			}
			.close {
				cursor: pointer;
			}
			.detail {
				display: flex;
				align-items: center;
				gap: 1rem;

				p:first-child {
					flex: 1;
				}
			}
		}
	}
</style>

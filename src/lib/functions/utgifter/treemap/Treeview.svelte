<script>
	import * as Pancake from '@sveltejs/pancake';
	import * as d3 from 'd3-hierarchy';
	import { tweened } from 'svelte/motion';
	import * as eases from 'svelte/easing';
	import { fade, slide } from 'svelte/transition';
	import Treemap from './Treemap.svelte';
	import TransactionModal from '$lib/globals/TransactionModal.svelte';
	import createGroups from './createGroups.js';
	import generic from '$lib/assets/icons/star-40-white.svg';
	import arrow from '$lib/assets/icons/arrow_medium_left_32.svg';

	import * as ö from 'ouml';

	export let transactions;

	export let userPage;

	let groupedData, hierarchy, root, selected;

	$: {
		groupedData = createGroups(transactions);

		hierarchy = d3
			.hierarchy(groupedData)
			.sort((a, b) => a.amount - b.amount)
			.sum((d) => d.amount);

		root = d3.treemap()(hierarchy);

		setSelectedToRoot();
	}

	const setSelectedToRoot = () => (selected = root);

	const select = (node) => {
		if (node && node.children) selected = node;
		/* if leaf (experiment - render leaves differently) */
		// if (!node?.children[0].children) root = d3.treemap().tile(d3.treemapSlice)(hierarchy);
		// else root = d3.treemap()(hierarchy);
		visibleIndex = 0;
	};

	const extents = tweened(undefined, {
		easing: eases.cubicOut,
		duration: 600,
	});

	const niceDate = (d) =>
		new Date(d).toLocaleDateString('sv-SE', {
			month: 'numeric',
			day: 'numeric',
			year: 'numeric',
		});

	const is_visible = (a, b) => {
		while (b) {
			if (a.parent === b) return true;
			b = b.parent;
		}
		return false;
	};

	let index = 0,
		transactionList = [],
		isOpenModal = false;

	const openModal = (node) => {
		//ö.log(node);
		isOpenModal = true;
		transactionList = transactions.filter((t) => t.subcategory === node.data.subcategory);
		index = transactionList.findIndex((t) => t.id === node.data.id);
	};

	let visibleIndex = 0;
	const getVisibleIndex = () => visibleIndex++;

	$: $extents = {
		x1: selected.x0,
		x2: selected.x1,
		y1: selected.y1,
		y2: selected.y0,
	};

	let percent = 0;
	$: percent = (selected, ö.randomNormal(0, 5));
</script>

<TransactionModal bind:isOpen={isOpenModal} {index} {transactionList} />

<header>
	<h5>{selected.data.name}:</h5>
	<h2>{selected.value.toLocaleString('sv-SE')} kr</h2>

	<div>
		<svg width="12" height="8" viewBox="0 0 16 12" style="transform:rotate({-percent * 2}deg);">
			<path
				fill={percent <= 0 ? 'var(--color-success)' : 'var(--wine)'}
				d="M11.898 5.00007L8.32568 1.73846L9.67421 0.261475L15.9593 5.99997L9.67421 11.7385L8.32568 10.2615L11.8977 7.00007H0V5.00007H11.898Z"
			/>
		</svg>
		<small>
			{ö.prettyNumber(Math.abs(percent), 1)}% {percent >= 0 ? 'mer' : 'mindre'} än förra månaden
		</small>
	</div>
	<small>
		{selected.descendants().length - 1} transaktion{selected.descendants().length - 1 === 1
			? ''
			: 'er'}. I genomsnitt {ö.prettyNumber(
			selected.value / (selected.descendants().length - 1),
			2
		)} kr.
	</small>
</header>

<div class="chart">
	<Pancake.Chart x1={$extents.x1} x2={$extents.x2} y1={$extents.y1} y2={$extents.y2}>
		<Treemap {root} let:node>
			{#if is_visible(node, selected)}
				<div
					transition:fade|local={{ duration: 400 }}
					class="node"
					class:leaf={!node.children}
					on:keydown
					on:click={() => {
						if (node.children) select(node);
						else openModal(node);
					}}
				>
					<div class="contents clr{getVisibleIndex()}">
						{#if node.children}
							<img src={generic} alt="" class="ikon" />
						{/if}
						<strong>{node.data.name ?? node.data.text}</strong>
						<span>{node.value.toLocaleString('sv-SE')} kr</span>
						{#if !node.children}
							<span>{niceDate(node.data.date)}</span>
						{/if}
					</div>
				</div>
			{/if}
		</Treemap>
	</Pancake.Chart>
</div>

{#if selected.parent}
	<button class="breadcrumbs" on:click={() => select(selected.parent)} transition:slide|local>
		<img src={arrow} alt="Stäng" />
		{selected.parent.data.name}
	</button>
{/if}

<style lang="scss">
	@use 'sass:color';

	.breadcrumbs {
		width: 100%;
		padding: 0;
		margin-top: 1rem;
		margin-left: -0.25rem;
		color: var(--blue);
		background-color: transparent;
		font-family: inherit;
		font-size: inherit;
		text-align: left;
		border: none;
		cursor: pointer;
		outline: none;
	}

	header {
		margin-bottom: 1rem;
		padding: 1rem;
		text-align: center;
		h2 {
			margin-top: 0;
		}
		div {
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 0.25rem;
		}
		small {
			color: var(--gray);
		}
		svg {
			transform-origin: center center;
		}
	}

	.ikon {
		max-width: 1.5rem;
		padding-bottom: 0.25rem;
	}

	.chart {
		width: calc(100% + 2rem - 4px);
		height: 50vh;
		padding: 0;
		margin: 0 -0.875rem 0;
		overflow: hidden;
	}

	.node {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: white;
		overflow: hidden;
		pointer-events: all;
		cursor: pointer;
	}

	.contents {
		width: 100%;
		height: 100%;
		padding: 0.5rem 0.5rem;
		border: 1px solid white;
		background-color: var(--sky);
		color: var(--white);
		border-radius: 4px;
		box-sizing: border-box;
	}

	.node:not(.leaf) .contents {
		background-color: color.scale(#005aa0, $lightness: -24%);

		&.clr0 {
			background-color: color.scale(#005aa0, $lightness: 0%);
		}
		&.clr1 {
			background-color: color.scale(#005aa0, $lightness: -4%);
		}
		&.clr2 {
			background-color: color.scale(#005aa0, $lightness: -8%);
		}
		&.clr3 {
			background-color: color.scale(#005aa0, $lightness: -12%);
		}
		&.clr4 {
			background-color: color.scale(#005aa0, $lightness: -16%);
		}
		&.clr5 {
			background-color: color.scale(#005aa0, $lightness: -20%);
		}
	}

	strong,
	span {
		display: block;
		font-size: 0.75rem;
		line-height: 1.25;
		white-space: nowrap;

		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>

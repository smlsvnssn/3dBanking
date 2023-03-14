<script>
	import { slide } from 'svelte/transition';
	import down from '$lib/assets/chevron/chevron_down_24.svg';
	export let functionPage = {};
	export let expanded = '';
	export let level = '0';

	const setToExpanded = () => (expanded = !isExpanded ? functionPage?.id : '');

	$: isExpanded = expanded === functionPage.id ? true : false;
</script>

<!-- {#if !functionPage?.inBottomNav} -->
<ul class="level{level}">
	<li class="tile" style="padding-left: {level}rem">
		<img src={functionPage?.icon} alt="" />
		<a href="/functions/{functionPage.name}">
			{#if level === '0'}
				<h5>{functionPage?.name}</h5>
			{:else}
				<h6>{functionPage?.name}</h6>
			{/if}
		</a>

		{#if functionPage?.functions.length}
			<div on:click={setToExpanded} class="chevron">
				<img src={down} style="transform:rotate({isExpanded ? 180 : 0}deg)" alt="" />
			</div>
		{/if}
	</li>
	{#if expanded === functionPage.id}
		<div transition:slide><slot /></div>
	{/if}
</ul>

<!-- {/if} -->
<style lang="scss">
	ul {
		padding: 0;
		border-bottom: 1px solid var(--smoke);

		&.level1,
		&.level2 {
			border-bottom: none;
		}
	}
	h5,
	h6 {
		margin: 0;
		padding: 0;
	}
	.tile {
		background: var(--white);
		border-bottom: 1px solid var(--smoke);
		display: flex;
		align-items: center;
		& > * {
			margin: 1rem;
		}
		img {
			width: 1.5rem;
			margin-right: 0;
			transition: all 0.3s;
		}
		a {
			flex: 1;
			text-decoration: none;
		}
		.chevron {
			cursor: pointer;
			text-align: end;
		}
	}
</style>

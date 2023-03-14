<script>
	import { LayerCake, Svg, Html } from 'layercake';
	import { scaleTime } from 'd3';
	import LineChart from '../layerCakeParts/LineChart.svelte';
	import AxisX from '../layerCakeParts/AxisX.svelte';
	import AxisY from '../layerCakeParts/AxisY.svelte';
	import MouseHandler from './MouseHandler.svelte';
	import Tooltip from '../layerCakeParts/Tooltip.html.svelte';
	import * as ö from 'ouml';
	import Regression from './Regression.svelte';

	export let brushedData;
	export let rawData;
	export let mode = 'day';
	export let xKey;
	export let yKey;
	export let isFiltered = false;

	let tooltip = false,
		hoverevent,
		containerElement;
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<div
	class="chart-container"
	bind:this={containerElement}
	on:mousemove={() => (tooltip = true)}
	on:mouseout={() => (tooltip = false)}
	on:touchstart|stopPropagation={() => (tooltip = true)}
>
	<LayerCake data={brushedData} x={xKey} y={yKey} xScale={scaleTime()}>
		<Svg>
			<Regression />
			<LineChart />
			<MouseHandler
				on:point-selected={(e) => {
					hoverevent = e;
				}}
			/>
			<AxisX ticks={2} formatTick={(d) => d.toLocaleDateString('sv-SE')} />
			<AxisY />
		</Svg>

		<Html pointerEvents={false}>
			{#if tooltip}
				{@const x = hoverevent?.detail[0] - 2}
				<div
					class="marker"
					style="left: {x > 0
						? x < containerElement.offsetWidth
							? x
							: containerElement.offsetWidth
						: 0}px"
				/>
			{/if}

			{#if tooltip}
				<Tooltip evt={hoverevent} let:detail>
					{#if detail.data}
						<p>
							<b>
								{new Date(detail.data.date).toLocaleDateString('sv-SE', {
									month: 'long',
									day: 'numeric',
									year: 'numeric',
								})}
								{mode !== 'day'
									? ` - ${new Date(detail.data.endDate).toLocaleDateString('sv-SE')}`
									: ''}
							</b>
							{#if detail?.data?.transactions?.length}
								-
								{detail.data.transactions.length}
								{detail.data.transactions.length == 1 ? 'transaktion' : 'transaktioner'}
							{/if}
							<br />
							Netto under dagen:
							<b class={detail.data.amount >= 0 ? 'in' : 'out'}
								>{ö.prettyNumber(detail.data.amount)} kr
							</b>
							<br />
							{!isFiltered ? 'Belopp på kontot' : 'Hittills under perioden'}:
							<b class={detail.data.balance >= 0 ? 'in' : 'out'}
								>{ö.prettyNumber(detail.data.balance)} kr
							</b>
							<!-- <br />
							Mean balance:
							<b class={detail.data.meanBalance >= 0 ? 'in' : 'out'}
								>{ö.prettyNumber(detail.data.meanBalance)} kr
							</b> -->
						</p>
					{/if}
				</Tooltip>
			{/if}
		</Html>
	</LayerCake>
</div>

<style>
	.marker {
		height: 100%;
		width: 4px;
		background-color: #0002;
		position: absolute;
		top: 0;
	}
	b {
		font-weight: 600;
	}
	.in {
		color: #8dba84;
	}
	.out {
		color: var(--gray);
	}
	.chart-container {
		width: 100%;
		height: 240px;
		margin: auto;
		margin-bottom: 2rem;
	}
</style>

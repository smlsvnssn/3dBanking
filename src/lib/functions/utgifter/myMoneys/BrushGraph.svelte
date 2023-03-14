<script>
	import { LayerCake, Svg, Html } from 'layercake';
	import Brush from '../layerCakeParts/Brush.html.svelte';
	import Line from '../layerCakeParts/Line.svelte';

	export let yKey;
	export let xKey;
	export let data;
	export let brushedData;
	export let brushExtents;

	$: {
		brushedData = $data.slice(
			(brushExtents[0] || 0) * $data.length,
			(brushExtents[1] || 1) * $data.length
		);
		if (brushedData.length < 2) {
			brushedData = $data.slice(brushExtents[0] * $data.length, brushExtents[0] * $data.length + 2);
		}
	}
</script>

<div class="brush-container">
	<LayerCake padding={{ top: 5 }} x={xKey} y={yKey} data={$data}>
		<Svg>
			<Line />
		</Svg>
		<Html>
			<Brush bind:min={brushExtents[0]} bind:max={brushExtents[1]} />
		</Html>
	</LayerCake>
</div>

<style>
	.brush-container {
		width: 100%;
		height: 240px;
		margin: auto;
		margin-bottom: 01rem;
		background: #f8f8f8;
		height: 32px;
	}
</style>

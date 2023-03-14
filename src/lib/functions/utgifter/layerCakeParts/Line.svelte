<!--
  @component
  Generates an SVG area shape using the `area` function from [d3-shape](https://github.com/d3/d3-shape).
 -->
<script>
	import { getContext } from 'svelte';
	import { line, curveMonotoneX } from 'd3';

	const { data, xGet, yGet } = getContext('LayerCake');

	/** @type {String} [stroke='#ab00d6'] - The shape's fill color. This is technically optional because it comes with a default value but you'll likely want to replace it with your own color. */
	export let stroke = '#005aa0';
	//export let stroke = 'url(#grad)'

	$: path = line().x($xGet).y($yGet).curve(curveMonotoneX);
</script>

<defs>
	<linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
		<stop offset="0%" stop-color="#8DBA84" />
		<stop offset="50%" stop-color="#8DBA84" />
		<stop offset="100%" stop-color="#E30613" />
	</linearGradient>
</defs>
<path class="path-line" d={path($data)} {stroke} />

<style>
	.path-line {
		fill: none;
		stroke-linejoin: round;
		stroke-linecap: round;
		stroke-width: 1;
	}
</style>

<!--
  @component
  Generates an SVG area shape using the `area` function from [d3-shape](https://github.com/d3/d3-shape).
 -->
<script>
	import { getContext } from 'svelte';
	import { calcExtents } from 'layercake';
	import { area, line, curveMonotoneX } from 'd3';
	import * as ö from 'ouml';

	const { data, xGet, yGet, yScale } = getContext('LayerCake');

	/** @type {String} [fill='#ab00d610'] - The shape's fill color. This is technically optional because it comes with a default value but you'll likely want to replace it with your own color. */

	export let fill = '#fff0';

	export let stroke = '#005aa0';
	//export let stroke = 'url(#grad)'

	/** @type {Function} [curve=curveLinear] - An optional D3 interpolation function. See [d3-shape](https://github.com/d3/d3-shape#curves) for options. Pass this function in uncalled, i.e. without the open-close parentheses. */
	export let curve = curveMonotoneX;

	/* 	$: linePath = area()
		.x($xGet)
		.y1($yGet)
		.y0((d) => $yScale(0))
		.curve(curve); */

	$: linePath = line().x($xGet).y($yGet).curve(curve);

	//$: ö.log($data)
</script>

<defs>
	<linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
		<stop offset="0%" stop-color="#8DBA84" />
		<stop offset="50%" stop-color="#8DBA84" />
		<stop offset="100%" stop-color="#E30613" />
	</linearGradient>
</defs>
<!-- <path class="path-area" d={path($data)} {fill} /> -->
<path class="path-area" d={linePath($data)} {stroke} {fill} stroke-width="1.2" />

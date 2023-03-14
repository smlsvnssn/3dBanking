<script>
	import { getContext, createEventDispatcher } from 'svelte';

	const { data, xGet, yGet, width, height } = getContext('LayerCake');

	let dispatcher = createEventDispatcher();

	function dispatch(e) {
		//console.log(point, point.data)

		const bcr = e.target.getBoundingClientRect();
		const x = e.clientX - bcr.x;
		const y = e.clientY - bcr.y;

		const point = [e.offsetX || x, e.offsetY || y];

		point.data = $data[Math.floor((point[0] / $width) * $data.length)];
		dispatcher('point-selected', point);
	}

	const touchHandler = (e) => {
		if (e.type === 'touchstart') {
			if (e.touches.length !== 1) return;
			e = e.touches[0];
		}

		const id = e.identifier;

		const handle_move = (e) => {
			if (e.type === 'touchmove') {
				if (e.changedTouches.length !== 1) return;
				e = e.changedTouches[0];
				if (e.identifier !== id) return;
			}

			dispatch(e);
		};
		dispatch(e);

		const handle_end = (e) => {
			if (e.type === 'touchend') {
				if (e.changedTouches.length !== 1) return;
				if (e.changedTouches[0].identifier !== id) return;
			}

			window.removeEventListener('touchmove', handle_move);
			window.removeEventListener('touchend', handle_end);
		};

		window.addEventListener('touchmove', handle_move);
		window.addEventListener('touchend', handle_end);
	};
</script>

<rect
	width={$width}
	height={$height}
	fill="transparent"
	on:touchstart={touchHandler}
	on:pointermove={dispatch}
/>

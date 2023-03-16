<script>
	import { World, Debug } from '$lib/@threlte_hacked/rapier'
	import { Grid } from '$lib/@threlte_hacked/extras'
	import {
		Canvas,
		DirectionalLight,
		OrbitControls,
		PerspectiveCamera,
	} from '$lib/@threlte_hacked/core'

	import Emitter from './Emitter.svelte'
	import Ground from './Ground.svelte'
	import { PointLight } from '$lib/@threlte_hacked/core'

	export let amountOfStuff
	export let stuff
</script>

<Canvas>
	<World>
		<PerspectiveCamera position={{ y: 10, x: 15 }} fov={40}>
			<OrbitControls target={{ x: 0, y: 4 }} />
		</PerspectiveCamera>

		<DirectionalLight
			shadow
			position={{ y: 3, x: 8, z: 0 }}
			intensity={1}
		/>
		<PointLight position={{ x: -30, y: 3 }} shadow intensity={0.3} />

		<Grid
			cellColor="#fff"
			cellSize="1"
			cellThickness=".5"
			sectionColor="#fff"
			sectionSize="8"
			sectionThickness=".75"
			infiniteGrid="true"
			fadeDistance="200"
			fadeStrength="1.2"
		/>

		<Emitter {amountOfStuff} {stuff} />

		<Ground />
	</World>
</Canvas>

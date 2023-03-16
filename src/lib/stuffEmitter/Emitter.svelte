<script>
	import { useFrame } from '$lib/@threlte_hacked/core'
	import { Euler } from 'three'
	import { Vector3 } from 'three'
	import Particle from './Particle.svelte'

	const getRandomPosition = () => {
		return new Vector3(
			5 - Math.random() * 10,
			5 - Math.random() * 1 + 15,
			5 - Math.random() * 10,
		)
	}
	const getRandomRotation = () => {
		return new Euler(
			Math.random() * 10,
			Math.random() * 10,
			Math.random() * 10,
		)
	}
	export let amountOfStuff
	export let stuff

	let bodies = []
	let lastBodyMounted = 0
	let c = 0
	let bodyEveryMilliseconds = 50

	$: {
		amountOfStuff = Math.floor(amountOfStuff)
		bodies = []
		c = 0
	}

	useFrame(() => {
		if (
			lastBodyMounted + bodyEveryMilliseconds < Date.now() &&
			c < amountOfStuff
		) {
			bodies.push({
				id: Math.random(),
				mounted: Date.now(),
				position: getRandomPosition(),
				rotation: getRandomRotation(),
			})
			lastBodyMounted = Date.now()
			bodies = bodies
			c++
		}
	})
</script>

{#each bodies as body (body.id)}
	<Particle position={body.position} rotation={body.rotation} {stuff} />
{/each}

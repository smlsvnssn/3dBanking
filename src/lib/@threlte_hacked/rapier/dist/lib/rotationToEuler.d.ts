import type { Rotation } from '$lib/@threlte_hacked/core'
import { Euler } from 'three'
export declare const rotationToEuler: (
	rotation?: Rotation,
	euler?: Euler,
) => Euler

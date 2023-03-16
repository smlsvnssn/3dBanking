import adapter from '@sveltejs/adapter-auto'
//import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),
	onwarn: (warning, handler) => {
		if (warning.code.startsWith('a11y-')) {
			return
		}
		handler(warning)
	},
	kit: {
		adapter: adapter(),
		version: {
			name: Date.now().toString(),
			pollInterval: 0,
		},
	},
	vitePlugin: {
		experimental: {
			inspector: true,
		},
	},
}

export default config

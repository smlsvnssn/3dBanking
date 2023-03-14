<script>
	import { userPages, labels, userPageTemplates } from '$lib/dataStores';
	import { goto } from '$app/navigation';
	import generic from '$lib/assets/icons/star-40.svg';
	import * as ö from 'ouml';
	import ChooseCategories from './ChooseCategories.svelte';
	import ChooseTags from './ChooseTags.svelte';
	import ChooseTiles from './ChooseTiles.svelte';
	import UserPageChoices from '$lib/components/UserPageChoices.svelte';
	import SettingsDrawer from '$lib/components/SettingsDrawer.svelte';

	const id = () => ö.randomChars();
	// @ts-ignore
	const createUserPage = (p) => {
			//ö.log(p);
			$userPages = [...$userPages, { ...p }];
			if (p.tags.length) {
				$labels.tags = [...$labels.tags, p.tags];
			}
			page = template();
			createNew = false;
			goto(`/userPages/${p.id}`);
		},
		template = () => ({
			id: id(),
			name: '',
			image: null,
			icon: generic,
			tiles: [],
			categories: [],
			tags: [],
		});

	export let page = template();
	export let createNew = false;
</script>

<SettingsDrawer bind:isOpen={createNew}>
	<h1 class="display-4">Vad vill du få koll på?</h1>
	<p class="payoff">
		En egen sida låter dig hålla koll på något viktigt i din vardag. Det kan vara något stort, eller
		något litet. Välj en färdig sida, eller skapa en helt egen!
	</p>

	<h3>Välj en färdig sida...</h3>
	<ul class="templates">
		{#each $userPageTemplates as t}
			<li on:click={createUserPage(t)}>
				<div>
					<img src={t.icon} alt="" />
					<h5>{t.name}</h5>
				</div>
			</li>
		{/each}
	</ul>

	<h3>...eller skapa en egen:</h3>

	<div><ChooseCategories bind:categories={page.categories} bind:tiles={page.tiles} /></div>
	<div><ChooseTags bind:tags={page.tags} bind:tiles={page.tiles} /></div>
	<div><ChooseTiles bind:tiles={page.tiles} /></div>

	<div>
		<h5>Namn på din sida:</h5>
		<input
			type="text"
			bind:value={page.name}
			class="form-control"
			placeholder="Till exempel: Mina barn"
		/>
	</div>

	<div>
		<h5>Välj bild eller ikon:</h5>
		<p class="payoff">Här ska man kunna välja bild eller ikon</p>
	</div>
	<hr />

	<UserPageChoices {page} />

	<div class="btn" on:click={() => createUserPage(page)}>Skapa egen sida</div>
</SettingsDrawer>

<style lang="scss">
	.templates {
		display: grid;
		gap: 1rem;
		padding: 0;
		grid: auto-flow / 1fr 1fr;
		list-style: none;
		li {
			cursor: pointer;
			display: grid;
			align-items: center;
			justify-items: center;
			background: var(--cloud);
			min-height: 8rem;
			border-radius: 4px;

			div{
				text-align: center;
			}

			h5 {
				margin: .5rem;
			}
		}
	}
	hr {
		width: 100%;
		border-top: 1px solid var(--smoke);
		margin-bottom: 0rem;
	}

	h5 {
		margin-top: 2rem;
	}

	.small {
		font-size: 0.9rem;
		margin-bottom: 0.5rem;
		color: var(--gray);
	}
	* {
		flex-shrink: 0;
	}
</style>

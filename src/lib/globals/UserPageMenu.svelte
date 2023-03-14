<script>
	import CreateNewUserPage from './CreateNewUserPage.svelte';
	import { onMount } from 'svelte';
	import { startPage, userPages } from '$lib/dataStores';
	import { currentUserPage } from '$lib/globals';

	import { sticktotop } from '$lib/components/övents';
	import addNew from '$lib/assets/icons/_ThumbAddPage.svg';
	import * as ö from 'ouml';

	let createNew = false,
		isSticky = false,
		isMounted = false;

	const shrink = (e) => (isSticky = e.detail.sticky);

	onMount(() => (isMounted = true));

	$: pageName = $currentUserPage;
	$: thisPage = $userPages.find((v) => v.name === pageName) || $startPage;
	//$: ö.log(thisPage);
</script>

{#if createNew}
	<CreateNewUserPage bind:createNew />
{/if}
<div
	class="hero"
	style="background-image:url(https://picsum.photos/{thisPage?.image
		? `id/${thisPage?.image}`
		: `seed/${thisPage?.id}`}/640/480)"
>
	<h1 class="display-4">{pageName || $startPage.name}</h1>
</div>

<nav use:sticktotop on:sticktotop={shrink} class:isSticky>
	<ul>
		<li class:active={pageName === $startPage?.name}>
			<a href="/">
				<div class="imgWrapper"><img src={$startPage?.icon} alt="" /></div>
				<span>{$startPage?.name}</span>
			</a>
		</li>
		{#if isMounted}
			{#each $userPages as userPage, i}
				<li class:active={pageName === userPage.name}>
					<!-- <a href="/userPages/{userPage.id}" style="--time:{i / 10 + 0.2}s"> -->
					<a href="/userPages/{userPage.id}">
						<div class="imgWrapper"><img src={userPage.icon} alt="" /></div>
						<span>{userPage.name}</span>
					</a>
				</li>
			{/each}
			<li class="createNew">
				<a href="#" on:click|preventDefault={() => (createNew = true)}>
					<div class="imgWrapper new"><img src={addNew} alt="" /></div>
					<span>Skapa egen</span>
				</a>
			</li>
		{/if}
	</ul>
</nav>

<style lang="scss">
	.hero {
		background: var(--cloud);
		background-size: cover;
		background-position: center;
		display: flex;
		align-items: flex-end;
		//height: 12rem;
		padding: 1.5rem;
		position: relative;
		h1 {
			padding: 0.25rem 0.5rem;
			margin: 0;
			background: var(--white);
		}
	}
	nav {
		position: sticky;
		z-index: 9;
		top: 0;
		margin-bottom: 0.5rem;
		overflow-x: hidden;
		height: 7rem;
		width: 100%;

		&.isSticky {
			li a {
				padding: 0.5rem 0.25rem 0.25rem;
				min-width: 3.5rem;
				gap: 0.25rem;
				span {
					max-width: 2rem;
					transform: scale(0);
					height: 0;
					
				}
			}
			.imgWrapper {
				padding: 0.25rem;

				&.new {
					background: var(--white);
				}
				img {
					width: 2rem;
				}
			}

			ul {
				box-shadow: 0 0 10px #0002;
			}
		}
		ul {
			width: 100%;
			display: flex;
			justify-content: left;
			list-style: none;
			position: relative;
			padding: 0;
			overflow-y: scroll;
			transition: all 0.3s;

			background: var(--white);
			background-size: contain;
		}

		.imgWrapper {
			border-radius: 3rem;
			background: var(--cloud);
			padding: 0.5rem;
			transition: all 0.3s;

			&.new {
				background: var(--white);
			}
			img {
				width: 2rem;
			}
		}
		li {
			position: relative;
			display: flex;

			a {
				--time: 0.3s;
				border-bottom: 2px solid var(--smoke);
				min-width: 5rem;
				display: flex;
				flex: 0 1;
				flex-direction: column;
				align-items: center;
				font: 0.75rem/1 var(--lf-font-family-sans-serif);
				font-weight: bold;
				gap: 0.5rem;
				padding: 0.75rem 0.25rem;
				text-decoration: none;
				color: var(--gray);
				transition: all var(--time);
				text-align: center;
			}
			span {
				display: inline-block;
				transition: all var(--time);
				hyphens: auto;
				word-break: break-all;
				text-overflow: ellipsis;
			}
		}

		li.createNew {
			position: sticky;
			right: 0;
			top: 0;
			flex: 1;
			justify-self: end;
			justify-content: end;
			border-bottom: 2px solid var(--smoke);

			background: linear-gradient(
				90deg,
				rgba(255, 255, 255, 0) 0%,
				rgba(255, 255, 255, 1) 20%,
				rgba(255, 255, 255, 1) 100%
			);

			a {
				border-bottom: none;
				margin-left: 1rem;
			}
		}

		li.active a {
			border-bottom: 2px solid var(--blue);
			background: var(--cloud);
			color: var(--blue);
		}
	}
</style>

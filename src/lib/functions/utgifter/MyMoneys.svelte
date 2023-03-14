<!-- { filename: 'js/App.svelte' } -->
<script>
	import BrushGraph from './myMoneys/BrushGraph.svelte';
	import MainGraph from './myMoneys/MainGraph.svelte';
	import Choices from './myMoneys/Choices.svelte';

	import { onMount } from 'svelte';

	import * as ö from 'ouml';
	import { spring } from 'svelte/motion';
	// @ts-ignore
	//import csvdata from './cleanedTransactions.json'

	export let transactions = [
		{
			id: 7082948,
			categoryId: 84,
			category: 'Fritid och nöjen',
			subcategory: 'Restaurang',
			date: '2022-10-06T00:00:00',
			text: 'Liberties',
			amount: -170,
			balance: 610,
			tags: [],
			data: '',
		},
	];

	export let userPage;

	let graphtype = 'balance',
		mode = 'day',
		prevMode,
		brushedData,
		categoriesAndTagsBalance = 0;

	const isFiltered = userPage && (userPage.tags.length || userPage.categories.length);

	const brushExtents = [0, 1];
	const xKey = 'date';
	const yKey = 'selected';
	const washedData = transactions
		.map((v) => ({
			date: new Date(v.date),
			amount: v.amount,
			balance: v.balance,
			text: v.text,
		}))
		.sort((a, b) => a.date - b.date)
		.map((v, i) => {
			// count from 0 if page has tags or cetegories
			if (isFiltered) {
				categoriesAndTagsBalance += v.amount;
				v.balance = categoriesAndTagsBalance;
			}
			return { ...v, id: i };
		});

	const createTimeSeries = (data, mode = 'day') => {
		const last = data[data.length - 1].date,
			addOnePeriod = (d) =>
				new Date(
					mode === 'day'
						? new Date(d).setDate(d.getDate() + 1)
						: mode === 'month'
						? new Date(d).setMonth(d.getMonth() + 1)
						: new Date(d).setFullYear(d.getFullYear() + 1)
				),
			output = [];

		let dayCount = 0;
		const calcMeanBalance = (start, end) => {
			const balance = [];
			while (start < end) {
				if (dailyData[dayCount]) balance.push(dailyData[dayCount].balance);
				start.setDate(start.getDate() + 1);
				dayCount++;
			}
			return ö.mean(balance);
		};

		let startOfPeriod = new Date(data[0].date.toDateString()),
			balance = 0,
			prevBalance = isFiltered ? 0 : data[0].balance,
			index = 0;

		if (mode === 'month') startOfPeriod.setDate(1);
		if (mode === 'year') startOfPeriod.setMonth(0), startOfPeriod.setDate(1);

		while (startOfPeriod.getTime() < last.getTime()) {
			const transactions = [],
				endOfPeriod = addOnePeriod(startOfPeriod);

			while (data[index]?.date.getTime() < endOfPeriod) {
				transactions.push(data[index]);
				index++;
			}
			balance = transactions.at(-1)?.balance || balance;

			output.push({
				date: new Date(startOfPeriod),
				endDate: new Date(endOfPeriod.setDate(endOfPeriod.getDate() - 1)),
				amount: transactions.reduce((acc, v) => acc + v.amount, 0),
				balance: balance,
				meanBalance:
					mode === 'day'
						? (balance + prevBalance) / 2
						: calcMeanBalance(new Date(startOfPeriod), endOfPeriod),
				transactions: transactions.map((v) => v.id),
				numtransactions: transactions.length,
			});

			startOfPeriod = addOnePeriod(startOfPeriod);
			prevBalance = balance;
		}

		return output;
	};

	const dailyData = createTimeSeries(washedData, 'day');

	console.time('createTimeSeries');
	let data = spring(
		createTimeSeries(washedData, mode).map((v) => ({ ...v, selected: v[graphtype] })),
		{
			stiffness: 0.1,
			damping: 0.9,
		}
	);
	console.timeEnd('createTimeSeries');

	$: {
		if (mode !== prevMode) {
			data = spring(
				createTimeSeries(washedData, mode).map((v) => ({ ...v, selected: v[graphtype] })),
				{
					stiffness: 0.1,
					damping: 0.9,
				}
			);
			prevMode = mode;
		} else data.set($data.map((v) => ({ ...v, selected: v[graphtype] })));
	}

	// rewrite to selected vhen graphtype changes
	//$: data.set($data.map(v => ({ ...v, selected: v[graphtype] })))
</script>

{#if userPage?.categories?.length}
	<p class="small">Utgifter inom kategori: {userPage.categories.join(' och ')}</p>
{/if}

<MainGraph rawData={washedData} {brushedData} {xKey} {yKey} {mode} {isFiltered} />

<BrushGraph bind:brushedData {xKey} {yKey} {data} {brushExtents} />

<Choices bind:graphtype bind:mode {isFiltered} />

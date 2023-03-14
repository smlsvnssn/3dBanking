import fs from 'fs';
import * as ö from 'ouml';

const file = new URL('Transactions.json', import.meta.url);
const maxTransactions = 1000;
const currencyMultiplier = 10;
const initialBalance = 33416;

const filterOnDate = true;
const startDate = new Date('2022-08-31');
const endDate = new Date('2022-10-01');

const categoryMap = [
	{ id: 36, category: 'Bil och transport', subcategory: 'Bränsle' },
	{ id: 84, category: 'Fritid och nöjen', subcategory: 'Restaurang' },
	{ id: 14, category: 'Fritid och nöjen', subcategory: 'Fika' },
	{ id: 45, category: 'Barn', subcategory: 'Barnvakt' },
	{ id: 21, category: 'Hem', subcategory: 'Hyra' },
	{ id: 71, category: 'Mat', subcategory: 'Snabbmat' },
	{ id: 79, category: 'Nöjen', subcategory: 'Bar och nattklubb' },
	{ id: 16, category: 'Hem', subcategory: 'El, gas och värme' },
	{ id: 18, category: 'Hem', subcategory: 'TV, telefon och internet' },
	{ id: 41, category: 'Barn', subcategory: 'Barns utbildning' },
	{ id: 290, category: 'Mat', subcategory: 'Livsmedel' },
	{ id: 42, category: 'Barn', subcategory: 'Barn och babyprodukter' },
	{ id: 61, category: 'Fritid och nöjen', subcategory: 'Film, böcker och musik' },
	{ id: 2, category: 'Inkomst', subcategory: 'Lön' },
	{ id: 49, category: 'Hälsa och skönhet', subcategory: 'Apotek' },
	{ id: 78, category: 'Fritid och nöjen', subcategory: 'Film, böcker och musik' },
	{ id: 52, category: 'Fritid och nöjen', subcategory: 'Sport och träning' },
	{ id: 65, category: 'Shopping och tjänster', subcategory: 'Kläder och skor' },
	{ id: 83, category: 'Mat', subcategory: 'Kiosk och närbutik' },
	{ id: 34, category: 'Bil och transport', subcategory: 'Kollektivtrafik och pendling' },
	{ id: 69, category: 'Shopping och tjänster', subcategory: 'Kemtvätt och skrädderi' },
	{ id: 224, category: 'Mat', subcategory: 'Bageri och tårta' },
	{ id: 59, category: 'Övrigt', subcategory: 'Avgifter' },
	{ id: 288, category: 'Bil och transport', subcategory: 'Taxi' },
	{ id: 17, category: 'Försäkring', subcategory: 'Hemförsäkring' },
	{ id: 91, category: 'Fritid och nöjen', subcategory: 'Fester och presenter' },
	{ id: 216, category: 'Övrigt', subcategory: 'Kontantuttag' },
	{ id: 105, category: 'Fritid och nöjen', subcategory: 'Husdjur' },
	{ id: 75, category: 'Fritid och nöjen', subcategory: 'Kultur, bio och konserter' },
	{ id: 67, category: 'Shopping och tjänster', subcategory: 'Frisör' },
	{ id: 23, category: 'Övrigt', subcategory: 'Kreditkortsbetalning' },
	{ id: 64, category: 'Shopping och tjänster', subcategory: 'Övrig shopping' },
	{ id: 70, category: 'Fritid och nöjen', subcategory: 'Fritid och nöjen - övrigt' },
	{ id: 33, category: 'Försäkring', subcategory: 'Bil- och fordonsförsäkring' },
	{ id: 86, category: 'Utbildning', subcategory: 'Utbildning' },
	{ id: 37, category: 'Bil och transport', subcategory: 'Service och reparation' },
];

const washData = (data) => {
	let balance = initialBalance;

	return JSON.parse(data)
		.slice(0, maxTransactions) // korta ner
		.filter(v => {
			if (filterOnDate) {
				return ö.between(new Date(v.date), startDate, endDate)
			}
			return true
		})
		.map((v) => {
			let { id, categoryId, date, text, amount, tags, data } = v;

			// Give the poor bastard a higher Salary, and cut expenses in half, in order to make ends meet
			amount = text === 'Salary' ? amount * 1.2 : amount * 0.5;
			amount *= currencyMultiplier;
			amount = Math.round(amount * 100) / 100;
			balance -= amount;
			const { category, subcategory } = categoryMap.find((v) => v.id === categoryId);

			return {
				id,
				categoryId,
				category,
				subcategory,
				date,
				text,
				amount,
				balance: Math.round(balance * 100) / 100,
				tags,
				data,
			};
		});
};

const createCleanedTransactions = (data) => {
	fs.writeFile(
		new URL('cleanedTransactions.json', import.meta.url),
		JSON.stringify(data),
		(e) => ö.log(e)
	);
};

const createGroupedTransactions = (data) => {
	const sumGroups = (data) => {
		const sumAmount = (arr) =>
			arr.reduce((acc, transaction) => (acc += transaction.amount ?? transaction.sum), 0);
		const sum = (data) => {
			if (!data.children) return data;
			data.children = data.children
				.map(sum)
				.sort((a, b) => (b.amount ?? b.sum) - (a.amount ?? a.sum));
			return { ...data, sum: sumAmount(data.children) };
		};
		return sum(data);
	};
	// Do some washing
	data = data
		.filter((o) => o.category !== 'Inkomst')
		.map((o) => ({ ...o, amount: -o.amount }));

	// Group on category/subcategory
	const grouped = ö.groupBy(data, 'category');

	grouped.forEach((category, categoryName, map) => {
		map.set(categoryName, ö.groupBy(category, 'subcategory'));
	});

	// Convert to hierarchic object
	let groupedObj = {
		name: 'Dina utgifter',
		children: [],
	};

	grouped.forEach((category, categoryName) => {
		const cat = { name: categoryName, children: [] };
		category.forEach((subcategory, subcategoryName) => {
			cat.children.push({ name: subcategoryName, children: subcategory });
		});
		groupedObj.children.push(cat);
	});

	// Sum the groups
	groupedObj = sumGroups(groupedObj);

	// Slice root to largest categories
	const sliceOnLargest = 5;

	groupedObj.children = [
		...groupedObj.children.slice(0, sliceOnLargest),
		{
			name: 'Övriga kategorier',
			children: groupedObj.children.slice(sliceOnLargest),
		},
	];

	fs.writeFile(
		new URL('groupedTransactions.json', import.meta.url),
		JSON.stringify(groupedObj),
		(e) => ö.log(e)
	);
};

fs.readFile(file, async (err, data) => {
	if (err) ö.log(err), process.exit(1);

	const parsedData = washData(data);

	createCleanedTransactions(parsedData);

	console.time()
	createGroupedTransactions(parsedData);
	console.timeEnd()

	ö.log('done');
});

import * as ö from 'ouml';

const sliceOnLargest = 5;

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
	data = data.filter((o) => o.category !== 'Inkomst').map((o) => ({ ...o, amount: -o.amount }));

	// Group on category/subcategory
	const grouped = ö.groupBy(data, 'category');

	grouped.forEach((category, categoryName, map) => {
		map.set(categoryName, ö.groupBy(category, 'subcategory'));
	});

	// Convert to hierarchic object
	let groupedObj = {
		name: 'Totalt',
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

	// If only one category, replace root level with children
	if (groupedObj.children.length === 1) groupedObj = groupedObj.children[0]
	// Slice root to largest categories
	else
		groupedObj.children = [
			...groupedObj.children.slice(0, sliceOnLargest),
			{
				name: 'Övriga kategorier',
				children: groupedObj.children.slice(sliceOnLargest),
			},
		];

	return groupedObj;
};

export default createGroupedTransactions;

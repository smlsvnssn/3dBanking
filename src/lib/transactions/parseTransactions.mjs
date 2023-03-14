import * as ö from 'ouml';

const categoryMap = [
	{ id: 36, category: 'Bil och transport', subcategory: 'Bränsle' },
	{ id: 84, category: 'Fritid och nöjen', subcategory: 'Restaurang' },
	{ id: 14, category: 'Fritid och nöjen', subcategory: 'Fika' },
	{ id: 45, category: 'Barn', subcategory: 'Barnvakt' },
	{ id: 21, category: 'Hem', subcategory: 'Hyra' },
	{ id: 71, category: 'Mat', subcategory: 'Snabbmat' },
	{ id: 79, category: 'Fritid och nöjen', subcategory: 'Bar och nattklubb' },
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

const categories = {
	tags: ['Min badrumsrenovering', 'Golfen', 'Englandsresan'],
	categories: [
		{ name: 'Hem' },
		{ name: 'Bil och transport' },
		{ name: 'Barn' },
		{ name: 'Utbildning' },
		{ name: 'Böter, förseningsavgifter och lån' },
		{ name: 'Mat' },
		{ name: 'Hälsa och skönhet' },
		{
			name: 'Försäkring',
			subcategories: [
				{ name: 'Hemförsäkring' },
				{ name: 'Bil- och fordonsförsäkring' },
				{ name: 'Barnförsäkring' },
			],
		},
		{ name: 'Fritid och nöjen' },
		{ name: 'Shopping och tjänster' },
		{ name: 'Okategoriserade utgifter' },
		{ name: 'Semester och resor' },
		{ name: 'Sparande och investeringar' },
		{ name: 'Inkomst' },
		{ name: 'Exkludera' },
		{ name: 'Övrigt' },
	],
};

categoryMap.forEach((v) => {
	const o = categories.categories.find((vv) => v.category === vv.name);
	(o?.subcategories || (o.subcategories = [])).push({ name: v.subcategory });
});

ö.log(JSON.stringify(categories));

// let test = await import('./Transactions.json', { assert: { type: 'json' } });
// ö.log(test.default[0]);
// let sorted = ö.groupBy(test.default, 'categoryId');
// ö.log(new Set(test.default.map((v) => v.categoryId)).size);

// let table = [];
// for (let [k, v] of sorted.entries()) table.push({ kategori: k, antal: v.length });

// console.table(table);

// ┌─────────┬──────────┬───────┐
// │ (index) │ kategori │ antal │
// ├─────────┼──────────┼───────┤
// │    0    │    36    │  90   │
// │    1    │    84    │  222  │
// │    2    │    14    │ 1841  │
// │    3    │    45    │  31   │
// │    4    │    21    │  28   │
// │    5    │    71    │ 1054  │
// │    6    │    79    │  82   │
// │    7    │    16    │  28   │
// │    8    │    18    │  28   │
// │    9    │    41    │  28   │
// │   10    │   290    │ 1568  │
// │   11    │    42    │  18   │
// │   12    │    61    │  137  │
// │   13    │    2     │  28   │
// │   14    │    49    │  35   │
// │   15    │    78    │  62   │
// │   16    │    52    │  13   │
// │   17    │    65    │  65   │
// │   18    │    83    │   6   │
// │   19    │    34    │  88   │
// │   20    │    69    │  91   │
// │   21    │   224    │   7   │
// │   22    │    59    │  27   │
// │   23    │   288    │  25   │
// │   24    │    17    │  28   │
// │   25    │    91    │  12   │
// │   26    │   216    │  119  │
// │   27    │   105    │   4   │
// │   28    │    75    │  11   │
// │   29    │    67    │   9   │
// │   30    │    23    │   6   │
// │   31    │    64    │  663  │
// │   32    │    70    │   1   │
// │   33    │    33    │   5   │
// │   34    │    86    │   4   │
// │   35    │    37    │   7   │
// └─────────┴──────────┴───────┘

import { readable, writable } from 'svelte/store';

// Icons
import vardag from './assets/icons/bills_coins_mc_48.svg';
import boende from './assets/icons/house-48.svg';
import bil from './assets/icons/car-48.svg';
import betala from './assets/24pixels/Betala.svg';
import sparande from './assets/24pixels/Sparande 3.svg';
import försäkring from './assets/24pixels/circlediagram-24.svg';

import familj from './assets/40/family-40.svg';
import mobil from './assets/40/mobile-phone-40.svg';
import semester from './assets/40/pension-40.svg';
import sköld from './assets/40/shield-40.svg';

// Functions, should all be imported here:
import SenasteTransaktioner from './functions/SenasteTransaktioner.svelte';
// PFM dummy:
import Utgifter from './functions/Utgifter.svelte';
import InkomsterUtgifter from './functions/utgifter/InkomsterUtgifter.svelte';
import Budget from './functions/utgifter/Budget.svelte';
import Butiker from './functions/utgifter/Butiker.svelte';
import JämförtMed from './functions/utgifter/JämförtMed.svelte';
import Kommande from './functions/utgifter/Kommande.svelte';
import Kvar from './functions/utgifter/Kvar.svelte';

import _FunctionTemplate from './functions/_FunctionTemplate.svelte';

import * as ö from 'ouml';

const id = () => ö.randomChars();

export const startPage = writable({
	name: 'Översikt',
	id: id(),
	image: '1018',
	icon: vardag,
	tiles: [
		'Mina utgifter',
		'Senaste transaktioner',
		'Konton',
		'Sparande',
		'Fonder',
		'Kort',
		'Försäkring',
		'Kundservice och kontakt',
	],
	categories: [],
	tags: [],
});
export const userPages = writable([
	{
		name: 'Mitt boende',
		id: id(),
		image: '1078',
		icon: boende,
		tiles: ['Senaste transaktioner', 'Mina utgifter', 'Hemförsäkring', 'Bolån'],
		categories: ['Hem'],
		tags: [],
	},
	{
		name: 'Min bil',
		id: id(),
		image: '111',
		icon: bil,
		tiles: ['Senaste transaktioner', 'Mina utgifter', 'Bilförsäkring'],
		categories: ['Bil och transport'],
		tags: [],
	},
	{
		name: 'Min framtid',
		id: id(),
		image: '109',
		icon: boende,
		tiles: ['Sparande', 'Pension'],
		categories: ['Sparande och investeringar'],
		tags: [],
	},
]);

export const userPageTemplates = readable([
	{
		name: 'Mina barn',
		id: id(),
		image: '146',
		icon: familj,
		tiles: ['Mina utgifter', 'Sparande', 'Barnförsäkring'],
		categories: ['Barn', 'Utbildning'],
		tags: [],
	},
	{
		name: 'Mina försäkringar',
		id: id(),
		image: '223',
		icon: sköld,
		tiles: ['Försäkring', 'Hemförsäkring', 'Trygghet i hemmet', 'Bilförsäkring', 'Barnförsäkring'],
		categories: ['Försäkring'],
		tags: [],
	},
	{
		name: 'Mina smarta prylar',
		id: id(),
		image: '20',
		icon: mobil,
		tiles: ['Trygghet i hemmet', 'Larm', 'Vattenvarnare', 'Smarta prylar'],
		categories: ['Hem'],
		tags: [],
	},
	{
		name: 'Min semester',
		id: id(),
		image: '215',
		icon: semester,
		tiles: ['Senaste transaktioner', 'Mina utgifter', 'Sparande', 'Konton'],
		categories: ['Semester och resor'],
		tags: ['Min semester'],
	},
]);

export const functions = readable([
	{
		name: 'Konton och kort',
		id: id(),
		component: _FunctionTemplate,
		icon: sparande,
		inBottomNav: false,
		suggestOnCategories: [],
		suggestOnNewTagPage: false,
		functions: [
			{
				name: 'Konton',
				id: id(),
				component: null,
				icon: sparande,
				inBottomNav: false,
				suggestOnCategories: [],
				suggestOnNewTagPage: false,
				functions: [],
			},
			{
				name: 'Kort',
				id: id(),
				component: null,
				icon: sparande,
				inBottomNav: false,
				suggestOnCategories: [],
				suggestOnNewTagPage: false,
				functions: [],
			},
			{
				name: 'Senaste transaktioner',
				id: id(),
				component: SenasteTransaktioner,
				icon: betala,
				inBottomNav: false,
				suggestOnCategories: [
					'Hem',
					'Bil och transport',
					'Barn',
					'Mat',
					'Fritid och nöjen',
					'Shopping och tjänster',
					'Hälsa och skönhet',
				],
				suggestOnNewTagPage: true,
				functions: [],
			},
		],
	},
	{
		name: 'Betala',
		id: id(),
		component: null,
		icon: betala,
		inBottomNav: true,
		suggestOnCategories: ['Böter, förseningsavgifter och lån', 'Övrigt'],
		suggestOnNewTagPage: false,
		functions: [],
	},
	{
		name: 'Sparande',
		id: id(),
		component: null,
		icon: sparande,
		inBottomNav: true,
		suggestOnCategories: [],
		suggestOnNewTagPage: false,
		functions: [
			{
				name: 'Sparnavigatorn',
				id: id(),
				component: null,
				icon: sparande,
				inBottomNav: false,
				suggestOnCategories: [],
				suggestOnNewTagPage: false,
				functions: [],
			},
			{
				name: 'ISK',
				id: id(),
				component: null,
				icon: sparande,
				inBottomNav: false,
				suggestOnCategories: [],
				suggestOnNewTagPage: false,
				functions: [],
			},
			{
				name: 'Fonder',
				id: id(),
				component: null,
				icon: sparande,
				inBottomNav: false,
				suggestOnCategories: [],
				suggestOnNewTagPage: false,
				functions: [],
			},
			{
				name: 'Aktier',
				id: id(),
				component: null,
				icon: sparande,
				inBottomNav: false,
				suggestOnCategories: [],
				suggestOnNewTagPage: false,
				functions: [],
			},
		],
	},
	{
		name: 'Mina utgifter',
		id: id(),
		component: Utgifter,
		icon: vardag,
		inBottomNav: false,
		suggestOnCategories: [
			'Hem',
			'Bil och transport',
			'Barn',
			'Mat',
			'Fritid och nöjen',
			'Shopping och tjänster',
			'Hälsa och skönhet',
		],
		suggestOnNewTagPage: true,
		functions: [
			{
				name: 'Inkomster och utgifter',
				id: id(),
				component: InkomsterUtgifter,
				icon: vardag,
				inBottomNav: false,
				suggestOnCategories: [],
				suggestOnNewTagPage: false,
				functions: [],
			},
			{
				name: 'Budget',
				id: id(),
				component: Budget,
				icon: vardag,
				inBottomNav: false,
				suggestOnCategories: [],
				suggestOnNewTagPage: false,
				functions: [],
			},
			{
				name: 'Kommande utgifter',
				id: id(),
				component: Kommande,
				icon: vardag,
				inBottomNav: false,
				suggestOnCategories: [],
				suggestOnNewTagPage: false,
				functions: [],
			},
			{
				name: 'Kvar att spendera',
				id: id(),
				component: Kvar,
				icon: vardag,
				inBottomNav: false,
				suggestOnCategories: [],
				suggestOnNewTagPage: false,
				functions: [],
			},
			{
				name: 'Butiker',
				id: id(),
				component: Butiker,
				icon: vardag,
				inBottomNav: false,
				suggestOnCategories: [],
				suggestOnNewTagPage: false,
				functions: [],
			},
			{
				name: 'Jag jämfört med...',
				id: id(),
				component: JämförtMed,
				icon: vardag,
				inBottomNav: false,
				suggestOnCategories: [],
				suggestOnNewTagPage: false,
				functions: [],
			},
		],
	},
	{
		name: 'Lån',
		id: id(),
		component: null,
		icon: sparande,
		inBottomNav: false,
		suggestOnCategories: [],
		suggestOnNewTagPage: false,
		functions: [
			{
				name: 'Bolån',
				id: id(),
				component: null,
				icon: sparande,
				inBottomNav: false,
				suggestOnCategories: [],
				suggestOnNewTagPage: false,
				functions: [],
			},
			{
				name: 'Blancolån',
				id: id(),
				component: null,
				icon: sparande,
				inBottomNav: false,
				suggestOnCategories: [],
				suggestOnNewTagPage: false,
				functions: [],
			},
		],
	},
	{
		name: 'Pension',
		id: id(),
		component: null,
		icon: sparande,
		inBottomNav: false,
		suggestOnCategories: [],
		suggestOnNewTagPage: false,
		functions: [],
	},
	{
		name: 'Försäkring',
		id: id(),
		component: null,
		icon: försäkring,
		inBottomNav: true,
		suggestOnCategories: ['Försäkring'],
		suggestOnNewTagPage: false,
		functions: [
			{
				name: 'Hemförsäkring',
				id: id(),
				component: null,
				icon: försäkring,
				inBottomNav: false,
				suggestOnCategories: [],
				suggestOnNewTagPage: false,
				functions: [],
			},
			{
				name: 'Bilförsäkring',
				id: id(),
				component: null,
				icon: försäkring,
				inBottomNav: false,
				suggestOnCategories: [],
				suggestOnNewTagPage: false,
				functions: [],
			},
			{
				name: 'Barnförsäkring',
				id: id(),
				component: null,
				icon: försäkring,
				inBottomNav: false,
				suggestOnCategories: [],
				suggestOnNewTagPage: false,
				functions: [],
			},
		],
	},
	{
		name: 'Trygghet i hemmet',
		id: id(),
		component: null,
		icon: försäkring,
		inBottomNav: false,
		suggestOnCategories: [],
		suggestOnNewTagPage: false,
		functions: [
			{
				name: 'Larm',
				id: id(),
				component: null,
				icon: försäkring,
				inBottomNav: false,
				suggestOnCategories: [],
				suggestOnNewTagPage: false,
				functions: [],
			},
			{
				name: 'Vattenvarnare',
				id: id(),
				component: null,
				icon: försäkring,
				inBottomNav: false,
				suggestOnCategories: [],
				suggestOnNewTagPage: false,
				functions: [],
			},
			{
				name: 'Smarta prylar',
				id: id(),
				component: null,
				icon: försäkring,
				inBottomNav: false,
				suggestOnCategories: [],
				suggestOnNewTagPage: false,
				functions: [],
			},
		],
	},
	{
		name: 'Övriga tjänster',
		id: id(),
		component: null,
		icon: försäkring,
		inBottomNav: false,
		suggestOnCategories: [],
		suggestOnNewTagPage: false,
		functions: [
			{
				name: 'TBD',
				id: id(),
				component: null,
				icon: försäkring,
				inBottomNav: false,
				suggestOnCategories: [],
				suggestOnNewTagPage: false,
				functions: [],
			},
		],
	},
	{
		name: 'Kundservice och kontakt',
		component: null,
		icon: försäkring,
		inBottomNav: false,
		suggestOnCategories: [],
		suggestOnNewTagPage: false,
		functions: [],
	},
]);

export const labels = writable({
	tags: ['Min badrumsrenovering', 'Golf', 'Englandsresan'],
	categories: [
		{
			name: 'Hem',
			subcategories: [
				{ name: 'Hyra' },
				{ name: 'El, gas och värme' },
				{ name: 'TV, telefon och internet' },
			],
		},
		{
			name: 'Bil och transport',
			subcategories: [
				{ name: 'Bränsle' },
				{ name: 'Kollektivtrafik och pendling' },
				{ name: 'Taxi' },
				{ name: 'Service och reparation' },
			],
		},
		{
			name: 'Barn',
			subcategories: [
				{ name: 'Barnvakt' },
				{ name: 'Barns utbildning' },
				{ name: 'Barn och babyprodukter' },
			],
		},
		{ name: 'Utbildning', subcategories: [{ name: 'Utbildning' }] },
		{ name: 'Böter, förseningsavgifter och lån' },
		{
			name: 'Mat',
			subcategories: [
				{ name: 'Snabbmat' },
				{ name: 'Livsmedel' },
				{ name: 'Kiosk och närbutik' },
				{ name: 'Bageri och tårta' },
			],
		},
		{ name: 'Hälsa och skönhet', subcategories: [{ name: 'Apotek' }] },
		{
			name: 'Försäkring',
			subcategories: [
				{ name: 'Hemförsäkring' },
				{ name: 'Bil- och fordonsförsäkring' },
				{ name: 'Barnförsäkring' },
			],
		},
		{
			name: 'Fritid och nöjen',
			subcategories: [
				{ name: 'Restaurang' },
				{ name: 'Fika' },
				{ name: 'Bar och nattklubb' },
				{ name: 'Film, böcker och musik' },
				{ name: 'Sport och träning' },
				{ name: 'Fester och presenter' },
				{ name: 'Husdjur' },
				{ name: 'Kultur, bio och konserter' },
				{ name: 'Fritid och nöjen - övrigt' },
			],
		},
		{
			name: 'Shopping och tjänster',
			subcategories: [
				{ name: 'Kläder och skor' },
				{ name: 'Kemtvätt och skrädderi' },
				{ name: 'Frisör' },
				{ name: 'Övrig shopping' },
			],
		},
		{ name: 'Okategoriserade utgifter' },
		{ name: 'Semester och resor' },
		{ name: 'Sparande och investeringar' },
		{ name: 'Inkomst', subcategories: [{ name: 'Lön' }] },
		{ name: 'Exkludera' },
		{
			name: 'Övrigt',
			subcategories: [
				{ name: 'Avgifter' },
				{ name: 'Kontantuttag' },
				{ name: 'Kreditkortsbetalning' },
			],
		},
	],
});

import dummyTransactions from './transactions/cleanedTransactions.json';
export const transactions = writable(dummyTransactions);

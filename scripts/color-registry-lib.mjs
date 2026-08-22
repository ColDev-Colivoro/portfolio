import { createHash } from 'node:crypto';
import path from 'node:path';

export const COLOR_REGISTRY_BASELINE_SHA256 = '6802f6e5b46f738597265aeb7a310c8a52f642a76c27d3b9980ccb8f0100c7a2';

export const COLOR_LAYERS = Object.freeze({
	FOUNDATION: 'foundation/global-ui',
	BRAND_ACTION: 'brand/action',
	ROUTE_ATMOSPHERE: 'route-atmosphere',
	WARM_CONNECTOR: 'warm-connector',
	SEMANTIC_STATUS_DATA: 'semantic/status/data',
	PRODUCT_SVG: 'product/SVG',
});

export const INVENTORY_CATEGORIES = Object.freeze([
	'hex',
	'hslFunctions',
	'hslTokens',
	'rgbFunctions',
	'rgbTuples',
	'tailwind',
	'alpha',
	'gradients',
	'shadows',
	'inline',
	'dataRoles',
]);

const ROUTE_TUPLES = new Map([
	['51, 245, 52', { route: '/', role: 'route.home.green' }],
	['34, 211, 238', { route: '/proyectos', role: 'route.projects.cyan' }],
	['255, 235, 59', { route: '/about', role: 'route.about.gold' }],
	['255, 122, 89', { route: '/contact', role: 'protected.route.contact-coral' }],
]);

const compact = (value) => value.replace(/\s+/g, ' ').trim();
export const normalizeColorForComparison = (value) => compact(value).toLowerCase();

const digest = (value) => createHash('sha256').update(value).digest('hex').slice(0, 16);
export const registryId = (category, value, layer) => `${category}:${digest(`${category}\0${value}\0${layer}`)}`;

export const formatForInventoryEntry = (category, value) => {
	switch (category) {
		case 'hex': return 'hex';
		case 'hslFunctions': return /^hsla/i.test(value) || /\//.test(value) ? 'hsla' : 'hsl';
		case 'hslTokens': return 'hsl-token';
		case 'rgbFunctions': return /^rgba/i.test(value) || /\//.test(value) ? 'rgba' : 'rgb';
		case 'rgbTuples': return 'rgb-tuple';
		case 'tailwind': return 'tailwind';
		case 'alpha': return 'alpha';
		case 'gradients': return 'gradient';
		case 'shadows': return 'shadow';
		case 'inline': return 'inline';
		case 'dataRoles': return 'data-role';
		default: throw new Error(`Unsupported color inventory category: ${category}`);
	}
};

const alphaFromFunction = (value) => {
	const body = value.slice(value.indexOf('(') + 1, value.lastIndexOf(')'));
	if (body.includes('/')) return compact(body.slice(body.lastIndexOf('/') + 1));
	const lastComma = body.lastIndexOf(',');
	return lastComma >= 0 ? compact(body.slice(lastComma + 1)) : null;
};

export const alphaForInventoryEntry = (category, value) => {
	if (category === 'hex' && [5, 9].includes(value.length)) return value.length === 5 ? value.slice(-1) : value.slice(-2);
	if ((category === 'rgbFunctions' && /^rgba/i.test(value)) || (category === 'hslFunctions' && /^hsla/i.test(value))) return alphaFromFunction(value);
	if ((category === 'rgbFunctions' || category === 'hslFunctions') && value.includes('/')) return alphaFromFunction(value);
	if (category === 'tailwind' && value.includes('/')) return value.slice(value.lastIndexOf('/') + 1);
	if (category !== 'alpha') return null;
	if (/^opacity:/i.test(value)) return compact(value.slice(value.indexOf(':') + 1));
	if (/^(?:rgba|hsla|rgb|hsl)\s*\(/i.test(value)) return alphaFromFunction(value);
	if (/^#[0-9a-f]{4}$/i.test(value)) return value.slice(-1);
	if (/^#[0-9a-f]{8}$/i.test(value)) return value.slice(-2);
	if (value.includes('/')) return value.slice(value.lastIndexOf('/') + 1);
	return 'embedded';
};

const routeForFile = (file) => {
	if (/demos\/sgc|SGC/i.test(file)) return '/demo/sgc';
	if (/Projects|project|public\/images/i.test(file)) return '/proyectos';
	if (/About|Profile|Skills|Certificates/i.test(file)) return '/about';
	if (/Contact/i.test(file)) return '/contact';
	if (/Home|Hero/i.test(file)) return '/';
	return 'global';
};

const componentForFile = (file) => {
	if (file === 'src/index.css') return 'route-shell';
	if (file === 'src/styles/global.css') return 'global-effects';
	if (file === 'tailwind.config.js') return 'tailwind-theme';
	if (file === 'index.html') return 'document-shell';
	return path.posix.basename(file, path.posix.extname(file));
};

const isRouteExpression = (value) => /route-(?:current|home|projects|about|contact)-rgb/i.test(value)
	|| ROUTE_TUPLES.has(compact(value));

const isWarmExpression = (value) => /255\s*,\s*106\s*,\s*0/.test(value);

const layerForOccurrence = (category, value, occurrence) => {
	const file = occurrence.file;
	const normalized = normalizeColorForComparison(value);

	if (ROUTE_TUPLES.has(compact(value)) || isRouteExpression(value)) return COLOR_LAYERS.ROUTE_ATMOSPHERE;
	if (/\.svg$/i.test(file)) return COLOR_LAYERS.PRODUCT_SVG;
	if (/src\/components\/demos|sgcMockData/i.test(file) || category === 'dataRoles') return COLOR_LAYERS.SEMANTIC_STATUS_DATA;
	if (normalized === '357 72% 43%' || /destructive|(?:^|-)red(?:-|$)/i.test(value)) return COLOR_LAYERS.SEMANTIC_STATUS_DATA;
	if (isWarmExpression(value) && /src\/styles\/global\.css/i.test(file)) return COLOR_LAYERS.WARM_CONNECTOR;
	if (normalized === '120 91% 58%' || /(?:primary|accent|ring)/i.test(value)) return COLOR_LAYERS.BRAND_ACTION;
	return COLOR_LAYERS.FOUNDATION;
};

const sourceFromOccurrence = (occurrence, value) => {
	const routeTuple = ROUTE_TUPLES.get(compact(value));
	return {
		file: occurrence.file,
		route: routeTuple?.route ?? routeForFile(occurrence.file),
		component: componentForFile(occurrence.file),
	};
};

const roleForEntry = (category, value, layer) => {
	const normalized = normalizeColorForComparison(value);
	if (category === 'rgbTuples' && ROUTE_TUPLES.has(compact(value))) return ROUTE_TUPLES.get(compact(value)).role;
	if (category === 'hslTokens' && normalized === '357 72% 43%') return 'protected.semantic.destructive';
	if (category === 'hex' && normalized === '#f97316') return 'protected.product.nutriscoc-orange';
	if (category === 'hex' && normalized === '#c1121f') return 'protected.product.coldevpos-red';
	if (category === 'hex' && normalized === '#ef4444') return 'protected.semantic.dashboard-red';
	return `${layer}.${category}`;
};

const documentedProtectedEntries = () => [
	{
		id: 'documented:protected-brand-coldev-orange',
		value: '#ff5722',
		format: 'hex',
		alpha: null,
		layer: COLOR_LAYERS.BRAND_ACTION,
		sources: [{ file: '../AGENTS.md', route: 'global', component: 'portfolio-contract' }],
		role: 'protected.brand.coldev-orange',
		preserveExact: true,
	},
	{
		id: 'documented:protected-warm-connector-orange',
		value: '#ff6a00',
		format: 'hex',
		alpha: null,
		layer: COLOR_LAYERS.WARM_CONNECTOR,
		sources: [{ file: 'engram:sdd/portfolio-coldev-first-expansion/spec#1757', route: 'global', component: 'approved-color-taxonomy' }],
		role: 'protected.warm-connector.orange',
		preserveExact: true,
	},
];

export const buildColorRegistry = (exactInventory) => {
	const entries = [];

	for (const category of INVENTORY_CATEGORIES) {
		for (const inventoryEntry of exactInventory.values[category] ?? []) {
			const occurrencesByLayer = new Map();
			for (const occurrence of inventoryEntry.occurrences) {
				const layer = layerForOccurrence(category, inventoryEntry.value, occurrence);
				if (!occurrencesByLayer.has(layer)) occurrencesByLayer.set(layer, []);
				occurrencesByLayer.get(layer).push(occurrence);
			}

			for (const [layer, occurrences] of occurrencesByLayer) {
				entries.push({
					id: registryId(category, inventoryEntry.value, layer),
					value: inventoryEntry.value,
					format: formatForInventoryEntry(category, inventoryEntry.value),
					alpha: alphaForInventoryEntry(category, inventoryEntry.value),
					layer,
					sources: occurrences.map((occurrence) => sourceFromOccurrence(occurrence, inventoryEntry.value)),
					role: roleForEntry(category, inventoryEntry.value, layer),
					preserveExact: true,
				});
			}
		}
	}

	return [...entries, ...documentedProtectedEntries()].sort((a, b) => a.id.localeCompare(b.id));
};

export const renderColorRegistryModule = (entries) => `// Generated from the immutable P1 chromatic baseline.\n// Additive metadata only: never import this module to rewrite product literals.\n\nexport const COLOR_REGISTRY_BASELINE_SHA256 = '${COLOR_REGISTRY_BASELINE_SHA256}';\n\nexport const COLOR_LAYERS = Object.freeze(${JSON.stringify(COLOR_LAYERS, null, 2)});\n\nconst entries = ${JSON.stringify(entries, null, 2)};\n\nconst freezeEntry = (entry) => Object.freeze({\n\t...entry,\n\tsources: Object.freeze(entry.sources.map((source) => Object.freeze(source))),\n});\n\nexport const colorRegistry = Object.freeze(entries.map(freezeEntry));\n\nexport default colorRegistry;\n`;

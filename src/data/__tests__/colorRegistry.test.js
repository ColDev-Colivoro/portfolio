import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';

import { describe, expect, it } from 'vitest';

import {
	COLOR_LAYERS,
	COLOR_REGISTRY_BASELINE_SHA256,
	colorRegistry,
} from '../colorRegistry.js';

const REQUIRED_FIELDS = [
	'alpha',
	'format',
	'id',
	'layer',
	'preserveExact',
	'role',
	'sources',
	'value',
];

const runtimeHexEntries = () => colorRegistry.filter(({ id }) => id.startsWith('hex:'));

describe('colorRegistry aditivo', () => {
	it('mantiene el schema estricto, ids unicos y procedencia verificable', () => {
		expect(colorRegistry.length).toBeGreaterThan(61);
		expect(new Set(colorRegistry.map(({ id }) => id)).size).toBe(colorRegistry.length);

		for (const entry of colorRegistry) {
			expect(Object.keys(entry).sort()).toEqual(REQUIRED_FIELDS);
			expect(entry.preserveExact).toBe(true);
			expect(typeof entry.value).toBe('string');
			expect(entry.value.length).toBeGreaterThan(0);
			expect(entry.sources.length).toBeGreaterThan(0);
			for (const source of entry.sources) {
				expect(source).toEqual({
					file: expect.any(String),
					route: expect.any(String),
					component: expect.any(String),
				});
			}
		}
	});

	it('usa exactamente las seis capas aprobadas y todas tienen entradas', () => {
		const approvedLayers = [
			'foundation/global-ui',
			'brand/action',
			'route-atmosphere',
			'warm-connector',
			'semantic/status/data',
			'product/SVG',
		];

		expect(Object.values(COLOR_LAYERS).sort()).toEqual(approvedLayers.sort());
		expect(new Set(colorRegistry.map(({ layer }) => layer))).toEqual(new Set(approvedLayers));
	});

	it('cataloga 61 hex visuales y conserva las 62 representaciones exactas', () => {
		const hexEntries = runtimeHexEntries();
		const rawRepresentations = new Set(hexEntries.map(({ value }) => value));
		const visualValues = new Set(hexEntries.map(({ value }) => value.toLowerCase()));

		expect(rawRepresentations.size).toBe(62);
		expect(visualValues.size).toBe(61);
		expect(rawRepresentations.has('#F59E0B')).toBe(true);
		expect(rawRepresentations.has('#f59e0b')).toBe(true);
	});

	it('no fusiona los tonos protegidos y conserva el coral Contacto como tuple RGB', () => {
		const byRole = new Map(colorRegistry.map((entry) => [entry.role, entry]));
		const protectedEntries = [
			byRole.get('protected.brand.coldev-orange'),
			byRole.get('protected.warm-connector.orange'),
			byRole.get('protected.route.contact-coral'),
			byRole.get('protected.product.nutriscoc-orange'),
			byRole.get('protected.product.coldevpos-red'),
			byRole.get('protected.semantic.destructive'),
			byRole.get('protected.semantic.dashboard-red'),
		];

		expect(protectedEntries.every(Boolean)).toBe(true);
		expect(new Set(protectedEntries.map(({ id }) => id)).size).toBe(protectedEntries.length);
		expect(byRole.get('protected.brand.coldev-orange')).toMatchObject({ value: '#ff5722', format: 'hex' });
		expect(byRole.get('protected.warm-connector.orange')).toMatchObject({ value: '#ff6a00', layer: 'warm-connector' });
		expect(byRole.get('protected.route.contact-coral')).toMatchObject({
			value: '255, 122, 89',
			format: 'rgb-tuple',
			layer: 'route-atmosphere',
		});
		expect(colorRegistry.some(({ value }) => value === '#ff7a59')).toBe(false);
		expect(byRole.get('protected.product.nutriscoc-orange').value.toLowerCase()).toBe('#f97316');
		expect(byRole.get('protected.product.coldevpos-red').value.toLowerCase()).toBe('#c1121f');
		expect(byRole.get('protected.semantic.destructive')).toMatchObject({ value: '357 72% 43%', format: 'hsl-token' });
		expect(byRole.get('protected.semantic.dashboard-red').value.toLowerCase()).toBe('#ef4444');
	});

	it('cubre HSL, RGB(A), alpha, Tailwind, inline, gradientes y sombras sin convertirlos', () => {
		const formats = new Set(colorRegistry.map(({ format }) => format));
		for (const format of ['hsl', 'hsl-token', 'rgba', 'rgb-tuple', 'alpha', 'tailwind', 'inline', 'gradient', 'shadow']) {
			expect(formats.has(format)).toBe(true);
		}
		expect(formats.has('rgb') || formats.has('rgb-tuple')).toBe(true);

		expect(colorRegistry.some(({ format, value, alpha }) => format === 'rgba' && value.includes('0.19') && alpha === '0.19')).toBe(true);
		expect(colorRegistry.some(({ format, value, alpha }) => format === 'alpha' && value === 'bg-accent/20' && alpha === '20')).toBe(true);
		expect(colorRegistry.some(({ format, value }) => format === 'gradient' && value.startsWith('radial-gradient('))).toBe(true);
		expect(colorRegistry.some(({ format, value }) => format === 'shadow' && value.includes('rgba('))).toBe(true);
		expect(colorRegistry.some(({ format, value }) => format === 'shadow' && value.includes('\n    '))).toBe(true);
	});

	it('ancla el registro al SHA inmutable del inventario P1', async () => {
		const baseline = await readFile('tests/chromatic/baseline.v1.json');
		const sha256 = createHash('sha256').update(baseline).digest('hex');

		expect(COLOR_REGISTRY_BASELINE_SHA256).toBe('6802f6e5b46f738597265aeb7a310c8a52f642a76c27d3b9980ccb8f0100c7a2');
		expect(sha256).toBe(COLOR_REGISTRY_BASELINE_SHA256);
	});
});

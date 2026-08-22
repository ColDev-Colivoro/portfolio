import { describe, expect, it } from 'vitest';

import { scanColorInventory } from '../audit-colors.mjs';

describe('color baseline scanner', () => {
	it('encuentra el baseline cromatico completo sin leer artefactos generados', async () => {
		const inventory = await scanColorInventory(process.cwd());

		expect(inventory.summary.uniqueHex).toBe(61);
		expect(inventory.coverage).toMatchObject({
			css: true,
			jsxDom: true,
			svg: true,
			tailwind: true,
			inline: true,
			data: true,
		});
		expect(inventory.summary).toMatchObject({
			hslTokens: expect.any(Number),
			rgbFunctions: expect.any(Number),
			alphaExpressions: expect.any(Number),
			gradients: expect.any(Number),
			shadows: expect.any(Number),
		});
		expect(inventory.summary.hslTokens).toBeGreaterThan(0);
		expect(inventory.summary.rgbFunctions).toBeGreaterThan(0);
		expect(inventory.summary.alphaExpressions).toBeGreaterThan(0);
		expect(inventory.summary.gradients).toBeGreaterThan(0);
		expect(inventory.summary.shadows).toBeGreaterThan(0);
	});

	it('preserva como valores distintos los tonos protegidos presentes en runtime', async () => {
		const inventory = await scanColorInventory(process.cwd());
		const values = new Set(inventory.values.hex.map(({ value }) => value));

		for (const protectedValue of ['#ff6a00', '#f97316', '#c1121f', '#ef4444']) {
			expect(values.has(protectedValue)).toBe(true);
		}
		expect(inventory.values.rgbTuples.some(({ value }) => value.replace(/\s/g, '') === '255,122,89')).toBe(true);
	});
});

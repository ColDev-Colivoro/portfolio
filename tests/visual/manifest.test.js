import { describe, expect, it } from 'vitest';

import { VISUAL_BASELINE_CASES, VISUAL_VIEWPORTS } from './manifest.js';

describe('visual baseline manifest', () => {
	it('define exactamente 22 estados reproducibles con ids unicos', () => {
		expect(VISUAL_BASELINE_CASES).toHaveLength(22);
		expect(new Set(VISUAL_BASELINE_CASES.map(({ id }) => id)).size).toBe(22);
	});

	it('cubre las rutas publicas, SGC y ambos viewports', () => {
		const paths = new Set(VISUAL_BASELINE_CASES.map(({ path }) => path));
		const viewports = new Set(VISUAL_BASELINE_CASES.map(({ viewport }) => viewport));

		expect(paths).toEqual(new Set(['/', '/proyectos', '/about', '/contact', '/demo/sgc']));
		expect(viewports).toEqual(new Set(Object.keys(VISUAL_VIEWPORTS)));
	});

	it('declara setup y captura deterministas para cada caso', () => {
		for (const baselineCase of VISUAL_BASELINE_CASES) {
			expect(baselineCase.id).toMatch(/^vis-\d{2}$/);
			expect(VISUAL_VIEWPORTS[baselineCase.viewport]).toMatchObject({
				width: expect.any(Number),
				height: expect.any(Number),
			});
			expect(baselineCase.state).toMatch(/^[a-z0-9-]+$/);
			expect(['viewport', 'fullPage', 'locator']).toContain(baselineCase.capture);
			expect(baselineCase.screenshot).toMatch(/\.png$/);
		}
	});
});

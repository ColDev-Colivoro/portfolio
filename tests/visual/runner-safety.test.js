import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const visualSpec = readFileSync(resolve(process.cwd(), 'tests/visual/baseline.spec.js'), 'utf8');
const packageJson = JSON.parse(readFileSync(resolve(process.cwd(), 'package.json'), 'utf8'));

describe('seguridad del runner visual', () => {
	it('captura por defecto fuera de la baseline P1 versionada', () => {
		expect(visualSpec).toContain("const VISUAL_OUTPUT_DIR = 'test-results/visual/current';");
		expect(visualSpec).not.toContain('path: `tests/visual/baseline/');
	});

	it('no actualiza snapshots implicitamente desde npm', () => {
		expect(packageJson.scripts['test:visual']).not.toContain('update-snapshots');
		expect(packageJson.scripts['test:visual']).not.toContain('tests/visual/baseline');
	});
});

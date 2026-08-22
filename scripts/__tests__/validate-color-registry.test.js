import { createHash } from 'node:crypto';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

import { scanColorInventory, scanExactColorInventory } from '../audit-colors.mjs';
import {
	compareColorState,
	validateColorRegistry,
} from '../validate-color-registry.mjs';

const clone = (value) => structuredClone(value);
const sha256 = (buffer) => createHash('sha256').update(buffer).digest('hex');

describe('validador cromatico read-only', () => {
	it('aprueba el estado actual contra el baseline y el registro exacto', async () => {
		const result = await validateColorRegistry({ rootDir: process.cwd() });

		expect(result.ok).toBe(true);
		expect(result.issues).toEqual([]);
		expect(result.summary).toMatchObject({
			baselineHexVisual: 61,
			currentHexVisual: 61,
			currentHexRepresentations: 62,
		});
	});

	it('falla ante un color perdido', async () => {
		const baseline = await scanColorInventory(process.cwd());
		const current = clone(baseline);
		current.values.hex.shift();

		const result = compareColorState({ baseline, current });

		expect(result.ok).toBe(false);
		expect(result.issues.some(({ type }) => type === 'lost')).toBe(true);
	});

	it('falla ante un color cambiado aunque conserve la misma identidad normalizada', async () => {
		const baseline = await scanColorInventory(process.cwd());
		const current = clone(baseline);
		current.values.hex[0].occurrences.pop();

		const result = compareColorState({ baseline, current });

		expect(result.ok).toBe(false);
		expect(result.issues.some(({ type }) => type === 'changed')).toBe(true);
	});

	it('falla ante un color nuevo no catalogado', async () => {
		const baseline = await scanColorInventory(process.cwd());
		const current = clone(baseline);
		current.values.hex.push({
			value: '#123abc',
			occurrences: [{ file: 'src/example.jsx', line: 1, column: 1, kind: 'jsxDom' }],
		});

		const result = compareColorState({ baseline, current });

		expect(result.ok).toBe(false);
		expect(result.issues.some(({ type, value }) => type === 'uncatalogued' && value === '#123abc')).toBe(true);
	});

	it('detecta cambios de casing o representacion cruda sin normalizarlos', async () => {
		const baseline = await scanColorInventory(process.cwd());
		const exactCurrent = await scanExactColorInventory(process.cwd());
		const current = clone(baseline);
		const mutatedExact = clone(exactCurrent);
		const uppercase = mutatedExact.values.hex.find(({ value }) => value === '#F59E0B');
		uppercase.value = '#f59E0B';

		const result = compareColorState({ baseline, current, exactCurrent: mutatedExact });

		expect(result.ok).toBe(false);
		expect(result.issues.some(({ type, value }) => type === 'changed' && value === '#f59E0B')).toBe(true);
	});

	it('detecta si una sombra multilineal se aplana aunque el valor normalizado coincida', async () => {
		const baseline = await scanColorInventory(process.cwd());
		const exactCurrent = await scanExactColorInventory(process.cwd());
		const mutatedExact = clone(exactCurrent);
		const multilineShadow = mutatedExact.values.shadows.find(({ value }) => value.includes('\n    '));
		multilineShadow.value = multilineShadow.value.replace(/\s+/g, ' ').trim();

		const result = compareColorState({ baseline, current: clone(baseline), exactCurrent: mutatedExact });

		expect(result.ok).toBe(false);
		expect(result.issues.some(({ type, category }) => type === 'changed' && category === 'shadows')).toBe(true);
	});

	it('no reescribe ni el baseline ni una fuente al validar', async () => {
		const baselinePath = 'tests/chromatic/baseline.v1.json';
		const sourcePath = 'src/index.css';
		const beforeBaseline = await readFile(baselinePath);
		const beforeSource = await readFile(sourcePath);

		await validateColorRegistry({ rootDir: process.cwd() });

		const afterBaseline = await readFile(baselinePath);
		const afterSource = await readFile(sourcePath);
		expect(sha256(afterBaseline)).toBe(sha256(beforeBaseline));
		expect(sha256(afterSource)).toBe(sha256(beforeSource));
	});

	it('falla si cambia la integridad byte a byte del baseline', async () => {
		const temporaryDirectory = await mkdtemp(path.join(tmpdir(), 'portfolio-color-baseline-'));
		const alteredBaselinePath = path.join(temporaryDirectory, 'baseline.v1.json');
		const baseline = await readFile('tests/chromatic/baseline.v1.json', 'utf8');
		await writeFile(alteredBaselinePath, `${baseline}\n`, 'utf8');

		try {
			const result = await validateColorRegistry({
				rootDir: process.cwd(),
				baselinePath: alteredBaselinePath,
			});
			expect(result.ok).toBe(false);
			expect(result.issues.some(({ type }) => type === 'baseline-sha-changed')).toBe(true);
		} finally {
			await rm(temporaryDirectory, { recursive: true, force: true });
		}
	});
});

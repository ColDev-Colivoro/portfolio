import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
	COLOR_REGISTRY_BASELINE_SHA256,
	colorRegistry,
} from '../src/data/colorRegistry.js';
import { scanColorInventory, scanExactColorInventory } from './audit-colors.mjs';
import {
	INVENTORY_CATEGORIES,
	normalizeColorForComparison,
} from './color-registry-lib.mjs';

const occurrenceSignature = (occurrences) => occurrences
	.map(({ file, kind }) => `${file}\0${kind}`)
	.sort()
	.join('\n');

const entriesByValue = (inventory, category) => new Map(
	(inventory.values[category] ?? []).map((entry) => [entry.value, entry]),
);

const registryRuntimeEntries = () => colorRegistry.filter(({ id }) => !id.startsWith('documented:'));

export const compareColorState = ({ baseline, current, exactCurrent = null }) => {
	const issues = [];

	for (const category of INVENTORY_CATEGORIES) {
		const expected = entriesByValue(baseline, category);
		const actual = entriesByValue(current, category);

		for (const [value, expectedEntry] of expected) {
			const actualEntry = actual.get(value);
			if (!actualEntry) {
				issues.push({ type: 'lost', category, value });
				continue;
			}
			if (occurrenceSignature(actualEntry.occurrences) !== occurrenceSignature(expectedEntry.occurrences)) {
				issues.push({ type: 'changed', category, value, detail: 'source occurrence set changed' });
			}
		}

		for (const value of actual.keys()) {
			if (!expected.has(value)) issues.push({ type: 'uncatalogued', category, value });
		}
	}

	if (exactCurrent) {
		const runtimeRegistry = registryRuntimeEntries();
		for (const category of INVENTORY_CATEGORIES) {
			const exactEntries = exactCurrent.values[category] ?? [];
			const exactByValue = new Map(exactEntries.map((entry) => [entry.value, entry]));
			const registered = runtimeRegistry.filter(({ id }) => id.startsWith(`${category}:`));
			const registeredByValue = new Map();
			for (const entry of registered) {
				if (!registeredByValue.has(entry.value)) registeredByValue.set(entry.value, []);
				registeredByValue.get(entry.value).push(entry);
			}

			for (const exactEntry of exactEntries) {
				const registryEntries = registeredByValue.get(exactEntry.value);
				if (!registryEntries) {
					const normalizedWasKnown = (baseline.values[category] ?? [])
						.some(({ value }) => value === normalizeColorForComparison(exactEntry.value));
					issues.push({
						type: normalizedWasKnown ? 'changed' : 'uncatalogued',
						category,
						value: exactEntry.value,
						detail: 'exact representation is not registered',
					});
					continue;
				}

				const registeredFiles = registryEntries.flatMap(({ sources }) => sources).map(({ file }) => file).sort().join('\n');
				const exactFiles = exactEntry.occurrences.map(({ file }) => file).sort().join('\n');
				if (registeredFiles !== exactFiles) {
					issues.push({ type: 'changed', category, value: exactEntry.value, detail: 'exact source occurrence set changed' });
				}
			}

			for (const [value, registryEntries] of registeredByValue) {
				const exactEntry = exactByValue.get(value);
				if (!exactEntry) {
					issues.push({ type: 'changed', category, value, detail: 'registered exact representation was lost' });
					continue;
				}
				const registeredFiles = registryEntries.flatMap(({ sources }) => sources).map(({ file }) => file).sort().join('\n');
				const exactFiles = exactEntry.occurrences.map(({ file }) => file).sort().join('\n');
				if (registeredFiles !== exactFiles) issues.push({ type: 'changed', category, value, detail: 'registered exact occurrence count changed' });
			}
		}
	}

	const deduplicated = [...new Map(issues.map((issue) => [JSON.stringify(issue), issue])).values()];
	return { ok: deduplicated.length === 0, issues: deduplicated };
};

export const validateColorRegistry = async ({ rootDir = process.cwd(), baselinePath = null } = {}) => {
	const resolvedBaseline = baselinePath ?? path.join(rootDir, 'tests/chromatic/baseline.v1.json');
	const baselineBuffer = await readFile(resolvedBaseline);
	const baselineSha256 = createHash('sha256').update(baselineBuffer).digest('hex');
	const baseline = JSON.parse(baselineBuffer.toString('utf8'));
	const [current, exactCurrent] = await Promise.all([
		scanColorInventory(rootDir),
		scanExactColorInventory(rootDir),
	]);
	const comparison = compareColorState({ baseline, current, exactCurrent });
	const issues = [...comparison.issues];
	if (baselineSha256 !== COLOR_REGISTRY_BASELINE_SHA256) {
		issues.unshift({
			type: 'baseline-sha-changed',
			value: baselineSha256,
			expected: COLOR_REGISTRY_BASELINE_SHA256,
		});
	}

	return {
		ok: issues.length === 0,
		issues,
		baselineSha256,
		summary: {
			baselineHexVisual: baseline.values.hex.length,
			currentHexVisual: current.values.hex.length,
			currentHexRepresentations: exactCurrent.values.hex.length,
			registryEntries: colorRegistry.length,
		},
	};
};

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
	const result = await validateColorRegistry({ rootDir: process.cwd() });
	console.log(JSON.stringify(result, null, 2));
	if (!result.ok) process.exitCode = 1;
}

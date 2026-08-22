import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { scanExactColorInventory } from './audit-colors.mjs';
import {
	buildColorRegistry,
	COLOR_REGISTRY_BASELINE_SHA256,
	renderColorRegistryModule,
} from './color-registry-lib.mjs';

export const generateColorRegistry = async (rootDir) => {
	const baselinePath = path.join(rootDir, 'tests/chromatic/baseline.v1.json');
	const outputPath = path.join(rootDir, 'src/data/colorRegistry.js');
	const baselineBuffer = await readFile(baselinePath);
	const baselineSha = createHash('sha256').update(baselineBuffer).digest('hex');
	if (baselineSha !== COLOR_REGISTRY_BASELINE_SHA256) {
		throw new Error(`Refusing to generate registry: baseline SHA changed (${baselineSha}).`);
	}

	const exactInventory = await scanExactColorInventory(rootDir);
	const entries = buildColorRegistry(exactInventory);
	await writeFile(outputPath, renderColorRegistryModule(entries), 'utf8');
	return {
		outputPath,
		entries: entries.length,
		hexRepresentations: new Set(exactInventory.values.hex.map(({ value }) => value)).size,
		hexVisual: new Set(exactInventory.values.hex.map(({ comparisonValue }) => comparisonValue)).size,
	};
};

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) console.log(JSON.stringify(await generateColorRegistry(process.cwd()), null, 2));

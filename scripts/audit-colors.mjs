import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SCAN_ENTRIES = ['src', 'public', 'netlify', 'index.html', 'tailwind.config.js'];
const SOURCE_EXTENSIONS = new Set(['.css', '.html', '.js', '.jsx', '.json', '.svg', '.ts', '.tsx']);
const EXCLUDED_PATH = /(?:^|\/)(?:__tests__|__snapshots__|test-results|playwright-report)(?:\/|$)|\.(?:spec|test)\.[cm]?[jt]sx?$/i;
const REGISTRY_METADATA_PATH = /^src\/data\/colorRegistry\.js$/i;
const HEX_RE = /(?<![\w-])#(?:[0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{4}|[0-9a-f]{3})(?![0-9a-f])/gi;
const TAILWIND_RE = /(?<![\w-])(?:(?:[a-z0-9-]+:)*)(?:bg|text|border|from|via|to|ring|outline|fill|stroke|divide|decoration|caret|accent)-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|black|white|transparent|current|background|foreground|card|popover|primary|secondary|muted|accent|destructive|input)(?:-(?:50|100|200|300|400|500|600|700|800|900|950))?(?:\/(?:\[[^\]]+\]|[\d.]+))?/gi;
const DATA_COLOR_RE = /\b(?:color|tone|statusColor|phaseColor|accessColor)\s*:\s*['"`]([a-z][a-z0-9-]*)['"`]/gi;

const toPosix = (value) => value.split(path.sep).join('/');
const compact = (value) => value.replace(/\s+/g, ' ').trim();

const sourceKind = (relativePath) => {
	if (relativePath.endsWith('.css')) return 'css';
	if (relativePath.endsWith('.svg')) return 'svg';
	if (relativePath.startsWith('src/data/')) return 'data';
	if (/\.[jt]sx$/.test(relativePath)) return 'jsxDom';
	return 'source';
};

const collectFiles = async (rootDir) => {
	const files = [];
	const visit = async (absolutePath) => {
		const entries = await readdir(absolutePath, { withFileTypes: true });
		for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
			const child = path.join(absolutePath, entry.name);
			if (entry.isDirectory()) await visit(child);
			else if (SOURCE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) files.push(child);
		}
	};

	for (const entry of SCAN_ENTRIES) {
		const absolutePath = path.join(rootDir, entry);
		try {
			const stats = await import('node:fs/promises').then(({ stat }) => stat(absolutePath));
			if (stats.isDirectory()) await visit(absolutePath);
			else files.push(absolutePath);
		} catch (error) {
			if (error.code !== 'ENOENT') throw error;
		}
	}

	return files
		.map((absolutePath) => ({ absolutePath, relativePath: toPosix(path.relative(rootDir, absolutePath)) }))
		.filter(({ relativePath }) => !EXCLUDED_PATH.test(relativePath) && !REGISTRY_METADATA_PATH.test(relativePath))
		.sort((a, b) => a.relativePath.localeCompare(b.relativePath));
};

const locate = (text, index) => {
	const prefix = text.slice(0, index);
	const lines = prefix.split('\n');
	return { line: lines.length, column: lines.at(-1).length + 1 };
};

const addMatch = (map, value, occurrence, preserveExact) => {
	const comparisonValue = compact(value).toLowerCase();
	const registryValue = preserveExact ? value : comparisonValue;
	if (!map.has(registryValue)) map.set(registryValue, { comparisonValue, occurrences: [] });
	map.get(registryValue).occurrences.push(occurrence);
};

const regexMatches = (text, regex) => {
	const matches = [];
	for (const match of text.matchAll(regex)) matches.push({ value: match[0], index: match.index });
	return matches;
};

const balancedFunctions = (text, names) => {
	const results = [];
	const startRe = new RegExp(`\\b(?:${names.join('|')})\\s*\\(`, 'gi');
	for (const start of text.matchAll(startRe)) {
		let depth = 0;
		let quote = null;
		let escaped = false;
		for (let cursor = start.index; cursor < text.length; cursor += 1) {
			const char = text[cursor];
			if (quote) {
				if (escaped) escaped = false;
				else if (char === '\\') escaped = true;
				else if (char === quote) quote = null;
				continue;
			}
			if (char === '"' || char === "'") quote = char;
			else if (char === '(') depth += 1;
			else if (char === ')') {
				depth -= 1;
				if (depth === 0) {
					results.push({ value: text.slice(start.index, cursor + 1), index: start.index });
					break;
				}
			}
		}
	}
	return results;
};

const entriesFrom = (map, preserveExact) => [...map.entries()]
	.map(([value, { comparisonValue, occurrences }]) => {
		const entry = {
			value,
			occurrences: occurrences.sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line || a.column - b.column),
		};
		if (preserveExact) entry.comparisonValue = comparisonValue;
		return entry;
	})
	.sort((a, b) => a.value.localeCompare(b.value));

const scanInventory = async (rootDir, { preserveExact = false } = {}) => {
	const maps = Object.fromEntries(['hex', 'hslFunctions', 'hslTokens', 'rgbFunctions', 'rgbTuples', 'tailwind', 'alpha', 'gradients', 'shadows', 'inline', 'dataRoles'].map((key) => [key, new Map()]));
	const files = [];
	const seenKinds = new Set();

	for (const { absolutePath, relativePath } of await collectFiles(rootDir)) {
		const text = await readFile(absolutePath, 'utf8');
		const kind = sourceKind(relativePath);
		const before = Object.values(maps).reduce((total, map) => total + [...map.values()].reduce((sum, entry) => sum + entry.occurrences.length, 0), 0);
		const record = (mapName, match, value = match.value) => {
			const position = locate(text, match.index);
			addMatch(maps[mapName], value, { file: relativePath, ...position, kind }, preserveExact);
			seenKinds.add(kind);
		};

		for (const match of regexMatches(text, HEX_RE)) {
			record('hex', match);
			if ([4, 8].includes(match.value.length - 1)) record('alpha', match);
		}
		for (const match of balancedFunctions(text, ['hsl', 'hsla'])) {
			record('hslFunctions', match);
			if (/hsla|\//i.test(match.value)) record('alpha', match);
		}
		for (const match of balancedFunctions(text, ['rgb', 'rgba'])) {
			record('rgbFunctions', match);
			if (/rgba|\//i.test(match.value)) record('alpha', match);
		}
		for (const match of balancedFunctions(text, ['linear-gradient', 'radial-gradient', 'conic-gradient'])) record('gradients', match);
		for (const match of balancedFunctions(text, ['drop-shadow'])) record('shadows', match);
		for (const match of regexMatches(text, TAILWIND_RE)) {
			record('tailwind', match);
			if (match.value.includes('/')) record('alpha', match);
		}

		if (kind === 'css') {
			const hslTokenRe = /--[\w-]+\s*:\s*(-?\d+(?:\.\d+)?(?:deg|rad|turn)?\s+\d+(?:\.\d+)?%\s+\d+(?:\.\d+)?%(?:\s*\/\s*[^;]+)?)\s*;/gi;
			for (const match of text.matchAll(hslTokenRe)) record('hslTokens', { value: match[1], index: match.index });
			const rgbTupleRe = /--[\w-]*rgb[\w-]*\s*:\s*(\d+(?:\.\d+)?\s*,\s*\d+(?:\.\d+)?\s*,\s*\d+(?:\.\d+)?)\s*;/gi;
			for (const match of text.matchAll(rgbTupleRe)) record('rgbTuples', { value: match[1], index: match.index });
			const shadowRe = /(?:box|text)-shadow\s*:\s*([^;}{]+)\s*;/gi;
			for (const match of text.matchAll(shadowRe)) record('shadows', { value: match[1], index: match.index });
			const opacityRe = /\bopacity\s*:\s*([^;}{]+)\s*;/gi;
			for (const match of text.matchAll(opacityRe)) record('alpha', { value: `opacity:${match[1]}`, index: match.index });
		}

		if (kind === 'data') {
			for (const match of text.matchAll(DATA_COLOR_RE)) record('dataRoles', { value: match[1], index: match.index });
		}

		const inlineStyleRe = /style\s*=\s*\{\{([\s\S]*?)\}\}/gi;
		for (const block of text.matchAll(inlineStyleRe)) {
			const tokens = [
				...regexMatches(block[1], HEX_RE),
				...balancedFunctions(block[1], ['hsl', 'hsla', 'rgb', 'rgba', 'linear-gradient', 'radial-gradient', 'conic-gradient']),
			];
			for (const token of tokens) record('inline', { value: token.value, index: block.index + token.index });
		}

		const after = Object.values(maps).reduce((total, map) => total + [...map.values()].reduce((sum, entry) => sum + entry.occurrences.length, 0), 0);
		files.push({
			path: relativePath,
			kind,
			sha256: createHash('sha256').update(text).digest('hex'),
			matches: after - before,
		});
	}

	const values = Object.fromEntries(Object.entries(maps).map(([key, map]) => [key, entriesFrom(map, preserveExact)]));
	const summary = {
		filesScanned: files.length,
		uniqueHex: values.hex.length,
		hslFunctions: values.hslFunctions.length,
		hslTokens: values.hslTokens.length,
		rgbFunctions: values.rgbFunctions.length,
		rgbTuples: values.rgbTuples.length,
		tailwindColors: values.tailwind.length,
		alphaExpressions: values.alpha.length,
		gradients: values.gradients.length,
		shadows: values.shadows.length,
		inlineColors: values.inline.length,
		dataColorRoles: values.dataRoles.length,
	};
	if (preserveExact) summary.uniqueHexVisual = new Set(values.hex.map(({ comparisonValue }) => comparisonValue)).size;

	return {
		schemaVersion: 1,
		scanEntries: SCAN_ENTRIES,
		summary,
		coverage: {
			css: seenKinds.has('css'),
			jsxDom: seenKinds.has('jsxDom'),
			svg: seenKinds.has('svg'),
			tailwind: values.tailwind.length > 0,
			inline: values.inline.length > 0,
			data: seenKinds.has('data') && values.dataRoles.length > 0,
		},
		files,
		values,
	};
};

export const scanColorInventory = (rootDir) => scanInventory(rootDir);
export const scanExactColorInventory = (rootDir) => scanInventory(rootDir, { preserveExact: true });

const parseArgs = (args) => {
	const options = { root: process.cwd(), output: null, expectHexCount: null };
	for (let index = 0; index < args.length; index += 1) {
		if (args[index] === '--root') options.root = path.resolve(args[++index]);
		else if (args[index] === '--output') options.output = path.resolve(args[++index]);
		else if (args[index] === '--expect-hex-count') options.expectHexCount = Number(args[++index]);
		else throw new Error(`Unknown argument: ${args[index]}`);
	}
	return options;
};

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
	const options = parseArgs(process.argv.slice(2));
	const inventory = await scanColorInventory(options.root);
	if (options.output) {
		await mkdir(path.dirname(options.output), { recursive: true });
		await writeFile(options.output, `${JSON.stringify(inventory, null, 2)}\n`, 'utf8');
	}
	console.log(JSON.stringify({ output: options.output, ...inventory.summary, coverage: inventory.coverage }, null, 2));
	if (options.expectHexCount !== null && inventory.summary.uniqueHex !== options.expectHexCount) {
		console.error(`Expected ${options.expectHexCount} unique hex values; found ${inventory.summary.uniqueHex}.`);
		process.exitCode = 1;
	}
}

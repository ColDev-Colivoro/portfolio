import path from 'node:path';
import { defineConfig } from '@playwright/test';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

export default defineConfig({
	testDir: './tests/visual',
	testMatch: '**/baseline.spec.js',
	fullyParallel: false,
	workers: 1,
	retries: 0,
	timeout: 45_000,
	expect: { timeout: 10_000 },
	outputDir: 'test-results/visual',
	reporter: [['list'], ['html', { outputFolder: 'playwright-report', open: 'never' }]],
	use: {
		baseURL: 'http://127.0.0.1:4173',
		browserName: 'chromium',
		colorScheme: 'dark',
		locale: 'es-CL',
		timezoneId: 'America/Santiago',
		deviceScaleFactor: 1,
		reducedMotion: 'reduce',
		headless: true,
		launchOptions: { executablePath: edgePath },
		trace: 'retain-on-failure',
		screenshot: 'only-on-failure',
	},
	webServer: {
		command: 'npm run preview -- --host 127.0.0.1 --port 4173',
		url: 'http://127.0.0.1:4173',
		reuseExistingServer: false,
		timeout: 60_000,
		cwd: path.resolve('.'),
	},
});

import path from 'node:path';
import { execSync } from 'node:child_process';
import react from '@vitejs/plugin-react';
import { createLogger, defineConfig } from 'vite';

const logger = createLogger();
const loggerError = logger.error;

logger.error = (msg, options) => {
	// Filter noisy PostCSS syntax errors from the dev overlay/logger.
	// Keep this generic (no vendor-specific instrumentation).
	if (options?.error?.toString().includes('CssSyntaxError: [postcss]')) {
		return;
	}

	loggerError(msg, options);
};

const getGitCommit = () => {
	try {
		return execSync('git rev-parse --short HEAD', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
	} catch {
		return 'local';
	}
};

const appVersion = process.env.npm_package_version ?? '0.0.0';
const buildDate = new Date().toISOString().slice(0, 10);
const gitCommit = getGitCommit();

export default defineConfig({
	customLogger: logger,
	plugins: [react()],
	server: {
		cors: true,
		headers: {
			'Cross-Origin-Embedder-Policy': 'credentialless',
		},
		allowedHosts: true,
	},
	resolve: {
		extensions: ['.jsx', '.js', '.tsx', '.ts', '.json'],
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './src/setupTests.js',
		css: true,
	},
	define: {
		'import.meta.env.VITE_APP_VERSION': JSON.stringify(appVersion),
		'import.meta.env.VITE_BUILD_DATE': JSON.stringify(buildDate),
		'import.meta.env.VITE_GIT_COMMIT': JSON.stringify(gitCommit),
	},
});


import path from 'node:path';
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
});


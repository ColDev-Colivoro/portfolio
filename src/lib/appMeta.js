const fallbackDate = new Date().toISOString().slice(0, 10);

export const appMeta = {
	version: import.meta.env.VITE_APP_VERSION || '0.0.0',
	buildDate: import.meta.env.VITE_BUILD_DATE || fallbackDate,
	commit: import.meta.env.VITE_GIT_COMMIT || 'local',
};

export const appVersionLabel = `v${appMeta.version}`;

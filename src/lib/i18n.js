export function resolveCopy(value, lang = 'es') {
	if (value == null) return '';
	if (Array.isArray(value)) {
		return value.map((item) => resolveCopy(item, lang));
	}
	if (typeof value === 'object') {
		if (lang in value || 'es' in value || 'en' in value) {
			return value[lang] ?? value.es ?? value.en ?? '';
		}
	}
	return value;
}

export function mapLocalized(items = [], lang = 'es') {
	return items.map((item) => {
		if (!item || typeof item !== 'object') return item;
		const localized = {};
		for (const [key, value] of Object.entries(item)) {
			localized[key] = resolveCopy(value, lang);
		}
		return localized;
	});
}

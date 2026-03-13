import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const LocaleContext = createContext(null);
const STORAGE_KEY = 'colivoro-locale';

export const LocaleProvider = ({ children }) => {
	const [lang, setLang] = useState(() => {
		if (typeof window === 'undefined') return 'es';
		return window.localStorage.getItem(STORAGE_KEY) || 'es';
	});

	useEffect(() => {
		window.localStorage.setItem(STORAGE_KEY, lang);
		document.documentElement.lang = lang;
	}, [lang]);

	const value = useMemo(
		() => ({
			lang,
			setLang,
			toggleLang: () => setLang((current) => (current === 'es' ? 'en' : 'es')),
		}),
		[lang],
	);

	return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
};

export const useLocale = () => {
	const context = useContext(LocaleContext);
	if (!context) {
		throw new Error('useLocale debe usarse dentro de LocaleProvider');
	}
	return context;
};

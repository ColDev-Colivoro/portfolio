import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import Cursor from '@/components/Cursor';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import ProjectsPage from '@/pages/ProjectsPage';
import ContactPage from '@/pages/ContactPage';
import { useLocale } from '@/context/LocaleContext';
import { siteContent } from '@/data/siteContent';
import { resolveCopy } from '@/lib/i18n';

const RemodelingRibbon = () => (
	<div className="pointer-events-none fixed right-[-58px] top-3 z-[140] rotate-45 border border-white/20 bg-accent px-14 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-accent-foreground shadow-[0_12px_40px_rgba(0,0,0,0.35)] md:right-[-54px] md:top-8 md:px-16 md:py-1.5 md:text-[10px]">
		En remodelación
	</div>
);

const App = () => {
	const location = useLocation();
	const { lang } = useLocale();

	useEffect(() => {
		document.title = resolveCopy(siteContent.seoTitle, lang);
	}, [lang]);

	useEffect(() => {
		if (!location.hash) return;
		const id = location.hash.replace('#', '');
		const timer = setTimeout(() => {
			document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}, 120);
		return () => clearTimeout(timer);
	}, [location.hash, location.pathname]);

	return (
		<div className="relative min-h-screen overflow-hidden bg-background text-foreground">
			<div className="pointer-events-none fixed inset-0 noise-bg" />
			<RemodelingRibbon />
			<Cursor />
			<div className="relative z-10 flex min-h-screen flex-col">
				<Navbar />
				<div className="flex-1">
					<Routes location={location} key={location.pathname}>
						<Route path="/" element={<HomePage />} />
						<Route path="/about" element={<AboutPage />} />
						<Route path="/proyectos" element={<ProjectsPage />} />
						<Route path="/contact" element={<ContactPage />} />
					</Routes>
				</div>
				<Chatbot lang={lang} />
				<Footer />
				<Toaster />
			</div>
		</div>
	);
};

export default App;

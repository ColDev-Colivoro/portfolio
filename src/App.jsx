import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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

const App = () => {
	const location = useLocation();
	const { lang } = useLocale();

	const routeTone =
		location.pathname === '/proyectos'
			? 'projects'
			: location.pathname === '/about'
				? 'about'
				: location.pathname === '/contact'
					? 'contact'
					: 'home';

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
		<div className="relative min-h-screen overflow-hidden bg-background text-foreground" data-route-tone={routeTone}>
			<div className="route-atmo-primary pointer-events-none fixed inset-0" />
			<div className="route-atmo-secondary pointer-events-none fixed inset-0" />
			<div className="pointer-events-none fixed inset-0 noise-bg" />
			<Cursor />
			<div className="relative z-10 flex min-h-screen flex-col">
				<Navbar />
				<div className="flex-1">
					<AnimatePresence mode="wait" initial={false}>
						<motion.div
							key={location.pathname}
							initial={{ opacity: 0, x: 20, filter: 'blur(7px)' }}
							animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
							exit={{ opacity: 0, x: -16, filter: 'blur(5px)' }}
							transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
						>
							<Routes location={location}>
								<Route path="/" element={<HomePage />} />
								<Route path="/about" element={<AboutPage />} />
								<Route path="/proyectos" element={<ProjectsPage />} />
								<Route path="/contact" element={<ContactPage />} />
							</Routes>
						</motion.div>
					</AnimatePresence>
				</div>
				<Chatbot lang={lang} />
				<Footer />
				<Toaster />
			</div>
		</div>
	);
};

export default App;

import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import CommandBar from '@/components/CommandBar';
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

	const routeToIndex = {  '/proyectos': 1, '/about': 2, '/contact': 3 };
	const currentIndex = routeToIndex[location.pathname] ?? 0;
	const prevIndex = useRef(currentIndex);

	useEffect(() => {
		prevIndex.current = currentIndex;
	}, [currentIndex]);

	const direction = currentIndex > prevIndex.current ? 1 : -1;

	const variants = {
		home: {
			enter: { opacity: 0, scale: 0.96, filter: 'blur(10px)' },
			center: { opacity: 1, scale: 1, filter: 'blur(0px)' },
			exit: { opacity: 0, scale: 1.04, filter: 'blur(10px)' }
		},
		standard: {
			enter: (dir) => ({ x: dir * 30, opacity: 0 }),
			center: { x: 0, opacity: 1 },
			exit: (dir) => ({ x: dir * -30, opacity: 0 })
		}
	};

	const routeTone =
		location.pathname === '/' ? 'home' : 'standard';

	const getVariants = () => (routeTone === 'home' ? variants.home : variants.standard);

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
					<AnimatePresence mode="wait" initial={true} custom={direction}>
						<motion.div
							key={location.pathname}
							custom={direction}
							variants={getVariants()}
							initial="enter"
							animate="center"
							exit="exit"
							transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
							className="h-full"
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
					<CommandBar />
					<Footer />
					<Toaster />
			</div>
		</div>
	);
};

export default App;

import { useEffect, useRef, useState } from 'react';
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
import { getRouteTone, routeIndexMap, routeLateralVariants, routeTransition } from '@/lib/motionPresets';
import { useSwipeRouteNavigation } from '@/hooks/useSwipeRouteNavigation';
import { useKeyboardRouteNavigation } from '@/hooks/useKeyboardRouteNavigation';

const App = () => {
	const location = useLocation();
	const { lang } = useLocale();
 	const [isOverlayReady, setIsOverlayReady] = useState(false);

	const currentIndex = routeIndexMap[location.pathname] ?? 0;
	const prevIndex = useRef(currentIndex);
	const isInitialLoad = useRef(true);
	const routeContainerRef = useRef(null);

	useSwipeRouteNavigation(routeContainerRef);
	useKeyboardRouteNavigation();

	useEffect(() => {
		prevIndex.current = currentIndex;
	}, [currentIndex]);

	useEffect(() => {
		isInitialLoad.current = false;
	}, []);

	useEffect(() => {
		if (typeof window === 'undefined') {
			setIsOverlayReady(true);
			return undefined;
		}

		const enableOverlays = () => setIsOverlayReady(true);
		const idleId =
			typeof window.requestIdleCallback === 'function'
				? window.requestIdleCallback(enableOverlays, { timeout: 900 })
				: null;
		const timeoutId = window.setTimeout(enableOverlays, 850);

		return () => {
			window.clearTimeout(timeoutId);
			if (idleId !== null && typeof window.cancelIdleCallback === 'function') {
				window.cancelIdleCallback(idleId);
			}
		};
	}, []);

	const direction = currentIndex > prevIndex.current ? 1 : -1;

	const routeTone = getRouteTone(location.pathname);

	useEffect(() => {
		document.title = resolveCopy(siteContent.seoTitle, lang);
	}, [lang]);

	return (
		<div className="relative min-h-screen overflow-hidden bg-background text-foreground" data-route-tone={routeTone}>
			<div className="route-atmo-primary pointer-events-none fixed inset-0" />
			<div className="route-atmo-secondary pointer-events-none fixed inset-0" />
			<div className="pointer-events-none fixed inset-0 noise-bg" />
			{isOverlayReady ? <Cursor /> : null}
			<div className="relative z-10 flex min-h-screen flex-col">
				<Navbar />
				<div className="flex-1" ref={routeContainerRef} style={{ touchAction: 'pan-y' }}>
					<AnimatePresence mode="popLayout" initial={true} custom={direction}>
						<motion.div
							key={location.pathname}
							custom={direction}
							variants={routeLateralVariants}
							initial={isInitialLoad.current ? false : 'enter'}
							animate="center"
							exit="exit"
							transition={routeTransition}
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
				{isOverlayReady ? <CommandBar /> : null}
				<Footer />
				<Toaster />
			</div>
		</div>
	);
};

export default App;

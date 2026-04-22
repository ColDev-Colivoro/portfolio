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
import SGCPlatformPage from '@/pages/SGCPlatformPage';
import SlideIndicator from '@/components/SlideIndicator';
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
	const isSgcPlatformRoute = location.pathname.startsWith('/demo/sgc');

	useEffect(() => {
		document.title = resolveCopy(siteContent.seoTitle, lang);
	}, [lang]);

	return (
		<div
			className={`relative min-h-screen w-full max-w-[100vw] overflow-hidden ${isSgcPlatformRoute ? 'bg-[#0f172a] text-white' : 'bg-background text-foreground'}`}
			data-route-tone={routeTone}
		>
			<AnimatePresence>
				{!isSgcPlatformRoute ? (
					<motion.div
						key="bg-atmosphere"
						initial={{ opacity: 1 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.5 }}
						className="pointer-events-none fixed inset-0 z-0"
					>
						<div className="route-atmo-primary absolute inset-0" />
						<div className="route-atmo-secondary absolute inset-0" />
						<div className="noise-bg absolute inset-0" />
					</motion.div>
				) : null}
			</AnimatePresence>
			
			<AnimatePresence>
				{!isSgcPlatformRoute && isOverlayReady ? (
					<motion.div
						key="cursor"
						initial={{ opacity: 1 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
					>
						<Cursor />
					</motion.div>
				) : null}
			</AnimatePresence>
			<div className={`relative z-10 flex min-h-screen ${isSgcPlatformRoute ? '' : 'flex-col'}`}>
				<AnimatePresence>
					{!isSgcPlatformRoute ? (
						<motion.div
							key="navbar"
							initial={{ opacity: 1 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.4 }}
						>
							<Navbar />
						</motion.div>
					) : null}
				</AnimatePresence>
				<div className="relative flex-1 overflow-x-hidden" ref={routeContainerRef} style={{ touchAction: 'pan-y' }}>
					<AnimatePresence mode="popLayout" initial={true} custom={direction} onExitComplete={() => window.scrollTo(0, 0)}>
						<motion.div
							key={location.pathname}
							custom={direction}
							variants={routeLateralVariants}
							initial={isInitialLoad.current ? false : 'enter'}
							animate="center"
							exit="exit"
							transition={routeTransition}
							className="h-full w-full"
						>
							<Routes location={location}>
								<Route path="/" element={<HomePage />} />
								<Route path="/about" element={<AboutPage />} />
								<Route path="/proyectos" element={<ProjectsPage />} />
								<Route path="/contact" element={<ContactPage />} />
								<Route path="/demo/sgc" element={<SGCPlatformPage />} />
							</Routes>
						</motion.div>
					</AnimatePresence>
				</div>
				<AnimatePresence>
					{!isSgcPlatformRoute ? (
						<motion.div
							key="bottom-elements"
							initial={{ opacity: 1 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0, position: 'absolute', bottom: 0, left: 0, right: 0 }}
							transition={{ duration: 0.4 }}
							className="flex flex-col"
						>
							<Chatbot lang={lang} />
							{isOverlayReady && <CommandBar />}
							<Footer />
						</motion.div>
					) : null}
				</AnimatePresence>
				<Toaster />
			</div>
			{!isSgcPlatformRoute ? <SlideIndicator /> : null}
		</div>
	);
};

export default App;

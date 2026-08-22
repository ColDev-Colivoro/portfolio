import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { getAdjacentPortfolioRoute } from '@/config/portfolioRoutes';
import { useLocale } from '@/context/LocaleContext';
import { resolveCopy } from '@/lib/i18n';

const SlideIndicator = () => {
	const [isVisible, setIsVisible] = useState(false);
	const location = useLocation();
	const { lang } = useLocale();
	const adjacentRoute = getAdjacentPortfolioRoute(location.pathname, 1)
		?? getAdjacentPortfolioRoute(location.pathname, -1);
	const indicatorCopy = lang === 'en' ? 'Swipe' : 'Desliza';

	useEffect(() => {
		// Only check/show on mobile and if not already seen
		const isMobile = window.innerWidth < 768; // md breakpoint in tailwind
		const hasSeen = localStorage.getItem('coldev_hasSeenSlideIndicator');

		if (isMobile && !hasSeen) {
			// Small delay before showing it up so it doesn't clash with route enter animations
			const timerId = setTimeout(() => setIsVisible(true), 1500);
			return () => clearTimeout(timerId);
		}
	}, []);

	useEffect(() => {
		if (!isVisible) return;

		const handleInteraction = () => {
			setIsVisible(false);
			localStorage.setItem('coldev_hasSeenSlideIndicator', 'true');
		};
		const handleKeyDown = (event) => {
			if (['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'Space'].includes(event.code)) {
				handleInteraction();
			}
		};

		// Dismiss on wheel, keyboard arrows, touch, or click anywhere
		window.addEventListener('wheel', handleInteraction, { once: true });
		window.addEventListener('keydown', handleKeyDown);
		window.addEventListener('touchstart', handleInteraction, { once: true });
		window.addEventListener('mousedown', handleInteraction, { once: true });

		// Also dismiss if route changes
		return () => {
			handleInteraction();
			window.removeEventListener('wheel', handleInteraction);
			window.removeEventListener('keydown', handleKeyDown);
			window.removeEventListener('touchstart', handleInteraction);
			window.removeEventListener('mousedown', handleInteraction);
		};
	}, [isVisible, location.pathname]);

	if (!adjacentRoute) return null;

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					aria-label={`${indicatorCopy}: ${resolveCopy(adjacentRoute.label, lang)}`}
					data-route-target={adjacentRoute.path}
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
					transition={{ duration: 0.6, ease: 'easeOut' }}
					className="pointer-events-none fixed right-6 top-1/2 z-[60] flex -translate-y-1/2 items-center justify-center md:hidden"
				>
					<motion.div
						animate={{ x: [0, 10, 0] }}
						transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
						className="flex items-center gap-2 rounded-full border border-white/10 bg-background/40 px-4 py-2 text-white shadow-xl backdrop-blur-md"
					>
						<span className="text-sm font-medium tracking-wide opacity-80 uppercase">{indicatorCopy}</span>
						<ChevronRight className="h-5 w-5 opacity-90" />
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default SlideIndicator;

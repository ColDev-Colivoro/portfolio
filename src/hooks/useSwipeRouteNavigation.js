import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { portfolioNavigationPaths } from '@/config/portfolioRoutes';

const DEFAULT_OPTIONS = {
	edgeExclusionPx: 24,
	swipeThresholdPx: 64,
	minHorizontalRatio: 1.35,
	maxDurationMs: 700,
};

const shouldIgnoreTarget = (target) => {
	if (!(target instanceof Element)) return false;

	return Boolean(
		target.closest(
			'input, textarea, select, [contenteditable="true"], [data-no-swipe="true"], [role="dialog"], [aria-modal="true"]',
		),
	);
};

const canUseSwipeNavigation = () => {
	if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
	return window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024;
};

export const useSwipeRouteNavigation = (containerRef, options = DEFAULT_OPTIONS) => {
	const navigate = useNavigate();
	const location = useLocation();
	const gestureRef = useRef(null);

	useEffect(() => {
		const element = containerRef?.current;
		if (!element || !canUseSwipeNavigation()) return undefined;

		const settings = { ...DEFAULT_OPTIONS, ...options };

		const handleTouchStart = (event) => {
			if (event.touches.length !== 1) {
				gestureRef.current = null;
				return;
			}

			const target = event.target;
			if (shouldIgnoreTarget(target)) {
				gestureRef.current = null;
				return;
			}

			const touch = event.touches[0];
			const viewportWidth = window.innerWidth;

			if (touch.clientX <= settings.edgeExclusionPx || touch.clientX >= viewportWidth - settings.edgeExclusionPx) {
				gestureRef.current = null;
				return;
			}

			gestureRef.current = {
				startX: touch.clientX,
				startY: touch.clientY,
				startTime: Date.now(),
			};
		};

		const handleTouchEnd = (event) => {
			const gesture = gestureRef.current;
			gestureRef.current = null;
			if (!gesture || event.changedTouches.length !== 1) return;

			const touch = event.changedTouches[0];
			const deltaX = touch.clientX - gesture.startX;
			const deltaY = touch.clientY - gesture.startY;
			const duration = Date.now() - gesture.startTime;

			const absX = Math.abs(deltaX);
			const absY = Math.abs(deltaY);
			const horizontalRatio = absX / Math.max(absY, 1);

			if (duration > settings.maxDurationMs) return;
			if (absX < settings.swipeThresholdPx) return;
			if (horizontalRatio < settings.minHorizontalRatio) return;

			const currentIndex = portfolioNavigationPaths.indexOf(location.pathname);
			if (currentIndex === -1) return;

			const nextIndex = deltaX < 0 ? currentIndex + 1 : currentIndex - 1;
			if (nextIndex < 0 || nextIndex >= portfolioNavigationPaths.length) return;

			navigate(portfolioNavigationPaths[nextIndex]);
		};

		element.addEventListener('touchstart', handleTouchStart, { passive: true });
		element.addEventListener('touchend', handleTouchEnd, { passive: true });

		return () => {
			element.removeEventListener('touchstart', handleTouchStart);
			element.removeEventListener('touchend', handleTouchEnd);
		};
	}, [containerRef, location.pathname, navigate, options]);
};

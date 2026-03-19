import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ROUTE_ORDER = ['/', '/proyectos', '/about', '/contact'];
const NAVIGATION_LOCK_MS = 620;

const isEditableTarget = (target) => {
	if (!(target instanceof Element)) return false;
	return Boolean(target.closest('input, textarea, select, [contenteditable="true"], [data-no-arrow-nav="true"]'));
};

const shouldHandleArrowNavigation = () => {
	if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
	const isDesktopLike = window.matchMedia('(min-width: 1024px)').matches;
	const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
	return isDesktopLike || hasFinePointer;
};

export const useKeyboardRouteNavigation = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const lockUntilRef = useRef(0);

	useEffect(() => {
		const onKeyDown = (event) => {
			if (!shouldHandleArrowNavigation()) return;
			if (event.altKey || event.metaKey || event.ctrlKey) return;
			if (event.repeat) return;
			if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
			if (isEditableTarget(event.target)) return;
			if (document.querySelector('[role="dialog"], [aria-modal="true"], [data-overlay-open="true"]')) return;

			const now = Date.now();
			if (now < lockUntilRef.current) return;

			const currentIndex = ROUTE_ORDER.indexOf(location.pathname);
			if (currentIndex === -1) return;

			const nextIndex = event.key === 'ArrowRight' ? currentIndex + 1 : currentIndex - 1;
			if (nextIndex < 0 || nextIndex >= ROUTE_ORDER.length) return;

			event.preventDefault();
			lockUntilRef.current = now + NAVIGATION_LOCK_MS;
			navigate(ROUTE_ORDER[nextIndex]);
		};

		window.addEventListener('keydown', onKeyDown);
		return () => window.removeEventListener('keydown', onKeyDown);
	}, [location.pathname, navigate]);
};

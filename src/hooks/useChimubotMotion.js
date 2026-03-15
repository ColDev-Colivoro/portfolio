import { useEffect, useMemo, useState } from 'react';
import { chimubotConfig } from '@/data/chimubotConfig';

/**
 * Hook to manage Chimubot's dynamic positioning and visual behavior.
 */
export const useChimubotMotion = ({ isOpen, isLoading }) => {
	const [position, setPosition] = useState({ bottom: 24, right: 24 });
	const [visualState, setVisualState] = useState('idle');
	const [isSimplified, setIsSimplified] = useState(false);

	useEffect(() => {
		const baseAnchor = chimubotConfig.anchors.hero;
		if (isOpen) {
			setPosition(baseAnchor);
			setVisualState('active');
		} else {
			setPosition(baseAnchor);
			setVisualState('idle');
		}
	}, [isOpen]);

	useEffect(() => {
		if (typeof window === 'undefined') return undefined;

		const updateReducedMotion = () => {
			setIsSimplified(window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 768);
		};

		updateReducedMotion();
		window.addEventListener('resize', updateReducedMotion);
		return () => window.removeEventListener('resize', updateReducedMotion);
	}, []);

	useEffect(() => {
		const baseAnchor = chimubotConfig.anchors.hero;
		if (isOpen) {
			setPosition(baseAnchor);
			setVisualState(isLoading ? 'thinking' : 'perched');
			return;
		}

		if (isLoading) {
			setPosition(baseAnchor);
			setVisualState('thinking');
			return;
		}

		setPosition(baseAnchor);
		setVisualState('idle');
	}, [isLoading, isOpen]);

	return {
		position,
		visualState,
		isSimplified,
	};
};

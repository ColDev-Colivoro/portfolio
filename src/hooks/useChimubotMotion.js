import { useState, useEffect } from 'react';

/**
 * Hook to manage Chimubot's dynamic positioning and visual behavior.
 */
export const useChimubotMotion = ({ isOpen, isLoading }) => {
	const [position, setPosition] = useState({ bottom: 24, right: 24 });
	const [visualState, setVisualState] = useState('idle');

	useEffect(() => {
		if (isOpen) {
			setPosition({ bottom: 24, right: 24 });
			setVisualState('active');
		} else {
			setVisualState('idle');
		}
	}, [isOpen]);

	return {
		position,
		visualState,
		isSimplified: false
	};
};

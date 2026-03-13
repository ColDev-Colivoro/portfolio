import { useEffect, useMemo, useState } from 'react';

const DEFAULT_STATE = {
	hasFinePointer: false,
	canHover: false,
	reducedMotion: false,
};

const getCapabilities = () => {
	if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
		return DEFAULT_STATE;
	}

	return {
		hasFinePointer: window.matchMedia('(pointer: fine)').matches,
		canHover: window.matchMedia('(hover: hover)').matches,
		reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
	};
};

const attachListener = (query, callback) => {
	if (typeof query.addEventListener === 'function') {
		query.addEventListener('change', callback);
		return () => query.removeEventListener('change', callback);
	}

	query.addListener(callback);
	return () => query.removeListener(callback);
};

export const usePointerCapabilities = () => {
	const [state, setState] = useState(() => getCapabilities());

	useEffect(() => {
		if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return undefined;

		const finePointer = window.matchMedia('(pointer: fine)');
		const canHover = window.matchMedia('(hover: hover)');
		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

		const handleChange = () => {
			setState({
				hasFinePointer: finePointer.matches,
				canHover: canHover.matches,
				reducedMotion: reducedMotion.matches,
			});
		};

		handleChange();

		const cleanups = [
			attachListener(finePointer, handleChange),
			attachListener(canHover, handleChange),
			attachListener(reducedMotion, handleChange),
		];

		return () => cleanups.forEach((cleanup) => cleanup());
	}, []);

	return useMemo(
		() => ({
			...state,
			enableFollower: state.hasFinePointer && state.canHover && !state.reducedMotion,
		}),
		[state],
	);
};

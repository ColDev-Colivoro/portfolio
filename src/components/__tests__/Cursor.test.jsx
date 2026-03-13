import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import Cursor from '@/components/Cursor';

const originalMatchMedia = window.matchMedia;

const createMatchMedia =
	({ finePointer = true, canHover = true, reducedMotion = false } = {}) =>
	(query) => ({
		matches: query.includes('pointer: fine')
			? finePointer
			: query.includes('hover: hover')
				? canHover
				: query.includes('prefers-reduced-motion')
					? reducedMotion
					: false,
		media: query,
		onchange: null,
		addListener: () => {},
		removeListener: () => {},
		addEventListener: () => {},
		removeEventListener: () => {},
		dispatchEvent: () => false,
	});

describe('Cursor', () => {
	beforeEach(() => {
		window.matchMedia = createMatchMedia();
	});

	afterEach(() => {
		window.matchMedia = originalMatchMedia;
	});

	it('renderiza el follower elegante cuando el dispositivo lo soporta', () => {
		render(<Cursor />);

		expect(screen.getByTestId('cursor-follower')).toBeInTheDocument();
	});

	it('no renderiza el follower cuando reduced motion está activo', () => {
		window.matchMedia = createMatchMedia({ reducedMotion: true });
		const { queryByTestId } = render(<Cursor />);

		expect(queryByTestId('cursor-follower')).not.toBeInTheDocument();
	});
});

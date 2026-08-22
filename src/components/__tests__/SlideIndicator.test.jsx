import { act, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import SlideIndicator from '@/components/SlideIndicator';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('SlideIndicator', () => {
	beforeEach(() => {
		vi.useFakeTimers();
		window.localStorage.clear();
		Object.defineProperty(window, 'innerWidth', { configurable: true, value: 390 });
	});

	afterEach(() => {
		vi.restoreAllMocks();
		vi.useRealTimers();
		window.localStorage.clear();
	});

	it('conserva el indicador y deriva su destino desde el orden canonico', () => {
		const { container } = renderWithProviders(<SlideIndicator />, { route: '/' });
		act(() => vi.advanceTimersByTime(1500));

		expect(screen.getByText('Desliza')).toBeInTheDocument();
		expect(container.querySelector('[data-route-target="/proyectos"]')).toBeInTheDocument();
	});

	it('mantiene paridad inglesa y limpia el listener de teclado', () => {
		window.localStorage.setItem('colivoro-locale', 'en');
		const addSpy = vi.spyOn(window, 'addEventListener');
		const removeSpy = vi.spyOn(window, 'removeEventListener');
		const { unmount } = renderWithProviders(<SlideIndicator />, { route: '/' });
		act(() => vi.advanceTimersByTime(1500));

		expect(screen.getByText('Swipe')).toBeInTheDocument();
		const keydownHandler = addSpy.mock.calls.find(([eventName]) => eventName === 'keydown')?.[1];
		expect(keydownHandler).toBeTypeOf('function');
		unmount();
		expect(removeSpy).toHaveBeenCalledWith('keydown', keydownHandler);
	});
});

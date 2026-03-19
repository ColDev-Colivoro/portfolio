import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import Footer from '@/components/Footer';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('Footer', () => {
	it('muestra marca y cierre bilingue sin enlaces públicos en footer', () => {
		renderWithProviders(<Footer />);

		expect(screen.getByText('ColDev')).toBeInTheDocument();
		expect(
			screen.getByText('Portfolio personal de análisis de sistemas, software y construcción de soluciones sobrias.'),
		).toBeInTheDocument();
		expect(screen.getByText('Portfolio bilingüe — Español / English')).toBeInTheDocument();
		expect(screen.queryByRole('link', { name: /github/i })).not.toBeInTheDocument();
		expect(screen.queryByRole('link', { name: /linkedin/i })).not.toBeInTheDocument();
	});
});

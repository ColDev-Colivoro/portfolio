import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import FeaturedProject from '@/components/FeaturedProject';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('FeaturedProject', () => {
	it('presenta a Nutriscoc Connect como caso principal y abre el modal del caso', async () => {
		const user = userEvent.setup();
		renderWithProviders(<FeaturedProject />);

		expect(screen.getByRole('heading', { name: 'Caso destacado' })).toBeInTheDocument();
		expect(screen.getByText('Plataforma full stack para seguimiento y operación')).toBeInTheDocument();
		const featuredCover = screen.getByAltText('Nutriscoc Connect');
		expect(featuredCover.closest('div')).toHaveClass('featured-media');

		await user.click(screen.getByRole('button', { name: /Abrir caso/i }));
		expect(screen.getByText('Nutriscoc Connect — plataforma full stack de seguimiento')).toBeInTheDocument();
		expect(screen.getByRole('dialog')).toBeInTheDocument();
		expect(screen.getByTestId('case-study-modal-overlay')).toHaveStyle({ zIndex: '120' });
		expect(document.body.style.overflow).toBe('hidden');

		await user.click(screen.getByTestId('case-study-modal-overlay'));
		await waitFor(() => {
			expect(screen.queryByText('Nutriscoc Connect — plataforma full stack de seguimiento')).not.toBeInTheDocument();
			expect(document.body.style.overflow).toBe('');
		});
	});
});

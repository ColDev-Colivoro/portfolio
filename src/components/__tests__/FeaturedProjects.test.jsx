import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';

import { FEATURED_PROJECT_IDS, FeaturedProjects } from '@/components/Projects';
import { renderWithProviders } from '@/test/renderWithProviders';

afterEach(() => window.localStorage.clear());

describe('FeaturedProjects', () => {
	it('reutiliza exactamente NutriscoConnect, Dashboard SGC y ColDevPOS en ese orden', () => {
		const { container } = renderWithProviders(<FeaturedProjects />);
		const cards = [...container.querySelectorAll('[data-featured-project]')];

		expect(FEATURED_PROJECT_IDS).toEqual(['nutriscoc', 'voyscout', 'coldevpos']);
		expect(cards.map((card) => card.dataset.projectId)).toEqual(FEATURED_PROJECT_IDS);
		expect(within(cards[0]).getByText('NutriscoConnect')).toBeInTheDocument();
		expect(within(cards[1]).getByText('Dashboard SGC')).toBeInTheDocument();
		expect(within(cards[1]).getByText('Demo / Prototipo')).toBeInTheDocument();
		expect(within(cards[2]).getByText('ColDevPOS')).toBeInTheDocument();
		expect(screen.queryByText('ColDev Radar Sur')).not.toBeInTheDocument();
		expect(screen.queryByText('Mar2Control')).not.toBeInTheDocument();
		expect(screen.queryByText('ColDev Pay')).not.toBeInTheDocument();
		expect(screen.getByRole('link', { name: 'Ver todos los proyectos' })).toHaveAttribute('href', '/proyectos');
	});

	it('mantiene enlace canónico, modal y restauración de foco desde Home', async () => {
		const user = userEvent.setup();
		renderWithProviders(<FeaturedProjects />);

		const nutriscoCard = screen.getByText('NutriscoConnect').closest('article');
		expect(within(nutriscoCard).getByRole('link', { name: /abrir nutriscoconnect/i })).toHaveAttribute(
			'href',
			'https://nutrisco.netlify.app',
		);

		nutriscoCard.focus();
		await user.keyboard('{Enter}');
		expect(within(screen.getByRole('dialog')).getByRole('heading', { name: 'NutriscoConnect' })).toBeInTheDocument();
		await user.keyboard('{Escape}');
		await waitFor(() => expect(nutriscoCard).toHaveFocus());
	});

	it('localiza destacados y declara SGC como demo en inglés', () => {
		window.localStorage.setItem('colivoro-locale', 'en');
		renderWithProviders(<FeaturedProjects />);

		expect(screen.getByRole('heading', { name: 'Systems selected to show ColDev in action' })).toBeInTheDocument();
		expect(screen.getByText('SGC Dashboard')).toBeInTheDocument();
		expect(screen.getByText('Demo / Prototype')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /Open demo/i })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: 'View all projects' })).toHaveAttribute('href', '/proyectos');
	});
});

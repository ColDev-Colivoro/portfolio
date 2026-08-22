import { screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import HomePage from '@/pages/HomePage';
import { renderWithProviders } from '@/test/renderWithProviders';

const legacyFounderCopy = {
	es: {
		eyebrow: 'Portfolio personal · ColDev',
		name: 'José Camilo Colivoro Uribe',
		role: 'Analista Programador',
		description: 'Pensamiento sistémico, software sobrio y resolución integral para operación, trazabilidad y producto.',
		supportingLine: 'Analizo sistemas, ordeno complejidad y la convierto en software claro, útil y mantenible.',
	},
	en: {
		eyebrow: 'Personal portfolio · ColDev',
		name: 'José Camilo Colivoro Uribe',
		role: 'Programmer Analyst',
		description: 'Systems thinking, sober software, and end-to-end problem solving for operations, traceability, and product.',
		supportingLine: 'I analyze systems, organize complexity, and turn it into clear, useful, maintainable software.',
	},
};

afterEach(() => window.localStorage.clear());

describe('HomePage ColDev-first', () => {
	it('presenta primero la oferta y reubica sin perder el hero personal ES', () => {
		const { container } = renderWithProviders(<HomePage />);

		expect(screen.getByRole('heading', { level: 1, name: 'Ideas y procesos convertidos en sistemas digitales' })).toBeInTheDocument();
		expect(screen.getByText('Diseño y construyo productos, herramientas y automatizaciones a medida para convertir necesidades reales en software claro, útil y mantenible.')).toBeInTheDocument();
		const founderBridge = container.querySelector('[data-content-role="founder-bridge"]');
		expect(founderBridge).toBeInTheDocument();
		for (const value of Object.values(legacyFounderCopy.es)) {
			expect(within(founderBridge).getByText(value)).toBeInTheDocument();
		}
		expect(screen.getByRole('link', { name: 'Descargar CV' })).toHaveAttribute('href', '/documents/cv/jose-colivoro-cv-es.pdf');
		expect(screen.getByRole('heading', { name: 'Sistemas seleccionados para ver ColDev en acción' })).toBeInTheDocument();
		expect([...container.querySelectorAll('[data-featured-project]')].map((card) => card.dataset.projectId)).toEqual([
			'nutriscoc',
			'voyscout',
			'coldevpos',
		]);
	});

	it('mantiene la misma jerarquia y evidencia del fundador en ingles', () => {
		window.localStorage.setItem('colivoro-locale', 'en');
		const { container } = renderWithProviders(<HomePage />);

		expect(screen.getByRole('heading', { level: 1, name: 'Ideas and processes turned into digital systems' })).toBeInTheDocument();
		expect(screen.getByText('I design and build custom products, tools, and automations that turn real needs into clear, useful, maintainable software.')).toBeInTheDocument();
		const founderBridge = container.querySelector('[data-content-role="founder-bridge"]');
		for (const value of Object.values(legacyFounderCopy.en)) {
			expect(within(founderBridge).getByText(value)).toBeInTheDocument();
		}
		expect(screen.getByRole('link', { name: 'Download resume' })).toHaveAttribute('href', '/documents/cv/jose-colivoro-cv-en.pdf');
		expect(screen.getByRole('heading', { name: 'Systems selected to show ColDev in action' })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: 'View all projects' })).toHaveAttribute('href', '/proyectos');
	});
});

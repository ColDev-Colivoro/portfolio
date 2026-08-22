import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import Hero from '@/components/Hero';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('Hero', () => {
  it('prioriza la oferta ColDev y conserva identidad fundadora, logo y CTAs', () => {
    renderWithProviders(<Hero />);

    expect(screen.getByText('ColDev · Ingeniería digital con IA')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: 'Ideas y procesos convertidos en sistemas digitales' })).toBeInTheDocument();
    expect(screen.getByText('José Camilo Colivoro Uribe')).toBeInTheDocument();
    expect(screen.getByText('Analista Programador')).toBeInTheDocument();
    expect(screen.getByText('Pensamiento sistémico, software sobrio y resolución integral para operación, trazabilidad y producto.')).toBeInTheDocument();
    expect(screen.getByText('Analizo sistemas, ordeno complejidad y la convierto en software claro, útil y mantenible.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Ver proyectos/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Descargar CV/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Solicitar contacto/i })).toBeInTheDocument();

    const heroHeading = screen.getByRole('heading', { level: 1, name: 'Ideas y procesos convertidos en sistemas digitales' });
    expect(heroHeading).toHaveClass('hero-title');
		expect(document.querySelector('[data-content-role="founder-bridge"]')).toBeInTheDocument();

		const heroLogo = screen.getByAltText(/Logo gato/i);
		expect(heroLogo).toBeInTheDocument();
		expect(heroLogo).toHaveClass('hero-logo-image');
		expect(heroLogo.closest('.hero-logo-shell')).toBeInTheDocument();
	});
});

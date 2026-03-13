import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import Hero from '@/components/Hero';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('Hero', () => {
  it('muestra identidad principal, logo gato y CTAs del portfolio', () => {
    renderWithProviders(<Hero />);

    expect(screen.getByText('José Camilo Colivoro Uribe')).toBeInTheDocument();
    expect(screen.getByText('Analista Programador')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Ver proyectos/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Descargar CV/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Solicitar contacto/i })).toBeInTheDocument();

    const heroHeading = screen.getByRole('heading', { level: 1, name: 'José Camilo Colivoro Uribe' });
    expect(heroHeading).toHaveClass('hero-title');

    const heroLogo = screen.getByAltText(/Logo gato/i);
    expect(heroLogo).toBeInTheDocument();
    expect(heroLogo).toHaveClass('hero-logo-image');
    expect(heroLogo.closest('div')).toHaveClass('hero-logo-shell');
  });
});

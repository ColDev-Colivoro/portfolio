import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import Navbar from '@/components/Navbar';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('Navbar', () => {
  it('renderiza marca, navegación principal y toggle de idioma', () => {
    renderWithProviders(<Navbar />);

    expect(screen.getByText('José Camilo Colivoro Uribe')).toBeInTheDocument();
    expect(screen.getByText('Analista Programador')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Inicio' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Proyectos' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'ES' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'EN' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Descargar CV/i })).toBeInTheDocument();
  });
});

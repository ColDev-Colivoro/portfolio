import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import Hero from '@/components/Hero';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('Hero', () => {
  it('muestra el posicionamiento principal y sus CTAs', () => {
    renderWithProviders(<Hero />);

    expect(screen.getByText('Pensamiento sistémico aplicado al software')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Ver proyectos/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Descargar CV/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Solicitar contacto/i })).toBeInTheDocument();
    expect(screen.getByText('CV ES')).toBeInTheDocument();
    expect(screen.getByText('CV EN')).toBeInTheDocument();
  });
});

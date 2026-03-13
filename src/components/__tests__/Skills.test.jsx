import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import Skills from '@/components/Skills';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('Skills', () => {
  it('muestra capacidades por dominio en vez de una lista genérica', () => {
    renderWithProviders(<Skills />);

    expect(screen.getByText('Dominios donde puedo aportar')).toBeInTheDocument();
    expect(screen.getByText('Frontend y experiencia de uso')).toBeInTheDocument();
    expect(screen.getByText('Backend y reglas de negocio')).toBeInTheDocument();
    expect(screen.getByText('Análisis de sistemas')).toBeInTheDocument();
  });
});

import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import Skills from '@/components/Skills';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('Skills', () => {
  it('muestra capacidades por dominio en vez de una lista genérica', () => {
    renderWithProviders(<Skills />);

    expect(screen.getByText('Capacidades que atraviesan el trabajo')).toBeInTheDocument();
    expect(screen.getByText('Frontend y experiencia')).toBeInTheDocument();
    expect(screen.getByText('Backend y reglas')).toBeInTheDocument();
    expect(screen.getByText('Análisis de sistemas')).toBeInTheDocument();
  });
});

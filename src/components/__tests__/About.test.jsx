import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import About from '@/components/About';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('About', () => {
  it('muestra el posicionamiento sistémico y sus principios', () => {
    renderWithProviders(<About />);

    expect(screen.getByText('Quién soy: análisis de sistemas + ejecución full stack')).toBeInTheDocument();
    expect(screen.getByText('Entender primero')).toBeInTheDocument();
    expect(screen.getByText('Resolver completo')).toBeInTheDocument();
    expect(screen.getByText('Mantener claridad')).toBeInTheDocument();
  });
});

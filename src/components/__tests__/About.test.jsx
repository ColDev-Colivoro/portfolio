import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import About from '@/components/About';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('About', () => {
  it('muestra el posicionamiento sistémico y sus principios', () => {
    renderWithProviders(<About />);

    expect(screen.getByText('No solo escribo código: abordo sistemas completos')).toBeInTheDocument();
    expect(screen.getByText('Entender antes de construir')).toBeInTheDocument();
    expect(screen.getByText('Resolver de punta a punta')).toBeInTheDocument();
    expect(screen.getByText('Software para operación real')).toBeInTheDocument();
  });
});

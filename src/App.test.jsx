import { describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import App from '@/App';
import { renderWithProviders } from '@/test/renderWithProviders';

vi.mock('@/components/Cursor', () => ({ default: () => <div data-testid="cursor" /> }));

describe('App', () => {
  it('renderiza el shell principal sin el loader antiguo', () => {
    renderWithProviders(<App />);

    expect(screen.getByText('Pensamiento sistémico aplicado al software')).toBeInTheDocument();
    expect(screen.queryByText('Cargando experiencia...')).not.toBeInTheDocument();
  });

  it('incluye secciones clave y el cursor montado', () => {
    renderWithProviders(<App />);

    expect(screen.getByTestId('cursor')).toBeInTheDocument();
    expect(screen.getByText('Proyecto destacado')).toBeInTheDocument();
    expect(screen.getAllByText('Certificados').length).toBeGreaterThan(0);
  });
});

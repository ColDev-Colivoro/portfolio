import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import App from '@/App';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('App', () => {
  it('renderiza el shell principal sin el loader antiguo', () => {
    renderWithProviders(<App />);

    expect(screen.getAllByText('José Camilo Colivoro Uribe').length).toBeGreaterThan(0);
    expect(screen.queryByText('Cargando experiencia...')).not.toBeInTheDocument();
  });

  it('incluye secciones clave del portfolio minimal', () => {
    renderWithProviders(<App />);

    expect(screen.getAllByRole('heading', { name: 'Caso principal' }).length).toBeGreaterThan(0);
    expect(screen.getByText('Trabajo seleccionado')).toBeInTheDocument();
    expect(screen.getAllByText('Certificaciones').length).toBeGreaterThan(0);
  });
});

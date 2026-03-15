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

		expect(screen.getAllByRole('heading', { name: 'Caso destacado' }).length).toBeGreaterThan(0);
		expect(screen.getByText('Trabajo seleccionado')).toBeInTheDocument();
		expect(screen.getByText('Capacidades que atraviesan el trabajo')).toBeInTheDocument();
		expect(screen.getByText('Conversemos con contexto')).toBeInTheDocument();
	});

	it('aplica las capas de atmosfera por ruta en el shell', () => {
		const { container } = renderWithProviders(<App />);

		expect(container.querySelector('.route-atmo-primary')).toBeInTheDocument();
		expect(container.querySelector('.route-atmo-secondary')).toBeInTheDocument();
	});
});

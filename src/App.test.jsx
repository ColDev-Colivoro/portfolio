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

	it('renderiza contenido clave por ruta lateral', () => {
		renderWithProviders(<App />, { route: '/proyectos' });
		expect(screen.getByText('Nutriscoc Connect')).toBeInTheDocument();

		renderWithProviders(<App />, { route: '/about' });
		expect(screen.getByText('Capacidades que atraviesan el trabajo')).toBeInTheDocument();

		renderWithProviders(<App />, { route: '/contact' });
		expect(screen.getByRole('heading', { level: 2, name: 'Hablemos de tu proyecto' })).toBeInTheDocument();
	});

	it('aplica las capas de atmosfera por ruta en el shell', () => {
		const { container } = renderWithProviders(<App />);

		expect(container.querySelector('.route-atmo-primary')).toBeInTheDocument();
		expect(container.querySelector('.route-atmo-secondary')).toBeInTheDocument();
	});
});

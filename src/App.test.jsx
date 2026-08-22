import { describe, expect, it } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
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
		expect(screen.getByText('NutriscoConnect')).toBeInTheDocument();

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

	it('renderiza la plataforma SGC en ruta dedicada sin shell de portfolio', () => {
		const { container } = renderWithProviders(<App />, { route: '/demo/sgc' });

		expect(screen.getAllByText('Vista Ejecutiva').length).toBeGreaterThan(0);
		expect(screen.queryByText('Jose Camilo Colivoro Uribe')).not.toBeInTheDocument();
		expect(container.querySelector('.route-atmo-primary')).not.toBeInTheDocument();
	});

	it('resuelve metadata bilingue desde la ruta canonica', async () => {
		window.localStorage.setItem('colivoro-locale', 'en');
		renderWithProviders(<App />, { route: '/about' });

		await waitFor(() => expect(document.title).toBe('Profile | Jose Camilo Colivoro Uribe'));
		window.localStorage.removeItem('colivoro-locale');
	});
});

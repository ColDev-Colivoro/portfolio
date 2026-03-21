import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { screen, waitFor, within } from '@testing-library/react';
import Projects from '@/components/Projects';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('Projects', () => {
	it('muestra una seleccion curada en formato bento sin barra de filtros', () => {
		renderWithProviders(<Projects />);

		expect(screen.queryByText('Trabajo seleccionado')).not.toBeInTheDocument();
		expect(screen.queryByText('Filtrar por dominio')).not.toBeInTheDocument();
		expect(screen.queryByRole('button', { name: 'IA / Automatización' })).not.toBeInTheDocument();

		expect(screen.getByText('Nutriscoc Connect')).toBeInTheDocument();
		expect(screen.getByText('ColDevPOS')).toBeInTheDocument();
		expect(screen.getByText('Dashboard SGC')).toBeInTheDocument();
		expect(screen.getByText('ColDev Radar Sur')).toBeInTheDocument();
		expect(screen.getByText('Mar2Control')).toBeInTheDocument();
	});

	it('expone CTA de plataforma para Dashboard SGC', () => {
		renderWithProviders(<Projects />);

		const sgcCard = screen.getByText('Dashboard SGC').closest('article');
		expect(sgcCard).not.toBeNull();

		expect(within(sgcCard).getByRole('button', { name: /Abrir plataforma/i })).toBeInTheDocument();
	});

  it('abre y cierra modal de caso de estudio usando portal', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Projects />);

    await user.click(screen.getAllByRole('button', { name: /Abrir caso/i })[0]);

    expect(screen.getByText('Caso de estudio')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(document.body.style.overflow).toBe('hidden');

    await user.click(screen.getByRole('button', { name: /Cerrar/i }));

    await waitFor(() => {
      expect(screen.queryByText('Caso de estudio')).not.toBeInTheDocument();
      expect(document.body.style.overflow).toBe('');
    });
  });
});

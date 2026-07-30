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

		expect(screen.getByText('NutriscoConnect')).toBeInTheDocument();
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

	it('expone un enlace directo y accesible a NutriscoConnect desde la tarjeta', () => {
		renderWithProviders(<Projects />);

		const nutriscoCard = screen.getByText('NutriscoConnect').closest('article');
		expect(nutriscoCard).not.toBeNull();
		const link = within(nutriscoCard).getByRole('link', { name: /abrir nutriscoconnect/i });
		expect(link).toHaveAttribute('href', 'https://nutrisco.netlify.app');
		expect(link).toHaveAttribute('target', '_blank');
		expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
		expect(link).toHaveTextContent('Abrir plataforma');
		expect(link).toHaveClass('w-full', 'sm:w-auto', 'focus-visible:ring-2');
	});

	it('reutiliza la URL canónica de NutriscoConnect en el detalle', async () => {
		const user = userEvent.setup();
		renderWithProviders(<Projects />);

		const nutriscoCard = screen.getByText('NutriscoConnect').closest('article');
		await user.click(nutriscoCard);

		const detailLink = within(screen.getByRole('dialog')).getByRole('link', { name: /abrir nutriscoconnect/i });
		expect(detailLink).toHaveAttribute('href', 'https://nutrisco.netlify.app');
	});

  it('abre y cierra el modal superpuesto de caso de estudio', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Projects />);

    await user.click(screen.getAllByRole('button', { name: /Abrir caso/i })[0]);

    const dialog = screen.getByRole('dialog');
    expect(within(dialog).getByRole('heading', { name: 'NutriscoConnect' })).toBeInTheDocument();
    expect(document.body.style.overflow).toBe('hidden');

    await user.click(within(dialog).getByRole('button', { name: /Cerrar/i }));

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      expect(document.body.style.overflow).toBe('');
    });
  });
});

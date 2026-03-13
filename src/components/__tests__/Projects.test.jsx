import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import Projects from '@/components/Projects';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('Projects', () => {
  it('muestra proyectos por dominio y filtra por IA / Automatización', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Projects />);

    expect(screen.getByText('Trabajo seleccionado')).toBeInTheDocument();
    expect(screen.getByText('ColDevPOS')).toBeInTheDocument();
    expect(screen.getByText('VoyScout')).toBeInTheDocument();
    const cardCover = screen.getAllByAltText('ColDevPOS')[0];
    expect(cardCover.closest('div')).toHaveClass('project-card-media');

    await user.click(screen.getByRole('button', { name: 'IA / Automatización' }));

    expect(screen.getByText('Nutriscoc Connect')).toBeInTheDocument();
    expect(screen.queryByText('VoyScout')).not.toBeInTheDocument();
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

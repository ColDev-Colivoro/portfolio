import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import Projects from '@/components/Projects';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('Projects', () => {
  it('muestra proyectos por dominio y filtra por IA / Automatización', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Projects />);

    expect(screen.getByText('Casos y soluciones que muestran distintas capacidades')).toBeInTheDocument();
    expect(screen.getByText('ColDevPOS')).toBeInTheDocument();
    expect(screen.getByText('VoyScout')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'IA / Automatización' }));

    expect(screen.getByText('Nutriscoc Connect')).toBeInTheDocument();
    expect(screen.queryByText('VoyScout')).not.toBeInTheDocument();
  });
});

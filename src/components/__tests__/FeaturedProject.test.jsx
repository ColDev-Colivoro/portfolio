import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import FeaturedProject from '@/components/FeaturedProject';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('FeaturedProject', () => {
  it('presenta a ColDevPOS como caso principal y abre el modal del caso', async () => {
    const user = userEvent.setup();
    renderWithProviders(<FeaturedProject />);

    expect(screen.getByRole('heading', { name: 'Caso destacado' })).toBeInTheDocument();
    expect(screen.getByText('Ecosistema POS para operación real')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /Abrir caso/i }));
    expect(screen.getByText('ColDevPOS — ecosistema en curso para continuidad operativa')).toBeInTheDocument();
    expect(document.body.style.overflow).toBe('hidden');

    await user.click(screen.getByRole('button', { name: /Cerrar/i }));
    await waitFor(() => {
      expect(screen.queryByText('ColDevPOS — ecosistema en curso para continuidad operativa')).not.toBeInTheDocument();
      expect(document.body.style.overflow).toBe('');
    });
  });
});

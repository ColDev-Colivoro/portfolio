import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import FeaturedProject from '@/components/FeaturedProject';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('FeaturedProject', () => {
  it('presenta a ColDevPOS como caso principal y abre el modal del caso', async () => {
    const user = userEvent.setup();
    renderWithProviders(<FeaturedProject />);

    expect(screen.getByRole('heading', { name: 'Proyecto destacado' })).toBeInTheDocument();
    expect(screen.getByText('Sistema POS para operación real')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /Ver caso de estudio/i }));
    expect(screen.getByText('ColDevPOS — continuidad operativa para punto de venta')).toBeInTheDocument();
  });
});

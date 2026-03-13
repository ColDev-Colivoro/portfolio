import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import Footer from '@/components/Footer';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('Footer', () => {
  it('muestra marca, enlaces públicos y volver arriba', () => {
    renderWithProviders(<Footer />);

    expect(screen.getByText('COLIVORO / SYSTEMS')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute('href', 'https://github.com/ColDev-Colivoro');
    expect(screen.getByRole('link', { name: /linkedin/i })).toHaveAttribute('href', 'https://www.linkedin.com/in/camilo-colivoro-1a5206386');
    expect(screen.getByRole('button', { name: /Volver arriba/i })).toBeInTheDocument();
  });
});

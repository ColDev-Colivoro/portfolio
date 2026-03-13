import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import Footer from '@/components/Footer';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('Footer', () => {
  it('muestra marca, enlaces públicos y volver arriba', () => {
    renderWithProviders(<Footer />);

    expect(screen.getByText('José Camilo Colivoro Uribe')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute('href', 'https://github.com/ColDev-Colivoro');
    expect(screen.getByRole('link', { name: /linkedin/i })).toHaveAttribute('href', 'https://www.linkedin.com/in/camilo-colivoro-1a5206386');
    expect(screen.getByRole('button', { name: /Volver arriba/i })).toBeInTheDocument();

    const footerLogo = screen.getByAltText('Logo gato ColDev');
    expect(footerLogo).toHaveClass('footer-brand-logo');
    expect(footerLogo.closest('div')).toHaveClass('footer-brand-shell');
    expect(screen.getByRole('heading', { name: 'José Camilo Colivoro Uribe' })).toHaveClass('footer-brand-title');
  });
});

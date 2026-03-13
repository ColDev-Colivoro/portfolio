import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import Contact from '@/components/Contact';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('Contact', () => {
  it('muestra el formulario, LinkedIn y evita exponer canales privados como CTA directo', () => {
    renderWithProviders(<Contact />);

    expect(screen.getByText('Conversemos con contexto')).toBeInTheDocument();
    expect(screen.getByLabelText('Nombre')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Ver LinkedIn/i })).toBeInTheDocument();
    expect(document.querySelector('a[href^="tel:"]')).toBeNull();
    expect(document.querySelector('a[href^="mailto:"]')).toBeNull();
  });
});

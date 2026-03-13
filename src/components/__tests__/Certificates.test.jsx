import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import Certificates from '@/components/Certificates';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('Certificates', () => {
  it('muestra certificados públicos con sus descripciones', () => {
    renderWithProviders(<Certificates />);

    expect(screen.getByText('Certificados')).toBeInTheDocument();
    expect(screen.getByText('Desarrollador Full Stack')).toBeInTheDocument();
    expect(screen.getByText('Infraestructura TI Segura')).toBeInTheDocument();
    expect(screen.getAllByText('Ver certificado').length).toBeGreaterThan(0);
  });
});

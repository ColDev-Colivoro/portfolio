import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FeaturedProject from '@/components/FeaturedProject';

describe('FeaturedProject', () => {
    const renderFeatured = () => {
        return render(
            <MemoryRouter>
                <FeaturedProject />
            </MemoryRouter>
        );
    };

    it('muestra el título de ColDevPOS como proyecto destacado', () => {
        renderFeatured();
        expect(screen.getByText(/ColDevPOS/)).toBeInTheDocument();
    });

    it('muestra el badge "Proyecto Destacado"', () => {
        renderFeatured();
        expect(screen.getByText('Proyecto Destacado')).toBeInTheDocument();
    });

    it('menciona la propuesta de valor offline', () => {
        renderFeatured();
        expect(screen.getByText(/Punto de Venta sin Internet/)).toBeInTheDocument();
    });

    it('tiene el botón de "Ver Caso de Estudio"', () => {
        renderFeatured();
        expect(screen.getByText('Ver Caso de Estudio')).toBeInTheDocument();
    });
});

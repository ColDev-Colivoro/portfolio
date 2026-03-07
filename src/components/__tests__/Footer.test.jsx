import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from '@/components/Footer';

describe('Footer', () => {
    const renderFooter = () => {
        return render(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>
        );
    };

    it('muestra el título PORTFOLIO', () => {
        renderFooter();
        expect(screen.getByText('PORTFOLIO')).toBeInTheDocument();
    });

    it('muestra la información de contacto', () => {
        renderFooter();
        expect(screen.getByText('jose.coldev@gmail.com')).toBeInTheDocument();
        expect(screen.getByText('+569 45867825')).toBeInTheDocument();
    });

    it('muestra el copyright con el año actual', () => {
        renderFooter();
        const currentYear = new Date().getFullYear().toString();
        expect(screen.getByText(new RegExp(currentYear))).toBeInTheDocument();
    });

    it('tiene enlaces de redes sociales', () => {
        renderFooter();
        const socialLinks = document.querySelectorAll('a[target="_blank"]');
        expect(socialLinks.length).toBeGreaterThanOrEqual(3);
    });

    it('muestra la sección de enlaces rápidos', () => {
        renderFooter();
        expect(screen.getByText('Enlaces Rápidos')).toBeInTheDocument();
    });
});

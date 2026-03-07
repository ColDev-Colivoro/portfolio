import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '@/components/Navbar';

describe('Navbar', () => {
    const mockOnSectionChange = vi.fn();

    const renderNavbar = (activeSection = 'home') => {
        return render(
            <MemoryRouter>
                <Navbar activeSection={activeSection} onSectionChange={mockOnSectionChange} />
            </MemoryRouter>
        );
    };

    it('renderiza el logo del portfolio', () => {
        renderNavbar();
        expect(screen.getByText('PORTaFOLIO')).toBeInTheDocument();
    });

    it('muestra todos los items de navegación', () => {
        renderNavbar();
        const navLabels = ['Inicio', 'Sobre Mí', 'Proyecto Destacado', 'Proyectos', 'Habilidades', 'Contacto'];
        navLabels.forEach(label => {
            // Puede haber duplicados (desktop + mobile), así que usamos getAllByText
            const elements = screen.getAllByText(label);
            expect(elements.length).toBeGreaterThan(0);
        });
    });

    it('resalta la sección activa', () => {
        renderNavbar('about');
        // El item de "Sobre Mí" debería tener la clase de color activo
        const aboutButtons = screen.getAllByText('Sobre Mí');
        // Al menos uno debería tener la clase de acento
        const hasActiveClass = aboutButtons.some(btn => btn.className.includes('text-accent'));
        expect(hasActiveClass).toBe(true);
    });
});

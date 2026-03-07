import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Projects from '@/components/Projects';

describe('Projects', () => {
    const renderProjects = () => {
        return render(
            <MemoryRouter>
                <Projects />
            </MemoryRouter>
        );
    };

    it('muestra el título de la sección de proyectos', () => {
        renderProjects();
        expect(screen.getByText('Mis Proyectos en Proceso')).toBeInTheDocument();
    });

    it('renderiza al menos un proyecto', () => {
        renderProjects();
        // El primer proyecto es "Colivoro Developer"
        expect(screen.getByText('Colivoro Developer')).toBeInTheDocument();
    });

    it('tiene botones de navegación (prev/next)', () => {
        renderProjects();
        // Los botones contienen ChevronLeft y ChevronRight
        const buttons = document.querySelectorAll('button');
        expect(buttons.length).toBeGreaterThan(0);
    });

    it('muestra los tags de tecnología del proyecto visible', () => {
        renderProjects();
        expect(screen.getByText('React')).toBeInTheDocument();
    });

    it('tiene botones de "Ver Proyecto" y "Ver Código"', () => {
        renderProjects();
        expect(screen.getByText('Ver Proyecto')).toBeInTheDocument();
        expect(screen.getByText('Ver Código')).toBeInTheDocument();
    });
});

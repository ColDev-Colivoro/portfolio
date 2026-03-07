import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import About from '@/components/About';

describe('About', () => {
    const renderAbout = () => {
        return render(
            <MemoryRouter>
                <About />
            </MemoryRouter>
        );
    };

    it('muestra el título "Sobre Mí"', () => {
        renderAbout();
        expect(screen.getByText('Sobre Mí')).toBeInTheDocument();
    });

    it('muestra el subtítulo del rol', () => {
        renderAbout();
        expect(screen.getByText('Desarrollador & Diseñador Digital')).toBeInTheDocument();
    });

    it('muestra datos personales clave', () => {
        renderAbout();
        expect(screen.getByText('Chiloé, Chile')).toBeInTheDocument();
        expect(screen.getByText('Freelance Disponible')).toBeInTheDocument();
        expect(screen.getByText('2+ Años Experiencia')).toBeInTheDocument();
    });

    it('muestra las tarjetas de especialidades', () => {
        renderAbout();
        expect(screen.getByText('Diseño')).toBeInTheDocument();
        expect(screen.getByText('Desarrollo')).toBeInTheDocument();
        expect(screen.getByText('Estrategia')).toBeInTheDocument();
    });
});

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Skills from '@/components/Skills';

describe('Skills', () => {
    const renderSkills = () => {
        return render(
            <MemoryRouter>
                <Skills />
            </MemoryRouter>
        );
    };

    it('muestra el título "Mis Habilidades"', () => {
        renderSkills();
        expect(screen.getByText('Mis Habilidades')).toBeInTheDocument();
    });

    it('muestra las categorías principales de habilidades', () => {
        renderSkills();
        expect(screen.getByText('Frontend')).toBeInTheDocument();
        expect(screen.getByText('Backend')).toBeInTheDocument();
        expect(screen.getByText('Diseño')).toBeInTheDocument();
        expect(screen.getByText('Bases de Datos')).toBeInTheDocument();
    });

    it('muestra habilidades específicas dentro de Frontend', () => {
        renderSkills();
        expect(screen.getByText('React')).toBeInTheDocument();
        expect(screen.getByText('JavaScript')).toBeInTheDocument();
        expect(screen.getByText('TailwindCSS')).toBeInTheDocument();
    });

    it('muestra la sección "Otras Habilidades"', () => {
        renderSkills();
        expect(screen.getByText('Otras Habilidades')).toBeInTheDocument();
        expect(screen.getByText('Git/GitHub')).toBeInTheDocument();
        expect(screen.getByText('Testing')).toBeInTheDocument();
    });
});

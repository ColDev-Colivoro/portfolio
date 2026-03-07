import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Hero from '@/components/Hero';

describe('Hero', () => {
    const renderHero = () => {
        return render(
            <MemoryRouter>
                <Hero />
            </MemoryRouter>
        );
    };

    it('muestra el nombre del desarrollador', () => {
        renderHero();
        expect(screen.getByText('Jose Colivoro')).toBeInTheDocument();
    });

    it('muestra el saludo "¡Hola Mundo! Soy"', () => {
        renderHero();
        expect(screen.getByText('¡Hola Mundo! Soy')).toBeInTheDocument();
    });

    it('muestra el subtítulo del rol profesional', () => {
        renderHero();
        expect(screen.getByText('Desarrollador & Diseñador Digital')).toBeInTheDocument();
    });

    it('contiene los botones de CTA', () => {
        renderHero();
        expect(screen.getByText('Contáctame')).toBeInTheDocument();
        expect(screen.getByText('Ver Proyectos')).toBeInTheDocument();
    });

    it('muestra los iconos de redes sociales (GitHub, LinkedIn, Instagram)', () => {
        renderHero();
        const socialLinks = document.querySelectorAll('a[target="_blank"]');
        expect(socialLinks.length).toBeGreaterThanOrEqual(3);
    });
});

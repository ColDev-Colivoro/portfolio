import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Contact from '@/components/Contact';

// Mock del useToast para evitar errores
vi.mock('@/components/ui/use-toast', () => ({
    useToast: () => ({ toast: vi.fn() }),
}));

describe('Contact', () => {
    const renderContact = () => {
        return render(
            <MemoryRouter>
                <Contact />
            </MemoryRouter>
        );
    };

    it('muestra el título "Contáctame"', () => {
        renderContact();
        expect(screen.getByText('Contáctame')).toBeInTheDocument();
    });

    it('muestra el formulario con campos necesarios', () => {
        renderContact();
        expect(screen.getByLabelText('Nombre')).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Asunto')).toBeInTheDocument();
        expect(screen.getByLabelText('Mensaje')).toBeInTheDocument();
    });

    it('muestra el botón de envío', () => {
        renderContact();
        expect(screen.getByText('Enviar Mensaje')).toBeInTheDocument();
    });

    it('muestra la información de contacto directa', () => {
        renderContact();
        expect(screen.getByText('jose.coldev@gmail.com')).toBeInTheDocument();
        expect(screen.getByText('+569 45867825')).toBeInTheDocument();
    });

    it('muestra el horario de trabajo', () => {
        renderContact();
        expect(screen.getByText('Horario de Trabajo')).toBeInTheDocument();
    });
});

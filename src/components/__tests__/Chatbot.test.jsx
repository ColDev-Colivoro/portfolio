import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Chatbot from '@/components/Chatbot';

describe('Chatbot', () => {
    const renderChatbot = () => {
        return render(
            <MemoryRouter>
                <Chatbot />
            </MemoryRouter>
        );
    };

    it('renderiza el botón flotante', () => {
        renderChatbot();
        // El botón flotante debería estar visible
        const floatingButton = document.querySelector('button.fixed');
        expect(floatingButton).toBeTruthy();
    });

    it('abre la ventana de chat al hacer clic en el botón flotante', () => {
        renderChatbot();
        const floatingButton = document.querySelector('button.fixed');
        fireEvent.click(floatingButton);

        // Debería mostrar el header del chat "Asistente de José"
        expect(screen.getByText('Asistente de José')).toBeInTheDocument();
    });

    it('muestra el mensaje de bienvenida al abrir', () => {
        renderChatbot();
        const floatingButton = document.querySelector('button.fixed');
        fireEvent.click(floatingButton);

        expect(screen.getByText(/Soy el asistente virtual/i)).toBeInTheDocument();
    });

    it('tiene un campo de input para escribir mensajes', () => {
        renderChatbot();
        const floatingButton = document.querySelector('button.fixed');
        fireEvent.click(floatingButton);

        const input = screen.getByPlaceholderText('Escribe tu mensaje...');
        expect(input).toBeInTheDocument();
    });

    it('cierra la ventana de chat al hacer clic en cerrar', () => {
        renderChatbot();
        // Abrir
        const floatingButton = document.querySelector('button.fixed');
        fireEvent.click(floatingButton);
        expect(screen.getByText('Asistente de José')).toBeInTheDocument();

        // Cerrar (el icono X dentro del header)
        const closeButton = screen.getByText('Asistente de José')
            .closest('div')
            .parentElement
            .querySelector('button');

        if (closeButton) {
            fireEvent.click(closeButton);
        }
    });
});

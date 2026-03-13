import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import Chatbot from '@/components/Chatbot';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('Chatbot', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'scrollY', {
      value: 480,
      writable: true,
      configurable: true,
    });
  });

  const renderChatbot = async () => {
    const view = renderWithProviders(<Chatbot />);
    await act(async () => {
      window.dispatchEvent(new Event('scroll'));
    });
    return view;
  };

  it('renderiza el botón flotante cuando el usuario ya salió del hero', async () => {
    await renderChatbot();
    expect(screen.getByRole('button', { name: /open assistant/i })).toBeInTheDocument();
  });

  it('abre la ventana de chat al hacer clic en el botón flotante', async () => {
    await renderChatbot();
    fireEvent.click(screen.getByRole('button', { name: /open assistant/i }));

    expect(screen.getByText('Asistente del portfolio')).toBeInTheDocument();
  });

  it('muestra el mensaje de bienvenida al abrir', async () => {
    await renderChatbot();
    fireEvent.click(screen.getByRole('button', { name: /open assistant/i }));

    expect(screen.getByText(/Soy el asistente del portfolio/i)).toBeInTheDocument();
  });

  it('tiene un campo de input para escribir mensajes', async () => {
    await renderChatbot();
    fireEvent.click(screen.getByRole('button', { name: /open assistant/i }));

    expect(screen.getByPlaceholderText('Escribe tu mensaje...')).toBeInTheDocument();
  });

  it('cierra la ventana de chat al hacer clic en cerrar', async () => {
    await renderChatbot();
    fireEvent.click(screen.getByRole('button', { name: /open assistant/i }));
    expect(screen.getByText('Asistente del portfolio')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /cerrar asistente/i }));

    await waitFor(() => {
      expect(screen.queryByText('Asistente del portfolio')).not.toBeInTheDocument();
    });
  });
});

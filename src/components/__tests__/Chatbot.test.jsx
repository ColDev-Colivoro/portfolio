import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Chatbot from '@/components/Chatbot';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('Chatbot', () => {
	const renderChatbot = async () => {
		const view = renderWithProviders(<Chatbot />);
		await screen.findByRole('button', { name: /open assistant/i }, { timeout: 2000 });
		return view;
	};

	it('renderiza el botón flotante cuando el usuario ya salió del hero', async () => {
		await renderChatbot();
		expect(await screen.findByRole('button', { name: /open assistant/i })).toBeInTheDocument();
	});

	it('abre la ventana de chat al hacer clic en el botón flotante', async () => {
		await renderChatbot();
		fireEvent.click(await screen.findByRole('button', { name: /open assistant/i }));

		expect(await screen.findByText('Chimubot')).toBeInTheDocument();
	});

	it('muestra el mensaje de bienvenida al abrir', async () => {
		await renderChatbot();
		fireEvent.click(await screen.findByRole('button', { name: /open assistant/i }));

		expect(screen.getByText(/soy chimubot/i)).toBeInTheDocument();
	});

	it('tiene un campo de input para escribir mensajes', async () => {
		await renderChatbot();
		fireEvent.click(await screen.findByRole('button', { name: /open assistant/i }));

		expect(screen.getByPlaceholderText('Escribe tu mensaje...')).toBeInTheDocument();
	});

	it('cierra la ventana de chat al hacer clic en cerrar', async () => {
		await renderChatbot();
		fireEvent.click(await screen.findByRole('button', { name: /open assistant/i }));
		expect(screen.getByRole('heading', { name: 'Chimubot' })).toBeInTheDocument();
		const dialog = screen.getByRole('dialog');

		fireEvent.click(within(dialog).getByRole('button', { name: /cerrar asistente/i }));

		await waitFor(() => {
			expect(screen.queryByRole('heading', { name: 'Chimubot' })).not.toBeInTheDocument();
		});
	});
});

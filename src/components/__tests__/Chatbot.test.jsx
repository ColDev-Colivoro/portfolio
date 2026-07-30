import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Chatbot from '@/components/Chatbot';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('Chatbot', () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

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

	it('presenta párrafos y listas como bloques semánticos sin interpretar HTML no confiable', async () => {
		vi.stubGlobal(
			'fetch',
			vi.fn().mockResolvedValue({
				ok: true,
				status: 200,
				json: async () => ({
					reply:
						'Primer párrafo.\n\nSegundo párrafo.\n\n- KPI contra meta\n* Compromiso trazable\n\n1. Revisar datos\n2. Acordar acciones\n\n<img src=x onerror="alert(1)"><script>alert(2)</script> javascript:alert(3)',
				}),
			}),
		);

		await renderChatbot();
		fireEvent.click(await screen.findByRole('button', { name: /open assistant/i }));
		fireEvent.change(screen.getByPlaceholderText('Escribe tu mensaje...'), { target: { value: 'Cuéntame' } });
		fireEvent.submit(screen.getByPlaceholderText('Escribe tu mensaje...').closest('form'));

		const dialog = screen.getByRole('dialog');
		expect(await within(dialog).findByText('Primer párrafo.')).toBeInTheDocument();
		expect(within(dialog).getByText('Segundo párrafo.')).toBeInTheDocument();
		expect(within(dialog).getByRole('list', { name: /elementos/i })).toBeInTheDocument();
		expect(within(dialog).getByRole('list', { name: /pasos/i })).toBeInTheDocument();
		expect(within(dialog).getAllByRole('listitem')).toHaveLength(4);
		expect(dialog.querySelector('script')).toBeNull();
		expect(dialog.querySelector('img[src="x"]')).toBeNull();
		expect(dialog.querySelector('a[href^="javascript:"]')).toBeNull();
		expect(within(dialog).getByText(/<img src=x onerror=/)).toBeInTheDocument();
	});

	it('convierte solo enlaces web seguros y conserva como texto los esquemas peligrosos', async () => {
		vi.stubGlobal(
			'fetch',
			vi.fn().mockResolvedValue({
				ok: true,
				status: 200,
				json: async () => ({
					reply:
						'Demo: [Abrir NutriscoConnect](https://nutriscoc.com)\n\nDocumentación: https://example.com/guia\n\nNo abrir: [ataque](javascript:alert(1))',
				}),
			}),
		);

		await renderChatbot();
		fireEvent.click(await screen.findByRole('button', { name: /open assistant/i }));
		fireEvent.change(screen.getByPlaceholderText('Escribe tu mensaje...'), { target: { value: 'Enlaces' } });
		fireEvent.submit(screen.getByPlaceholderText('Escribe tu mensaje...').closest('form'));

		const dialog = screen.getByRole('dialog');
		const demoLink = await within(dialog).findByRole('link', { name: 'Abrir NutriscoConnect' });
		expect(demoLink).toHaveAttribute('href', 'https://nutriscoc.com');
		expect(demoLink).toHaveAttribute('target', '_blank');
		expect(demoLink).toHaveAttribute('rel', expect.stringContaining('noopener'));
		expect(within(dialog).getByRole('link', { name: 'https://example.com/guia' })).toBeInTheDocument();
		expect(within(dialog).queryByRole('link', { name: 'ataque' })).not.toBeInTheDocument();
		expect(within(dialog).getByText(/javascript:alert/)).toBeInTheDocument();
	});

	it('presenta completo el cierre de una respuesta extensa dentro del área desplazable', async () => {
		vi.stubGlobal(
			'fetch',
			vi.fn().mockResolvedValue({
				ok: true,
				status: 200,
				json: async () => ({
					reply: `Resumen inicial.\n\n${'Detalle operativo '.repeat(100)}\n\nCierre verificable.`,
				}),
			}),
		);

		await renderChatbot();
		fireEvent.click(await screen.findByRole('button', { name: /open assistant/i }));
		fireEvent.change(screen.getByPlaceholderText('Escribe tu mensaje...'), { target: { value: 'Amplía' } });
		fireEvent.submit(screen.getByPlaceholderText('Escribe tu mensaje...').closest('form'));

		expect(await within(screen.getByRole('dialog')).findByText('Cierre verificable.')).toBeInTheDocument();
	});
});

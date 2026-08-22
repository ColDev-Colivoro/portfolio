import { afterEach, describe, expect, it, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Contact from '@/components/Contact';
import { renderWithProviders } from '@/test/renderWithProviders';

const { toastSpy } = vi.hoisted(() => ({ toastSpy: vi.fn() }));

vi.mock('@/components/ui/use-toast', () => ({
	useToast: () => ({ toast: toastSpy }),
}));

afterEach(() => {
	vi.unstubAllEnvs();
	vi.unstubAllGlobals();
	toastSpy.mockReset();
	window.localStorage.clear();
});

const revealAndFillForm = async (user) => {
	await user.type(screen.getByLabelText('Nombre'), 'Jose Colivoro');
	await user.type(await screen.findByLabelText('Email'), 'jose@example.test');
	await user.type(await screen.findByLabelText('Idea u objetivo'), 'Automatizar inventario');
	await user.type(await screen.findByLabelText('Contexto'), 'Necesito trazabilidad operativa.');
};

describe('Contact', () => {
	it('mantiene Formspree y LinkedIn, y oculta WhatsApp si faltan envs', async () => {
		const user = userEvent.setup();
		renderWithProviders(<Contact />);

		expect(screen.getByText('Hablemos de tu proyecto')).toBeInTheDocument();
		expect(screen.getByText(/Cuéntame sobre tu idea o desafío/)).toBeInTheDocument();
		expect(screen.getByLabelText('Nombre')).toBeInTheDocument();
		expect(screen.queryByLabelText('Email')).not.toBeInTheDocument();
		await user.type(screen.getByLabelText('Nombre'), 'Jose Colivoro');
		expect(await screen.findByLabelText('Email')).toBeInTheDocument();
		expect(screen.getByRole('link', { name: /Ver LinkedIn/i })).toBeInTheDocument();
		expect(screen.queryByRole('link', { name: 'Escribir por WhatsApp' })).not.toBeInTheDocument();
		expect(document.querySelector('a[href^="tel:"]')).toBeNull();
		expect(document.querySelector('a[href^="mailto:"]')).toBeNull();
	});

	it('muestra WhatsApp secundario solo con ambas variables válidas y localizado ES/EN', () => {
		vi.stubEnv('VITE_WHATSAPP_NUMBER', '+1 (202) 555-0100');
		vi.stubEnv('VITE_WHATSAPP_MESSAGE', 'Idea & POS?');
		const { unmount } = renderWithProviders(<Contact />);
		const esLink = screen.getByRole('link', { name: 'Escribir por WhatsApp' });
		expect(esLink).toHaveAttribute('href', 'https://wa.me/12025550100?text=Idea%20%26%20POS%3F');
		expect(esLink).toHaveAttribute('target', '_blank');
		expect(esLink).toHaveAttribute('rel', expect.stringContaining('noopener'));

		unmount();
		window.localStorage.setItem('colivoro-locale', 'en');
		renderWithProviders(<Contact />);
		expect(screen.getByRole('link', { name: 'Message on WhatsApp' })).toHaveAttribute(
			'href',
			'https://wa.me/12025550100?text=Idea%20%26%20POS%3F',
		);
		expect(screen.getByText(/Tell me about your idea or challenge/)).toBeInTheDocument();
	});

	it('oculta WhatsApp inválido sin degradar los canales primarios', () => {
		vi.stubEnv('VITE_WHATSAPP_NUMBER', 'javascript:+1 202 555 0100');
		vi.stubEnv('VITE_WHATSAPP_MESSAGE', 'Hola');
		renderWithProviders(<Contact />);

		expect(screen.queryByRole('link', { name: /WhatsApp/i })).not.toBeInTheDocument();
		expect(screen.getByRole('link', { name: /Ver LinkedIn/i })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Enviar solicitud' })).toBeDisabled();
	});

	it('envía el formulario primario a Formspree y reinicia la revelación al tener éxito', async () => {
		const user = userEvent.setup();
		const fetchSpy = vi.fn().mockResolvedValue({ ok: true });
		vi.stubGlobal('fetch', fetchSpy);
		vi.stubEnv('VITE_FORMSPREE_ENDPOINT', 'https://example.test/formspree');
		renderWithProviders(<Contact />);

		await revealAndFillForm(user);
		await user.click(screen.getByRole('button', { name: 'Enviar solicitud' }));

		await waitFor(() => expect(fetchSpy).toHaveBeenCalledTimes(1));
		expect(fetchSpy).toHaveBeenCalledWith('https://example.test/formspree', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				name: 'Jose Colivoro',
				email: 'jose@example.test',
				subject: 'Automatizar inventario',
				message: 'Necesito trazabilidad operativa.',
			}),
		});
		await waitFor(() => expect(screen.queryByLabelText('Email')).not.toBeInTheDocument());
		expect(screen.getByLabelText('Nombre')).toHaveValue('');
		expect(toastSpy).toHaveBeenCalledWith(expect.objectContaining({ title: 'Solicitud enviada' }));
	});

	it('conserva formulario y WhatsApp disponibles si Formspree falla', async () => {
		const user = userEvent.setup();
		vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }));
		vi.stubEnv('VITE_WHATSAPP_NUMBER', '+1 202 555 0100');
		vi.stubEnv('VITE_WHATSAPP_MESSAGE', 'Necesito ayuda');
		renderWithProviders(<Contact />);

		await revealAndFillForm(user);
		await user.click(screen.getByRole('button', { name: 'Enviar solicitud' }));

		await waitFor(() => expect(toastSpy).toHaveBeenCalledWith(expect.objectContaining({
			title: 'No se pudo enviar',
			variant: 'destructive',
		})));
		expect(screen.getByRole('button', { name: 'Enviar solicitud' })).toBeEnabled();
		expect(screen.getByLabelText('Contexto')).toHaveValue('Necesito trazabilidad operativa.');
		expect(screen.getByRole('link', { name: 'Escribir por WhatsApp' })).toBeInTheDocument();
	});
});

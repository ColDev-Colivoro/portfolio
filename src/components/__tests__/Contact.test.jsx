import { describe, expect, it } from 'vitest';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import Contact from '@/components/Contact';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('Contact', () => {
	it('muestra el formulario, LinkedIn y evita exponer canales privados como CTA directo', async () => {
		renderWithProviders(<Contact />);

		expect(screen.getByText('Hablemos de tu proyecto')).toBeInTheDocument();
		expect(screen.getByLabelText('Nombre')).toBeInTheDocument();
		expect(screen.queryByLabelText('Email')).not.toBeInTheDocument();

		fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Jose Colivoro' } });
		await waitFor(() => {
			expect(screen.getByLabelText('Email')).toBeInTheDocument();
		});

		expect(screen.getByRole('link', { name: /Ver LinkedIn/i })).toBeInTheDocument();
		expect(document.querySelector('a[href^="tel:"]')).toBeNull();
		expect(document.querySelector('a[href^="mailto:"]')).toBeNull();
	});
});

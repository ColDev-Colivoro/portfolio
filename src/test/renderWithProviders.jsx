import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LocaleProvider } from '@/context/LocaleContext';

export const renderWithProviders = (ui, { route = '/', ...options } = {}) =>
	render(
		<LocaleProvider>
			<MemoryRouter initialEntries={[route]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
				{ui}
			</MemoryRouter>
		</LocaleProvider>,
		options,
	);

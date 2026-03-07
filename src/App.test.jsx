import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '@/App';

// Mock de los componentes pesados para aislar los tests del App
vi.mock('@/components/Cursor', () => ({ default: () => <div data-testid="cursor" /> }));

describe('App', () => {
    it('renderiza sin errores (smoke test)', () => {
        // Usamos MemoryRouter porque App ya NO envuelve en BrowserRouter
        render(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        );
        // Si no lanza un error, el test pasa
        expect(document.body).toBeTruthy();
    });

    it('muestra el loader de carga inicialmente', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        );
        expect(screen.getByText('Cargando experiencia...')).toBeInTheDocument();
    });
});

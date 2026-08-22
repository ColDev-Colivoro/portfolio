import { screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import AboutPage from '@/pages/AboutPage';
import { renderWithProviders } from '@/test/renderWithProviders';

const profileCopy = {
	es: {
		paragraphs: [
			'Trabajo entre análisis de sistemas, backend, frontend, datos e infraestructura. Eso me permite conectar contexto operativo, experiencia de uso y ejecución técnica sin perder coherencia.',
			'He abordado trazabilidad, inventario, reportes, continuidad operativa e integración de IA aplicada. Busco que cada solución se sienta precisa, sobria y mantenible.',
		],
		principles: ['Entender primero', 'Resolver completo', 'Mantener claridad'],
		capabilities: ['Frontend y experiencia', 'Backend y reglas', 'Datos y trazabilidad', 'DevOps práctico', 'IA aplicada', 'Análisis de sistemas'],
		certificates: ['Desarrollador Full Stack', 'Infraestructura TI Segura', 'Desarrollo de Aplicaciones'],
		resume: ['Descargar CV', '/documents/cv/jose-colivoro-cv-es.pdf'],
	},
	en: {
		paragraphs: [
			'I work across systems analysis, backend, frontend, data, and infrastructure. That lets me connect operational context, user experience, and technical execution without losing coherence.',
			'I have tackled traceability, inventory, reporting, operational continuity, and applied AI integrations. I aim for each solution to feel precise, sober, and maintainable.',
		],
		principles: ['Understand first', 'Solve holistically', 'Keep clarity'],
		capabilities: ['Frontend and experience', 'Backend and rules', 'Data and traceability', 'Practical DevOps', 'Applied AI', 'Systems analysis'],
		certificates: ['Full Stack Developer', 'Secure IT Infrastructure', 'Application Development'],
		resume: ['Download resume', '/documents/cv/jose-colivoro-cv-en.pdf'],
	},
};

afterEach(() => window.localStorage.clear());

const expectProfile = (lang) => {
	for (const paragraph of profileCopy[lang].paragraphs) expect(screen.getByText(paragraph)).toBeInTheDocument();
	for (const principle of profileCopy[lang].principles) expect(screen.getByText(principle)).toBeInTheDocument();
	for (const capability of profileCopy[lang].capabilities) expect(screen.getByText(capability)).toBeInTheDocument();
	for (const certificate of profileCopy[lang].certificates) expect(screen.getByText(certificate)).toBeInTheDocument();
	const [label, href] = profileCopy[lang].resume;
	expect(screen.getByRole('link', { name: label })).toHaveAttribute('href', href);
};

describe('Perfil preservado', () => {
	it('mantiene contenido, capacidades, certificados y CV en espanol', () => {
		renderWithProviders(<AboutPage />, { route: '/about' });
		expectProfile('es');
	});

	it('mantiene paridad completa y el CV correcto en ingles', () => {
		window.localStorage.setItem('colivoro-locale', 'en');
		renderWithProviders(<AboutPage />, { route: '/about' });
		expectProfile('en');
	});
});

import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

import { certificateItems, resumeLinks, siteContent } from '@/data/siteContent';

const expectedAbout = {
	eyebrow: { es: 'Perfil', en: 'Profile' },
	title: {
		es: 'Analizo sistemas y los convierto en software',
		en: 'I analyze systems and turn them into software',
	},
	lead: {
		es: 'Mi fortaleza no es solo programar: es entender procesos, modelar reglas y construir soluciones completas con criterio.',
		en: 'My strength is not only coding: it is understanding processes, modeling rules, and building complete solutions with judgment.',
	},
	body: [
		{
			es: 'Trabajo entre análisis de sistemas, backend, frontend, datos e infraestructura. Eso me permite conectar contexto operativo, experiencia de uso y ejecución técnica sin perder coherencia.',
			en: 'I work across systems analysis, backend, frontend, data, and infrastructure. That lets me connect operational context, user experience, and technical execution without losing coherence.',
		},
		{
			es: 'He abordado trazabilidad, inventario, reportes, continuidad operativa e integración de IA aplicada. Busco que cada solución se sienta precisa, sobria y mantenible.',
			en: 'I have tackled traceability, inventory, reporting, operational continuity, and applied AI integrations. I aim for each solution to feel precise, sober, and maintainable.',
		},
	],
	principles: [
		{
			title: { es: 'Entender primero', en: 'Understand first' },
			description: {
				es: 'Levantar el sistema real antes de decidir la forma final del software.',
				en: 'Understand the real system before deciding the final software shape.',
			},
		},
		{
			title: { es: 'Resolver completo', en: 'Solve holistically' },
			description: {
				es: 'Ir desde el problema hasta la entrega sin fragmentar la solución.',
				en: 'Move from problem to delivery without fragmenting the solution.',
			},
		},
		{
			title: { es: 'Mantener claridad', en: 'Keep clarity' },
			description: {
				es: 'Interfaces limpias, lógica sólida y decisiones que puedan sostenerse en el tiempo.',
				en: 'Clean interfaces, solid logic, and decisions that can stand over time.',
			},
		},
	],
};

const expectedCapabilities = [
	['Frontend y experiencia', 'Frontend and experience', 'Interfaces sobrias, sistemas de UI y recorridos claros para escenarios reales de uso.', 'Sober interfaces, UI systems, and clear journeys for real usage scenarios.', ['React', 'TailwindCSS', 'UI systems', 'Operational UX']],
	['Backend y reglas', 'Backend and rules', 'Servicios, APIs y lógica de negocio con foco en consistencia, claridad y mantenimiento.', 'Services, APIs, and business logic focused on consistency, clarity, and maintenance.', ['Python', 'Django', 'REST', 'RBAC']],
	['Datos y trazabilidad', 'Data and traceability', 'Procesos auditables, reportes y visibilidad para operación, control y seguimiento.', 'Auditable processes, reporting, and visibility for operations, control, and follow-up.', ['PostgreSQL', 'MySQL', 'Traceability', 'Integrations']],
	['DevOps práctico', 'Practical DevOps', 'Infraestructura, contenedores y despliegue como parte del resultado final, no como apéndice.', 'Infrastructure, containers, and deployment as part of the final outcome, not an appendix.', ['Docker', 'Nginx', 'Deploy', 'CI mindset']],
	['IA aplicada', 'Applied AI', 'LLMs, asistentes y automatización puestos al servicio de procesos y personas.', 'LLMs, assistants, and automation serving processes and people.', ['OpenAI', 'Gemini', 'Agents', 'Automation']],
	['Análisis de sistemas', 'Systems analysis', 'El punto de unión entre problema, estructura, proceso y solución digital.', 'The meeting point between problem, structure, process, and digital solution.', ['Discovery', 'Modeling', 'Ownership', 'Problem solving']],
];

const expectedDocuments = [
	['/documents/cv/jose-colivoro-cv-es.pdf', 178138, '78c43ec4473ee4b5c1a80ae0f64b9f93774496eb46f73b0b352452f3d56639e8'],
	['/documents/cv/jose-colivoro-cv-en.pdf', 175736, 'a119aa0be92a0e07f3c711b3f41d1f4a37ea201a9a26fff5a0a0561a6542fcac'],
	['/documents/certificates/certificado-desarrollador-full-stack.pdf', 404339, '441f6c462faded6853d6959f0bfb56157820565ac0cc782fde5e26faf03afc21'],
	['/documents/certificates/certificado-infraestructura-ti-segura.pdf', 404107, '58dcf25459e1d5e37609e68172f3c7fe96a20396d5668224c258985b8b720534'],
	['/documents/certificates/certificado-desarrollo-de-aplicaciones.pdf', 405111, 'a88de82be69c93281976e2cf6010108f03ff807a0c4213617273d6dc4519d633'],
];

describe('contenido preservado de Perfil', () => {
	it('conserva literalmente dos parrafos, tres principios y paridad ES/EN', () => {
		expect(siteContent.about).toEqual(expectedAbout);
	});

	it('conserva seis capacidades, sus descripciones bilingues y 24 skills', () => {
		expect(siteContent.capabilities.items).toHaveLength(6);
		expect(siteContent.capabilities.items.flatMap((item) => item.skills)).toHaveLength(24);
		expect(
			siteContent.capabilities.items.map((item) => [
				item.title.es,
				item.title.en,
				item.description.es,
				item.description.en,
				item.skills,
			]),
		).toEqual(expectedCapabilities);
	});

	it('conserva los enlaces de CV y los tres certificados bilingues', () => {
		expect(resumeLinks).toEqual({
			es: '/documents/cv/jose-colivoro-cv-es.pdf',
			en: '/documents/cv/jose-colivoro-cv-en.pdf',
		});
		expect(certificateItems).toHaveLength(3);
		expect(certificateItems.map((item) => item.file)).toEqual(expectedDocuments.slice(2).map(([file]) => file));
		for (const item of certificateItems) {
			expect(item.title.es).toBeTruthy();
			expect(item.title.en).toBeTruthy();
			expect(item.description.es).toBeTruthy();
			expect(item.description.en).toBeTruthy();
		}
	});

	it('mantiene bytes, cabecera y SHA-256 de los cinco PDF', () => {
		for (const [publicPath, bytes, sha256] of expectedDocuments) {
			const file = readFileSync(resolve(process.cwd(), 'public', publicPath.slice(1)));
			expect(file).toHaveLength(bytes);
			expect(file.subarray(0, 5).toString()).toBe('%PDF-');
			expect(createHash('sha256').update(file).digest('hex')).toBe(sha256);
		}
	});
});

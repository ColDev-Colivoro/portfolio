import { describe, expect, it } from 'vitest';
import { PROJECT_PHASES, portfolioProjects, projectsCatalog } from '@/data/projectsData';

describe('projectsData', () => {
	it('expone un catálogo único con proyectos clave para la vista curada', () => {
		expect(projectsCatalog).toHaveLength(6);
		const ids = projectsCatalog.map((project) => project.id);
		expect(new Set(ids).size).toBe(6);
		expect(ids).toEqual([
			'coldevpos',
			'nutriscoc',
			'coldevradarsur',
			'mar2control',
			'voyscout',
			'coldevpay',
		]);
		for (const project of projectsCatalog) {
			expect(project.title.es).toBeTruthy();
			expect(project.title.en).toBeTruthy();
			expect(project.problem.es).toBeTruthy();
			expect(project.problem.en).toBeTruthy();
			expect(project.impact.es).toBeTruthy();
			expect(project.impact.en).toBeTruthy();
			expect(project.role.es).toBeTruthy();
			expect(project.role.en).toBeTruthy();
			expect(project.stack.length).toBeGreaterThan(0);
			expect(project.media.cover).toMatch(/^\/images\/.+\.(svg|png|webp)$/);
			expect(project.caseStudy).toBeTruthy();
		}
	});

  it('mantiene visibles solo proyectos marcados como públicos', () => {
    expect(portfolioProjects.every((project) => project.visible !== false)).toBe(true);
    expect(portfolioProjects.map((project) => project.id)).toContain('voyscout');
  });

	it('incluye demo interactiva para el caso Dashboard SGC', () => {
		const voyScout = projectsCatalog.find((project) => project.id === 'voyscout');
		expect(voyScout?.links?.primary).toBe('/demo/sgc');
		expect(voyScout?.links?.demo).toBe('/demo/sgc');
		expect(voyScout?.phase).toBe('prototype');
		expect(PROJECT_PHASES.prototype).toMatchObject({
			es: 'Demo / Prototipo',
			en: 'Demo / Prototype',
			color: PROJECT_PHASES.production.color,
			icon: PROJECT_PHASES.production.icon,
		});
	});

	it('describe NutriscoConnect como gestor operacional y reunión digitalizada de desempeño', () => {
		const nutrisco = projectsCatalog.find((project) => project.id === 'nutriscoc');
		const publicNarrative = [
			nutrisco?.summary?.es,
			nutrisco?.impact?.es,
			nutrisco?.role?.es,
			nutrisco?.caseStudy?.headline?.es,
			nutrisco?.caseStudy?.description?.es,
			...(nutrisco?.caseStudy?.features?.es ?? []),
			...(nutrisco?.caseStudy?.credentials?.es ?? []).map(({ text }) => text),
		].join(' ');

		expect(nutrisco?.title?.es).toBe('NutriscoConnect');
		expect(publicNarrative).toMatch(/gestor operacional CRUD/i);
		expect(publicNarrative).toMatch(/colaboradores responsables de registrar indicadores/i);
		expect(publicNarrative).toMatch(/KPIs? (?:frente|contra) (?:las )?metas?/i);
		expect(publicNarrative).toMatch(/fuera de meta/i);
		expect(publicNarrative).toMatch(/reuni[oó]n digitalizada de desempe[nñ]o/i);
		expect(publicNarrative).toMatch(/compromisos/i);
		expect(nutrisco?.stack).toEqual([
			'Next.js 15.3.6',
			'React 18.3.1',
			'TypeScript 5',
			'Django 5.2.7',
			'Django REST Framework 3.16.1',
			'SimpleJWT 5.3.1',
			'PostgreSQL 15',
		]);
		expect(publicNarrative).not.toMatch(/React 19|Nginx|Firebase|Gunicorn/i);
		expect(nutrisco?.links?.primary).toBe('https://nutrisco.netlify.app');
		expect(nutrisco?.links?.showOnCard).toBe(true);
		expect(nutrisco?.links?.demo).toBeUndefined();
	});
});

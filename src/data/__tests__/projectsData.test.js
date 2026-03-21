import { describe, expect, it } from 'vitest';
import { portfolioProjects, projectsCatalog } from '@/data/projectsData';

describe('projectsData', () => {
	it('expone un catálogo único con proyectos clave para la vista curada', () => {
		expect(projectsCatalog.length).toBeGreaterThan(1);
		const ids = projectsCatalog.map((project) => project.id);
		expect(ids).toContain('nutriscoc');
		expect(ids).toContain('coldevpos');
		expect(ids).toContain('voyscout');
	});

  it('mantiene visibles solo proyectos marcados como públicos', () => {
    expect(portfolioProjects.every((project) => project.visible !== false)).toBe(true);
    expect(portfolioProjects.map((project) => project.id)).toContain('voyscout');
  });

	it('incluye demo interactiva para el caso Dashboard SGC', () => {
		const voyScout = projectsCatalog.find((project) => project.id === 'voyscout');
		expect(voyScout?.caseStudy?.interactiveDemo?.type).toBe('sgc-dashboard');
	});
});

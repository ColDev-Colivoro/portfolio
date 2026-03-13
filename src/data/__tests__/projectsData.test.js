import { describe, expect, it } from 'vitest';
import { featuredProjects, portfolioProjects, projectsCatalog } from '@/data/projectsData';

describe('projectsData', () => {
  it('deriva ColDevPOS como caso destacado desde un catálogo único', () => {
    expect(projectsCatalog.length).toBeGreaterThan(1);
    expect(featuredProjects).toHaveLength(1);
    expect(featuredProjects[0].id).toBe('coldevpos');
  });

  it('mantiene visibles solo proyectos marcados como públicos', () => {
    expect(portfolioProjects.every((project) => project.visible !== false)).toBe(true);
    expect(portfolioProjects.map((project) => project.id)).toContain('voyscout');
  });
});

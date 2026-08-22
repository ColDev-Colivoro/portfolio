import { describe, expect, it } from 'vitest';

import {
	getAdjacentPortfolioRoute,
	getPortfolioRoute,
	getPortfolioRouteTone,
	portfolioNavigationPaths,
	portfolioNavigationRoutes,
	portfolioRouteIndexMap,
	portfolioRoutes,
} from '../portfolioRoutes.js';

describe('portfolioRoutes', () => {
	it('centraliza rutas publicas, orden y etiquetas bilingues ColDev-first', () => {
		expect(portfolioNavigationPaths).toEqual(['/', '/proyectos', '/about', '/contact']);
		expect(portfolioNavigationRoutes.map(({ label }) => label)).toEqual([
			{ es: 'ColDev', en: 'ColDev' },
			{ es: 'Proyectos', en: 'Projects' },
			{ es: 'Perfil', en: 'Profile' },
			{ es: 'Contacto', en: 'Contact' },
		]);
		expect(new Set(portfolioRoutes.map(({ path }) => path)).size).toBe(portfolioRoutes.length);
	});

	it('cataloga tono, metadata ES/EN y shell sin alterar las atmosferas vigentes', () => {
		expect(portfolioRoutes).toHaveLength(5);
		expect(portfolioRoutes.map(({ path, tone }) => [path, tone])).toEqual([
			['/', 'home'],
			['/proyectos', 'projects'],
			['/about', 'about'],
			['/contact', 'contact'],
			['/demo/sgc', 'home'],
		]);

		for (const route of portfolioRoutes) {
			expect(route.metadata.title.es).toBeTruthy();
			expect(route.metadata.title.en).toBeTruthy();
		}
		expect(getPortfolioRoute('/demo/sgc')).toMatchObject({ shell: 'standalone', navigation: false });
		expect(getPortfolioRouteTone('/desconocida')).toBe('home');
	});

	it('expone el mismo orden para animacion, teclado, swipe e indicador', () => {
		expect(portfolioRouteIndexMap).toEqual({
			'/': 0,
			'/proyectos': 1,
			'/about': 2,
			'/contact': 3,
			'/demo/sgc': 4,
		});
		expect(getAdjacentPortfolioRoute('/', 1)?.path).toBe('/proyectos');
		expect(getAdjacentPortfolioRoute('/proyectos', -1)?.path).toBe('/');
		expect(getAdjacentPortfolioRoute('/contact', 1)).toBeNull();
		expect(getAdjacentPortfolioRoute('/demo/sgc', 1)).toBeNull();
	});
});

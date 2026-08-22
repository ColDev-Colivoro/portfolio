const localized = (es, en) => Object.freeze({ es, en });

const freezeRoute = (route) => Object.freeze({
	...route,
	label: localized(route.label.es, route.label.en),
	metadata: Object.freeze({
		...route.metadata,
		title: localized(route.metadata.title.es, route.metadata.title.en),
	}),
});

export const portfolioRoutes = Object.freeze([
	freezeRoute({
		id: 'home',
		type: 'route',
		path: '/',
		component: 'home',
		order: 0,
		label: { es: 'ColDev', en: 'ColDev' },
		tone: 'home',
		shell: 'portfolio',
		navigation: true,
		metadata: {
			title: { es: 'José Camilo Colivoro Uribe | Portfolio', en: 'Jose Camilo Colivoro Uribe | Portfolio' },
		},
	}),
	freezeRoute({
		id: 'projects',
		type: 'route',
		path: '/proyectos',
		component: 'projects',
		order: 1,
		label: { es: 'Proyectos', en: 'Projects' },
		tone: 'projects',
		shell: 'portfolio',
		navigation: true,
		metadata: {
			title: { es: 'Proyectos | José Camilo Colivoro Uribe', en: 'Projects | Jose Camilo Colivoro Uribe' },
		},
	}),
	freezeRoute({
		id: 'about',
		type: 'route',
		path: '/about',
		component: 'about',
		order: 2,
		label: { es: 'Perfil', en: 'Profile' },
		tone: 'about',
		shell: 'portfolio',
		navigation: true,
		metadata: {
			title: { es: 'Perfil | José Camilo Colivoro Uribe', en: 'Profile | Jose Camilo Colivoro Uribe' },
		},
	}),
	freezeRoute({
		id: 'contact',
		type: 'route',
		path: '/contact',
		component: 'contact',
		order: 3,
		label: { es: 'Contacto', en: 'Contact' },
		tone: 'contact',
		shell: 'portfolio',
		navigation: true,
		metadata: {
			title: { es: 'Contacto | José Camilo Colivoro Uribe', en: 'Contact | Jose Camilo Colivoro Uribe' },
		},
	}),
	freezeRoute({
		id: 'sgc-demo',
		type: 'route',
		path: '/demo/sgc',
		component: 'sgcPlatform',
		order: 4,
		label: { es: 'Demo SGC', en: 'SGC demo' },
		tone: 'home',
		shell: 'standalone',
		navigation: false,
		metadata: {
			title: { es: 'Demo SGC | José Camilo Colivoro Uribe', en: 'SGC demo | Jose Camilo Colivoro Uribe' },
		},
	}),
]);

export const portfolioNavigationRoutes = Object.freeze(portfolioRoutes.filter(({ navigation }) => navigation));
export const portfolioNavigationPaths = Object.freeze(portfolioNavigationRoutes.map(({ path }) => path));
export const portfolioRouteIndexMap = Object.freeze(Object.fromEntries(portfolioRoutes.map(({ path, order }) => [path, order])));

export const getPortfolioRoute = (pathname) => portfolioRoutes.find(({ path }) => path === pathname) ?? null;

export const getPortfolioRouteTone = (pathname) => getPortfolioRoute(pathname)?.tone ?? 'home';

export const getAdjacentPortfolioRoute = (pathname, offset) => {
	const currentIndex = portfolioNavigationPaths.indexOf(pathname);
	if (currentIndex === -1) return null;
	return portfolioNavigationRoutes[currentIndex + offset] ?? null;
};

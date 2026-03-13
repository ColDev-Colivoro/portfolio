export const projectsCatalog = [
	{
		id: 'coldevpos',
		featured: true,
		visible: true,
		domains: ['systems', 'backend', 'frontend', 'devops', 'data'],
		title: {
			es: 'ColDevPOS',
			en: 'ColDevPOS',
		},
		subtitle: {
			es: 'Sistema POS para operación real',
			en: 'POS system for real operations',
		},
		summary: {
			es: 'Sistema POS centrado en continuidad operativa, flujos de caja, inventario y trazabilidad para escenarios donde el software debe responder con rapidez y confiabilidad.',
			en: 'POS system focused on operational continuity, cashier flows, inventory, and traceability for scenarios where software must respond with speed and reliability.',
		},
		problem: {
			es: 'La operación necesitaba un flujo integrado para venta, inventario y registro que no dependiera de conectividad perfecta ni de interfaces lentas.',
			en: 'Operations needed an integrated flow for sales, inventory, and record keeping that did not depend on perfect connectivity or slow interfaces.',
		},
		impact: {
			es: 'Unifica caja, inventario y continuidad operativa bajo una lógica pensada desde el uso real, con foco en velocidad, control y trazabilidad.',
			en: 'It unifies cashier, inventory, and operational continuity under a logic designed from real use, focused on speed, control, and traceability.',
		},
		role: {
			es: 'Análisis de sistema, frontend operativo, lógica de negocio y estructura de persistencia local.',
			en: 'System analysis, operational frontend, business logic, and local persistence structure.',
		},
		stack: ['React', 'Node.js', 'SQLite', 'Operational UX'],
		status: {
			es: 'Caso principal',
			en: 'Main case',
		},
		links: {
			primary: '#featured-project',
			demo: '',
			repo: '',
		},
		media: {
			cover: '/images/coldevpos/landing_web.svg',
			gallery: [
				{
					id: 1,
					role: { es: 'Caja', en: 'Cashier' },
					type: { es: 'POS', en: 'POS' },
					title: { es: 'Caja — ventas fluidas', en: 'Cashier — fluid sales' },
					caption: {
						es: 'Venta, cobro y actualización de stock dentro del mismo flujo.',
						en: 'Sales, payment, and stock updates within the same flow.',
					},
					src: '/images/coldevpos/pos.svg',
				},
				{
					id: 2,
					role: { es: 'Admin', en: 'Admin' },
					type: { es: 'Administración', en: 'Administration' },
					title: { es: 'Gestor central', en: 'Central management' },
					caption: {
						es: 'Control administrativo y visión del sistema.',
						en: 'Administrative control and system overview.',
					},
					src: '/images/coldevpos/admin.svg',
				},
				{
					id: 3,
					role: { es: 'Caja', en: 'Cashier' },
					type: { es: 'Boleta', en: 'Receipt' },
					title: { es: 'Boleta integrada', en: 'Integrated receipt' },
					caption: {
						es: 'Emisión integrada con foco en continuidad y registro.',
						en: 'Integrated issuance focused on continuity and record keeping.',
					},
					src: '/images/coldevpos/boleta.svg',
				},
				{
					id: 4,
					role: { es: 'Gestor', en: 'Manager' },
					type: { es: 'Inventario', en: 'Inventory' },
					title: { es: 'Control de inventario', en: 'Inventory control' },
					caption: {
						es: 'Stock, ingresos y mermas con seguimiento claro.',
						en: 'Stock, intake, and shrinkage with clear tracking.',
					},
					src: '/images/coldevpos/inventario.svg',
				},
			],
		},
		caseStudy: {
			headline: {
				es: 'ColDevPOS — continuidad operativa para punto de venta',
				en: 'ColDevPOS — operational continuity for point of sale',
			},
			description: {
				es: 'Sistema de caja, inventario y boleta electrónica orientado a operación local. La solución pone el foco en velocidad, trazabilidad y confiabilidad para escenarios críticos.',
				en: 'Cashier, inventory, and electronic receipt system built for local operations. The solution focuses on speed, traceability, and reliability in critical scenarios.',
			},
			microStats: {
				es: ['Caja e inventario', 'Continuidad local', 'Enfoque operativo'],
				en: ['Cashier and inventory', 'Local continuity', 'Operations-first'],
			},
			features: {
				es: [
					'Flujos críticos de venta y caja',
					'Persistencia y control de inventario',
					'Interfaz orientada a rapidez de operación',
				],
				en: [
					'Critical cashier and sales flows',
					'Persistence and inventory control',
					'Interface optimized for fast operations',
				],
			},
			credentials: {
				es: [
					{ label: 'Modalidad', text: 'Operación local en Windows' },
					{ label: 'Persistencia', text: 'SQLite / almacenamiento local' },
				],
				en: [
					{ label: 'Mode', text: 'Local Windows operation' },
					{ label: 'Persistence', text: 'SQLite / local storage' },
				],
			},
			credentialsNote: {
				es: 'La versión pública del caso muestra el enfoque del sistema; el despliegue real depende del entorno operativo.',
				en: 'The public case showcases the system approach; the real deployment depends on the operational environment.',
			},
		},
	},
	{
		id: 'nutriscoc',
		featured: false,
		visible: true,
		domains: ['ai', 'frontend', 'backend', 'data'],
		title: {
			es: 'Nutriscoc Connect',
			en: 'Nutriscoc Connect',
		},
		subtitle: {
			es: 'IA aplicada a nutrición y seguimiento',
			en: 'Applied AI for nutrition and follow-up',
		},
		summary: {
			es: 'Producto full stack con IA aplicada para seguimiento, análisis y acompañamiento nutricional.',
			en: 'Full stack product with applied AI for nutrition follow-up, analysis, and assistance.',
		},
		problem: {
			es: 'Profesionales y pacientes necesitaban una experiencia de seguimiento y asistencia más útil, continua y apoyada por IA.',
			en: 'Professionals and patients needed a more useful, continuous, AI-assisted follow-up experience.',
		},
		impact: {
			es: 'Integra producto digital, visualización de información e IA aplicada en una sola experiencia de acompañamiento.',
			en: 'It combines digital product, information visualization, and applied AI in a single assistance experience.',
		},
		role: {
			es: 'Full stack, integración de IA, arquitectura cloud y experiencia de usuario.',
			en: 'Full stack, AI integration, cloud architecture, and user experience.',
		},
		stack: ['React', 'Node.js', 'LLMs', 'Cloud'],
		status: {
			es: 'Sitio en línea',
			en: 'Live site',
		},
		links: {
			primary: 'https://nutriscoc.com',
			demo: 'https://nutriscoc.com',
			repo: '',
		},
		media: {
			cover: '/images/nutriscoc/home.svg',
			gallery: [
				{
					id: 1,
					role: { es: 'Usuario', en: 'User' },
					type: { es: 'Dashboard', en: 'Dashboard' },
					title: { es: 'Vista principal', en: 'Main dashboard' },
					caption: {
						es: 'Visualización de métricas y seguimiento.',
						en: 'Metrics visualization and follow-up.',
					},
					src: '/images/nutriscoc/dashboard.svg',
				},
				{
					id: 2,
					role: { es: 'IA', en: 'AI' },
					type: { es: 'Asistente', en: 'Assistant' },
					title: { es: 'Asistente nutricional', en: 'Nutrition assistant' },
					caption: {
						es: 'Interacción conversacional apoyada por IA.',
						en: 'Conversational interaction powered by AI.',
					},
					src: '/images/nutriscoc/ai-chat.svg',
				},
			],
		},
		caseStudy: {
			headline: {
				es: 'Nutriscoc Connect — seguimiento y automatización',
				en: 'Nutriscoc Connect — follow-up and automation',
			},
			description: {
				es: 'Plataforma orientada a generar valor práctico mediante IA, análisis y una experiencia digital más útil para profesionales y pacientes.',
				en: 'Platform focused on practical value through AI, analytics, and a more useful digital experience for professionals and patients.',
			},
			microStats: {
				es: ['LLMs', 'Arquitectura cloud', 'Producto full stack'],
				en: ['LLMs', 'Cloud architecture', 'Full stack product'],
			},
			features: {
				es: [
					'Asistencia y generación apoyada por IA',
					'Seguimiento y visualización de información',
					'Integración entre producto, datos y experiencia',
				],
				en: [
					'AI-assisted generation and support',
					'Follow-up and information visualization',
					'Integration across product, data, and experience',
				],
			},
			credentials: {
				es: [
					{ label: 'Motor IA', text: 'Integración con LLMs' },
					{ label: 'Deploy', text: 'Stack cloud' },
				],
				en: [
					{ label: 'AI engine', text: 'LLM integration' },
					{ label: 'Deploy', text: 'Cloud stack' },
				],
			},
			credentialsNote: {
				es: 'Proyecto en evolución continua.',
				en: 'Project in continuous evolution.',
			},
		},
	},
	{
		id: 'mar2control',
		featured: false,
		visible: true,
		domains: ['systems', 'frontend', 'backend', 'data'],
		title: {
			es: 'Mar2Control',
			en: 'Mar2Control',
		},
		subtitle: {
			es: 'Trazabilidad y reportes de calidad',
			en: 'Traceability and quality reporting',
		},
		summary: {
			es: 'Herramienta para trazabilidad y reportes de calidad pensada desde la operación de planta y el terreno.',
			en: 'Tool for traceability and quality reporting designed from plant-floor operations and field work.',
		},
		problem: {
			es: 'Los procesos de calidad requerían trazabilidad clara, captura usable y mejor visibilidad desde la operación.',
			en: 'Quality processes needed clear traceability, usable data capture, and better visibility from operations.',
		},
		impact: {
			es: 'Acerca control, captura y seguimiento de datos a quienes ejecutan la operación real.',
			en: 'Brings control, capture, and data follow-up closer to the people executing real operations.',
		},
		role: {
			es: 'Modelado de flujo, interfaz de captura y enfoque en continuidad de proceso.',
			en: 'Flow modeling, capture interface, and process continuity focus.',
		},
		stack: ['Traceability', 'Quality', 'UX', 'Data capture'],
		status: {
			es: 'Prototipo funcional',
			en: 'Functional prototype',
		},
		links: {
			primary: 'https://controldecalidad.netlify.app',
			demo: 'https://controldecalidad.netlify.app',
			repo: '',
		},
		media: {
			cover: '/images/mar2control/home.png',
			gallery: [
				{
					id: 1,
					role: { es: 'Operación', en: 'Operations' },
					type: { es: 'Calidad', en: 'Quality' },
					title: { es: 'Vista principal', en: 'Main view' },
					caption: {
						es: 'Seguimiento operativo y control de reportes.',
						en: 'Operational follow-up and report control.',
					},
					src: '/images/mar2control/home.png',
				},
			],
		},
	},
	{
		id: 'voyscout',
		featured: false,
		visible: true,
		domains: ['systems', 'backend', 'frontend'],
		title: {
			es: 'VoyScout',
			en: 'VoyScout',
		},
		subtitle: {
			es: 'Gestión integral para cursos scouts',
			en: 'Integrated management for scout courses',
		},
		summary: {
			es: 'Plataforma integral para gestionar inscripciones, pagos y asistencia en cursos Scouts.',
			en: 'Integrated platform to manage registrations, payments, and attendance for Scout courses.',
		},
		problem: {
			es: 'La coordinación de cursos requería unificar registros, pagos, asistencia y seguimiento administrativo.',
			en: 'Course coordination required unified records, payments, attendance, and administrative follow-up.',
		},
		impact: {
			es: 'Centraliza procesos administrativos y disminuye fricción operativa en la gestión de cursos.',
			en: 'Centralizes administrative processes and reduces operational friction in course management.',
		},
		role: {
			es: 'Modelado del sistema, backend de gestión y vistas para operación administrativa.',
			en: 'System modeling, management backend, and administrative operation views.',
		},
		stack: ['Python', 'Django', 'SQL', 'React'],
		status: {
			es: 'Proyecto privado',
			en: 'Private project',
		},
		links: {
			primary: '',
			demo: '',
			repo: '',
		},
		media: {
			cover: '/images/placeholders/voyscout.svg',
			gallery: [
				{
					id: 1,
					role: { es: 'Gestión', en: 'Management' },
					type: { es: 'Privado', en: 'Private' },
					title: { es: 'Caso privado', en: 'Private case' },
					caption: {
						es: 'El detalle visual del proyecto se mantiene privado.',
						en: 'The visual details of the project remain private.',
					},
					src: '/images/placeholders/voyscout.svg',
				},
			],
		},
	},
];

export const featuredProjects = projectsCatalog.filter((project) => project.featured);

export const portfolioProjects = projectsCatalog.filter((project) => project.visible !== false);

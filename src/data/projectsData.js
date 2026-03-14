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
			es: 'Ecosistema POS para operación real',
			en: 'POS ecosystem for real operations',
		},
		summary: {
			es: 'Ecosistema ColDevPOS centrado en continuidad operativa: caja, inventario, boleta y control de roles en un flujo integrado.',
			en: 'ColDevPOS ecosystem focused on operational continuity: cashier, inventory, receipt flow, and role control in one integrated flow.',
		},
		problem: {
			es: 'La operación necesitaba un flujo integrado para venta, inventario y registro que no dependiera de conectividad perfecta ni de interfaces lentas.',
			en: 'Operations needed an integrated flow for sales, inventory, and record keeping that did not depend on perfect connectivity or slow interfaces.',
		},
		impact: {
			es: 'Consolida la operación comercial en una arquitectura única, priorizando velocidad de uso, control de datos y trazabilidad.',
			en: 'It consolidates commercial operations into a single architecture, prioritizing speed, data control, and traceability.',
		},
		role: {
			es: 'Habilidades: análisis de sistemas, modelado de reglas POS, UX operativa, persistencia local y arquitectura desktop.',
			en: 'Skills: systems analysis, POS rule modeling, operational UX, local persistence, and desktop architecture.',
		},
		stack: ['React', 'TypeScript', 'Tauri', 'SQLite', 'Operational UX'],
		status: {
			es: 'En curso',
			en: 'In progress',
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
				es: 'ColDevPOS — ecosistema en curso para continuidad operativa',
				en: 'ColDevPOS — ecosystem in progress for operational continuity',
			},
			description: {
				es: 'Ecosistema de operación local para caja, inventario y boleta electrónica. El caso demuestra diseño orientado a rapidez, control y continuidad.',
				en: 'Local-operations ecosystem for cashier, inventory, and electronic receipts. The case shows design focused on speed, control, and continuity.',
			},
			microStats: {
				es: ['Ecosistema POS', 'Estado: en curso', 'Continuidad local'],
				en: ['POS ecosystem', 'Status: in progress', 'Local continuity'],
			},
			features: {
				es: [
					'Habilidad: análisis de flujo de caja, venta y boleta',
					'Habilidad: modelado de inventario y reglas operativas',
					'Habilidad: diseño de interfaz para operación rápida',
				],
				en: [
					'Skill: flow analysis for cashier, sales, and receipts',
					'Skill: inventory modeling and operational rules',
					'Skill: interface design for fast operation',
				],
			},
			credentials: {
				es: [
					{ label: 'Stack principal', text: 'React + TypeScript + Tauri + SQLite' },
					{ label: 'Modalidad', text: 'Ecosistema desktop en operación local Windows' },
				],
				en: [
					{ label: 'Main stack', text: 'React + TypeScript + Tauri + SQLite' },
					{ label: 'Mode', text: 'Desktop ecosystem in local Windows operation' },
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
			es: 'Plataforma full stack para seguimiento y operación',
			en: 'Full stack platform for follow-up and operations',
		},
		summary: {
			es: 'Proyecto full stack desarrollado para NUTRISCO/ORIZON, enfocado en seguimiento operacional, visualización de KPIs y módulos de compromisos sobre una arquitectura web moderna.',
			en: 'Full stack project developed for NUTRISCO/ORIZON, focused on operational follow-up, KPI visualization, and commitments modules on a modern web architecture.',
		},
		problem: {
			es: 'La operación necesitaba digitalizar seguimiento, acuerdos y desempeño en una sola plataforma, evitando fragmentación entre datos, interfaz y reglas de negocio.',
			en: 'Operations needed to digitize follow-up, commitments, and performance in a single platform, avoiding fragmentation across data, UI, and business rules.',
		},
		impact: {
			es: 'Consolidó backend, frontend e infraestructura para dar trazabilidad al flujo operacional y facilitar decisiones con dashboards y seguimiento estructurado.',
			en: 'It consolidated backend, frontend, and infrastructure to provide traceability in operational flow and support decisions with dashboards and structured follow-up.',
		},
		role: {
			es: 'Habilidades: liderazgo full stack end-to-end, modelado de entidades y APIs, frontend operativo en TypeScript, despliegue con contenedores y seguridad con RBAC/JWT.',
			en: 'Skills: end-to-end full stack leadership, entity and API modeling, operational frontend in TypeScript, containerized deployment, and RBAC/JWT security.',
		},
		stack: ['Django 5', 'Django REST Framework', 'Next.js 15', 'React', 'TypeScript', 'PostgreSQL', 'Docker', 'Nginx', 'JWT', 'Firebase Auth'],
		status: {
			es: 'Proyecto corporativo',
			en: 'Corporate project',
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
				es: 'Nutriscoc Connect — plataforma full stack de seguimiento',
				en: 'Nutriscoc Connect — full stack follow-up platform',
			},
			description: {
				es: 'Caso orientado a operación real en entorno corporativo: backend robusto en Django 5/DRF, frontend con Next.js + React + TypeScript, y despliegue en stack PostgreSQL + Docker + Nginx con control de acceso por roles.',
				en: 'Case focused on real operations in a corporate environment: robust backend with Django 5/DRF, frontend with Next.js + React + TypeScript, and deployment on PostgreSQL + Docker + Nginx with role-based access control.',
			},
			microStats: {
				es: ['Proyecto full stack', 'RBAC + JWT', 'Stack productivo'],
				en: ['Full stack project', 'RBAC + JWT', 'Production-grade stack'],
			},
			features: {
				es: [
					'Backend de KPIs, acuerdos y seguimiento operacional (Django 5 + DRF)',
					'Frontend operativo con dashboards y módulos de compromisos (Next.js, React, TypeScript)',
					'Despliegue y continuidad con PostgreSQL, Docker y Nginx',
					'Seguridad con autenticación JWT y control de acceso por roles (RBAC/Firebase)',
				],
				en: [
					'Backend for KPIs, commitments, and operational follow-up (Django 5 + DRF)',
					'Operational frontend with dashboards and commitments modules (Next.js, React, TypeScript)',
					'Deployment and continuity with PostgreSQL, Docker, and Nginx',
					'Security with JWT authentication and role-based access control (RBAC/Firebase)',
				],
			},
			credentials: {
				es: [
					{ label: 'Backend', text: 'Django 5 + Django REST Framework' },
					{ label: 'Frontend', text: 'Next.js 15 + React + TypeScript + TailwindCSS' },
					{ label: 'Infraestructura', text: 'PostgreSQL + Docker + Nginx' },
					{ label: 'Seguridad', text: 'JWT + RBAC (Firebase Auth)' },
				],
				en: [
					{ label: 'Backend', text: 'Django 5 + Django REST Framework' },
					{ label: 'Frontend', text: 'Next.js 15 + React + TypeScript + TailwindCSS' },
					{ label: 'Infrastructure', text: 'PostgreSQL + Docker + Nginx' },
					{ label: 'Security', text: 'JWT + RBAC (Firebase Auth)' },
				],
			},
			credentialsNote: {
				es: 'La versión pública resume arquitectura y enfoque técnico; parte del alcance operativo es de contexto corporativo.',
				en: 'The public version summarizes architecture and technical approach; part of the operational scope belongs to a corporate context.',
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
			es: 'Habilidades: modelado de flujo, interfaz de captura en terreno y continuidad de proceso.',
			en: 'Skills: flow modeling, field capture interface, and process continuity.',
		},
		stack: ['Traceability', 'Quality', 'UX', 'Data capture'],
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
		caseStudy: {
			headline: {
				es: 'Mar2Control — trazabilidad y control como caso privado',
				en: 'Mar2Control — traceability and control as a private case',
			},
			description: {
				es: 'Caso orientado a trazabilidad, captura y seguimiento de calidad desde la operación. La versión pública mantiene placeholders y resume el enfoque sin exponer la demo real.',
				en: 'Case focused on traceability, capture, and quality follow-up from operations. The public version keeps placeholders and summarizes the approach without exposing the real demo.',
			},
			microStats: {
				es: ['Caso privado', 'Trazabilidad', 'Captura operativa'],
				en: ['Private case', 'Traceability', 'Operational capture'],
			},
			features: {
				es: [
					'Habilidad: modelado de flujo para control de calidad',
					'Habilidad: captura usable desde operación y terreno',
					'Habilidad: seguimiento de datos y trazabilidad del proceso',
				],
				en: [
					'Skill: flow modeling for quality control',
					'Skill: usable capture from operations and field work',
					'Skill: data follow-up and process traceability',
				],
			},
			credentials: {
				es: [
					{ label: 'Estado público', text: 'Caso presentado con placeholders' },
					{ label: 'Enfoque', text: 'Trazabilidad, reportes y operación de calidad' },
				],
				en: [
					{ label: 'Public status', text: 'Case presented with placeholders' },
					{ label: 'Focus', text: 'Traceability, reporting, and quality operations' },
				],
			},
			credentialsNote: {
				es: 'La demo funcional no se expone públicamente; este caso resume enfoque y tipo de solución.',
				en: 'The functional demo is not exposed publicly; this case summarizes the approach and solution type.',
			},
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
			es: 'Habilidades: modelado del sistema, backend de gestión, frontend administrativo e integración SQL.',
			en: 'Skills: system modeling, management backend, administrative frontend, and SQL integration.',
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

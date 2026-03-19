export const projectsCatalog = [
	{
		id: 'coldevpos',
		featured: false,
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
		featured: true,
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
		id: 'coldevradarsur',
		featured: false,
		visible: true,
		domains: ['systems', 'frontend', 'backend', 'data'],
		title: {
			es: 'ColDev Radar Sur',
			en: 'ColDev Radar Sur',
		},
		subtitle: {
			es: 'Control operativo y trazabilidad en terreno',
			en: 'Operational control and field traceability',
		},
		summary: {
			es: 'Sistema operativo para seguimiento en terreno, control de KPIs y trazabilidad de acciones críticas en contexto real.',
			en: 'Operational system for field follow-up, KPI control, and traceability of critical actions in real contexts.',
		},
		problem: {
			es: 'La operación de campo requería visibilidad en tiempo real, control de cumplimiento y una fuente única para reportar desviaciones.',
			en: 'Field operations required real-time visibility, compliance control, and a single source for reporting deviations.',
		},
		impact: {
			es: 'Estandariza seguimiento operativo y mejora la trazabilidad para decisiones rápidas con evidencia de terreno.',
			en: 'Standardizes operational follow-up and improves traceability for fast, evidence-based decisions from the field.',
		},
		role: {
			es: 'Habilidades: análisis de sistemas en terreno, diseño de paneles operativos y trazabilidad de eventos críticos.',
			en: 'Skills: field systems analysis, operational dashboard design, and critical-event traceability.',
		},
		stack: ['React', 'Operational UX', 'Field data', 'Traceability'],
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
			cover: '/images/radarsur/logo-radarsur-dark.png',
			gallery: [
				{
					id: 1,
					role: { es: 'Identidad', en: 'Identity' },
					type: { es: 'Sistema', en: 'System' },
					title: { es: 'Marca operativa', en: 'Operational branding' },
					caption: {
						es: 'Identidad visual de ColDev Radar Sur para operación en terreno.',
						en: 'Visual identity for ColDev Radar Sur field operations.',
					},
					src: '/images/radarsur/logo-radarsur.png',
				},
				{
					id: 2,
					role: { es: 'Identidad', en: 'Identity' },
					type: { es: 'Modo oscuro', en: 'Dark mode' },
					title: { es: 'Marca operativa dark', en: 'Operational dark branding' },
					caption: {
						es: 'Version modo oscuro de la identidad de ColDev Radar Sur.',
						en: 'Dark-mode version of ColDev Radar Sur visual identity.',
					},
					src: '/images/radarsur/logo-radarsur-dark.png',
				},
				{
					id: 3,
					role: { es: 'Operador', en: 'Operator' },
					type: { es: 'Panel', en: 'Dashboard' },
					title: { es: 'Panel principal', en: 'Main dashboard' },
					caption: {
						es: 'Vista operativa para monitoreo y seguimiento diario.',
						en: 'Operational view for daily monitoring and follow-up.',
					},
					src: '/images/mar2control/home.png',
				},
			],
		},
		caseStudy: {
			headline: {
				es: 'ColDev Radar Sur — control operativo y trazabilidad en terreno',
				en: 'ColDev Radar Sur — operational control and field traceability',
			},
			description: {
				es: 'Caso centrado en operación real de campo con seguimiento de KPIs, control de incidencias y trazabilidad de acciones. La versión pública resume el enfoque sin exponer datos sensibles.',
				en: 'Case centered on real field operations with KPI follow-up, incident control, and action traceability. The public version summarizes the approach without exposing sensitive data.',
			},
			microStats: {
				es: ['Proyecto privado', 'Operación en terreno', 'Trazabilidad'],
				en: ['Private project', 'Field operations', 'Traceability'],
			},
			features: {
				es: [
					'Habilidad: diseño de flujo operativo para entorno de campo',
					'Habilidad: paneles de seguimiento con foco en decisiones rápidas',
					'Habilidad: trazabilidad de acciones e incidencias críticas',
				],
				en: [
					'Skill: operational flow design for field environments',
					'Skill: follow-up dashboards focused on fast decisions',
					'Skill: traceability for critical actions and incidents',
				],
			},
			credentials: {
				es: [
					{ label: 'Estado público', text: 'Caso presentado con visuales curadas' },
					{ label: 'Enfoque', text: 'Seguimiento operativo y control en terreno' },
				],
				en: [
					{ label: 'Public status', text: 'Case presented with curated visuals' },
					{ label: 'Focus', text: 'Operational follow-up and field control' },
				],
			},
			credentialsNote: {
				es: 'La demo funcional no se expone públicamente; este caso resume enfoque y tipo de solución.',
				en: 'The functional demo is not exposed publicly; this case summarizes the approach and solution type.',
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
			es: 'Seguimiento de calidad y KPIs operativos',
			en: 'Quality follow-up and operational KPIs',
		},
		summary: {
			es: 'Plataforma para supervisar cumplimiento, control de calidad y trazabilidad de indicadores en operacion diaria.',
			en: 'Platform to supervise compliance, quality control, and KPI traceability in day-to-day operations.',
		},
		problem: {
			es: 'La operacion necesitaba centralizar monitoreo, incidencias y cumplimiento de compromisos en una sola vista accionable.',
			en: 'Operations needed to centralize monitoring, incidents, and commitment compliance in one actionable view.',
		},
		impact: {
			es: 'Reduce friccion en seguimiento operativo y mejora la toma de decisiones con paneles por rol y evidencia historica.',
			en: 'It reduces friction in operational follow-up and improves decision-making with role-based dashboards and historical evidence.',
		},
		role: {
			es: 'Habilidades: modelado de flujo operativo, diseno de dashboards por perfil y arquitectura de seguimiento con trazabilidad.',
			en: 'Skills: operational flow modeling, profile-based dashboard design, and follow-up architecture with traceability.',
		},
		stack: ['React', 'Operational Dashboards', 'KPI Tracking', 'Data Traceability'],
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
			cover: '/images/mar2control/home.png',
			gallery: [
				{
					id: 1,
					role: { es: 'Operacion', en: 'Operations' },
					type: { es: 'Dashboard', en: 'Dashboard' },
					title: { es: 'Vista principal', en: 'Main dashboard' },
					caption: {
						es: 'Panel con estado operativo y seguimiento de compromisos por area.',
						en: 'Dashboard with operational status and commitment follow-up by area.',
					},
					src: '/images/mar2control/home.png',
				},
				{
					id: 2,
					role: { es: 'Gerencia', en: 'Management' },
					type: { es: 'KPIs', en: 'KPIs' },
					title: { es: 'KPIs ejecutivos', en: 'Executive KPIs' },
					caption: {
						es: 'Seguimiento de indicadores clave para decisiones rapidas.',
						en: 'Key indicator follow-up for faster decisions.',
					},
					src: '/images/mar2control/gerente-kpis.png',
				},
				{
					id: 3,
					role: { es: 'Calidad', en: 'Quality' },
					type: { es: 'Control', en: 'Control' },
					title: { es: 'Control de calidad', en: 'Quality control' },
					caption: {
						es: 'Monitoreo de cumplimiento y hallazgos en terreno.',
						en: 'Compliance and field findings monitoring.',
					},
					src: '/images/mar2control/jefe-calidad.png',
				},
			],
		},
		caseStudy: {
			headline: {
				es: 'Mar2Control - seguimiento operativo con foco en calidad',
				en: 'Mar2Control - operational follow-up focused on quality',
			},
			description: {
				es: 'Caso de plataforma orientada a control de calidad, cumplimiento y KPIs. El enfoque prioriza decisiones rapidas y trazabilidad por rol sin exponer datos sensibles del entorno real.',
				en: 'Platform case focused on quality control, compliance, and KPIs. The approach prioritizes fast decisions and role-based traceability without exposing sensitive production data.',
			},
			microStats: {
				es: ['Proyecto privado', 'KPIs operativos', 'Trazabilidad por rol'],
				en: ['Private project', 'Operational KPIs', 'Role-based traceability'],
			},
			features: {
				es: [
					'Habilidad: diseno de paneles para operacion y supervision',
					'Habilidad: seguimiento estructurado de compromisos e incidencias',
					'Habilidad: modelado de indicadores para control de calidad',
				],
				en: [
					'Skill: dashboard design for operations and supervision',
					'Skill: structured follow-up for commitments and incidents',
					'Skill: indicator modeling for quality control',
				],
			},
			credentials: {
				es: [
					{ label: 'Estado publico', text: 'Caso presentado con visuales de referencia' },
					{ label: 'Enfoque', text: 'Calidad operativa, KPIs y trazabilidad' },
				],
				en: [
					{ label: 'Public status', text: 'Case presented with reference visuals' },
					{ label: 'Focus', text: 'Operational quality, KPIs, and traceability' },
				],
			},
			credentialsNote: {
				es: 'La demo funcional no es publica; este caso comunica arquitectura y valor de la solucion.',
				en: 'The functional demo is not public; this case communicates the architecture and value of the solution.',
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

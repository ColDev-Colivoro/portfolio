
// Importa los iconos Lucide en el archivo donde se usen estos objetos, no aquí directamente.
// Aquí solo se referencian por nombre para facilitar el mapeo en el componente visual.
const productionPhase = {
	es: 'En Producción',
	en: 'In Production',
	color: 'emerald',
	icon: 'BadgeCheck',
};

export const PROJECT_PHASES = {
	building: {
		es: 'En Construcción',
		en: 'Under Construction',
		color: 'amber',
		icon: 'Hammer',
	},
	mvp: {
		es: 'MVP',
		en: 'MVP',
		color: 'sky',
		icon: 'FlaskConical',
	},
	production: productionPhase,
	prototype: {
		...productionPhase,
		es: 'Demo / Prototipo',
		en: 'Demo / Prototype',
	},
};

export const PROJECT_ACCESS = {
	private: {
		es: 'Privado',
		en: 'Private',
		color: 'rose',
		icon: 'Lock',
	},
	corporate: {
		es: 'Corporativo',
		en: 'Corporate',
		color: 'violet',
		icon: 'Building2',
	},
	open: {
		es: 'Abierto',
		en: 'Open Source',
		color: 'cyan',
		icon: 'Globe',
	},
};

export const projectsCatalog = [
	{
		id: 'coldevpos',
		visible: true,
		domains: ['systems', 'backend', 'frontend', 'devops', 'data'],
		title: {
			es: 'ColDevPOS',
			en: 'ColDevPOS',
		},
		subtitle: {
			es: 'Ecosistema de Ventas: Landing Web + App Desktop Nativa',
			en: 'Sales Ecosystem: Web Landing + Native Desktop App',
		},
		summary: {
			es: 'Arquitectura de doble capa compuesta por una Landing Web B2B de adquisición, conectada a una Aplicación de Escritorio Nativa (Tauri) enfocada en operación terminal 100% offline.',
			en: 'Dual-layer architecture consisting of a B2B marketing Web Landing page connected to a Native Desktop Application (Tauri) focused on 100% offline terminal operation.',
		},
		problem: {
			es: 'Los negocios requerían presencia digital para atraer clientes y un sistema de caja ultra rápido y autónomo que no se interrumpiera por caídas de red.',
			en: 'Businesses required digital presence to attract clients and an ultra-fast, autonomous POS system that wouldn\'t be interrupted by network outages.',
		},
		impact: {
			es: 'Solución integral B2B que combina captación web y un motor local para garantizar tiempos de respuesta de 0ms en facturación, caja e inventario.',
			en: 'Comprehensive B2B solution combining web acquisition and a local engine to guarantee 0ms response times for billing, cashier, and inventory.',
		},
		role: {
			es: 'Arquitectura distribuida, Integración React + Rust (Tauri), Persistencia local SQLite, Diseño de Landing Pages B2B y despliegue multiplataforma.',
			en: 'Distributed architecture, React + Rust (Tauri) integration, SQLite local persistence, B2B Landing Page design, and cross-platform deployment.',
		},
		stack: ['Astro 5', 'React 19', 'Netlify Functions', 'Firebase', 'Node.js', 'Tauri', 'Rust', 'SQLite', 'Playwright'],
		phase: 'building',
		access: 'private',
		links: {
			primary: '',
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
						es: 'Venta, cobro y actualización de stock dentro del mismo flujo nativo.',
						en: 'Sales, payment, and stock updates within the same native flow.',
					},
					src: '/images/coldevpos/pos.svg',
				},
			],
		},
		caseStudy: {
			headline: {
				es: 'ColDevPOS — Ecosistema SaaS: Landing + DRM + App Desktop',
				en: 'ColDevPOS — SaaS Ecosystem: Landing + DRM + Desktop App',
			},
			description: {
				es: 'Dos capas independientes que trabajan en conjunto: (1) Landing Web en Astro 5 con backend serverless Node.js en Netlify Functions, Firebase NoSQL como base de datos de clientes, autenticación JWT/Cookie, OTP por WhatsApp para verificación de teléfono, y un Panel de Gestor SPA con emisor/revocador de licencias DRM. (2) App Desktop nativa compilada con Tauri/Rust que conecta hardware (scanner USB, impresora térmica), corre sobre SQLite local embebida, y consume los endpoints de licencia de la Landing para activación.',
				en: 'Two independent layers working together: (1) Astro 5 Web Landing with serverless Node.js backend on Netlify Functions, Firebase NoSQL as client database, JWT/Cookie auth, WhatsApp OTP for phone verification, and an SPA Manager Panel with DRM license issuer/revoker. (2) Native Desktop App compiled with Tauri/Rust that connects hardware (USB scanner, thermal printer), runs on embedded local SQLite, and consumes the Landing license endpoints for activation.',
			},
			microStats: {
				es: ['Dual-Layer SaaS', 'Serverless Backend', 'Offline-First POS'],
				en: ['Dual-Layer SaaS', 'Serverless Backend', 'Offline-First POS'],
			},
			features: {
				es: [
					'Landing Web (Astro 5 + React 19): rutas públicas, onboarding de cliente, portal de descarga y panel de gestor protegido por JWT.',
					'Backend Serverless (Netlify Functions + Node.js): endpoints de login, emisión de licencias DRM, verificación OTP WhatsApp y envío de correos (Resend/SendGrid).',
					'App Desktop Nativa (Tauri + Rust + React): módulos POS scanner-first, inventario con importación Excel, compras, reportes exportables, auditoría, y configuración de hardware.',
					'Suite de testing: E2E con Playwright, pruebas unitarias con node:test, y stress de carga con Artillery sobre los endpoints de licencias.',
				],
				en: [
					'Web Landing (Astro 5 + React 19): public routes, client onboarding, download portal and JWT-protected manager panel.',
					'Serverless Backend (Netlify Functions + Node.js): login endpoints, DRM license issuance, WhatsApp OTP verification, and email sending (Resend/SendGrid).',
					'Native Desktop App (Tauri + Rust + React): scanner-first POS, inventory with Excel import, purchases, exportable reports, audit trail, and hardware config.',
					'Testing suite: E2E with Playwright, unit tests with node:test, and Artillery load stress testing on license endpoints.',
				],
			},
			credentials: {
				es: [
					{ label: 'Landing Web', text: 'Astro 5 + React 19 + Tailwind CSS 4' },
					{ label: 'Backend', text: 'Netlify Functions (Node.js) + Firebase Admin SDK' },
					{ label: 'App Desktop', text: 'Tauri (Rust) + React + TypeScript + SQLite embebida' },
				],
				en: [
					{ label: 'Web Landing', text: 'Astro 5 + React 19 + Tailwind CSS 4' },
					{ label: 'Backend', text: 'Netlify Functions (Node.js) + Firebase Admin SDK' },
					{ label: 'Desktop App', text: 'Tauri (Rust) + React + TypeScript + embedded SQLite' },
				],
			},
			credentialsNote: {
				es: 'Demuestra dominio simultáneo de arquitectura web pública, backend serverless, DRM y desarrollo de escritorio nativo compilado.',
				en: 'Demonstrates simultaneous mastery of public web architecture, serverless backend, DRM, and compiled native desktop development.',
			},
		},
	},
	{
		id: 'nutriscoc',
		visible: true,
		domains: ['systems', 'frontend', 'backend', 'data', 'devops'],
		title: {
			es: 'NutriscoConnect',
			en: 'NutriscoConnect',
		},
		subtitle: {
			es: 'Gestor operacional y reunión digitalizada por KPIs',
			en: 'Operational manager and KPI-driven digital meeting',
		},
		summary: {
			es: 'Prototipo/pre-MVP que combina un gestor operacional CRUD con una reunión digitalizada de desempeño: centraliza la operación, compara KPIs contra metas y convierte desviaciones en compromisos con seguimiento.',
			en: 'Prototype/pre-MVP combining an operational CRUD manager with a digitized performance meeting: it centralizes operations, compares KPIs against targets, and turns deviations into tracked commitments.',
		},
		problem: {
			es: 'Los datos operacionales, las metas y los acuerdos de reunión podían quedar dispersos. Eso dificultaba detectar a tiempo los indicadores fuera de meta, priorizar la conversación y mantener trazabilidad sobre los compromisos.',
			en: 'Operational data, targets, and meeting agreements could become scattered. This made it harder to detect out-of-target indicators in time, prioritize the discussion, and keep commitments traceable.',
		},
		impact: {
			es: 'Los colaboradores responsables de registrar indicadores ingresan los datos de la operación. El sistema evalúa KPIs frente a las metas, prioriza lo que está fuera de meta para la reunión digitalizada de desempeño y registra compromisos trazables con responsable y fecha límite.',
			en: 'Collaborators responsible for recording indicators enter operational data. The system evaluates KPIs against targets, prioritizes out-of-target results for the digitized performance meeting, and records traceable commitments with an owner and deadline.',
		},
		role: {
			es: 'Desarrollo Full Stack: frontend Next.js 15.3.6 con React 18.3.1 y TypeScript 5; API REST con Django 5.2.7, Django REST Framework 3.16.1 y autenticación JWT mediante SimpleJWT 5.3.1; persistencia en PostgreSQL 15.',
			en: 'Full Stack development: Next.js 15.3.6 frontend with React 18.3.1 and TypeScript 5; REST API with Django 5.2.7, Django REST Framework 3.16.1, and JWT authentication through SimpleJWT 5.3.1; PostgreSQL 15 persistence.',
		},
		stack: [
			'Next.js 15.3.6',
			'React 18.3.1',
			'TypeScript 5',
			'Django 5.2.7',
			'Django REST Framework 3.16.1',
			'SimpleJWT 5.3.1',
			'PostgreSQL 15',
		],
		phase: 'mvp',
		access: 'corporate',
		links: {
			primary: 'https://nutrisco.netlify.app',
			showOnCard: true,
			repo: '',
		},
		media: {
			cover: '/images/nutriscoc/home.svg',
			gallery: [
				{
					id: 1,
					role: { es: 'Dashboard', en: 'Dashboard' },
					type: { es: 'KPIs', en: 'KPIs' },
					title: { es: 'Vista principal operativa', en: 'Main operational dashboard' },
					caption: {
						es: 'Panel con KPIs de cada área, semáforos automáticos y compromisos pendientes.',
						en: 'Dashboard with per-area KPIs, automatic traffic-light alerts, and pending commitments.',
					},
					src: '/images/nutriscoc/dashboard.svg',
				},
			],
		},
		caseStudy: {
			headline: {
				es: 'NutriscoConnect — Reuniones basadas en KPIs y compromisos',
				en: 'NutriscoConnect — KPI-driven meetings and commitments',
			},
			description: {
				es: 'El frontend en Next.js 15.3.6 y React 18.3.1 consume una API REST modular en Django 5.2.7 y DRF 3.16.1, protegida con JWT. PostgreSQL 15 relaciona usuarios, áreas, indicadores, KPIs, reuniones y compromisos para que el recorrido desde el dato ingresado hasta el acuerdo quede trazable.',
				en: 'The Next.js 15.3.6 and React 18.3.1 frontend consumes a modular Django 5.2.7 and DRF 3.16.1 REST API protected with JWT. PostgreSQL 15 relates users, areas, indicators, KPIs, meetings, and commitments so the path from entered data to agreement remains traceable.',
			},
			microStats: {
				es: ['CRUD por dominio', 'KPIs frente a metas', 'Compromisos trazables'],
				en: ['Domain CRUD', 'KPIs against targets', 'Traceable commitments'],
			},
			features: {
				es: [
					'Gestor operacional CRUD para administrar las entidades y relaciones que componen la base de datos de la operación.',
					'Los colaboradores responsables de registrar indicadores ingresan datos asociados a su operación y periodo.',
					'El gestor de KPIs calcula resultados frente a las metas y destaca los indicadores fuera de meta que requieren atención.',
					'La reunión digitalizada de desempeño prioriza esas desviaciones, conserva el contexto y reúne los compromisos previos.',
					'Los acuerdos se convierten en compromisos con responsable, fecha límite, estado y seguimiento.',
				],
				en: [
					'Operational CRUD manager for the entities and relationships that make up the operational database.',
					'Collaborators responsible for recording indicators enter data for their operation and period.',
					'The KPI manager calculates results against targets and highlights out-of-target indicators requiring attention.',
					'The digitized performance meeting prioritizes those deviations, retains context, and brings prior commitments together.',
					'Agreements become commitments with an owner, due date, status, and follow-up.',
				],
			},
			credentials: {
				es: [
					{ label: 'Frontend', text: 'Next.js 15.3.6 + React 18.3.1 + TypeScript 5' },
					{ label: 'Backend', text: 'Django 5.2.7 + Django REST Framework 3.16.1' },
					{ label: 'Autenticación', text: 'JWT con SimpleJWT 5.3.1' },
					{ label: 'Base de datos', text: 'PostgreSQL 15' },
				],
				en: [
					{ label: 'Frontend', text: 'Next.js 15.3.6 + React 18.3.1 + TypeScript 5' },
					{ label: 'Backend', text: 'Django 5.2.7 + Django REST Framework 3.16.1' },
					{ label: 'Authentication', text: 'JWT with SimpleJWT 5.3.1' },
					{ label: 'Database', text: 'PostgreSQL 15' },
				],
			},
			credentialsNote: {
				es: 'Proyecto cerrado en Pre-MVP (Dic 2025) por tiempo. Los módulos core están operativos; MQA, testing y hardening de seguridad quedaron fuera del alcance.',
				en: 'Project closed at Pre-MVP stage (Dec 2025) due to time constraints. Core modules are operational; QA, testing, and security hardening were out of scope.',
			},
		},
	},
	{
		id: 'coldevradarsur',
		visible: true,
		domains: ['systems', 'frontend', 'data'],
		title: {
			es: 'ColDev Radar Sur',
			en: 'ColDev Radar Sur',
		},
		subtitle: {
			es: 'Monitor de Clima y Mar para la Comunidad de Chiloé',
			en: 'Weather and Marine Monitor for the Chiloé Community',
		},
		summary: {
			es: 'Aplicación web pública para monitoreo climático y marino de localidades de Quellón (Chiloé). Consume la API Open-Meteo para datos meteorológicos e integra Windy embebido para 5 capas de mapa interactivo. Incluye sistema de alertas climáticas, datos marinos en tiempo real y geolocalizón del usuario.',
			en: 'Public web application for weather and marine monitoring across Quellón (Chiloé) localities. Consumes the Open-Meteo API for meteorological data and integrates embedded Windy for 5 interactive map layers. Includes weather alert system, real-time marine data, and user geolocation.',
		},
		problem: {
			es: 'La comunidad de Chiloé no tenía una herramienta local gratuita para consultar el estado real del clima y el mar: condición de olas, corrientes, viento y visibilidad, críticos para traslados y actividad costera.',
			en: 'The Chiloé community lacked a free local tool to check real weather and sea conditions: wave state, currents, wind, and visibility — all critical for travel and coastal activity.',
		},
		impact: {
			es: 'Servicio gratuito para la comunidad que centraliza clima horario, pronóstico de 7 días, datos marinos (altura de ola, periodo, corriente, nivel del mar), alertas triple (Estable / Precaución / Alerta) y un mapa operativo con capas seleccionables (lluvia, nubes, viento, olas, corrientes).',
			en: 'Free community service centralizing hourly weather, 7-day forecast, marine data (wave height, period, current, sea level), triple alerts (Stable / Caution / Alert), and an operational map with selectable layers (rain, clouds, wind, waves, currents).',
		},
		role: {
			es: 'Desarrollo Frontend completo (React 19 + Vite + TypeScript), integración de API externa (Open-Meteo), embebido de mapa Windy, sistema de alertas y geolocalización nativa del navegador.',
			en: 'Complete Frontend Development (React 19 + Vite + TypeScript), external API integration (Open-Meteo), Windy map embedding, alert system, and native browser geolocation.',
		},
		stack: ['React 19', 'TypeScript', 'Vite', 'Open-Meteo API', 'Windy Embed'],
		phase: 'prototype',
		access: 'open',
		links: {
			primary: '',
			demo: '',
			repo: '',
		},
		media: {
			cover: '/images/radarsur/logo-radarsur-dark.png',
			gallery: [],
		},
		caseStudy: {
			headline: {
				es: 'Radar Sur — Clima y Mar para Chiloé en Tiempo Real',
				en: 'Radar Sur — Real-Time Weather and Marine for Chiloé',
			},
			description: {
				es: 'SPA en React 19 + Vite + TypeScript que consume Open-Meteo (datos atmosféricos horarios y diarios) y la API Marine (altura de ola, periodo, corriente, nivel del mar). El estado se derivado con useMemo para calcular alertas climáticas (lluvia > 75% o viento > 36 km/h = Alerta), resumen inteligente de condiciones, bandas de temperatura horaria y paleta de humor (mood) que cambia la UI según el clima. El mapa Windy se embebe como iframe dinámico con 5 capas seleccionables por parámetro URL.',
				en: 'React 19 + Vite + TypeScript SPA consuming Open-Meteo (hourly and daily atmospheric data) and the Marine API (wave height, period, current, sea level). State is derived with useMemo to compute weather alerts (rain > 75% or wind > 36 km/h = Alert), smart condition summaries, hourly temperature bars, and a mood palette that shifts the UI based on weather. The Windy map is embedded as a dynamic iframe with 5 layers selectable via URL parameter.',
			},
			microStats: {
				es: ['Open-Meteo API', '5 Capas de Mapa', 'Alertas Triple'],
				en: ['Open-Meteo API', '5 Map Layers', 'Triple Alerts'],
			},
			features: {
				es: [
					'Condiciones actuales: temperatura, sensación, humedad, presión, visibilidad, UV e índice de viento con dirección cardinal.',
					'Panel marino: altura de ola, periodo, velocidad de corriente y nivel del mar — críticos para la actividad costera de la zona.',
					'Pronóstico horario seleccionable por día (7 días) con carrusel de chips y barra de tendencia térmica visual.',
					'Geolocalización nativa del navegador para detectar la localidad más cercana de Quellón, con opción de guardar como preferencia por cookie.',
				],
				en: [
					'Current conditions: temperature, apparent temp, humidity, pressure, visibility, UV index, and wind with cardinal direction.',
					'Marine panel: wave height, wave period, current velocity, and sea level — critical for coastal activity in the area.',
					'Day-selectable hourly forecast (7 days) with chip carousel and visual thermal trend bars.',
					'Native browser geolocation to detect the nearest Quellón locality, with option to save as cookie preference.',
				],
			},
			credentials: {
				es: [
					{ label: 'Frontend', text: 'React 19 + TypeScript + Vite' },
					{ label: 'Datos', text: 'Open-Meteo API (clima) + Marine API (mar)' },
					{ label: 'Mapa', text: 'Windy embed — 5 capas: lluvia, nubes, viento, olas, corrientes' },
				],
				en: [
					{ label: 'Frontend', text: 'React 19 + TypeScript + Vite' },
					{ label: 'Data', text: 'Open-Meteo API (weather) + Marine API (sea)' },
					{ label: 'Map', text: 'Windy embed — 5 layers: rain, clouds, wind, waves, currents' },
				],
			},
			credentialsNote: {
				es: 'Servicio gratuito para la comunidad de Chiloé. Demuestra integración de APIs externas, deriváción de estado reactivo con useMemo y UI adaptativa por condición ambiental real.',
				en: 'Free service for the Chiloé community. Demonstrates external API integration, reactive state derivation with useMemo, and adaptive UI driven by real environmental conditions.',
			},
		},
	},
	{
		id: 'mar2control',
		visible: true,
		domains: ['systems', 'backend', 'frontend'],
		title: {
			es: 'Mar2Control',
			en: 'Mar2Control',
		},
		subtitle: {
			es: 'Plataforma de Control de Calidad para Proceso Marino',
			en: 'Quality Control Platform for Marine Processing',
		},
		summary: {
			es: 'Sistema multi-tenant en construcción para gestionar el control de calidad en la industria de procesamiento marino. Backend Django con modelo multitenant (Tenant), apps especializadas para lotes de producción (lots) y registros de calidad (quality), y frontend Next.js 15 en arquitectura App Router.',
			en: 'Multi-tenant system under construction for quality control management in the marine processing industry. Django backend with multi-tenant model (Tenant), specialized apps for production lots (lots) and quality records (quality), and a Next.js 15 App Router frontend.',
		},
		problem: {
			es: 'Las procesadoras marinas operan sin trazabilidad digital de lotes de producción: los registros de calidad, inspecciones y firmas de aprobación se hacen en papel, dificultando auditorías y certificaciones de calidad.',
			en: 'Marine processing plants operate without digital traceability of production lots: quality records, inspections, and approval sign-offs are paper-based, hindering audits and quality certifications.',
		},
		impact: {
			es: 'Digitaliza el ciclo de vida de cada lote marino: desde su creación hasta los registros de calidad asociados, con acceso por roles y aislamiento de datos por empresa (multitenant) para que distintas procesadoras usen el mismo sistema de forma segura.',
			en: 'Digitalizes the lifecycle of each marine lot: from creation through associated quality records, with role-based access and company-level data isolation (multitenant) so different processors use the same system securely.',
		},
		role: {
			es: 'Diseño de API REST Django (multitenant, apps lots + quality), modelado de datos relacionales, y frontend Next.js 15 App Router con rutas protegidas y consumo de API.',
			en: 'Django REST API design (multitenant, lots + quality apps), relational data modeling, and Next.js 15 App Router frontend with protected routes and API consumption.',
		},
		stack: ['Django', 'Django REST Framework', 'Next.js 15', 'TypeScript', 'PostgreSQL'],
		phase: 'building',
		access: 'corporate',
		links: {
			primary: '',
			demo: '',
			repo: '',
		},
		media: {
			cover: '/images/mar2control/home.png',
			gallery: [],
		},
		caseStudy: {
			headline: {
				es: 'Mar2Control — Trazabilidad de Lotes y Calidad en Planta Marina',
				en: 'Mar2Control — Lot Traceability and Quality Records for Marine Plants',
			},
			description: {
				es: 'Arquitectura de dos capas: (1) Backend Django con soporte multitenant nativo — el modelo Tenant aísla los datos de cada empresa por slug, garantizando que distintas plantas operen sin cruzar datos. Las apps `lots` y `quality` gestionan el ciclo de vida de lotes de producción y sus registros de inspección. La app `authentication` controla usuarios y permisos por tenancy. (2) Frontend Next.js 15 App Router con rutas protegidas ((auth) y (protected)/dashboard), API client centralizado y Context API para estado de sesión.',
				en: 'Two-layer architecture: (1) Django backend with native multi-tenant support — the Tenant model isolates each company\'s data by slug, ensuring different plants operate without data cross-contamination. The `lots` and `quality` apps manage the lifecycle of production lots and their inspection records. The `authentication` app controls users and permissions per tenancy. (2) Next.js 15 App Router frontend with protected routes ((auth) and (protected)/dashboard), centralized API client, and Context API for session state.',
			},
			microStats: {
				es: ['Multi-Tenant', 'Lotes + Calidad', 'App Router'],
				en: ['Multi-Tenant', 'Lots + Quality', 'App Router'],
			},
			features: {
				es: [
					'Modelo multitenant con aislamiento por Tenant (slug único) — cada empresa tiene su propia partición de datos en la misma instancia.',
					'App `lots`: gestión del ciclo de vida de lotes de producción marina con relaciones a registros de calidad.',
					'App `quality`: registros de inspección y control de calidad asociados a cada lote, estructurados para auditorías normativas.',
					'Frontend Next.js 15 App Router con layout de rutas protegidas, cliente API centralizado (`lib/api-client.ts`) y Context de autenticación.',
				],
				en: [
					'Multi-tenant model with isolation per Tenant (unique slug) — each company gets its own data partition on the same instance.',
					'`lots` app: production lot lifecycle management with relations to quality records.',
					'`quality` app: inspection and quality control records linked to each lot, structured for regulatory audits.',
					'Next.js 15 App Router frontend with protected route layouts, centralized API client (`lib/api-client.ts`), and authentication Context.',
				],
			},
			credentials: {
				es: [
					{ label: 'Backend', text: 'Django + Django REST Framework + PostgreSQL' },
					{ label: 'Frontend', text: 'Next.js 15 App Router + TypeScript' },
					{ label: 'Modelo', text: 'Multitenant — aislamiento de datos por empresa' },
				],
				en: [
					{ label: 'Backend', text: 'Django + Django REST Framework + PostgreSQL' },
					{ label: 'Frontend', text: 'Next.js 15 App Router + TypeScript' },
					{ label: 'Model', text: 'Multi-tenant — company-level data isolation' },
				],
			},
			credentialsNote: {
				es: 'Proyecto en Pre-MVP. Demuestra diseño de sistemas multitenant en Django y arquitectura de frontend con Next.js App Router desde cero.',
				en: 'Pre-MVP project. Demonstrates multi-tenant system design in Django and Next.js App Router frontend architecture from scratch.',
			},
		},
	},
	{
		id: 'voyscout',
		visible: true,
		domains: ['systems', 'backend', 'frontend'],
		title: {
			es: 'VoyScout (SGC)',
			en: 'VoyScout (SGC)',
		},
		subtitle: {
			es: 'Engine de Transmutación Analítica y Business Intelligence',
			en: 'Analytical Transmutation Engine and Business Intelligence',
		},
		summary: {
			es: 'Submódulo de inteligencia de negocio diseñado para ingerir miles de registros brutos extraídos del Sistema de Gestión de Cursos y proyectarlos visualmente como KPIs ejecutivos matemáticos.',
			en: 'Business intelligence sub-module designed to ingest thousands of raw records extracted from the Course Management System and visually project them as executive mathematical KPIs.',
		},
		problem: {
			es: 'El análisis de datos en tablas masivas SQL ralentizaba el cálculo de cuotas operativas e hitos contables y generaba fricción analítica con la jefatura central.',
			en: 'Data analysis on massive SQL tables slowed the calculation of operative quotas and accounting milestones, causing analytical friction with headquarters.',
		},
		impact: {
			es: 'Agrega algoritmos funcionales al frontend que digieren JSON crudos, convirtiéndolos en reportes de alta fidelidad que condensan los números instantáneamente a nivel organizativo.',
			en: 'Appends functional algorithms to the frontend that digest raw JSON, converting them into high-fidelity reports condensing numbers instantly across the organizational level.',
		},
		role: {
			es: 'Transformación asíncrona de datos en JavaScript (reduce/map/filter), Modelado Vectorial en Recharts (D3.js), e Interfaz Dashboards CSS Grid.',
			en: 'Asynchronous JavaScript Data Transformation (reduce/map/filter), Vector Modeling in Recharts (D3.js), and CSS Grid Dashboard Interface.',
		},
		stack: ['React', 'Vite', 'Tailwind CSS', 'Recharts', 'Django'],
		phase: 'prototype',
		access: 'private',
		links: {
			primary: '/demo/sgc',
			demo: '/demo/sgc',
			repo: '',
		},
		media: {
			cover: '/images/placeholders/voyscout.svg',
			gallery: [],
		},
		caseStudy: {
			headline: {
				es: 'VoyScout SGC - Algoritmos Frontend en Componentes Dashboards',
				en: 'VoyScout SGC - Frontend Algorithms inside Dashboard Components',
			},
			description: {
				es: 'Este portafolio extractivo demuestra explícitamente experiencia manejando transformaciones escalares de datos orientadas a graficación. A partir de colecciones planas de API del sistema en Django, el cliente React ejecuta acumuladores, cruces y filtrados complejos usando puramente programación funcional ES6+. Posteriormente, inyecta estas matrices en primitivas modulares construidas por Recharts. En esencia: Recarga de Data Engine del lado del cliente acoplado con modelado de infografías dinámicas escalables.',
				en: 'This extractive portfolio explicitly proves experience handling scalar data transformations targeting chart integrations. Out of flat API collections from a Django system, the React client executes accumulators, joins, and complex filtering exclusively using ES6+ functional programming. Next, it injects these matrices into modular primitives built by Recharts. Essentially: Client-side Data Engine off-loading paired with dynamic scalable infographic modeling.',
			},
			microStats: {
				es: ['Transformación ES6+', 'Inyección SVG Automática', 'Análisis Matricial Visual'],
				en: ['ES6+ Transformation', 'Automatic SVG Injection', 'Visual Matrix Analysis'],
			},
			features: {
				es: [
					'Reestructuración funcional profunda de Array/Objects orientada al performance y cálculo contable.',
					'Implementación matemática de cartesianos abstractos utilizando wrappers reactivos sobre D3.js (Recharts).',
					'Arquitectura visual diseñada en base a rejillas responsivas orientadas la máxima asimilación humana.',
				],
				en: [
					'Deep functional restructuring of Array/Objects aimed at performance and accounting calculation.',
					'Mathematical implementation of abstract Cartesians using reactive D3.js wrappers (Recharts).',
					'Visual architecture structured atop responsive grids prioritizing maximum fast human assimilation.',
				],
			},
			credentials: {
				es: [
					{ label: 'Ecosistema Engine UI', text: 'React + Node/Vite + Tailwind CSS' },
					{ label: 'Bibliotecas Visualización', text: 'Recharts' },
				],
				en: [
					{ label: 'UI Engine Ecosystem', text: 'React + Node/Vite + Tailwind CSS' },
					{ label: 'Visualization Libraries', text: 'Recharts' },
				],
			},
			credentialsNote: {
				es: 'Certifica solidez en lógica en JavaScript procesando datos analíticos pre-renderizado.',
				en: 'Certifies robust logic capabilities with raw JavaScript processing analytical datasets pre-render.',
			},
		},
	},
	{
		id: 'coldevpay',
		visible: true,
		domains: ['mobile', 'frontend', 'systems'],
		title: {
			es: 'ColDev Pay',
			en: 'ColDev Pay',
		},
		subtitle: {
			es: 'Aplicación Financiera Nativa / FinOps App',
			en: 'Native Financial Application / FinOps App',
		},
		summary: {
			es: 'Solución Fintech interna desarrollada netamente usando código cross-platform para manejar transacciones de caja, nóminas organizativas e historial de egresos con precisión incondicional.',
			en: 'Internal Fintech solution developed inherently utilizing cross-platform code to handle cash transactions, organizational payrolls, and outgoing record flows with absolute precision.',
		},
		problem: {
			es: 'La centralización contable forzaba a los administrativos a utilizar dispositivos fijos. Necesitaban controlar liquidaciones auditables, rastreos y liquidaciones organizativas directamente en movimiento.',
			en: 'Accounting centralization forced administrators to fixed terminals. They needed to supervise auditable settlements, tracking, and organizational flows directly on the move.',
		},
		impact: {
			es: 'Digitaliza firmemente la conciliación financiera móvil, proveyendo a los agentes un dispositivo operativo que almacena firmemente operaciones con integridad bancaria y seguridad en criptografía local.',
			en: 'Firmly digitizes mobile financial reconciliation, provisioning agents with an operating application storing operations natively alongside banking integrity and local device cryptographic security.',
		},
		role: {
			es: 'Ingeniería React Native para Móviles Cross-Platform, Enrutamiento Estructural de Interfaz Táctil (React Navigation), y Abstracciones Seguras de Ciclo Offline-Online.',
			en: 'React Native Cross-Platform Mobile Engineering, Structural Routing inside Touch interfaces (React Nav), and Secure Offline-Online cycle abstractions.',
		},
		stack: ['React Native', 'Expo', 'TypeScript', 'AsyncStorage', 'React Navigation'],
		phase: 'mvp',
		access: 'corporate',
		links: {
			primary: '',
			demo: '',
			repo: '',
		},
		media: {
			cover: '/images/coldevpos/landing_web.svg', 
			gallery: [],
		},
		caseStudy: {
			headline: {
				es: 'ColDev Pay — Ingeniería en Empaquetado de Hardware Móvil',
				en: 'ColDev Pay — Mobile Hardware Packaging Engineering',
			},
			description: {
				es: 'Evidencia concluyente de portabilidad de habilidades al terreno de Sistemas Móviles y Ecosistemas de App Stores. ColDev Pay no es una página envolvente de navegador, es código React Native empacado y puenteado asíncronamente a los módulos subyacentes Swift y Kotlin gracias a la arquitectura Expo. Administra con rigor una topología densa de "Navigational Trees" (Navegación Stack/Tabs anidadas) en React Navigation v7 y trata el estado persistente confidencial por medio de AsyncStorage nativo para sesiones de autenticación tokenizadas encriptadas dentro del dispositivo.',
				en: 'Conclusive evidence highlighting skill portability into Mobile Systems and App Store Environments. ColDev Pay isn\'t a wrapper around browser engines; it\'s React Native code packaged and asynchronously bridged under Swift and Kotlin baseline systems utilizing Expo Architecture. It stringently administrates tight "Navigational Trees" (Nested Stack/Bottom Tabs routing) atop React Navigation V7, securely parsing persistent confidential state utilizing native AsyncStorage handling tokenized encrypted runtime sessions intra-device.',
			},
			microStats: {
				es: ['iOS & Android App', 'Tree Routing', 'Mobile Persistence'],
				en: ['iOS & Android App', 'Tree Routing', 'Mobile Persistence'],
			},
			features: {
				es: [
					'Arquitectura de Directorio orientada fuertemente a Features móviles escalables implementando Strict TypeScript Checking.',
					'Estrategia avanzada en enrutamiento Bottom Tabs vs Screens Modales dentro de plataformas cruzadas.',
					'Operación de hilos puenteando operaciones de sincronización RESTful hacia backends cuando transiciona estado online/offline móvil.',
				],
				en: [
					'Directory Architecture vastly mapped into scalable mobile Features executing Strict TypeScript Compiling constraints.',
					'Advanced Bottom Tabs vs Modal Screen routing strategies across bridged cross-platforms.',
					'Thread operation handling bridging RESTful syncs into external backends tracking device online/offline states intermissions.',
				],
			},
			credentials: {
				es: [
					{ label: 'Base Híbrida', text: 'React Native v0.81 + Expo v54' },
					{ label: 'Rutas', text: 'React Navigation v7' },
					{ label: 'Metodología', text: 'Single Cross-Platform codebase to Mobile Executables OS' },
				],
				en: [
					{ label: 'Hybrid Baseline', text: 'React Native v0.81 + Expo v54' },
					{ label: 'Routing Framework', text: 'React Navigation v7' },
					{ label: 'Methodology', text: 'Single Cross-Platform codebase to Mobile Executables OS' },
				],
			},
			credentialsNote: {
				es: 'Muestra agilidad moviéndose lateralmente de entornos front-end / backend tradicionales hacia el despliegue puramente transaccional en móvil hardware dependiente.',
				en: 'Showcases agile lateral displacement capabilities branching outside traditional web frameworks pushing transactional builds straight into mobile dependent hardware.',
			},
		},
	},
];

export const portfolioProjects = projectsCatalog.filter((project) => project.visible !== false);

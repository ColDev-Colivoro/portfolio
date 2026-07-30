import { useEffect, useMemo, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ShieldAlert, Hammer, FlaskConical, BadgeCheck, Lock, Building2, Globe, X } from 'lucide-react';
// Mapeo de nombres a componentes Lucide
const iconMap = {
    Hammer,
    FlaskConical,
    BadgeCheck,
    Lock,
    Building2,
    Globe,
};
import { useNavigate } from 'react-router-dom';
import { portfolioProjects, PROJECT_PHASES, PROJECT_ACCESS } from '@/data/projectsData';
import { siteContent } from '@/data/siteContent';
import { useLocale } from '@/context/LocaleContext';
import { resolveCopy } from '@/lib/i18n';
import { getSectionRevealTransition, sectionRevealInitial, sectionRevealInView } from '@/lib/motionPresets';

const CURATED_PROJECT_IDS = ['nutriscoc', 'coldevpos', 'voyscout', 'coldevradarsur', 'mar2control', 'coldevpay'];

const bentoSlotClassMap = {
	0: 'md:col-span-2 lg:col-span-2 lg:row-span-2',
	1: 'md:col-span-1 lg:col-span-2 lg:row-span-1',
	2: 'md:col-span-1 lg:col-span-2 lg:row-span-2',
	3: 'md:col-span-1 lg:col-span-1 lg:row-span-1',
	4: 'md:col-span-1 lg:col-span-1 lg:row-span-1',
	5: 'md:col-span-2 lg:col-span-4 lg:row-span-1',
};

const phaseColorMap = {
	amber: 'border-amber-500/30 bg-amber-500/10 text-amber-400',
	sky: 'border-sky-400/30 bg-sky-400/10 text-sky-400',
	emerald: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
};

const accessColorMap = {
	rose: 'border-rose-400/30 bg-rose-400/10 text-rose-400',
	violet: 'border-violet-400/30 bg-violet-400/10 text-violet-400',
	cyan: 'border-cyan-400/30 bg-cyan-400/10 text-cyan-400',
};

const Projects = () => {
	const { lang } = useLocale();
	const navigate = useNavigate();
	
    // State for Floating Overlay
    const rightPanelRef = useRef(null);
    const closeButtonRef = useRef(null);
    const lastTriggerRef = useRef(null);
    const [activeProject, setActiveProject] = useState(null);

    const closeModal = () => {
        setActiveProject(null);

        requestAnimationFrame(() => {
            lastTriggerRef.current?.focus();
        });
    };

	useEffect(() => {
		if (!activeProject) return undefined;

		const previousOverflow = document.body.style.overflow;
		const handleEscape = (event) => {
			if (event.key === 'Escape') closeModal();
		};

		document.body.style.overflow = 'hidden';
		document.addEventListener('keydown', handleEscape);
		const focusFrame = requestAnimationFrame(() => {
			closeButtonRef.current?.focus();
		});

		return () => {
			cancelAnimationFrame(focusFrame);
			document.body.style.overflow = previousOverflow;
			document.removeEventListener('keydown', handleEscape);
		};
	}, [activeProject]);
	
    const content = siteContent.projects;

	const projects = useMemo(() => {
		const projectById = new Map(portfolioProjects.map((project) => [project.id, project]));
		return CURATED_PROJECT_IDS.map((projectId) => projectById.get(projectId)).filter(Boolean);
	}, []);

	const getProjectDisplay = (project) => {
		if (project.id !== 'voyscout') {
			return {
				title: resolveCopy(project.title, lang),
				subtitle: resolveCopy(project.subtitle, lang),
				summary: resolveCopy(project.summary, lang),
			};
		}

		return {
			title: lang === 'es' ? 'Dashboard SGC' : 'SGC Dashboard',
			subtitle: lang === 'es' ? 'Sistema de Gestión de Cursos' : 'Course Management System',
			summary: resolveCopy(project.summary, lang),
		};
	};

	const handleProjectClick = (e, project) => {
		if (project.caseStudy || project.links.primary) {
            lastTriggerRef.current = e.currentTarget;
            setActiveProject(project);
		}
	};

    const handleProjectKeyDown = (event, project) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;

        event.preventDefault();
        handleProjectClick(event, project);
    };

	return (
		<div className="container mx-auto px-4">
			<div className="mx-auto flex flex-col gap-10 max-w-7xl lg:flex-row lg:items-start lg:gap-12">
				
                {/* Panel Lateral Izquierdo: Contexto y Deslinde de Responsabilidad */}
                <div className="w-full lg:w-[28%] lg:shrink-0 pt-0">
                    <div className="sticky top-24 space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                                {lang === 'es' ? 'Proyectos & Lab' : 'Projects & Lab'}
                            </h2>
                            <p className="mt-4 text-[0.95rem] leading-relaxed text-muted-foreground">
                                {lang === 'es'
                                    ? 'Cada proyecto lleva dos etiquetas: su fase de desarrollo y su tipo de acceso. Esto refleja en qué punto está y quién puede verlo o usarlo.'
                                    : 'Each project carries two tags: its development phase and its access type. This reflects where it stands and who can see or use it.'}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5 relative overflow-hidden">
                                <ShieldAlert className="absolute -right-4 -top-4 h-24 w-24 text-emerald-500/10" />
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3">
                                        <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                                        <h3 className="font-semibold text-emerald-500">
                                            {lang === 'es' ? 'Demos Lógicas Autorizadas' : 'Authorized Logical Demos'}
                                        </h3>
                                    </div>
                                    <p className="mt-3 text-sm leading-relaxed text-foreground/80">
                                        {lang === 'es'
                                            ? 'Para los sistemas corporativos, diseñamos escenarios interactivos autorizados que ilustran capacidad técnica y dirección lógica UX, sin exponer servidores ni código cliente.'
                                            : 'For corporate systems, we design authorized interactive scenarios illustrating technical capability and UX logical direction, without exposing servers or client code.'}
                                    </p>
                                </div>
                            </div>

                            {/* Leyenda: Fase de Desarrollo */}
                            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent mb-3">
                                    {lang === 'es' ? 'Fase de Desarrollo' : 'Development Phase'}
                                </p>
                                <div className="space-y-2">
                                                                        {Object.entries(PROJECT_PHASES).map(([key, cfg]) => {
                                                                            const Icon = iconMap[cfg.icon];
                                                                            return (
                                                                                <div key={key} className="flex items-center gap-2">
                                                                                    {Icon && <Icon className="w-4 h-4" />}
                                                                                    <span className="text-xs font-medium text-foreground">{lang === 'es' ? cfg.es : cfg.en}</span>
                                                                                </div>
                                                                            );
                                                                        })}
                                </div>
                            </div>

                            {/* Leyenda: Tipo de Acceso */}
                            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent mb-3">
                                    {lang === 'es' ? 'Tipo de Acceso' : 'Access Type'}
                                </p>
                                <div className="space-y-2">
                                                                        {Object.entries(PROJECT_ACCESS).map(([key, cfg]) => {
                                                                            const Icon = iconMap[cfg.icon];
                                                                            return (
                                                                                <div key={key} className="flex items-center gap-2">
                                                                                    {Icon && <Icon className="w-4 h-4" />}
                                                                                    <span className="text-xs font-medium text-foreground">{lang === 'es' ? cfg.es : cfg.en}</span>
                                                                                </div>
                                                                            );
                                                                        })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Grilla Bento Clásica */}
                <div className="flex-1 relative" ref={rightPanelRef}>
                    
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:[grid-auto-flow:dense]">
                        {projects.map((project, index) => {
                            const display = getProjectDisplay(project);
                            const hasCaseAction = Boolean(project.caseStudy || project.links.primary);
                            const actionLabel =
                                project.id === 'voyscout'
                                    ? lang === 'es'
                                        ? 'Abrir plataforma'
                                        : 'Open platform'
                                    : resolveCopy(content.openCase, lang);

                            const slotClass = bentoSlotClassMap[index] ?? 'md:col-span-1 lg:col-span-2 lg:row-span-1';

                            return (
                                <motion.article
                                    id={`project-${project.id}`}
                                    key={`grid-card-${project.id}`}
                                    layoutId={`card-container-${project.id}`}
                                    initial={sectionRevealInitial}
                                    whileInView={sectionRevealInView}
                                    viewport={{ once: true, amount: 0.15 }}
                                    transition={getSectionRevealTransition(index, 0.05)}
                                    className={`group overflow-hidden flex flex-col rounded-[1.75rem] border border-white/10 bg-background/60 shadow-[0_28px_90px_rgba(0,0,0,0.28)] transition-shadow duration-500 hover:shadow-[0_28px_90px_rgba(0,0,0,0.4)] min-h-[16rem] md:min-h-[18rem] ${slotClass} sweep-hover card-hover cursor-pointer`}
                                    data-pressable="true"
                                    onClick={(e) => handleProjectClick(e, project)}
                                    onKeyDown={(event) => handleProjectKeyDown(event, project)}
                                    tabIndex={hasCaseAction ? 0 : undefined}
                                    aria-label={hasCaseAction
                                        ? (lang === 'es' ? `Abrir detalles de ${display.title}` : `Open details for ${display.title}`)
                                        : undefined}
                                >
                                    {/* Image Container */}
                                    <motion.div layoutId={`card-image-wrapper-${project.id}`} className="relative overflow-hidden bg-black shrink-0 h-40 md:h-48 w-full">
                                        <motion.img
                                            layoutId={`card-image-${project.id}`}
                                            src={project.media.cover}
                                            alt={display.title}
                                            className="absolute inset-0 h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
                                        
                                        <motion.div layoutId={`card-status-${project.id}`} className="absolute left-4 top-4 flex items-center gap-1.5">
                                            {(() => {
                                                const phaseCfg = PROJECT_PHASES[project.phase];
                                                const accessCfg = PROJECT_ACCESS[project.access];
                                                return (
                                                    <>
                                                        <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-medium backdrop-blur-md shadow-sm ${phaseColorMap[phaseCfg.color]}`}>
                                                            {(() => { const Icon = iconMap[phaseCfg.icon]; return Icon ? <Icon className="inline w-4 h-4 mr-1 align-text-bottom" /> : null; })()} {lang === 'es' ? phaseCfg.es : phaseCfg.en}
                                                        </span>
                                                        <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-medium backdrop-blur-md shadow-sm ${accessColorMap[accessCfg.color]}`}>
                                                            {(() => { const Icon = iconMap[accessCfg.icon]; return Icon ? <Icon className="inline w-4 h-4 mr-1 align-text-bottom" /> : null; })()} {lang === 'es' ? accessCfg.es : accessCfg.en}
                                                        </span>
                                                    </>
                                                );
                                            })()}
                                        </motion.div>
                                    </motion.div>

                                    {/* Content Area */}
                                    <motion.div layoutId={`card-content-${project.id}`} className="relative flex flex-1 flex-col justify-between p-5 lg:p-6 bg-background/60 backdrop-blur-sm">
                                        <div className="space-y-3">
                                            <div>
                                                <motion.h3 layoutId={`card-title-${project.id}`} className="font-semibold tracking-tight text-foreground text-xl md:text-[1.4rem]">
                                                    {display.title}
                                                </motion.h3>
                                            </div>

                                            <div className="space-y-3">
                                                <motion.p layoutId={`card-desc-${project.id}`} className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                                                    {display.summary}
                                                </motion.p>
                                                
                                                <div className="flex flex-wrap items-center gap-4 pt-2">
													{project.links.showOnCard && project.links.primary ? (
														<a
															href={project.links.primary}
															target="_blank"
															rel="noopener noreferrer"
															onClick={(event) => event.stopPropagation()}
															aria-label={lang === 'es' ? `Abrir ${display.title}` : `Open ${display.title}`}
															className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-2 text-sm font-semibold text-accent transition-colors hover:bg-accent/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:w-auto"
														>
															{lang === 'es' ? 'Abrir plataforma' : 'Open platform'}
															<ArrowUpRight className="h-4 w-4" aria-hidden="true" />
														</a>
                                                    ) : null}
                                                    {hasCaseAction ? (
                                                        <button
                                                            type="button"
                                                            onClick={(event) => {
                                                                event.stopPropagation();
                                                                handleProjectClick(event, project);
                                                            }}
                                                            className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                                                        >
                                                            {actionLabel}
                                                            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                                                        </button>
                                                    ) : (
                                                        <span className="text-sm text-muted-foreground">{lang === 'es' ? 'Caso privado' : 'Private case'}</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.article>
                            );
                        })}
                    </div>

                    {/* Foco Central: Pop-out Card Mode */}
                    <AnimatePresence>
                        {activeProject && (() => {
                            const display = getProjectDisplay(activeProject);
                            return (
                                <motion.div 
                                    key="project-modal"
                                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 cursor-pointer"
                                >
                                    {/* Velo translúcido tenue a pantalla completa */}
                                    <motion.button
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        type="button"
                                        onClick={closeModal}
                                        aria-label={lang === 'es' ? 'Cerrar detalles del proyecto' : 'Close project details'}
                                        className="absolute inset-0 bg-background/50 backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
                                    />
                                    
                                    {/* Elemento que flota */}
                                    <motion.div
                                        layoutId={`card-container-${activeProject.id}`}
                                        role="dialog"
                                        aria-modal="true"
                                        aria-labelledby={`project-modal-title-${activeProject.id}`}
                                        aria-describedby={`project-modal-description-${activeProject.id}`}
                                        tabIndex="-1"
                                        className="relative z-50 flex w-full max-w-5xl max-h-[calc(100dvh-2rem)] flex-col overflow-x-hidden overflow-y-auto rounded-2xl border border-white/10 bg-background/95 shadow-[0_40px_100px_rgba(0,0,0,0.6)] pointer-events-auto custom-scrollbar sm:max-h-[85vh] sm:rounded-[2rem]"
                                    >
                                        <p id={`project-modal-description-${activeProject.id}`} className="sr-only">
                                            {lang === 'es' ? 'Detalles del proyecto seleccionado.' : 'Details of the selected project.'}
                                        </p>
                                        {/* ═══ HEADER COMPACTO: imagen + info + stack ═══ */}
                                        <div className="flex flex-col gap-4 border-b border-white/5 p-4 sm:flex-row sm:items-start sm:gap-5 sm:p-6 sm:pb-4">
                                            {/* Imagen miniatura */}
                                            <motion.div
                                                layoutId={`card-image-wrapper-${activeProject.id}`}
                                                className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-black border border-white/10"
                                            >
                                                <motion.img
                                                    layoutId={`card-image-${activeProject.id}`}
                                                    src={activeProject.media.cover}
                                                    alt={display.title}
                                                    className="w-full h-full object-contain"
                                                />
                                            </motion.div>

                                            {/* Título + subtítulo + status + pills */}
                                            <motion.div layoutId={`card-content-${activeProject.id}`} className="flex-1 min-w-0">
                                                <div className="mb-1 flex flex-wrap items-center gap-2 sm:gap-3">
                                                    <motion.h3 id={`project-modal-title-${activeProject.id}`} layoutId={`card-title-${activeProject.id}`} className="min-w-0 font-bold tracking-tight text-foreground text-xl leading-tight sm:text-2xl">
                                                        {display.title}
                                                    </motion.h3>
                                                    <motion.div layoutId={`card-status-${activeProject.id}`} className="shrink-0 flex items-center gap-1.5">
                                                        {(() => {
                                                            const phaseCfg = PROJECT_PHASES[activeProject.phase];
                                                            const accessCfg = PROJECT_ACCESS[activeProject.access];
                                                            return (
                                                                <>
                                                                    <span className={`rounded-full border px-2 py-0.5 text-[9px] font-medium ${phaseColorMap[phaseCfg.color]}`}>
                                                                        {phaseCfg.icon} {lang === 'es' ? phaseCfg.es : phaseCfg.en}
                                                                    </span>
                                                                    <span className={`rounded-full border px-2 py-0.5 text-[9px] font-medium ${accessColorMap[accessCfg.color]}`}>
                                                                        {accessCfg.icon} {lang === 'es' ? accessCfg.es : accessCfg.en}
                                                                    </span>
                                                                </>
                                                            );
                                                        })()}
                                                    </motion.div>
                                                </div>
                                                <motion.p layoutId={`card-subtitle-${activeProject.id}`} className="text-accent/80 uppercase tracking-[0.16em] text-[10px] mb-2">
                                                    {display.subtitle}
                                                </motion.p>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {activeProject.stack.map((item) => (
                                                        <span key={item} className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[9px] font-medium text-accent/90">
                                                            {item}
                                                        </span>
                                                    ))}
                                                </div>
                                            </motion.div>

                                            <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:flex-nowrap sm:self-center">
                                                {/* Botón de acción — esquina superior derecha */}
                                                {activeProject.id === 'voyscout' ? (
                                                    <button
                                                        type="button"
                                                        onClick={() => navigate('/demo/sgc')}
                                                        className="inline-flex min-h-10 flex-1 cursor-pointer items-center justify-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-400 transition-all hover:scale-105 hover:bg-emerald-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 sm:flex-none"
                                                    >
                                                        {lang === 'es' ? '🚀 Dashboard' : '🚀 Dashboard'}
                                                    </button>
                                                ) : (
                                                    activeProject.links.primary && (
                                                    <a
                                                        href={activeProject.links.primary}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        aria-label={lang === 'es' ? `Abrir ${display.title}` : `Open ${display.title}`}
                                                        className="inline-flex min-h-10 flex-1 cursor-pointer items-center justify-center gap-2 rounded-full border border-accent/50 bg-accent/20 px-4 py-2 text-xs font-semibold text-accent transition-all hover:scale-105 hover:bg-accent/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:flex-none"
                                                    >
                                                        {lang === 'es' ? 'Abrir plataforma' : 'Open platform'}
                                                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                                                    </a>
                                                )
                                                )}
                                                <button
                                                    ref={closeButtonRef}
                                                    type="button"
                                                    onClick={closeModal}
                                                    aria-label={lang === 'es' ? 'Cerrar' : 'Close'}
                                                    className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-full p-2 text-muted-foreground transition-colors hover:bg-white/[0.05] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                                                >
                                                    <X className="h-4 w-4" aria-hidden="true" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* ═══ CUERPO SCROLLABLE ═══ */}
                                        <div className="flex-1 overflow-y-auto p-4 pt-5 custom-scrollbar sm:p-6 sm:pt-5">

                                            {/* Resumen general a ancho completo */}
                                            {activeProject.summary && (
                                                <motion.p
                                                    layoutId={`card-desc-${activeProject.id}`}
                                                    className="text-sm text-foreground/85 leading-relaxed mb-5"
                                                >
                                                    {resolveCopy(activeProject.summary, lang)}
                                                </motion.p>
                                            )}

                                            {/* Grid 2x2: Problema | Impacto | Arquitectura | Componentes */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                                {activeProject.problem && (
                                                    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }} className="bg-white/[0.025] rounded-xl p-4 border border-white/5">
                                                        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent mb-1.5">{lang === 'es' ? 'El Problema' : 'The Problem'}</h4>
                                                        <p className="text-[13px] text-muted-foreground leading-relaxed">{resolveCopy(activeProject.problem, lang)}</p>
                                                    </motion.div>
                                                )}

                                                {activeProject.impact && (
                                                    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/[0.025] rounded-xl p-4 border border-white/5">
                                                        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent mb-1.5">{lang === 'es' ? 'Solución e Impacto' : 'Solution & Impact'}</h4>
                                                        <p className="text-[13px] text-muted-foreground leading-relaxed">{resolveCopy(activeProject.impact, lang)}</p>
                                                    </motion.div>
                                                )}

                                                {activeProject.caseStudy?.description && (
                                                    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }} className="bg-white/[0.025] rounded-xl p-4 border border-white/5">
                                                        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent mb-1.5">{lang === 'es' ? 'Arquitectura' : 'Architecture'}</h4>
                                                        <p className="text-[13px] text-muted-foreground leading-relaxed">{resolveCopy(activeProject.caseStudy.description, lang)}</p>
                                                    </motion.div>
                                                )}

                                                {activeProject.caseStudy?.features?.es?.length > 0 && (
                                                    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }} className="bg-white/[0.025] rounded-xl p-4 border border-white/5">
                                                        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent mb-1.5">{lang === 'es' ? 'Componentes Clave' : 'Key Components'}</h4>
                                                        <ul className="space-y-1">
                                                            {resolveCopy(activeProject.caseStudy.features, lang).map((feat, idx) => (
                                                                <li key={idx} className="text-[13px] text-muted-foreground flex gap-2">
                                                                    <span className="text-accent shrink-0 mt-0.5">▸</span>
                                                                    <span className="leading-snug">{feat}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </motion.div>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            );
                        })()}
                    </AnimatePresence>
                </div>
			</div>
		</div>
	);
};

export default Projects;

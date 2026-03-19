import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { portfolioProjects } from '@/data/projectsData';
import { siteContent } from '@/data/siteContent';
import { useLocale } from '@/context/LocaleContext';
import { resolveCopy } from '@/lib/i18n';
import ProjectModalContent from '@/components/ProjectModalContent';
import CaseStudyModalShell from '@/components/CaseStudyModalShell';
import { getSectionRevealTransition, sectionRevealInitial, sectionRevealInView } from '@/lib/motionPresets';

const CURATED_PROJECT_IDS = ['nutriscoc', 'coldevpos', 'voyscout', 'coldevradarsur', 'mar2control'];

const bentoSlotClassMap = {
	0: 'md:col-span-2 xl:col-span-4 xl:row-span-2',
	1: 'md:col-span-1 xl:col-span-2 xl:row-span-1',
	2: 'md:col-span-1 xl:col-span-2 xl:row-span-2',
	3: 'md:col-span-1 xl:col-span-2 xl:row-span-1',
	4: 'md:col-span-1 xl:col-span-2 xl:row-span-1',
};

const Projects = () => {
	const { lang } = useLocale();
	const [activeProject, setActiveProject] = useState(null);
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

	const openProject = (project) => {
		if (project.caseStudy) {
			setActiveProject(project);
			return;
		}

		if (project.links.primary) {
			window.open(project.links.primary, '_blank', 'noopener,noreferrer');
		}
	};

	return (
		<div className="container mx-auto px-4">
			<div className="mx-auto max-w-6xl">
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-6 xl:[grid-auto-flow:dense]">
					{projects.map((project, index) => {
						const display = getProjectDisplay(project);
						const hasCaseAction = Boolean(project.caseStudy || project.links.primary);

						return (
							<motion.article
								key={project.id}
								initial={sectionRevealInitial}
								whileInView={sectionRevealInView}
								viewport={{ once: true, amount: 0.15 }}
								transition={getSectionRevealTransition(index, 0.05)}
								className={`group sweep-hover card-hover relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03] shadow-[0_28px_90px_rgba(0,0,0,0.28)] min-h-[17rem] md:min-h-[19rem] ${bentoSlotClassMap[index] ?? 'md:col-span-1 xl:col-span-2'}`}
								data-pressable="true"
							>
								<div className="absolute inset-0 overflow-hidden bg-black">
									<img
										src={project.media.cover}
										alt={display.title}
										className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-background via-background/45 to-background/25" />
									<div className="absolute left-4 top-4 rounded-full border border-white/10 bg-background/80 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-accent">
										{resolveCopy(project.status, lang)}
									</div>
								</div>

								<div className="relative z-10 flex h-full flex-col justify-end space-y-3 p-4 md:p-5">
									<div>
										<h3 className="text-2xl font-semibold tracking-[-0.04em] text-foreground md:text-[1.7rem]">{display.title}</h3>
										<p className="mt-1 text-[11px] uppercase tracking-[0.28em] text-accent/90 md:text-xs">{display.subtitle}</p>
										<p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground md:text-[0.95rem]">{display.summary}</p>
									</div>

									<div className="flex flex-wrap gap-2">
										{project.stack.slice(0, 3).map((item) => (
											<span key={item} className="rounded-full border border-white/10 bg-black/45 px-3 py-1 text-[11px] text-foreground/85 backdrop-blur-sm">
												{item}
											</span>
										))}
									</div>

									<div className="flex flex-wrap items-center gap-4 pt-2">
										{hasCaseAction ? (
											<button
												onClick={() => openProject(project)}
												className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent/80 cursor-pointer"
												data-cursor-target="magnetic"
												data-cursor-size="md"
												data-pressable="true"
											>
												{resolveCopy(content.openCase, lang)}
												<ArrowUpRight className="h-4 w-4" />
											</button>
										) : (
											<span className="text-sm text-muted-foreground">{lang === 'es' ? 'Caso privado' : 'Private case'}</span>
										)}
										{project.links.repo ? (
											<a
												href={project.links.repo}
												target="_blank"
												rel="noopener noreferrer"
												className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent cursor-pointer"
												data-cursor-target="magnetic"
												data-cursor-size="sm"
												data-pressable="true"
											>
												{resolveCopy(content.openRepo, lang)}
											</a>
										) : null}
									</div>
								</div>
							</motion.article>
						);
					})}
				</div>
			</div>

			<CaseStudyModalShell
				isOpen={Boolean(activeProject)}
				onClose={() => setActiveProject(null)}
				closeLabel={lang === 'es' ? 'Cerrar' : 'Close'}
				zIndex={120}
			>
				<ProjectModalContent project={activeProject} lang={lang} />
			</CaseStudyModalShell>
		</div>
	);
};

export default Projects;

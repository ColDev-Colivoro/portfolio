import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Filter } from 'lucide-react';
import { portfolioProjects } from '@/data/projectsData';
import { siteContent } from '@/data/siteContent';
import { useLocale } from '@/context/LocaleContext';
import { resolveCopy } from '@/lib/i18n';
import ProjectModalContent from '@/components/ProjectModalContent';

const Projects = () => {
	const { lang } = useLocale();
	const [activeFilter, setActiveFilter] = useState('all');
	const [activeProject, setActiveProject] = useState(null);
	const content = siteContent.projects;

	const projects = useMemo(() => {
		if (activeFilter === 'all') return portfolioProjects;
		return portfolioProjects.filter((project) => project.domains.includes(activeFilter));
	}, [activeFilter]);

	const getDomainLabel = (domain) => resolveCopy(content.domainLabels[domain], lang) || domain;

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
				<div className="mb-8 max-w-3xl">
					<p className="section-eyebrow">{resolveCopy(content.eyebrow, lang)}</p>
					<h2 className="section-title">{resolveCopy(content.title, lang)}</h2>
					<p className="section-copy">{resolveCopy(content.description, lang)}</p>
				</div>

				<div className="mb-8 flex flex-wrap items-center gap-3">
					<div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
						<Filter className="h-3.5 w-3.5" />
						{resolveCopy(content.filterLabel, lang)}
					</div>
					{content.filters.map((filter) => {
						const isActive = filter.id === activeFilter;
						return (
							<button
								key={filter.id}
								onClick={() => setActiveFilter(filter.id)}
								className={`rounded-full px-4 py-2 text-sm transition-colors ${
									isActive
										? 'bg-accent text-accent-foreground'
										: 'border border-white/10 bg-white/[0.03] text-muted-foreground hover:border-accent/40 hover:bg-white/[0.06] hover:text-foreground'
								}`}
								data-cursor-target="magnetic"
								data-cursor-size="sm"
								data-pressable="true"
							>
								{resolveCopy(filter.label, lang)}
							</button>
						);
					})}
				</div>

				<div className="grid gap-5 lg:grid-cols-2">
					{projects.map((project, index) => (
						<motion.article
							key={project.id}
							initial={{ opacity: 0, y: 48, filter: 'blur(12px)' }}
							whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
							viewport={{ once: true, amount: 0.15 }}
							transition={{ duration: 0.8, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
							className="group sweep-hover card-hover overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03] shadow-[0_28px_90px_rgba(0,0,0,0.28)]"
							data-pressable="true"
						>
							<div className="relative h-52 overflow-hidden border-b border-white/10 bg-black">
								<img
									src={project.media.cover}
									alt={resolveCopy(project.title, lang)}
									className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent" />
								<div className="absolute left-4 top-4 rounded-full border border-white/10 bg-background/80 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-accent">
									{resolveCopy(project.status, lang)}
								</div>
							</div>

							<div className="space-y-4 p-5 md:p-6">
								<div>
									<h3 className="text-2xl font-semibold tracking-[-0.04em] text-foreground md:text-[1.9rem]">
										{resolveCopy(project.title, lang)}
									</h3>
									<p className="mt-1 text-[11px] uppercase tracking-[0.28em] text-accent/80 md:text-xs">
										{resolveCopy(project.subtitle, lang)}
									</p>
									<p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
										{resolveCopy(project.summary, lang)}
									</p>
								</div>

								<div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
									{project.domains.map((domain) => (
										<span key={domain} className="rounded-full border border-white/10 bg-black/20 px-3 py-1">
											{getDomainLabel(domain)}
										</span>
									))}
								</div>

								<div className="flex flex-wrap gap-2">
									{project.stack.slice(0, 4).map((item) => (
										<span key={item} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-muted-foreground">
											{item}
										</span>
									))}
								</div>

								<div className="flex flex-wrap items-center gap-4 pt-2">
									<button
										onClick={() => openProject(project)}
										className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent/80"
										data-cursor-target="magnetic"
										data-cursor-size="md"
										data-pressable="true"
									>
										{resolveCopy(content.openCase, lang)}
										<ArrowUpRight className="h-4 w-4" />
									</button>
									{project.links.repo ? (
										<a
											href={project.links.repo}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent"
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
					))}
				</div>
			</div>

			<AnimatePresence>
				{activeProject && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-[110] flex items-center justify-center bg-black/78 p-4 backdrop-blur-md"
						onClick={() => setActiveProject(null)}
					>
						<motion.div
							initial={{ y: 90, opacity: 0, scale: 0.96 }}
							animate={{ y: 0, opacity: 1, scale: 1 }}
							exit={{ y: 80, opacity: 0, scale: 0.96 }}
							transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
							className="relative h-[88vh] w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-background shadow-[0_50px_140px_rgba(0,0,0,0.45)]"
							onClick={(event) => event.stopPropagation()}
						>
							<button
								onClick={() => setActiveProject(null)}
								className="absolute right-4 top-4 z-20 rounded-full border border-white/10 bg-background/80 px-4 py-2 text-sm text-foreground transition-colors hover:border-accent/40 hover:bg-white/[0.04]"
								data-cursor-target="magnetic"
								data-cursor-size="sm"
								data-pressable="true"
							>
								{lang === 'es' ? 'Cerrar' : 'Close'}
							</button>
							<div className="h-full overflow-y-auto">
								<ProjectModalContent project={activeProject} lang={lang} />
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Projects;

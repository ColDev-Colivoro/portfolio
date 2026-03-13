import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { featuredProjects } from '@/data/projectsData';
import ProjectModalContent from '@/components/ProjectModalContent';
import { useLocale } from '@/context/LocaleContext';
import { siteContent } from '@/data/siteContent';
import { resolveCopy } from '@/lib/i18n';

const FeaturedProject = () => {
	const { lang } = useLocale();
	const [activeProject, setActiveProject] = useState(null);
	const project = featuredProjects[0];
	const content = siteContent.featuredProject;

	const domainLabels = useMemo(
		() => project?.domains?.map((domain) => resolveCopy(siteContent.projects.domainLabels[domain], lang)).filter(Boolean) ?? [],
		[lang, project],
	);

	if (!project) return null;

	return (
		<div className="container mx-auto px-4 py-4">
			<div className="mx-auto max-w-6xl">
				<div className="mb-8 max-w-3xl">
					<p className="text-xs uppercase tracking-[0.28em] text-accent">
						{resolveCopy(content.eyebrow, lang)}
					</p>
					<h2 className="mt-3 text-3xl font-semibold text-foreground md:text-4xl">
						{resolveCopy(content.title, lang)}
					</h2>
					<p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
						{resolveCopy(content.description, lang)}
					</p>
				</div>

				<div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-card/75 p-6 md:p-8">
					<div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
						<div className="relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-background/90">
							<img
								src={project.media.cover}
								alt={resolveCopy(project.title, lang)}
								className="h-full min-h-[320px] w-full object-cover"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
						</div>

						<motion.div
							initial={{ opacity: 0, x: 20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true, amount: 0.25 }}
							transition={{ duration: 0.35 }}
							className="space-y-5"
						>
							<div className="flex flex-wrap gap-2">
								<span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-accent">
									{resolveCopy(project.status, lang)}
								</span>
								{domainLabels.map((label) => (
									<span
										key={label}
										className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted-foreground"
									>
										{label}
									</span>
								))}
							</div>

							<div>
								<h3 className="text-3xl font-semibold leading-tight text-foreground md:text-4xl">
									{resolveCopy(project.subtitle, lang)}
								</h3>
								<p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
									{resolveCopy(project.summary, lang)}
								</p>
							</div>

							<div className="grid gap-4 md:grid-cols-2">
								<div className="rounded-[1.5rem] border border-white/10 bg-background/70 p-4" data-pressable="true">
									<p className="text-xs uppercase tracking-[0.22em] text-accent">
										{lang === 'es' ? 'Problema' : 'Problem'}
									</p>
									<p className="mt-3 text-sm leading-relaxed text-muted-foreground">
										{resolveCopy(project.problem, lang)}
									</p>
								</div>
								<div className="rounded-[1.5rem] border border-white/10 bg-background/70 p-4" data-pressable="true">
									<p className="text-xs uppercase tracking-[0.22em] text-accent">
										{lang === 'es' ? 'Impacto' : 'Impact'}
									</p>
									<p className="mt-3 text-sm leading-relaxed text-muted-foreground">
										{resolveCopy(project.impact, lang)}
									</p>
								</div>
							</div>

							<div className="flex flex-wrap gap-3 pt-2">
								<button
									onClick={() => setActiveProject(project)}
									className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
									data-cursor-target="magnetic"
									data-cursor-size="lg"
									data-pressable="true"
								>
									<ExternalLink className="h-4 w-4" />
									{resolveCopy(content.openCase, lang)}
								</button>
								{project.links.demo ? (
									<a
										href={project.links.demo}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-white/[0.05]"
										data-cursor-target="magnetic"
										data-cursor-size="md"
										data-pressable="true"
									>
										{resolveCopy(content.openDemo, lang)}
									</a>
								) : null}
							</div>
						</motion.div>
					</div>
				</div>
			</div>

			<AnimatePresence>
				{activeProject && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
						onClick={() => setActiveProject(null)}
					>
						<motion.div
							initial={{ y: 40, opacity: 0, scale: 0.96 }}
							animate={{ y: 0, opacity: 1, scale: 1 }}
							exit={{ y: 40, opacity: 0, scale: 0.96 }}
							transition={{ type: 'spring', stiffness: 260, damping: 28 }}
							className="relative h-[90vh] w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-background"
							onClick={(event) => event.stopPropagation()}
						>
							<button
								onClick={() => setActiveProject(null)}
								className="absolute right-4 top-4 z-20 rounded-full border border-white/10 bg-background/70 px-4 py-2 text-sm text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
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

export default FeaturedProject;

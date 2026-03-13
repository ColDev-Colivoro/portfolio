import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { featuredProjects } from '@/data/projectsData';
import ProjectModalContent from '@/components/ProjectModalContent';
import CaseStudyModalShell from '@/components/CaseStudyModalShell';
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
		<div className="container mx-auto px-4">
			<div className="mx-auto max-w-6xl">
				<div className="mb-8 max-w-3xl">
					<p className="section-eyebrow">{resolveCopy(content.eyebrow, lang)}</p>
					<h2 className="section-title">{resolveCopy(content.title, lang)}</h2>
					<p className="section-copy">{resolveCopy(content.description, lang)}</p>
				</div>

				<motion.article
					initial={{ opacity: 0, y: 56, filter: 'blur(12px)' }}
					whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
					viewport={{ once: true, amount: 0.22 }}
					transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
					className="sweep-hover panel-surface overflow-hidden rounded-[2rem]"
				>
					<div className="grid gap-0 lg:grid-cols-[1.02fr_0.98fr] lg:items-stretch">
						<div className="featured-media relative overflow-hidden border-b border-white/10 bg-black lg:border-b-0 lg:border-r">
							<img
								src={project.media.cover}
								alt={resolveCopy(project.title, lang)}
								className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.045]"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-background via-background/15 to-transparent" />
							<div className="absolute left-5 top-5 rounded-full border border-white/10 bg-background/80 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-accent">
								{resolveCopy(project.status, lang)}
							</div>
						</div>

						<div className="flex flex-col justify-between p-6 md:p-8">
							<div>
								<div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
									{domainLabels.map((label) => (
										<span key={label} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">
											{label}
										</span>
									))}
								</div>

								<h3 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-foreground md:text-4xl">
									{resolveCopy(project.title, lang)}
								</h3>
								<p className="mt-2 text-sm uppercase tracking-[0.28em] text-accent/80">
									{resolveCopy(project.subtitle, lang)}
								</p>
								<p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
									{resolveCopy(project.summary, lang)}
								</p>

								<div className="mt-6 grid gap-4 md:grid-cols-2">
									<div className="rounded-[1.25rem] border border-white/10 bg-black/30 p-4">
										<p className="text-[11px] uppercase tracking-[0.24em] text-accent">{lang === 'es' ? 'Problema' : 'Problem'}</p>
										<p className="mt-3 text-sm leading-relaxed text-muted-foreground">{resolveCopy(project.problem, lang)}</p>
									</div>
									<div className="rounded-[1.25rem] border border-white/10 bg-black/30 p-4">
										<p className="text-[11px] uppercase tracking-[0.24em] text-accent">{lang === 'es' ? 'Impacto' : 'Impact'}</p>
										<p className="mt-3 text-sm leading-relaxed text-muted-foreground">{resolveCopy(project.impact, lang)}</p>
									</div>
								</div>
							</div>

							<div className="mt-8 flex flex-wrap gap-3">
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
										className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent/40 hover:bg-white/[0.05]"
										data-cursor-target="magnetic"
										data-cursor-size="md"
										data-pressable="true"
									>
										{resolveCopy(content.openDemo, lang)}
										<ArrowUpRight className="h-4 w-4" />
									</a>
								) : null}
							</div>
						</div>
					</div>
				</motion.article>
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

export default FeaturedProject;

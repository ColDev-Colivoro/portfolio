import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Filter } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { portfolioProjects } from '@/data/projectsData';
import { siteContent } from '@/data/siteContent';
import { useLocale } from '@/context/LocaleContext';
import { resolveCopy } from '@/lib/i18n';

const Projects = () => {
	const { lang } = useLocale();
	const navigate = useNavigate();
	const location = useLocation();
	const [activeFilter, setActiveFilter] = useState('all');
	const content = siteContent.projects;

	const projects = useMemo(() => {
		if (activeFilter === 'all') return portfolioProjects;
		return portfolioProjects.filter((project) => project.domains.includes(activeFilter));
	}, [activeFilter]);

	const openProject = (url) => {
		if (!url) return;
		if (url.startsWith('#')) {
			if (location.pathname !== '/') {
				navigate(`/${url}`);
				setTimeout(() => {
					const target = document.getElementById(url.replace('#', ''));
					target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
				}, 120);
				return;
			}

			const target = document.getElementById(url.replace('#', ''));
			target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
			return;
		}

		window.open(url, '_blank', 'noopener,noreferrer');
	};

	const getDomainLabel = (domain) => resolveCopy(content.domainLabels[domain], lang) || domain;

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

				<div className="mb-8 flex flex-wrap items-center gap-3">
					<div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">
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
										: 'border border-white/10 bg-white/[0.04] text-muted-foreground hover:bg-white/[0.08] hover:text-foreground'
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
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.2 }}
							transition={{ duration: 0.35, delay: index * 0.05 }}
							className="overflow-hidden rounded-[1.9rem] border border-white/10 bg-card/70"
							data-pressable="true"
						>
							<div className="relative h-56 overflow-hidden border-b border-white/10 bg-background">
								<img
									src={project.media.cover}
									alt={resolveCopy(project.title, lang)}
									className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
								<div className="absolute left-5 top-5 rounded-full border border-white/10 bg-background/70 px-3 py-1 text-xs uppercase tracking-[0.24em] text-accent">
									{resolveCopy(project.status, lang)}
								</div>
							</div>
							<div className="space-y-5 p-6">
								<div>
									<h3 className="text-2xl font-semibold text-foreground">
										{resolveCopy(project.title, lang)}
									</h3>
									<p className="mt-1 text-sm uppercase tracking-[0.22em] text-accent/80">
										{resolveCopy(project.subtitle, lang)}
									</p>
									<p className="mt-3 text-sm leading-relaxed text-muted-foreground">
										{resolveCopy(project.summary, lang)}
									</p>
								</div>
								<div className="flex flex-wrap gap-2">
									{project.stack.map((item) => (
										<span
											key={item}
											className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-muted-foreground"
										>
											{item}
										</span>
									))}
								</div>
								<div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.2em] text-accent/90">
									{project.domains.map((domain) => (
										<span key={domain}>{getDomainLabel(domain)}</span>
									))}
								</div>
								<div className="flex flex-wrap items-center gap-3">
									{project.links.primary ? (
										<button
											onClick={() => openProject(project.links.primary)}
											className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80"
											data-cursor-target="magnetic"
											data-cursor-size="md"
											data-pressable="true"
										>
											{resolveCopy(content.openCase, lang)}
											<ArrowUpRight className="h-4 w-4" />
										</button>
									) : null}
									{project.links.repo ? (
										<button
											onClick={() => openProject(project.links.repo)}
											className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent"
											data-cursor-target="magnetic"
											data-cursor-size="sm"
											data-pressable="true"
										>
											{resolveCopy(content.openRepo, lang)}
										</button>
									) : null}
								</div>
							</div>
						</motion.article>
					))}
				</div>
			</div>
		</div>
	);
};

export default Projects;

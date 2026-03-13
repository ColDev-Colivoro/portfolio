import { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { resolveCopy } from '@/lib/i18n';

const ProjectModalContent = ({ project, lang = 'es' }) => {
	const [openImage, setOpenImage] = useState(null);
	const [openCred, setOpenCred] = useState(false);
	const [filterRole, setFilterRole] = useState('all');
	const [filterType, setFilterType] = useState('all');
	const credCloseRef = useRef(null);

	useEffect(() => {
		const onKey = (event) => {
			if (event.key === 'Escape') {
				setOpenImage(null);
				setOpenCred(false);
			}
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, []);

	useEffect(() => {
		if (openCred && credCloseRef.current) credCloseRef.current.focus();
	}, [openCred]);

	if (!project?.caseStudy) return null;

	const modalDetails = useMemo(() => {
		const gallery = (project.media?.gallery ?? []).map((item) => ({
			...item,
			roleLabel: resolveCopy(item.role, lang),
			typeLabel: resolveCopy(item.type, lang),
			title: resolveCopy(item.title, lang),
			caption: resolveCopy(item.caption, lang),
		}));

		return {
			headline: resolveCopy(project.caseStudy.headline, lang),
			description: resolveCopy(project.caseStudy.description, lang),
			microStats: resolveCopy(project.caseStudy.microStats, lang),
			features: resolveCopy(project.caseStudy.features, lang),
			credentials: resolveCopy(project.caseStudy.credentials, lang),
			credentialsNote: resolveCopy(project.caseStudy.credentialsNote, lang),
			problem: resolveCopy(project.problem, lang),
			impact: resolveCopy(project.impact, lang),
			role: resolveCopy(project.role, lang),
			gallery,
		};
	}, [lang, project]);

	const roleOptions = useMemo(() => {
		const options = modalDetails.gallery.map((panel) => panel.roleLabel).filter(Boolean);
		return ['all', ...new Set(options)];
	}, [modalDetails.gallery]);

	const typeOptions = useMemo(() => {
		const options = modalDetails.gallery.map((panel) => panel.typeLabel).filter(Boolean);
		return ['all', ...new Set(options)];
	}, [modalDetails.gallery]);

	const filteredPanels = modalDetails.gallery.filter(
		(panel) =>
			(filterRole === 'all' || panel.roleLabel === filterRole) &&
			(filterType === 'all' || panel.typeLabel === filterType),
	);

	return (
		<div className="min-h-full bg-background px-6 py-16 text-foreground md:px-10">
			<header className="mx-auto max-w-6xl">
				<div className="grid gap-6 rounded-[2rem] border border-white/10 bg-card/70 p-6 md:grid-cols-[1.1fr_0.45fr] md:p-8">
					<div>
						<p className="text-xs uppercase tracking-[0.28em] text-accent">
							{lang === 'es' ? 'Caso de estudio' : 'Case study'}
						</p>
						<h1 className="mt-4 text-3xl font-semibold text-foreground md:text-4xl">
							{modalDetails.headline}
						</h1>
						<p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
							{modalDetails.description}
						</p>
						<div className="mt-5 flex flex-wrap gap-3">
							{project.links.demo ? (
								<a
									href={project.links.demo}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
									data-cursor-target="magnetic"
									data-cursor-size="md"
									data-pressable="true"
								>
									{lang === 'es' ? 'Abrir demo' : 'Open demo'}
								</a>
							) : null}
							{modalDetails.credentials?.length ? (
								<Button
									type="button"
									variant="outline"
									className="rounded-full border-white/10 bg-transparent text-foreground hover:bg-white/[0.05]"
									onClick={() => setOpenCred(true)}
									data-cursor-target="magnetic"
									data-cursor-size="md"
									data-pressable="true"
								>
									{lang === 'es' ? 'Ver notas técnicas' : 'View technical notes'}
								</Button>
							) : null}
						</div>
					</div>

					<div className="rounded-[1.5rem] border border-white/10 bg-background/70 p-5">
						<p className="text-xs uppercase tracking-[0.28em] text-accent">
							{lang === 'es' ? 'Resumen rápido' : 'Quick summary'}
						</p>
						<div className="mt-4 space-y-3 text-sm text-muted-foreground">
							{modalDetails.microStats?.map((stat) => (
								<div key={stat} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
									{stat}
								</div>
							))}
						</div>
					</div>
				</div>
			</header>

			<main className="mx-auto mt-8 grid max-w-6xl gap-8 lg:grid-cols-[1fr_0.42fr]">
				<section className="rounded-[2rem] border border-white/10 bg-card/70 p-6">
					<div className="grid gap-4 md:grid-cols-3">
						<div className="rounded-[1.5rem] border border-white/10 bg-background/70 p-4" data-pressable="true">
							<p className="text-xs uppercase tracking-[0.22em] text-accent">
								{lang === 'es' ? 'Problema' : 'Problem'}
							</p>
							<p className="mt-3 text-sm leading-relaxed text-muted-foreground">{modalDetails.problem}</p>
						</div>
						<div className="rounded-[1.5rem] border border-white/10 bg-background/70 p-4" data-pressable="true">
							<p className="text-xs uppercase tracking-[0.22em] text-accent">
								{lang === 'es' ? 'Impacto' : 'Impact'}
							</p>
							<p className="mt-3 text-sm leading-relaxed text-muted-foreground">{modalDetails.impact}</p>
						</div>
						<div className="rounded-[1.5rem] border border-white/10 bg-background/70 p-4" data-pressable="true">
							<p className="text-xs uppercase tracking-[0.22em] text-accent">
								{lang === 'es' ? 'Rol aportado' : 'Contribution'}
							</p>
							<p className="mt-3 text-sm leading-relaxed text-muted-foreground">{modalDetails.role}</p>
						</div>
					</div>

					<div className="mt-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
						<div>
							<h2 className="text-2xl font-semibold text-foreground">
								{lang === 'es' ? 'Galería del sistema' : 'System gallery'}
							</h2>
							<p className="mt-2 text-sm text-muted-foreground">
								{lang === 'es'
									? 'Paneles, vistas y piezas que muestran cómo se materializa la solución.'
									: 'Panels, views, and pieces that show how the solution is materialized.'}
							</p>
						</div>
						<div className="flex flex-wrap gap-3 text-sm">
							<select
								value={filterRole}
								onChange={(event) => setFilterRole(event.target.value)}
								className="rounded-full border border-white/10 bg-background px-4 py-2 text-foreground"
							>
								{roleOptions.map((role) => (
									<option key={role} value={role}>
										{role === 'all' ? (lang === 'es' ? 'Todos los roles' : 'All roles') : role}
									</option>
								))}
							</select>
							<select
								value={filterType}
								onChange={(event) => setFilterType(event.target.value)}
								className="rounded-full border border-white/10 bg-background px-4 py-2 text-foreground"
							>
								{typeOptions.map((type) => (
									<option key={type} value={type}>
										{type === 'all' ? (lang === 'es' ? 'Todos los tipos' : 'All types') : type}
									</option>
								))}
							</select>
						</div>
					</div>

					<div className="mt-6 grid gap-4 sm:grid-cols-2">
						{filteredPanels.map((panel) => (
							<article
								key={panel.id}
								className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-background/70"
								data-pressable="true"
							>
								<button
									className="w-full text-left"
									onClick={() => setOpenImage(panel)}
									data-cursor-target="magnetic"
									data-cursor-size="md"
									data-pressable="true"
								>
									<div className="h-52 overflow-hidden border-b border-white/10 bg-background">
										<img src={panel.src} alt={panel.title} className="h-full w-full object-cover" />
									</div>
									<div className="space-y-2 p-4">
										<div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.2em] text-accent/90">
											{panel.roleLabel ? <span>{panel.roleLabel}</span> : null}
											{panel.typeLabel ? <span>{panel.typeLabel}</span> : null}
										</div>
										<h3 className="text-lg font-semibold text-foreground">{panel.title}</h3>
										<p className="text-sm leading-relaxed text-muted-foreground">{panel.caption}</p>
									</div>
								</button>
							</article>
						))}
					</div>
				</section>

				<aside className="rounded-[2rem] border border-white/10 bg-card/70 p-6 lg:sticky lg:top-6 lg:h-fit">
					<p className="text-xs uppercase tracking-[0.28em] text-accent">
						{lang === 'es' ? 'Capacidades demostradas' : 'Capabilities demonstrated'}
					</p>
					<ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground">
						{modalDetails.features?.map((feature) => (
							<li key={feature} className="rounded-2xl border border-white/10 bg-background/70 px-4 py-3">
								{feature}
							</li>
						))}
					</ul>
				</aside>
			</main>

			{openImage && (
				<div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
					<div className="absolute inset-0 bg-black/70" onClick={() => setOpenImage(null)} />
					<div className="relative z-10 w-full max-w-4xl overflow-hidden rounded-[1.8rem] border border-white/10 bg-background">
						<div className="flex items-start justify-between gap-4 p-5">
							<div>
								<h4 className="text-xl font-semibold text-foreground">{openImage.title}</h4>
								<p className="mt-2 text-sm text-muted-foreground">{openImage.caption}</p>
							</div>
							<Button
								type="button"
								variant="outline"
								className="rounded-full border-white/10 bg-transparent text-foreground hover:bg-white/[0.05]"
								onClick={() => setOpenImage(null)}
								data-cursor-target="magnetic"
								data-cursor-size="sm"
								data-pressable="true"
							>
								{lang === 'es' ? 'Cerrar' : 'Close'}
							</Button>
						</div>
						<div className="max-h-[70vh] overflow-hidden border-t border-white/10 bg-black/20">
							<img src={openImage.src} alt={openImage.title} className="h-full w-full object-contain" />
						</div>
					</div>
				</div>
			)}

			{openCred && modalDetails.credentials?.length ? (
				<div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
					<div className="absolute inset-0 bg-black/70" onClick={() => setOpenCred(false)} />
					<div
						role="dialog"
						aria-modal="true"
						className="relative z-10 w-full max-w-lg rounded-[1.8rem] border border-white/10 bg-background p-6"
					>
						<h4 className="text-xl font-semibold text-foreground">
							{lang === 'es' ? 'Notas técnicas' : 'Technical notes'}
						</h4>
						<ul className="mt-4 space-y-3 text-sm text-muted-foreground">
							{modalDetails.credentials.map((credential) => (
								<li
									key={`${credential.label}-${credential.text}`}
									className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3"
								>
									<strong className="text-foreground">{credential.label}</strong>
									{credential.text ? ` — ${credential.text}` : ''}
								</li>
							))}
						</ul>
						{modalDetails.credentialsNote ? (
							<p className="mt-4 text-sm text-muted-foreground">{modalDetails.credentialsNote}</p>
						) : null}
						<div className="mt-5 flex justify-end">
							<Button
								ref={credCloseRef}
								type="button"
								variant="outline"
								className="rounded-full border-white/10 bg-transparent text-foreground hover:bg-white/[0.05]"
								onClick={() => setOpenCred(false)}
								data-cursor-target="magnetic"
								data-cursor-size="sm"
								data-pressable="true"
							>
								{lang === 'es' ? 'Cerrar' : 'Close'}
							</Button>
						</div>
					</div>
				</div>
			) : null}
		</div>
	);
};

export default ProjectModalContent;

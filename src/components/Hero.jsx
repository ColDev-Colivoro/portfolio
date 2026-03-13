import { motion } from 'framer-motion';
import { ArrowDownRight, Download, Languages, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/context/LocaleContext';
import { siteContent, resumeLinks } from '@/data/siteContent';
import { resolveCopy } from '@/lib/i18n';

const Hero = () => {
	const { lang } = useLocale();
	const hero = siteContent.hero;

	const scrollToSection = (sectionId) => {
		const section = document.getElementById(sectionId);
		if (!section) return;
		window.scrollTo({
			top: section.offsetTop - 88,
			behavior: 'smooth',
		});
	};

	return (
		<div className="container mx-auto px-4">
			<motion.div
				initial={{ opacity: 0, y: 28 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.55, ease: 'easeOut' }}
				className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-center"
			>
				<div className="space-y-7">
					<div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-accent">
						<Languages className="h-3.5 w-3.5" />
						{resolveCopy(hero.eyebrow, lang)}
					</div>

					<div className="space-y-5">
						<h1 className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-tight text-foreground md:text-6xl xl:text-7xl">
							{resolveCopy(hero.title, lang)}
						</h1>
						<p className="max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
							{resolveCopy(hero.description, lang)}
						</p>
						<p className="max-w-3xl text-sm uppercase tracking-[0.28em] text-accent/90 md:text-base">
							{resolveCopy(hero.supportingLine, lang)}
						</p>
					</div>

					<div className="flex flex-wrap gap-3">
						<Button
							size="lg"
							className="gap-2 rounded-full bg-accent px-6 text-accent-foreground hover:bg-accent/90"
							onClick={() => scrollToSection('projects')}
							data-cursor-target="magnetic"
							data-cursor-size="lg"
							data-pressable="true"
						>
							{resolveCopy(hero.primaryCta, lang)}
							<ArrowDownRight className="h-4 w-4" />
						</Button>

						<a href={resumeLinks[lang]} download data-cursor-target="magnetic" data-cursor-size="lg" data-pressable="true">
							<Button
								size="lg"
								variant="outline"
								className="gap-2 rounded-full border-accent/40 bg-transparent px-6 text-foreground hover:bg-accent/10"
							>
								<Download className="h-4 w-4" />
								{resolveCopy(hero.secondaryCta, lang)}
							</Button>
						</a>

						<Button
							size="lg"
							variant="ghost"
							className="gap-2 rounded-full border border-white/10 px-6 text-foreground hover:bg-white/5"
							onClick={() => scrollToSection('contact')}
							data-cursor-target="magnetic"
							data-cursor-size="md"
							data-pressable="true"
						>
							<Mail className="h-4 w-4" />
							{resolveCopy(hero.tertiaryCta, lang)}
						</Button>
					</div>

					<div className="flex flex-wrap gap-2.5">
						{resolveCopy(hero.chips, lang).map((chip) => (
							<span
								key={chip}
								className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-muted-foreground"
							>
								{chip}
							</span>
						))}
					</div>
				</div>

				<div className="relative">
					<div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-accent/25 via-transparent to-red-500/10 blur-3xl" />
					<div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-card/80 p-6 shadow-[0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl">
						<div className="mb-6 flex items-center justify-between">
							<div>
								<p className="text-xs uppercase tracking-[0.24em] text-accent">
									{lang === 'es' ? 'Resumen del perfil' : 'Profile snapshot'}
								</p>
								<p className="mt-2 text-lg font-semibold text-foreground">
									{lang === 'es'
										? 'Analista Programador orientado a sistemas'
										: 'Programmer Analyst focused on systems'}
								</p>
							</div>
							<div className="rounded-2xl border border-accent/30 bg-accent/10 px-4 py-3 text-right">
								<p className="text-[10px] uppercase tracking-[0.3em] text-accent">
									{lang === 'es' ? 'Bilingüe' : 'Bilingual'}
								</p>
								<p className="mt-1 text-xl font-semibold text-foreground">ES / EN</p>
							</div>
						</div>

						<div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
							{hero.stats.map((stat) => (
								<div
									key={stat.value}
									className="rounded-2xl border border-white/10 bg-background/70 p-4"
									data-pressable="true"
								>
									<p className="text-sm uppercase tracking-[0.28em] text-accent">{stat.value}</p>
									<p className="mt-3 text-sm leading-relaxed text-muted-foreground">
										{resolveCopy(stat.label, lang)}
									</p>
								</div>
							))}
						</div>

						<div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
							<p className="text-sm font-medium text-foreground">
								{resolveCopy(hero.availability, lang)}
							</p>
							<div className="mt-4 flex flex-wrap gap-3">
								<a
									href={resumeLinks.es}
									download
									className="text-sm font-medium text-accent underline-offset-4 hover:underline"
									data-cursor-target="magnetic"
									data-cursor-size="sm"
									data-pressable="true"
								>
									{resolveCopy(hero.cvEs, lang)}
								</a>
								<a
									href={resumeLinks.en}
									download
									className="text-sm font-medium text-accent underline-offset-4 hover:underline"
									data-cursor-target="magnetic"
									data-cursor-size="sm"
									data-pressable="true"
								>
									{resolveCopy(hero.cvEn, lang)}
								</a>
							</div>
						</div>
					</div>
				</div>
			</motion.div>
		</div>
	);
};

export default Hero;

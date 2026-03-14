import { motion } from 'framer-motion';
import { ArrowDownRight, Download, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/context/LocaleContext';
import { siteContent, resumeLinks } from '@/data/siteContent';
import { resolveCopy } from '@/lib/i18n';

const logoPath = '/images/branding/logo-gato.png';

const revealParent = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			delayChildren: 0.08,
			staggerChildren: 0.12,
		},
	},
};

const revealItem = {
	hidden: { opacity: 0, y: 42, filter: 'blur(12px)' },
	visible: {
		opacity: 1,
		y: 0,
		filter: 'blur(0px)',
		transition: {
			duration: 0.88,
			ease: [0.22, 1, 0.36, 1],
		},
	},
};

const Hero = () => {
	const { lang } = useLocale();
	const hero = siteContent.hero;

	const scrollToSection = (sectionId) => {
		const section = document.getElementById(sectionId);
		if (!section) return;
		window.scrollTo({
			top: section.offsetTop - 92,
			behavior: 'smooth',
		});
	};

	const tags = resolveCopy(hero.supportingTags, lang);
	const chimubotTeaser = resolveCopy(hero.chimubotTeaser, lang);
	const siteStatus = resolveCopy(hero.siteStatus, lang);
	const siteStatusValue = resolveCopy(hero.siteStatusValue, lang);

	return (
		<div className="container mx-auto w-full px-6 lg:px-12 max-w-[1240px]">
			<motion.div
				variants={revealParent}
				initial="hidden"
				animate="visible"
				className="hero-layout grid lg:grid-cols-[1fr_1fr]"
			>
				<div className="max-w-3xl">
					<motion.p variants={revealItem} className="section-eyebrow">
						{resolveCopy(hero.eyebrow, lang)}
					</motion.p>

					<motion.h1
						variants={revealItem}
						className="hero-title mt-5 font-semibold leading-[0.88] tracking-[-0.06em] text-foreground"
					>
						{resolveCopy(hero.title, lang)}
					</motion.h1>

					<motion.p variants={revealItem} className="mt-5 text-sm uppercase tracking-[0.34em] text-accent md:text-base">
						{resolveCopy(hero.role, lang)}
					</motion.p>

					<motion.p variants={revealItem} className="mt-7 max-w-2xl text-balance text-lg leading-relaxed text-foreground/88 md:text-xl">
						{resolveCopy(hero.description, lang)}
					</motion.p>

					<motion.p variants={revealItem} className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
						{resolveCopy(hero.supportingLine, lang)}
					</motion.p>

					<motion.div variants={revealItem} className="mt-9 flex flex-wrap gap-3">
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
								className="gap-2 rounded-full border-white/12 bg-transparent px-6 text-foreground hover:border-accent/40 hover:bg-white/[0.05]"
							>
								<Download className="h-4 w-4" />
								{resolveCopy(hero.secondaryCta, lang)}
							</Button>
						</a>

						<Button
							size="sm"
							variant="ghost"
							className="gap-2 rounded-full border border-transparent px-3 text-muted-foreground hover:border-white/10 hover:bg-white/[0.03] hover:text-foreground"
							onClick={() => scrollToSection('contact')}
							data-cursor-target="magnetic"
							data-cursor-size="md"
							data-pressable="true"
						>
							<Mail className="h-4 w-4" />
							{resolveCopy(hero.tertiaryCta, lang)}
						</Button>
					</motion.div>

					<motion.div variants={revealItem} className="mt-10 flex flex-wrap gap-3">
						{tags.map((tag) => (
							<span
								key={tag}
								className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-muted-foreground"
							>
								{tag}
							</span>
						))}
					</motion.div>
				</div>

				<motion.div variants={revealItem} className="relative flex justify-center lg:justify-center">
					<div className="absolute -top-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-accent/20 bg-background/92 px-3 py-1.5 shadow-[0_10px_28px_rgba(0,0,0,0.22)] backdrop-blur-md ring-1 ring-white/10">
						<span className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">{siteStatus}</span>
						<span className="rounded-full bg-accent px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-accent-foreground">{siteStatusValue}</span>
					</div>
					<div className="hero-logo-shell relative flex w-full items-center justify-center overflow-hidden rounded-[2.2rem] border border-white/10 bg-white/[0.03] shadow-[0_36px_120px_rgba(0,0,0,0.35)]">
						<div className="hero-logo-ring pointer-events-none absolute inset-6 rounded-[1.8rem] border border-accent/25" />
						<div className="hero-logo-glow pointer-events-none absolute inset-x-10 bottom-8 h-20 rounded-full bg-accent/18 blur-3xl" />
						<img
							src={logoPath}
							alt={resolveCopy(hero.logoCaption, lang)}
							className="hero-logo-float hero-logo-image relative z-10 w-full object-contain invert brightness-[1.9] contrast-125"
						/>
					</div>
					<motion.button
						type="button"
						onClick={() => scrollToSection('projects')}
						initial={{ opacity: 0, y: 8, scale: 0.96 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						transition={{ delay: 0.45, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
						whileHover={{ y: -2, scale: 1.02 }}
						className="absolute -bottom-24 left-1/2 z-20 -translate-x-1/2 rounded-xl border border-accent/30 bg-background/92 px-3 py-2 text-left shadow-[0_10px_24px_rgba(0,0,0,0.28)] backdrop-blur-md ring-1 ring-white/10"
						data-cursor-target="magnetic"
						data-cursor-size="md"
						data-pressable="true"
					>
						<p className="text-[12px] font-semibold leading-none text-foreground">{chimubotTeaser}</p>
						<span
							aria-hidden="true"
							className="absolute -bottom-1 right-5 h-2 w-2 rotate-45 border-b border-r border-accent/30 bg-background/92"
						/>
					</motion.button>
				</motion.div>
			</motion.div>
		</div>
	);
};

export default Hero;

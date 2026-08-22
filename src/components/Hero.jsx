import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDownRight, Download, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/context/LocaleContext';
import { siteContent, resumeLinks } from '@/data/siteContent';
import { resolveCopy } from '@/lib/i18n';
import { heroRevealItem, heroRevealItemSoft, heroRevealParent } from '@/lib/motionPresets';

const logoPath = '/images/branding/logo-gato.png';
const logoAltPath = '/images/branding/logo-gato-alt.png';
const logoColdevPosDark = '/images/branding/logo-coldevpos-dark.png';
const logoColdevPosLight = '/images/branding/logo-coldevpos-light.png';
const logoRadarSur = '/images/radarsur/logo-radarsur.png';
const logoRadarSurDark = '/images/radarsur/logo-radarsur-dark.png';

const heroLogoVariants = [
	{ src: logoPath, className: 'invert brightness-[2.35] contrast-150' },
	{ src: logoAltPath, className: '' },
	{ src: logoColdevPosDark, className: '' },
	{ src: logoColdevPosLight, className: '' },
	{ src: logoRadarSur, className: '' },
	{ src: logoRadarSurDark, className: '' },
];

const Hero = () => {
	const { lang } = useLocale();
	const navigate = useNavigate();
	const hero = siteContent.hero;
	const offer = siteContent.homeOffer;
	const [activeLogoIndex, setActiveLogoIndex] = useState(0);

	useEffect(() => {
		if (typeof window === 'undefined') return undefined;
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduceMotion) return undefined;

		heroLogoVariants.forEach((item) => {
			const img = new Image();
			img.src = item.src;
		});

		const interval = window.setInterval(() => {
			setActiveLogoIndex((prev) => (prev + 1) % heroLogoVariants.length);
		}, 5600);

		return () => window.clearInterval(interval);
	}, []);

	const tags = resolveCopy(hero.supportingTags, lang);
	const siteStatus = resolveCopy(hero.siteStatus, lang);
	const siteStatusValue = resolveCopy(hero.siteStatusValue, lang);
	const activeLogo = heroLogoVariants[activeLogoIndex] ?? heroLogoVariants[0];

	return (
		<div className="container mx-auto w-full px-6 lg:px-12 max-w-[1240px]">
			<motion.div
				variants={heroRevealParent}
				initial="hidden"
				animate="visible"
				className="hero-layout grid lg:grid-cols-[1fr_1fr]"
			>
				<div className="max-w-3xl">
					<motion.p variants={heroRevealItem} className="section-eyebrow">
						{resolveCopy(offer.eyebrow, lang)}
					</motion.p>

					<motion.h1
						variants={heroRevealItem}
						className="hero-title mt-5 font-semibold leading-[0.88] tracking-[-0.06em] text-foreground"
					>
						{resolveCopy(offer.title, lang)}
					</motion.h1>

					<motion.p variants={heroRevealItemSoft} className="mt-7 max-w-2xl text-balance text-lg leading-relaxed md:text-xl">
						{resolveCopy(offer.description, lang)}
					</motion.p>

					<motion.div variants={heroRevealItemSoft} data-content-role="founder-bridge" className="mt-7 max-w-2xl pl-5">
						<p className="text-xs uppercase tracking-[0.24em]">{resolveCopy(hero.eyebrow, lang)}</p>
						<p className="mt-2 text-base font-semibold">{resolveCopy(hero.title, lang)}</p>
						<p className="mt-5 hidden text-sm uppercase tracking-[0.34em] text-accent md:block md:text-base">{resolveCopy(hero.role, lang)}</p>
						<p className="mt-4 text-base leading-relaxed text-foreground/88">{resolveCopy(hero.description, lang)}</p>
						<p className="mt-3 text-base leading-relaxed text-muted-foreground">{resolveCopy(hero.supportingLine, lang)}</p>
					</motion.div>

					<motion.div variants={heroRevealItemSoft} className="mt-9 flex flex-wrap gap-3">
						<Button
							size="lg"
							className="gap-2 rounded-full bg-accent px-6 text-accent-foreground hover:bg-accent/90 cursor-pointer"
							onClick={() => navigate('/proyectos')}
							data-cursor-target="magnetic"
							data-cursor-size="lg"
							data-pressable="true"
						>
							{resolveCopy(hero.primaryCta, lang)}
							<ArrowDownRight className="h-4 w-4" />
						</Button>

						<a href={resumeLinks[lang]} download className="cursor-pointer" data-cursor-target="magnetic" data-cursor-size="lg" data-pressable="true">
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
							className="gap-2 rounded-full border border-transparent px-3 text-muted-foreground hover:border-white/10 hover:bg-white/[0.03] hover:text-foreground cursor-pointer"
							onClick={() => navigate('/contact')}
							data-cursor-target="magnetic"
							data-cursor-size="md"
							data-pressable="true"
						>
							<Mail className="h-4 w-4" />
							{resolveCopy(hero.tertiaryCta, lang)}
						</Button>
					</motion.div>

					<motion.div variants={heroRevealItemSoft} className="mt-10 flex flex-nowrap gap-2 overflow-x-auto pb-1 scrollbar-none sm:flex-wrap sm:gap-3 sm:overflow-visible sm:pb-0" data-no-swipe="true">
						{tags.map((tag) => (
							<span
								key={tag}
								className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:px-4 sm:py-2 sm:text-[11px] sm:tracking-[0.24em]"
							>
								{tag}
							</span>
						))}
					</motion.div>
				</div>

				<motion.div variants={heroRevealItem} className="relative mt-4 flex flex-col items-center justify-center lg:mt-0 lg:justify-center">
					<div className="hero-logo-shell relative flex w-full items-center justify-center overflow-hidden rounded-[2.2rem] border border-white/10 bg-white/[0.03] shadow-[0_36px_120px_rgba(0,0,0,0.35)]">
						<div className="hero-logo-ring pointer-events-none absolute inset-6 rounded-[1.8rem] border border-accent/25" />
						<div className="hero-logo-glow pointer-events-none absolute inset-x-10 bottom-8 h-20 rounded-full bg-accent/18 blur-3xl" />
						<div className="relative z-10 w-full aspect-square">
							<AnimatePresence mode="sync" initial={false}>
								<motion.img
									key={activeLogo.src}
									src={activeLogo.src}
									alt={resolveCopy(hero.logoCaption, lang)}
									className={`hero-logo-float hero-logo-image absolute inset-0 z-10 m-auto h-[84%] w-auto max-h-[84%] max-w-[84%] object-contain object-center ${activeLogo.className}`}
									initial={{ opacity: 0, filter: 'blur(4px)', scale: 0.992 }}
									animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
									exit={{ opacity: 0, filter: 'blur(4px)', scale: 0.992 }}
									transition={{ duration: 1.24, ease: [0.22, 1, 0.36, 1] }}
								/>
							</AnimatePresence>
						</div>
					</div>
					<div className="relative z-20 mt-3 flex w-max max-w-full items-center gap-2 rounded-full border border-accent/20 bg-background/92 px-3 py-1.5 shadow-[0_10px_28px_rgba(0,0,0,0.22)] backdrop-blur-md ring-1 ring-white/10">
						<span className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">{siteStatus}</span>
						<span className="rounded-full bg-accent px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-accent-foreground">{siteStatusValue}</span>
					</div>
				</motion.div>
			</motion.div>
		</div>
	);
};

export default Hero;

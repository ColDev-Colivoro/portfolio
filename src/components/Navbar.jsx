import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Globe2, Menu, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLocale } from '@/context/LocaleContext';
import { resumeLinks, siteContent } from '@/data/siteContent';
import { resolveCopy } from '@/lib/i18n';

const Navbar = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { lang, setLang } = useLocale();
	const [isOpen, setIsOpen] = useState(false);
	const [activeSection, setActiveSection] = useState('home');
	const [scrolled, setScrolled] = useState(false);

	const navLinks = useMemo(() => siteContent.nav.links, []);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 10);
		onScroll();
		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	useEffect(() => {
		if (location.pathname !== '/') return;

		const sections = Array.from(document.querySelectorAll('section[id]'));
		if (!sections.length) return;

		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries.find((entry) => entry.isIntersecting);
				if (visible?.target?.id) setActiveSection(visible.target.id);
			},
			{ rootMargin: '-30% 0px -55% 0px', threshold: 0.1 },
		);

		sections.forEach((section) => observer.observe(section));
		return () => observer.disconnect();
	}, [location.pathname]);

	const goToSection = (id) => {
		setIsOpen(false);
		setActiveSection(id);

		if (location.pathname !== '/') {
			navigate(`/#${id}`);
			setTimeout(() => {
				document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}, 140);
			return;
		}

		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	};

	return (
		<motion.header
			initial={{ y: -72, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.45, ease: 'easeOut' }}
			className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
				scrolled ? 'border-b border-white/10 bg-background/86 shadow-[0_14px_40px_rgba(0,0,0,0.32)] backdrop-blur-xl' : 'bg-transparent'
			}`}
		>
			<div className="container mx-auto px-4 py-4">
				<div className="flex items-center justify-between gap-4">
					<button
						onClick={() => goToSection('home')}
						className="inline-flex items-center gap-3 text-left"
						data-cursor-target="magnetic"
						data-cursor-size="md"
						data-pressable="true"
					>
						<div className="rounded-2xl border border-accent/30 bg-accent/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
							JC
						</div>
						<div>
							<p className="text-xs uppercase tracking-[0.28em] text-accent/80">Systems · Software</p>
							<p className="text-sm font-semibold text-foreground md:text-base">{siteContent.nav.brand}</p>
						</div>
					</button>

					<nav className="hidden items-center gap-1 lg:flex">
						{navLinks.map((item) => {
							const isActive = activeSection === item.id && location.pathname === '/';
							return (
								<button
									key={item.id}
									onClick={() => goToSection(item.id)}
									className={`rounded-full px-4 py-2 text-sm transition-colors ${
										isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:bg-white/[0.05] hover:text-foreground'
									}`}
									data-cursor-target="magnetic"
									data-cursor-size="sm"
									data-pressable="true"
								>
									{resolveCopy(item.label, lang)}
								</button>
							);
						})}
					</nav>

					<div className="hidden items-center gap-3 lg:flex">
						<div className="inline-flex rounded-full border border-white/10 bg-white/[0.04] p-1">
							<button
								onClick={() => setLang('es')}
								className={`rounded-full px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] ${lang === 'es' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'}`}
								data-cursor-target="magnetic"
								data-cursor-size="sm"
								data-pressable="true"
							>
								ES
							</button>
							<button
								onClick={() => setLang('en')}
								className={`rounded-full px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] ${lang === 'en' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'}`}
								data-cursor-target="magnetic"
								data-cursor-size="sm"
								data-pressable="true"
							>
								EN
							</button>
						</div>
						<a
							href={resumeLinks[lang]}
							download
							className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-foreground transition-colors hover:bg-white/[0.05]"
							data-cursor-target="magnetic"
							data-cursor-size="md"
							data-pressable="true"
						>
							<Download className="h-4 w-4 text-accent" />
							{resolveCopy(siteContent.nav.resume, lang)}
						</a>
					</div>

					<button
						className="rounded-full border border-white/10 p-2 text-foreground lg:hidden"
						onClick={() => setIsOpen((prev) => !prev)}
						data-pressable="true"
					>
						{isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
					</button>
				</div>

				{isOpen ? (
					<div className="mt-4 rounded-[1.6rem] border border-white/10 bg-card/95 p-4 lg:hidden">
						<div className="mb-4 flex items-center justify-between rounded-2xl border border-white/10 bg-background/70 p-2">
							<div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
								<Globe2 className="h-4 w-4 text-accent" />
								Language
							</div>
							<div className="inline-flex rounded-full border border-white/10 bg-white/[0.04] p-1">
								<button
									onClick={() => setLang('es')}
									className={`rounded-full px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] ${lang === 'es' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'}`}
									data-pressable="true"
								>
									ES
								</button>
								<button
									onClick={() => setLang('en')}
									className={`rounded-full px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] ${lang === 'en' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'}`}
									data-pressable="true"
								>
									EN
								</button>
							</div>
						</div>
						<div className="flex flex-col gap-2">
							{navLinks.map((item) => (
								<button
									key={item.id}
									onClick={() => goToSection(item.id)}
									className="rounded-2xl px-4 py-3 text-left text-sm text-muted-foreground transition-colors hover:bg-white/[0.05] hover:text-foreground"
									data-pressable="true"
								>
									{resolveCopy(item.label, lang)}
								</button>
							))}
							<a
								href={resumeLinks[lang]}
								download
								className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 px-4 py-3 text-sm text-foreground transition-colors hover:bg-white/[0.05]"
								data-pressable="true"
							>
								<Download className="h-4 w-4 text-accent" />
								{resolveCopy(siteContent.nav.resume, lang)}
							</a>
						</div>
					</div>
				) : null}
			</div>
		</motion.header>
	);
};

export default Navbar;

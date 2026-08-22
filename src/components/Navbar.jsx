import { useEffect, useRef, useState } from 'react';
import { LayoutGroup, motion } from 'framer-motion';
import { Download, Globe2, Menu, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { portfolioNavigationRoutes } from '@/config/portfolioRoutes';
import { useLocale } from '@/context/LocaleContext';
import { resumeLinks, siteContent } from '@/data/siteContent';
import { resolveCopy } from '@/lib/i18n';

const logoPath = '/images/branding/logo-navbar-icon.png';

const Navbar = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { lang, setLang } = useLocale();
	const [isOpen, setIsOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const headerRef = useRef(null);
	const mobilePanelId = 'mobile-nav-panel';

	const navLinks = portfolioNavigationRoutes;

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 10);
		onScroll();
		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	useEffect(() => {
		setIsOpen(false);
	}, [location.pathname]);

	useEffect(() => {
		if (!isOpen) {
			document.body.style.overflow = '';
			return undefined;
		}

		document.body.style.overflow = 'hidden';

		const handleKeyDown = (event) => {
			if (event.key === 'Escape') setIsOpen(false);
		};

		const handlePointerDown = (event) => {
			if (!(event.target instanceof Node)) return;
			if (headerRef.current?.contains(event.target)) return;
			setIsOpen(false);
		};

		document.addEventListener('keydown', handleKeyDown);
		document.addEventListener('pointerdown', handlePointerDown);

		return () => {
			document.body.style.overflow = '';
			document.removeEventListener('keydown', handleKeyDown);
			document.removeEventListener('pointerdown', handlePointerDown);
		};
	}, [isOpen]);

	const goHome = () => {
		setIsOpen(false);

		if (location.pathname === '/') {
			document.getElementById('home')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
			return;
		}

		navigate('/');
	};

	const activateNavLink = (item) => {
		setIsOpen(false);

		if (item.type !== 'route' || !item.path) return;

		if (location.pathname === item.path && item.path === '/') {
			document.getElementById('home')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
			return;
		}

		navigate(item.path);
	};

	return (
		<motion.header
			ref={headerRef}
			data-overlay-open={isOpen ? 'true' : undefined}
			initial={{ y: -56, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
			className={`fixed inset-x-0 top-0 z-[70] transition-all duration-300 ${
				scrolled
					? 'border-b border-white/10 bg-background/88 shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur-2xl'
					: 'bg-transparent'
			}`}
		>
			{isOpen ? (
				<button
					type="button"
					aria-label={lang === 'es' ? 'Cerrar menu movil' : 'Close mobile menu'}
					className="fixed inset-0 z-[68] bg-black/20 backdrop-blur-[1px] lg:hidden"
					data-no-swipe="true"
					data-no-arrow-nav="true"
					onClick={() => setIsOpen(false)}
				/>
			) : null}
			<div className="container mx-auto px-6 lg:px-12 py-4">
				<div className="flex items-center justify-between gap-4">
						<button
						onClick={goHome}
						className="inline-flex items-center gap-3 text-left cursor-pointer"
						data-cursor-target="magnetic"
						data-cursor-size="md"
						data-pressable="true"
					>
						<div className="nav-brand-shell flex items-center justify-center rounded-[1.1rem] border border-white/15 bg-white/[0.05] shadow-[0_16px_40px_rgba(0,0,0,0.28)]">
							<img
								src={logoPath}
								alt="Logo gato ColDev"
								className="nav-brand-logo mx-auto block object-contain object-center"
							/>
						</div>
						<div className="leading-tight">
							<p className="hidden text-[10px] uppercase tracking-[0.28em] text-white/40 md:block">{resolveCopy(siteContent.nav.eyebrow, lang)}</p>
							<p className="mt-0.5 text-sm font-semibold text-foreground sm:text-sm">
								<span className="sm:hidden">José Colivoro</span>
								<span className="hidden sm:inline">{siteContent.nav.brand}</span>
							</p>
							<p className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-accent/80 sm:text-[11px]">{resolveCopy(siteContent.nav.role, lang)}</p>
						</div>
					</button>

					<LayoutGroup>
						<nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1 lg:flex">
							{navLinks.map((item) => {
								const isActive = item.type === 'route' && location.pathname === item.path;
								return (
									<button
										key={item.id}
										onClick={() => activateNavLink(item)}
										className={`relative rounded-full px-4 py-2 text-sm transition-colors cursor-pointer ${
											isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
										}`}
										data-cursor-target="magnetic"
										data-cursor-size="sm"
										data-pressable="true"
									>
										{isActive ? (
											<motion.span
												layoutId="active-nav-pill"
												className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.08]"
												transition={{ type: 'spring', stiffness: 320, damping: 28 }}
											/>
										) : null}
										<span className="relative z-10">{resolveCopy(item.label, lang)}</span>
									</button>
								);
							})}
						</nav>
					</LayoutGroup>

					<div className="hidden items-center gap-3 lg:flex">
						<div className="inline-flex rounded-full border border-white/10 bg-white/[0.03] p-1">
							<button
								onClick={() => setLang('es')}
								className={`rounded-full px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] ${
									lang === 'es' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
								}`}
								data-cursor-target="magnetic"
								data-cursor-size="sm"
								data-pressable="true"
							>
								ES
							</button>
							<button
								onClick={() => setLang('en')}
								className={`rounded-full px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] ${
									lang === 'en' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
								}`}
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
							className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-foreground transition-colors hover:border-accent/40 hover:bg-white/[0.05]"
							data-cursor-target="magnetic"
							data-cursor-size="md"
							data-pressable="true"
						>
							<Download className="h-4 w-4 text-accent" />
							{resolveCopy(siteContent.nav.resume, lang)}
						</a>
					</div>

					<button
						type="button"
						className="rounded-full border border-white/10 bg-white/[0.03] p-2 text-foreground lg:hidden"
						onClick={() => setIsOpen((prev) => !prev)}
						aria-expanded={isOpen}
						aria-controls={mobilePanelId}
						aria-label={isOpen ? (lang === 'es' ? 'Cerrar menu' : 'Close menu') : lang === 'es' ? 'Abrir menu' : 'Open menu'}
						data-pressable="true"
					>
						{isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
					</button>
				</div>

				{isOpen ? (
					<div
						id={mobilePanelId}
						data-no-swipe="true"
						data-no-arrow-nav="true"
						className="fixed right-3 top-[calc(4.4rem+env(safe-area-inset-top))] z-[71] w-[min(82vw,320px)] max-h-[calc(100vh-5.6rem-env(safe-area-inset-top))] overflow-y-auto rounded-[1.4rem] border border-white/12 bg-card/78 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] shadow-[0_24px_64px_rgba(0,0,0,0.3)] backdrop-blur-xl lg:hidden"
					>
						<div className="mb-4 flex items-center justify-between rounded-2xl border border-white/10 bg-background/70 p-2">
							<div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
								<Globe2 className="h-4 w-4 text-accent" />
								{resolveCopy(siteContent.nav.languageLabel, lang)}
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
									onClick={() => activateNavLink(item)}
									className="rounded-2xl border border-transparent px-4 py-3 text-left text-sm text-muted-foreground transition-colors hover:border-white/10 hover:bg-white/[0.05] hover:text-foreground"
									data-pressable="true"
								>
									{resolveCopy(item.label, lang)}
								</button>
							))}
							<a
								href={resumeLinks[lang]}
								download
								className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 px-4 py-3 text-sm text-foreground transition-colors hover:border-accent/40 hover:bg-white/[0.05]"
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

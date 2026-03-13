import { ArrowUp, Github, Linkedin } from 'lucide-react';
import { useLocale } from '@/context/LocaleContext';
import { siteContent } from '@/data/siteContent';
import { resolveCopy } from '@/lib/i18n';

const Footer = () => {
	const { lang } = useLocale();
	const content = siteContent.footer;

	const goTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	return (
		<footer className="border-t border-white/10 bg-background/95">
			<div className="container mx-auto px-4 py-10">
				<div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
					<div className="max-w-2xl">
						<p className="text-xs uppercase tracking-[0.28em] text-accent">Portfolio</p>
						<h3 className="mt-3 text-2xl font-semibold text-foreground">
							{resolveCopy(content.title, lang)}
						</h3>
						<p className="mt-4 text-sm leading-relaxed text-muted-foreground">
							{resolveCopy(content.tagline, lang)}
						</p>
					</div>

					<div className="flex items-center gap-3">
						<a
							href="https://github.com/ColDev-Colivoro"
							target="_blank"
							rel="noopener noreferrer"
							className="rounded-full border border-white/10 p-3 text-muted-foreground transition-colors hover:bg-white/[0.05] hover:text-accent"
							aria-label="GitHub"
							data-cursor-target="magnetic"
							data-cursor-size="sm"
							data-pressable="true"
						>
							<Github className="h-5 w-5" />
						</a>
						<a
							href="https://www.linkedin.com/in/camilo-colivoro-1a5206386"
							target="_blank"
							rel="noopener noreferrer"
							className="rounded-full border border-white/10 p-3 text-muted-foreground transition-colors hover:bg-white/[0.05] hover:text-accent"
							aria-label="LinkedIn"
							data-cursor-target="magnetic"
							data-cursor-size="sm"
							data-pressable="true"
						>
							<Linkedin className="h-5 w-5" />
						</a>
						<button
							onClick={goTop}
							className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-3 text-sm text-foreground transition-colors hover:bg-white/[0.05]"
							data-cursor-target="magnetic"
							data-cursor-size="sm"
							data-pressable="true"
						>
							<ArrowUp className="h-4 w-4 text-accent" />
							{resolveCopy(content.backToTop, lang)}
						</button>
					</div>
				</div>

				<div className="mt-8 border-t border-white/10 pt-5 text-sm text-muted-foreground">
					{resolveCopy(content.rights, lang)}
				</div>
			</div>
		</footer>
	);
};

export default Footer;

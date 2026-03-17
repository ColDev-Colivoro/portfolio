import { useLocale } from '@/context/LocaleContext';
import { siteContent } from '@/data/siteContent';
import { resolveCopy } from '@/lib/i18n';

const logoPath = '/images/branding/logo-gato.png';

const Footer = () => {
	const { lang } = useLocale();
	const content = siteContent.footer;

	return (
		<footer className="border-t border-white/10 bg-background/95">
			<div className="container mx-auto px-4 py-6">
				<div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
					<div className="flex max-w-2xl items-start gap-4">
						<div className="footer-brand-shell flex items-center justify-center rounded-[1.25rem] border border-white/10 bg-white/[0.03] shadow-[0_18px_48px_rgba(0,0,0,0.24)]">
							<img src={logoPath} alt="Logo gato ColDev" className="footer-brand-logo object-contain invert brightness-[1.95] contrast-125" />
						</div>
						<div>
							<p className="text-[11px] uppercase tracking-[0.3em] text-accent">Portfolio</p>
							<h3 className="footer-brand-title mt-2 font-semibold tracking-[-0.03em] text-foreground">
								{resolveCopy(content.title, lang)}
							</h3>
						</div>
					</div>
				</div>

				<div className="mt-4 border-t border-white/10 pt-3 text-[12px] text-muted-foreground flex justify-between">
					{resolveCopy(content.rights, lang)}
                    <p className="text-muted-foreground">{resolveCopy(content.tagline, lang)}</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;

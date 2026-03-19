const AppFooter = ({
	productLabel,
	productSummary,
	rights,
	socialLinks = [],
	showSocialLinks = true,
}) => {
	return (
		<footer className="border-t border-white/10 bg-background/95">
			<div className="container mx-auto px-4 py-6">
				<div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
					<div className="max-w-2xl">
						<p className="text-[11px] uppercase tracking-[0.3em] text-accent">{productLabel}</p>
						<p className="mt-2 text-sm leading-relaxed text-muted-foreground">{productSummary}</p>
					</div>

					{showSocialLinks && socialLinks.length ? (
						<nav className="flex flex-wrap items-center gap-2" aria-label="Public profiles">
							{socialLinks.map((link) => (
								<a
									key={link.href}
									href={link.href}
									target="_blank"
									rel="noopener noreferrer"
									className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:border-accent/35 hover:text-foreground"
									data-cursor-target="magnetic"
									data-cursor-size="sm"
									data-pressable="true"
								>
									{link.label}
								</a>
							))}
						</nav>
					) : null}
				</div>

				<div className="mt-4 border-t border-white/10 pt-3 text-[12px] text-muted-foreground">
					<p>{rights}</p>
				</div>
			</div>
		</footer>
	);
};

export default AppFooter;

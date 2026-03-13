import { motion } from 'framer-motion';
import { Compass, Network, ScanSearch } from 'lucide-react';
import { useLocale } from '@/context/LocaleContext';
import { siteContent } from '@/data/siteContent';
import { resolveCopy } from '@/lib/i18n';

const icons = [ScanSearch, Network, Compass];

const About = () => {
	const { lang } = useLocale();
	const content = siteContent.about;

	return (
		<div className="container mx-auto px-4 py-4">
			<div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.2 }}
					transition={{ duration: 0.45 }}
					className="rounded-[2rem] border border-white/10 bg-card/70 p-8 shadow-[0_30px_90px_rgba(0,0,0,0.32)]"
					data-pressable="true"
				>
					<p className="text-xs uppercase tracking-[0.28em] text-accent">
						{resolveCopy(content.eyebrow, lang)}
					</p>
					<h2 className="mt-4 text-3xl font-semibold text-foreground md:text-4xl">
						{resolveCopy(content.title, lang)}
					</h2>
					<p className="mt-5 text-lg leading-relaxed text-foreground/90">
						{resolveCopy(content.lead, lang)}
					</p>
					<div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
						{content.body.map((paragraph) => (
							<p key={paragraph.es}>{resolveCopy(paragraph, lang)}</p>
						))}
					</div>
				</motion.div>

				<div className="grid gap-5">
					{content.principles.map((principle, index) => {
						const Icon = icons[index] || Compass;
						return (
							<motion.article
								key={principle.title.es}
								initial={{ opacity: 0, y: 18 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, amount: 0.25 }}
								transition={{ duration: 0.4, delay: index * 0.08 }}
								className="card-hover rounded-[1.75rem] border border-white/10 bg-secondary/55 p-6"
								data-pressable="true"
							>
								<div className="flex items-start gap-4">
									<div className="rounded-2xl border border-accent/30 bg-accent/10 p-3 text-accent">
										<Icon className="h-5 w-5" />
									</div>
									<div>
										<h3 className="text-xl font-semibold text-foreground">
											{resolveCopy(principle.title, lang)}
										</h3>
										<p className="mt-2 text-sm leading-relaxed text-muted-foreground">
											{resolveCopy(principle.description, lang)}
										</p>
									</div>
								</div>
							</motion.article>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default About;

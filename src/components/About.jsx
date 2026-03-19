import { motion } from 'framer-motion';
import { Compass, Network, ScanSearch } from 'lucide-react';
import { useLocale } from '@/context/LocaleContext';
import { siteContent } from '@/data/siteContent';
import { resolveCopy } from '@/lib/i18n';
import { getSectionRevealTransition, sectionRevealInitial, sectionRevealInView } from '@/lib/motionPresets';

const icons = [ScanSearch, Network, Compass];

const About = () => {
	const { lang } = useLocale();
	const content = siteContent.about;

	return (
		<div className="container mx-auto px-4">
			<div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
				<motion.div
					initial={sectionRevealInitial}
					whileInView={sectionRevealInView}
					viewport={{ once: true, amount: 0.2 }}
					transition={getSectionRevealTransition()}
					className="panel-surface rounded-[1.9rem] p-6 md:p-8"
				>
					<p className="section-eyebrow">{resolveCopy(content.eyebrow, lang)}</p>
					<h2 className="section-title">{resolveCopy(content.title, lang)}</h2>
					<p className="mt-5 text-lg leading-relaxed text-foreground/90 md:text-xl">{resolveCopy(content.lead, lang)}</p>
					<div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
						{content.body.map((paragraph) => (
							<p key={paragraph.es}>{resolveCopy(paragraph, lang)}</p>
						))}
					</div>
				</motion.div>

				<div className="grid gap-4">
					{content.principles.map((principle, index) => {
						const Icon = icons[index] || Compass;
						return (
							<motion.article
								key={principle.title.es}
								initial={sectionRevealInitial}
								whileInView={sectionRevealInView}
								viewport={{ once: true, amount: 0.25 }}
								transition={getSectionRevealTransition(index, 0.08)}
								className="card-hover rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-5 shadow-[0_24px_72px_rgba(0,0,0,0.24)]"
								data-pressable="true"
							>
								<div className="flex items-start gap-4">
									<div className="rounded-[1rem] border border-accent/25 bg-accent/10 p-3 text-accent">
										<Icon className="h-5 w-5" />
									</div>
									<div>
										<h3 className="text-xl font-semibold tracking-[-0.03em] text-foreground">
											{resolveCopy(principle.title, lang)}
										</h3>
										<p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
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

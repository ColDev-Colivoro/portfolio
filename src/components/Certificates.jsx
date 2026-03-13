import { motion } from 'framer-motion';
import { ArrowUpRight, BadgeCheck } from 'lucide-react';
import { useLocale } from '@/context/LocaleContext';
import { certificateItems, siteContent } from '@/data/siteContent';
import { resolveCopy } from '@/lib/i18n';

const Certificates = () => {
	const { lang } = useLocale();
	const content = siteContent.certifications;

	return (
		<div className="container mx-auto px-4 py-4">
			<div className="mx-auto max-w-6xl">
				<div className="mb-8 max-w-2xl">
					<p className="text-xs uppercase tracking-[0.28em] text-accent">
						{resolveCopy(content.eyebrow, lang)}
					</p>
					<h2 className="mt-3 text-3xl font-semibold text-foreground md:text-4xl">
						{resolveCopy(content.title, lang)}
					</h2>
					<p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
						{resolveCopy(content.description, lang)}
					</p>
				</div>

				<div className="grid gap-5 md:grid-cols-3">
					{certificateItems.map((item, index) => (
						<motion.a
							key={item.file}
							href={item.file}
							target="_blank"
							rel="noopener noreferrer"
							initial={{ opacity: 0, y: 18 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.25 }}
							transition={{ duration: 0.35, delay: index * 0.08 }}
							className="group card-hover rounded-[1.75rem] border border-white/10 bg-secondary/55 p-6"
							data-cursor-target="magnetic"
							data-cursor-size="md"
							data-pressable="true"
						>
							<div className="flex items-center justify-between">
								<div className="rounded-2xl border border-accent/30 bg-accent/10 p-3 text-accent">
									<BadgeCheck className="h-5 w-5" />
								</div>
								<ArrowUpRight className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-accent" />
							</div>
							<h3 className="mt-6 text-xl font-semibold text-foreground">
								{resolveCopy(item.title, lang)}
							</h3>
							<p className="mt-2 text-sm uppercase tracking-[0.24em] text-muted-foreground">
								{item.issuer}
							</p>
							<p className="mt-4 text-sm leading-relaxed text-muted-foreground">
								{resolveCopy(item.description, lang)}
							</p>
							<p className="mt-6 text-sm font-medium text-accent">
								{resolveCopy(content.viewCta, lang)}
							</p>
						</motion.a>
					))}
				</div>
			</div>
		</div>
	);
};

export default Certificates;

import { motion } from 'framer-motion';
import { ArrowUpRight, BadgeCheck } from 'lucide-react';
import { useLocale } from '@/context/LocaleContext';
import { certificateItems, siteContent } from '@/data/siteContent';
import { resolveCopy } from '@/lib/i18n';

const Certificates = () => {
	const { lang } = useLocale();
	const content = siteContent.certifications;

	return (
		<div className="container mx-auto px-4">
			<div className="mx-auto max-w-6xl">
				<div className="mb-8 max-w-2xl">
					<p className="section-eyebrow">{resolveCopy(content.eyebrow, lang)}</p>
					<h2 className="section-title">{resolveCopy(content.title, lang)}</h2>
					<p className="section-copy">{resolveCopy(content.description, lang)}</p>
				</div>

				<div className="grid gap-4 md:grid-cols-3">
					{certificateItems.map((item, index) => (
						<motion.a
							key={item.file}
							href={item.file}
							target="_blank"
							rel="noopener noreferrer"
							initial={{ opacity: 0, y: 42, filter: 'blur(10px)' }}
							whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
							viewport={{ once: true, amount: 0.2 }}
							transition={{ duration: 0.82, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
							className="group card-hover sweep-hover rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-5 shadow-[0_24px_72px_rgba(0,0,0,0.24)]"
							data-cursor-target="magnetic"
							data-cursor-size="md"
							data-pressable="true"
						>
							<div className="flex items-center justify-between">
								<div className="rounded-[1rem] border border-accent/25 bg-accent/10 p-3 text-accent">
									<BadgeCheck className="h-5 w-5" />
								</div>
								<ArrowUpRight className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-accent" />
							</div>
							<h3 className="mt-5 text-xl font-semibold tracking-[-0.03em] text-foreground">
								{resolveCopy(item.title, lang)}
							</h3>
							<p className="mt-2 text-[11px] uppercase tracking-[0.28em] text-muted-foreground">{item.issuer}</p>
							<p className="mt-4 text-sm leading-relaxed text-muted-foreground">{resolveCopy(item.description, lang)}</p>
							<p className="mt-5 text-sm font-medium text-accent">{resolveCopy(content.viewCta, lang)}</p>
						</motion.a>
					))}
				</div>
			</div>
		</div>
	);
};

export default Certificates;

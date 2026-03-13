import { motion } from 'framer-motion';
import { CloudCog, Compass, Cpu, Database, LayoutPanelTop, Server } from 'lucide-react';
import { useLocale } from '@/context/LocaleContext';
import { siteContent } from '@/data/siteContent';
import { resolveCopy } from '@/lib/i18n';

const iconMap = {
	layout: LayoutPanelTop,
	server: Server,
	database: Database,
	cloud: CloudCog,
	cpu: Cpu,
	compass: Compass,
};

const Skills = () => {
	const { lang } = useLocale();
	const content = siteContent.capabilities;

	return (
		<div className="container mx-auto px-4 py-4">
			<div className="mx-auto max-w-6xl">
				<div className="mb-8 max-w-3xl">
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

				<div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
					{content.items.map((item, index) => {
						const Icon = iconMap[item.icon] || Compass;
						return (
							<motion.article
								key={item.title.es}
								initial={{ opacity: 0, y: 18 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, amount: 0.2 }}
								transition={{ duration: 0.4, delay: index * 0.05 }}
								className="card-hover rounded-[1.75rem] border border-white/10 bg-card/65 p-6"
								data-pressable="true"
							>
								<div className="flex items-center gap-3">
									<div className="rounded-2xl border border-accent/30 bg-accent/10 p-3 text-accent">
										<Icon className="h-5 w-5" />
									</div>
									<h3 className="text-xl font-semibold text-foreground">
										{resolveCopy(item.title, lang)}
									</h3>
								</div>
								<p className="mt-4 text-sm leading-relaxed text-muted-foreground">
									{resolveCopy(item.description, lang)}
								</p>
								<div className="mt-5 flex flex-wrap gap-2">
									{item.skills.map((skill) => (
										<span
											key={skill}
											className="rounded-full border border-white/10 bg-background/70 px-3 py-1 text-xs text-muted-foreground"
										>
											{skill}
										</span>
									))}
								</div>
							</motion.article>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Skills;

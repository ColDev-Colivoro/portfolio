import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Loader2, Linkedin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useLocale } from '@/context/LocaleContext';
import { siteContent } from '@/data/siteContent';
import { resolveCopy } from '@/lib/i18n';

const Contact = () => {
	const { toast } = useToast();
	const { lang } = useLocale();
	const content = siteContent.contact;
	const labels = content.formLabels;
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		subject: '',
		message: '',
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setIsSubmitting(true);

		try {
			const response = await fetch('https://formspree.io/f/myznnnde', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData),
			});

			if (!response.ok) throw new Error('submit_failed');

			toast({
				title: lang === 'es' ? 'Solicitud enviada' : 'Request sent',
				description:
					lang === 'es'
						? 'Gracias por escribir. Responderé por el canal adecuado.'
						: 'Thanks for reaching out. I will respond through the right channel.',
				duration: 4500,
			});

			setFormData({ name: '', email: '', subject: '', message: '' });
		} catch (error) {
			console.error(error);
			toast({
				title: lang === 'es' ? 'No se pudo enviar' : 'Could not send request',
				description:
					lang === 'es'
						? 'Intenta nuevamente en unos minutos o usa LinkedIn.'
						: 'Please try again in a few minutes or use LinkedIn.',
				variant: 'destructive',
				duration: 4500,
			});
		} finally {
			setIsSubmitting(false);
		}
	};

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

				<div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
					<motion.div
						initial={{ opacity: 0, y: 18 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.25 }}
						className="rounded-[2rem] border border-white/10 bg-card/70 p-7"
						data-pressable="true"
					>
						<p className="text-xs uppercase tracking-[0.28em] text-accent">
							{resolveCopy(content.formTitle, lang)}
						</p>
						<h3 className="mt-4 text-2xl font-semibold text-foreground">
							{resolveCopy(content.sideTitle, lang)}
						</h3>
						<p className="mt-4 text-sm leading-relaxed text-muted-foreground">
							{resolveCopy(content.sideDescription, lang)}
						</p>

						<div className="mt-6 rounded-[1.5rem] border border-white/10 bg-background/70 p-5">
							<div className="flex items-center gap-3">
								<div className="rounded-2xl border border-accent/30 bg-accent/10 p-3 text-accent">
									<Linkedin className="h-5 w-5" />
								</div>
								<div>
									<h4 className="font-semibold text-foreground">LinkedIn</h4>
									<p className="text-sm text-muted-foreground">{resolveCopy(content.linkedinLabel, lang)}</p>
								</div>
							</div>
							<a
								href="https://www.linkedin.com/in/camilo-colivoro-1a5206386"
								target="_blank"
								rel="noopener noreferrer"
								className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80"
								data-cursor-target="magnetic"
								data-cursor-size="md"
								data-pressable="true"
							>
								{resolveCopy(content.linkedInCta, lang)}
								<ArrowUpRight className="h-4 w-4" />
							</a>
						</div>
					</motion.div>

					<motion.form
						onSubmit={handleSubmit}
						initial={{ opacity: 0, y: 18 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.25 }}
						className="rounded-[2rem] border border-white/10 bg-card/70 p-7"
						data-pressable="true"
					>
						<div className="grid gap-4 md:grid-cols-2">
							<div className="md:col-span-1">
								<label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
									{resolveCopy(labels.name, lang)}
								</label>
								<input
									id="name"
									name="name"
									type="text"
									value={formData.name}
									onChange={handleChange}
									required
									autoComplete="name"
									className="w-full rounded-2xl border border-white/10 bg-background px-4 py-3 text-foreground outline-none ring-0 transition-colors focus:border-accent"
								/>
							</div>
							<div className="md:col-span-1">
								<label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
									{resolveCopy(labels.email, lang)}
								</label>
								<input
									id="email"
									name="email"
									type="email"
									value={formData.email}
									onChange={handleChange}
									required
									autoComplete="email"
									className="w-full rounded-2xl border border-white/10 bg-background px-4 py-3 text-foreground outline-none ring-0 transition-colors focus:border-accent"
								/>
							</div>
							<div className="md:col-span-2">
								<label htmlFor="subject" className="mb-2 block text-sm font-medium text-foreground">
									{resolveCopy(labels.subject, lang)}
								</label>
								<input
									id="subject"
									name="subject"
									type="text"
									value={formData.subject}
									onChange={handleChange}
									required
									autoComplete="off"
									className="w-full rounded-2xl border border-white/10 bg-background px-4 py-3 text-foreground outline-none ring-0 transition-colors focus:border-accent"
								/>
							</div>
							<div className="md:col-span-2">
								<label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
									{resolveCopy(labels.message, lang)}
								</label>
								<textarea
									id="message"
									name="message"
									rows={6}
									value={formData.message}
									onChange={handleChange}
									required
									autoComplete="off"
									className="w-full resize-none rounded-[1.5rem] border border-white/10 bg-background px-4 py-3 text-foreground outline-none ring-0 transition-colors focus:border-accent"
								/>
							</div>
						</div>

						<Button
							type="submit"
							disabled={isSubmitting}
							className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-accent-foreground hover:bg-accent/90"
							data-cursor-target="magnetic"
							data-cursor-size="lg"
							data-pressable="true"
						>
							{isSubmitting ? (
								<>
									<Loader2 className="h-4 w-4 animate-spin" />
									{resolveCopy(labels.sending, lang)}
								</>
							) : (
								<>
									<Send className="h-4 w-4" />
									{resolveCopy(labels.submit, lang)}
								</>
							)}
						</Button>
					</motion.form>
				</div>
			</div>
		</div>
	);
};

export default Contact;

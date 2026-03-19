import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Loader2, Linkedin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useLocale } from '@/context/LocaleContext';
import { siteContent } from '@/data/siteContent';
import { resolveCopy } from '@/lib/i18n';
import { getSectionRevealTransition, sectionRevealInitial, sectionRevealInView } from '@/lib/motionPresets';

const Contact = () => {
	const { toast } = useToast();
	const { lang } = useLocale();
	const content = siteContent.contact;
	const labels = content.formLabels;
	const formspreeEndpoint =
		import.meta.env.VITE_FORMSPREE_ENDPOINT?.trim() || 'https://formspree.io/f/myznnnde';
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		subject: '',
		message: '',
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [revealedFields, setRevealedFields] = useState(['name']);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prev) => ({ ...prev, [name]: value }));

		// Progressive revelation
		setRevealedFields((prev) => {
			const next = new Set(prev);
			if (name === 'name' && value.length > 0) next.add('email');
			if (name === 'email' && value.length > 0) next.add('subject');
			if (name === 'subject' && value.length > 0) next.add('message');
			return Array.from(next);
		});
	};

	const isFormValid = formData.name.trim() !== '' && formData.email.trim() !== '' && formData.subject.trim() !== '' && formData.message.trim() !== '';

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!isFormValid) return; // Seguridad extra
		setIsSubmitting(true);

		try {
			const response = await fetch(formspreeEndpoint, {
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
			setRevealedFields(['name']);
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

	const inputClass = "w-full rounded-full border border-white/10 bg-black/20 px-4 py-3 text-sm text-foreground outline-none ring-0 transition-all focus:border-accent focus:ring-1 focus:ring-accent/50";
	const labelClass = "mb-1.5 block text-sm font-medium text-foreground ml-4";

	return (
		<div className="container mx-auto px-4 py-6">
			<div className="mx-auto max-w-6xl">
				<div className="mb-6 max-w-3xl">
					<p className="section-eyebrow">{resolveCopy(content.eyebrow, lang)}</p>
					<h2 className="section-title text-2xl md:text-3xl">{resolveCopy(content.title, lang)}</h2>
				</div>

				<div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] items-start">
					<motion.div
						initial={sectionRevealInitial}
						whileInView={sectionRevealInView}
						viewport={{ once: true }}
						transition={getSectionRevealTransition()}
						className="panel-surface rounded-[1.5rem] p-6 border border-white/5 bg-white/[0.02]"
					>
						<p className="section-eyebrow">{resolveCopy(content.formTitle, lang)}</p>
						<h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-foreground">
							{resolveCopy(content.sideTitle, lang)}
						</h3>
						<p className="mt-2 text-sm leading-relaxed text-muted-foreground">
							{resolveCopy(content.sideDescription, lang)}
						</p>

						<div className="mt-6 rounded-[1.25rem] border border-white/10 bg-black/20 p-4">
							<div className="flex items-center gap-3">
								<div className="rounded-[1rem] border border-accent/25 bg-accent/10 p-2 text-accent">
									<Linkedin className="h-4 w-4" />
								</div>
								<div>
									<h4 className="font-semibold text-foreground text-sm">LinkedIn</h4>
									<p className="text-xs text-muted-foreground">{resolveCopy(content.linkedinLabel, lang)}</p>
								</div>
							</div>
							<a
								href="https://www.linkedin.com/in/camilo-colivoro-1a5206386"
								target="_blank"
								rel="noopener noreferrer"
								className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
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
						initial={sectionRevealInitial}
						whileInView={sectionRevealInView}
						viewport={{ once: true }}
						transition={getSectionRevealTransition(1, 0.1)}
						className="panel-surface rounded-[1.5rem] p-6 border border-white/5 bg-white/[0.02] h-full"
					>
						<div className="grid md:grid-cols-2 gap-6 h-full">
							{/* Columna izquierda del formulario */}
							<div className="flex flex-col gap-4">
								<AnimatePresence>
									{revealedFields.includes('name') && (
									<motion.div key="field-name" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
											<label htmlFor="name" className={labelClass}>{resolveCopy(labels.name, lang)}</label>
											<input id="name" name="name" type="text" value={formData.name} onChange={handleChange} required autoComplete="name" className={inputClass} />
										</motion.div>
									)}
									{revealedFields.includes('email') && (
									<motion.div key="field-email" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
											<label htmlFor="email" className={labelClass}>{resolveCopy(labels.email, lang)}</label>
											<input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required autoComplete="email" className={inputClass} />
										</motion.div>
									)}
									{revealedFields.includes('subject') && (
									<motion.div key="field-subject" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
											<label htmlFor="subject" className={labelClass}>{resolveCopy(labels.subject, lang)}</label>
											<input id="subject" name="subject" type="text" value={formData.subject} onChange={handleChange} required autoComplete="off" className={inputClass} />
										</motion.div>
									)}
								</AnimatePresence>
							</div>
							
							{/* Columna derecha del formulario */}
							<div className="flex flex-col gap-4 w-full">
								<AnimatePresence>
									{revealedFields.includes('message') && (
									<motion.div key="field-message" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="flex flex-col w-full">
											<label htmlFor="message" className={labelClass}>{resolveCopy(labels.message, lang)}</label>
											<textarea id="message" name="message" rows={6} value={formData.message} onChange={handleChange} required autoComplete="off" className={inputClass + " resize-none"} />
										</motion.div>
									)}
								</AnimatePresence>

								<Button
									type="submit"
									disabled={isSubmitting || !isFormValid}
									className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground hover:bg-accent/90 transition-all duration-300 w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed mt-[2.1rem]"
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
							</div>
						</div>
					</motion.form>
				</div>
			</div>
		</div>
	);
};

export default Contact;

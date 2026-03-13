import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, Loader2, MessageSquare, Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteContent } from '@/data/siteContent';
import { resolveCopy } from '@/lib/i18n';

const Chatbot = ({ lang = 'es' }) => {
	const chatbotCopy = siteContent.chatbot;
	const text = useMemo(
		() => ({
			welcome: resolveCopy(chatbotCopy.welcome, lang),
			title: resolveCopy(chatbotCopy.title, lang),
			online: resolveCopy(chatbotCopy.online, lang),
			placeholder: resolveCopy(chatbotCopy.placeholder, lang),
			thinking: resolveCopy(chatbotCopy.thinking, lang),
			fallback: resolveCopy(chatbotCopy.fallback, lang),
		}),
		[chatbotCopy, lang],
	);
	const [isOpen, setIsOpen] = useState(false);
	const [isReady, setIsReady] = useState(false);
	const [messages, setMessages] = useState([{ role: 'assistant', content: text.welcome }]);
	const [inputValue, setInputValue] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const messagesEndRef = useRef(null);

	useEffect(() => {
		const onScroll = () => setIsReady(window.scrollY > Math.max(220, window.innerHeight * 0.4));
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	useEffect(() => {
		setMessages((prev) => {
			if (prev.length !== 1 || prev[0]?.role !== 'assistant') return prev;
			return [{ role: 'assistant', content: text.welcome }];
		});
	}, [text.welcome]);

	useEffect(() => {
		if (typeof messagesEndRef.current?.scrollIntoView === 'function') {
			messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	}, [messages, isOpen]);

	const handleSendMessage = async (event) => {
		event.preventDefault();
		if (!inputValue.trim() || isLoading) return;

		const userMessage = { role: 'user', content: inputValue.trim() };
		setMessages((prev) => [...prev, userMessage]);
		setInputValue('');
		setIsLoading(true);

		try {
			const callChat = async () =>
				fetch('/.netlify/functions/chat', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ lang, messages: [...messages, userMessage] }),
				});

			let response = await callChat();
			if (!response.ok && response.status >= 500) {
				response = await callChat();
			}

			const data = await response.json().catch(() => null);
			if (!response.ok) {
				setMessages((prev) => [...prev, { role: 'assistant', content: data?.reply || text.fallback }]);
				return;
			}

			setMessages((prev) => [...prev, { role: 'assistant', content: data?.reply || text.fallback }]);
		} catch (error) {
			console.error(error);
			setMessages((prev) => [...prev, { role: 'assistant', content: text.fallback }]);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<AnimatePresence>
				{(isReady || isOpen) && (
					<motion.button
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 20 }}
						transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
						className="fixed bottom-6 right-6 z-50 flex items-center justify-center rounded-full border border-white/10 bg-background/88 p-3 text-foreground shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur-xl"
						onClick={() => setIsOpen((prev) => !prev)}
						whileHover={{ y: -3, scale: 1.02 }}
						whileTap={{ scale: 0.96 }}
						aria-label={isOpen ? 'Close assistant' : 'Open assistant'}
						data-cursor-target="magnetic"
						data-cursor-size="md"
						data-pressable="true"
					>
						<MessageSquare className="h-5 w-5 text-accent" />
					</motion.button>
				)}
			</AnimatePresence>

			<AnimatePresence>
				{isOpen ? (
					<motion.div
						initial={{ opacity: 0, y: 60, scale: 0.96 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 40, scale: 0.96 }}
						transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
						className="fixed bottom-24 right-6 z-50 flex h-[520px] max-h-[70vh] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-[1.8rem] border border-white/10 bg-card/92 shadow-[0_36px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl"
					>
						<div className="flex items-center justify-between border-b border-white/10 bg-background/72 p-4">
							<div className="flex items-center gap-3">
								<div className="rounded-full border border-accent/25 bg-accent/10 p-2 text-accent">
									<Bot className="h-5 w-5" />
								</div>
								<div>
									<h3 className="text-sm font-semibold text-foreground">{text.title}</h3>
									<p className="text-xs text-accent">{text.online}</p>
								</div>
							</div>
							<button
								onClick={() => setIsOpen(false)}
								className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-white/[0.05] hover:text-foreground"
								aria-label={lang === 'es' ? 'Cerrar asistente' : 'Close assistant'}
								data-cursor-target="magnetic"
								data-cursor-size="sm"
								data-pressable="true"
							>
								<X className="h-5 w-5" />
							</button>
						</div>

						<div className="flex-1 space-y-4 overflow-y-auto p-4">
							{messages.map((message, index) => (
								<div key={`${message.role}-${index}`} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
									<div className={`max-w-[85%] rounded-2xl p-3 text-sm ${message.role === 'user' ? 'rounded-tr-none bg-accent text-accent-foreground' : 'rounded-tl-none border border-white/10 bg-background/80 text-foreground'}`}>
										{message.content}
									</div>
								</div>
							))}
							{isLoading ? (
								<div className="flex justify-start">
									<div className="flex items-center gap-2 rounded-2xl rounded-tl-none border border-white/10 bg-background/80 p-3 text-sm text-muted-foreground">
										<Loader2 className="h-4 w-4 animate-spin text-accent" />
										{text.thinking}
									</div>
								</div>
							) : null}
							<div ref={messagesEndRef} />
						</div>

						<div className="border-t border-white/10 bg-background/70 p-3">
							<form onSubmit={handleSendMessage} className="flex gap-2">
								<input
									type="text"
									value={inputValue}
									onChange={(event) => setInputValue(event.target.value)}
									placeholder={text.placeholder}
									className="flex-1 rounded-full border border-white/10 bg-background px-4 py-2 text-sm text-foreground outline-none transition-colors focus:border-accent"
								/>
								<Button
									type="submit"
									disabled={isLoading || !inputValue.trim()}
									className="flex h-10 w-10 items-center justify-center rounded-full bg-accent p-0 text-accent-foreground hover:bg-accent/90"
									data-cursor-target="magnetic"
									data-cursor-size="sm"
									data-pressable="true"
								>
									<Send className="h-4 w-4" />
								</Button>
							</form>
						</div>
					</motion.div>
				) : null}
			</AnimatePresence>
		</>
	);
};

export default Chatbot;

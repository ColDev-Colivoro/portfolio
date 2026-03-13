const ChimubotAvatar = ({ isOpen, isLoading, isVisible, onToggle, lang = 'es' }) => {
	if (!isVisible) return null;

	return (
		<button
			type="button"
			onClick={onToggle}
			aria-label={lang === 'es' ? 'Open assistant' : 'Open assistant'}
			className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl border border-white/10 bg-background/90 px-3 py-2 text-sm text-foreground shadow-[0_18px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-colors hover:border-accent/40"
		>
			<span className="inline-flex h-6 w-6 items-center justify-center overflow-hidden rounded-full border border-accent/25 bg-accent/15">
				<img src="/images/branding/logo-gato.png" alt="Chimubot" className="h-6 w-6 object-cover" />
			</span>
			<span>{lang === 'es' ? 'Chat' : 'Chat'}</span>
			{isLoading ? <span className="text-xs text-accent">...</span> : null}
		</button>
	);
};

export default ChimubotAvatar;

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';

const CaseStudyModalShell = ({ isOpen, onClose, closeLabel, zIndex = 120, children }) => {
	useEffect(() => {
		if (!isOpen || typeof document === 'undefined') return undefined;

		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';

		const onKeyDown = (event) => {
			if (event.key === 'Escape') onClose();
		};

		window.addEventListener('keydown', onKeyDown);
		return () => {
			window.removeEventListener('keydown', onKeyDown);
			document.body.style.overflow = previousOverflow;
		};
	}, [isOpen, onClose]);

	if (typeof document === 'undefined') return null;

	return createPortal(
		<AnimatePresence>
			{isOpen ? (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 flex items-center justify-center bg-black/78 p-4 backdrop-blur-md"
					style={{ zIndex }}
					onClick={onClose}
				>
					<motion.div
						initial={{ y: 90, opacity: 0, scale: 0.96 }}
						animate={{ y: 0, opacity: 1, scale: 1 }}
						exit={{ y: 80, opacity: 0, scale: 0.96 }}
						transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
						className="relative h-[88vh] w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-background shadow-[0_50px_140px_rgba(0,0,0,0.45)]"
						onClick={(event) => event.stopPropagation()}
					>
						<button
							onClick={onClose}
							className="absolute right-4 top-4 z-20 rounded-full border border-white/10 bg-background/80 px-4 py-2 text-sm text-foreground transition-colors hover:border-accent/40 hover:bg-white/[0.04]"
							data-cursor-target="magnetic"
							data-cursor-size="sm"
							data-pressable="true"
						>
							{closeLabel}
						</button>
						<div className="h-full overflow-y-auto">{children}</div>
					</motion.div>
				</motion.div>
			) : null}
		</AnimatePresence>,
		document.body,
	);
};

export default CaseStudyModalShell;

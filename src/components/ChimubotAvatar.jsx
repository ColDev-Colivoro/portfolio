import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { chimubotConfig } from '@/data/chimubotConfig';
import { useChimubotMotion } from '@/hooks/useChimubotMotion';

const ChimubotAvatar = ({ isOpen = false, isLoading = false, isVisible = true, onToggle, lang = 'es' }) => {
	const [showPopup, setShowPopup] = useState(false);
	const [sleeping, setSleeping] = useState(false);
	const [currentFrame, setCurrentFrame] = useState(0);
	const [areFramesReady, setAreFramesReady] = useState(false);
	const [loadedFrameUrls, setLoadedFrameUrls] = useState([]);
	const preloadedFramesRef = useRef(new Set());
	
	const { position, visualState, isSimplified } = useChimubotMotion({ isOpen, isLoading });

	const resolvedState = useMemo(() => {
		if (isOpen && !isLoading) return 'active';
		if (isLoading) return 'thinking';
		if (sleeping && !isOpen) return 'sleeping';
		return visualState;
	}, [isLoading, isOpen, sleeping, visualState]);

	const idleStateConfig = useMemo(() => {
		return chimubotConfig.sprite.states.idle || { frames: [], fps: 8 };
	}, []);

	const stateConfig = useMemo(() => {
		if (resolvedState === 'active' && isOpen && !isLoading) {
			return chimubotConfig.sprite.states.active || idleStateConfig;
		}
		return chimubotConfig.sprite.states[resolvedState] || idleStateConfig;
	}, [idleStateConfig, isLoading, isOpen, resolvedState]);

	const frameFiles = useMemo(() => {
		const currentFiles = stateConfig.files;
		if (Array.isArray(currentFiles) && currentFiles.length > 0) return currentFiles;
		const idleFiles = idleStateConfig.files;
		if (Array.isArray(idleFiles) && idleFiles.length > 0) return idleFiles;
		return [];
	}, [idleStateConfig.files, stateConfig.files]);

	const frameFolder = useMemo(() => {
		if (stateConfig.folder) return stateConfig.folder;
		if (Array.isArray(stateConfig.files) && stateConfig.files.length > 0) return resolvedState;
		return idleStateConfig.folder || 'idle';
	}, [idleStateConfig.folder, resolvedState, stateConfig.files, stateConfig.folder]);

	const frameUrls = useMemo(() => {
		if (!frameFiles.length) return [];
		return frameFiles.map((file) => {
			if (file.startsWith('/')) return file;
			return `/images/chimubot/frames/${frameFolder}/${encodeURIComponent(file)}`;
		});
	}, [frameFiles, frameFolder]);

	useEffect(() => {
		setLoadedFrameUrls([]);

		if (!frameUrls.length) {
			setAreFramesReady(true);
			return;
		}

		const cachedUrls = frameUrls.filter((url) => preloadedFramesRef.current.has(url));
		const allCached = cachedUrls.length === frameUrls.length;
		if (allCached) {
			setLoadedFrameUrls(cachedUrls);
			setAreFramesReady(true);
			return;
		}

		setAreFramesReady(false);
		let cancelled = false;

		const loadImage = (url) =>
			new Promise((resolve) => {
				const img = new Image();
				img.onload = () => {
					preloadedFramesRef.current.add(url);
					resolve({ url, ok: true });
				};
				img.onerror = () => resolve({ url, ok: false });
				img.src = url;
			});

		Promise.all(frameUrls.map(loadImage)).then((results) => {
			if (cancelled) return;
			const successfulUrls = results.filter((result) => result.ok).map((result) => result.url);
			if (successfulUrls.length === 0) {
				setLoadedFrameUrls([chimubotConfig.sprite.fallbackSrc]);
				setAreFramesReady(true);
				return;
			}
			setLoadedFrameUrls(successfulUrls);
			setAreFramesReady(successfulUrls.length > 0);
		});

		return () => {
			cancelled = true;
		};
	}, [frameUrls]);

	// Animation logic: Cycle frames based on FPS
	useEffect(() => {
		setCurrentFrame(0); // Reset frame on state change

		if (!areFramesReady || loadedFrameUrls.length <= 1) return undefined;

		const interval = setInterval(() => {
			setCurrentFrame((prev) => (prev + 1) % loadedFrameUrls.length);
		}, 1000 / Math.max(stateConfig.fps || 8, 1));

		return () => clearInterval(interval);
	}, [areFramesReady, loadedFrameUrls.length, resolvedState, stateConfig.fps]);

	useEffect(() => {
		const wake = () => setSleeping(false);
		const sleepTimer = setTimeout(() => setSleeping(true), chimubotConfig.sleep.inactiveMs);
		window.addEventListener('mousemove', wake, { passive: true });
		window.addEventListener('scroll', wake, { passive: true });
		window.addEventListener('keydown', wake);

		return () => {
			clearTimeout(sleepTimer);
			window.removeEventListener('mousemove', wake);
			window.removeEventListener('scroll', wake);
			window.removeEventListener('keydown', wake);
		};
	}, [isLoading, isOpen]);

	useEffect(() => {
		setShowPopup(false);
	}, [isOpen]);

	const tooltip = useMemo(() => {
		const locale = lang === 'en' ? 'en' : 'es';
		const messages = chimubotConfig.popup.messages[locale];
		return messages[resolvedState] ?? messages.hover ?? messages.idle;
	}, [lang, resolvedState]);

	const identityLabel = useMemo(() => {
		const locale = lang === 'en' ? 'en' : 'es';
		const messages = chimubotConfig.popup.messages[locale];
		return messages.idle;
	}, [lang]);

	const spriteSrc = useMemo(() => {
		if (!loadedFrameUrls.length) return chimubotConfig.sprite.fallbackSrc;
		return loadedFrameUrls[currentFrame % loadedFrameUrls.length];
	}, [currentFrame, loadedFrameUrls]);

	const handleToggle = () => {
		setSleeping(false);
		onToggle?.();
	};

	return (
		<AnimatePresence>
			{isVisible ? (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 20 }}
					transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
					className="fixed z-50"
					style={{ bottom: `${position.bottom}px`, right: `${position.right}px` }}
				>
					<motion.button
						type="button"
						onClick={handleToggle}
						animate={isSimplified ? undefined : isOpen ? undefined : { y: [0, -2, 0] }}
						transition={
							isSimplified || isOpen
								? undefined
								: {
									duration: 2.2,
									repeat: Infinity,
									ease: 'easeInOut',
								}
						}
						whileHover={undefined}
						whileTap={{ scale: 0.97 }}
						className="group relative flex h-[112px] w-[112px] items-center justify-center border-0 bg-transparent shadow-none"
						aria-label={isOpen ? 'Close assistant' : 'Open assistant'}
					>
						<div className="relative h-[112px] w-[112px] overflow-visible">
							{spriteSrc ? (
								<img
									src={spriteSrc}
									alt="Chimubot"
									className={`pointer-events-none absolute inset-0 h-full w-full select-none object-contain object-bottom scale-[1.04] drop-shadow-[0_14px_28px_rgba(0,0,0,0.4)] transition-opacity duration-200 ${areFramesReady ? 'opacity-100' : 'opacity-0'}`}
									onError={() => {
										setLoadedFrameUrls((prev) => prev.filter((url) => url !== spriteSrc));
									}}
									draggable={false}
								/>
							) : null}
						</div>
						<motion.div
							aria-hidden="true"
							className="pointer-events-none absolute -bottom-1 h-5 w-14 rounded-full bg-accent/20 blur-xl"
							animate={
								isSimplified ? { opacity: 0.2, scale: 1 } : { opacity: [0.2, 0.45, 0.2], scale: [0.92, 1.02, 0.92] }
							}
							transition={isSimplified ? { duration: 0.1 } : { duration: 2.3, repeat: Infinity, ease: 'easeInOut' }}
						/>
					</motion.button>

					<AnimatePresence>
						{!isOpen ? (
							<div className="pointer-events-none absolute bottom-[124px] left-1/2 -translate-x-1/2 w-max">
								<motion.div
									initial={{ opacity: 0, y: 10, scale: 0.96 }}
									animate={{ opacity: 1, y: 0, scale: 1 }}
									exit={{ opacity: 0, y: 8, scale: 0.96 }}
									transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
									className="rounded-full border border-white/10 bg-card/85 px-4 py-1.5 text-center text-[11px] font-semibold text-foreground/95 shadow-[0_8px_24px_rgba(0,0,0,0.3)] backdrop-blur-md ring-1 ring-white/5"
								>
									{identityLabel}
								</motion.div>
							</div>
						) : null}
					</AnimatePresence>

					<AnimatePresence>
						{showPopup ? (
							<div className="pointer-events-none absolute bottom-[132px] left-1/2 -translate-x-1/2 w-max">
								<motion.div
									initial={{ opacity: 0, scale: 0.9, y: 10 }}
									animate={{ opacity: 1, scale: 1, y: 0 }}
									exit={{ opacity: 0, scale: 0.9, y: 10 }}
									transition={{ type: "spring", damping: 25, stiffness: 300 }}
									className="relative max-w-[240px] rounded-2xl border border-white/15 bg-card/98 px-4 py-2.5 text-center text-xs font-medium text-foreground shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl ring-1 ring-white/10"
								>
									{tooltip}
									<span
										aria-hidden="true"
										className="absolute left-1/2 top-full h-3 w-3 -translate-x-1/2 -translate-y-[6px] rotate-45 border-b border-r border-white/15 bg-card/98"
									/>
								</motion.div>
							</div>
						) : null}
					</AnimatePresence>
				</motion.div>
			) : null}
		</AnimatePresence>
	);
};

export default ChimubotAvatar;

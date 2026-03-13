import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { usePointerCapabilities } from '@/hooks/usePointerCapabilities';

const OFFSCREEN = -140;

const SIZE_MAP = {
	base: 28,
	sm: 40,
	md: 54,
	lg: 72,
};

const MAGNETIC_STRENGTH = {
	base: 0,
	sm: 0.08,
	md: 0.12,
	lg: 0.16,
};

const getMagneticTarget = (target) => {
	if (!(target instanceof Element)) return null;

	const magneticTarget = target.closest('[data-cursor-target="magnetic"]');
	if (!magneticTarget) return null;
	if (magneticTarget.matches('input, textarea, select, [contenteditable="true"]')) return null;

	return magneticTarget;
};

const Cursor = () => {
	const { enableFollower } = usePointerCapabilities();
	const x = useMotionValue(OFFSCREEN);
	const y = useMotionValue(OFFSCREEN);
	const springConfig = useMemo(() => ({ stiffness: 320, damping: 30, mass: 0.22 }), []);
	const smoothX = useSpring(x, springConfig);
	const smoothY = useSpring(y, springConfig);
	const [visible, setVisible] = useState(false);
	const [pressed, setPressed] = useState(false);
	const [magnetic, setMagnetic] = useState(false);
	const [sizeKey, setSizeKey] = useState('base');
	const visibleRef = useRef(false);
	const targetStateRef = useRef({ magnetic: false, sizeKey: 'base' });

	useEffect(() => {
		if (!enableFollower) {
			visibleRef.current = false;
			targetStateRef.current = { magnetic: false, sizeKey: 'base' };
			setVisible(false);
			setPressed(false);
			setMagnetic(false);
			setSizeKey('base');
			x.set(OFFSCREEN);
			y.set(OFFSCREEN);
			return undefined;
		}

		const resetTargetState = () => {
			targetStateRef.current = { magnetic: false, sizeKey: 'base' };
			setMagnetic(false);
			setSizeKey('base');
		};

		const hideFollower = () => {
			if (!visibleRef.current) return;
			visibleRef.current = false;
			setVisible(false);
			setPressed(false);
			resetTargetState();
			x.set(OFFSCREEN);
			y.set(OFFSCREEN);
		};

		const syncTargetState = (nextTarget) => {
			const nextMagnetic = Boolean(nextTarget);
			const nextSizeKey = nextTarget?.dataset?.cursorSize ?? 'base';
			const current = targetStateRef.current;

			if (current.magnetic !== nextMagnetic) {
				setMagnetic(nextMagnetic);
			}

			if (current.sizeKey !== nextSizeKey) {
				setSizeKey(nextSizeKey);
			}

			targetStateRef.current = { magnetic: nextMagnetic, sizeKey: nextSizeKey };
		};

		const handleMouseMove = (event) => {
			const nextTarget = getMagneticTarget(event.target);
			const targetSize = nextTarget?.dataset?.cursorSize ?? 'base';
			let nextX = event.clientX;
			let nextY = event.clientY;

			if (nextTarget) {
				const rect = nextTarget.getBoundingClientRect();
				const centerX = rect.left + rect.width / 2;
				const centerY = rect.top + rect.height / 2;
				const magneticStrength = MAGNETIC_STRENGTH[targetSize] ?? MAGNETIC_STRENGTH.md;
				nextX += (centerX - nextX) * magneticStrength;
				nextY += (centerY - nextY) * magneticStrength;
			}

			x.set(nextX);
			y.set(nextY);

			if (!visibleRef.current) {
				visibleRef.current = true;
				setVisible(true);
			}

			syncTargetState(nextTarget);
		};

		const handleMouseDown = () => setPressed(true);
		const handleMouseUp = () => setPressed(false);

		const handleDocumentOut = (event) => {
			if (event.relatedTarget === null) {
				hideFollower();
			}
		};

		window.addEventListener('mousemove', handleMouseMove, { passive: true });
		window.addEventListener('mousedown', handleMouseDown);
		window.addEventListener('mouseup', handleMouseUp);
		document.addEventListener('mouseout', handleDocumentOut);
		window.addEventListener('blur', hideFollower);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mousedown', handleMouseDown);
			window.removeEventListener('mouseup', handleMouseUp);
			document.removeEventListener('mouseout', handleDocumentOut);
			window.removeEventListener('blur', hideFollower);
		};
	}, [enableFollower, x, y]);

	if (!enableFollower) return null;

	const size = SIZE_MAP[sizeKey] ?? SIZE_MAP.base;
	const scale = pressed ? 0.84 : magnetic ? 1.08 : 1;

	return (
		<motion.div
			aria-hidden="true"
			className="cursor-follower"
			data-state={magnetic ? 'magnetic' : 'default'}
			data-testid="cursor-follower"
			style={{ x: smoothX, y: smoothY }}
		>
			<motion.div
				animate={{
					width: size,
					height: size,
					opacity: visible ? 1 : 0,
					scale,
					borderColor: magnetic ? 'rgba(255, 106, 0, 0.56)' : 'rgba(255, 255, 255, 0.16)',
					boxShadow: magnetic
						? '0 20px 54px rgba(255, 106, 0, 0.22)'
						: '0 14px 38px rgba(0, 0, 0, 0.2)',
				}}
				className={`cursor-follower__shell ${magnetic ? 'is-magnetic' : ''} ${pressed ? 'is-pressed' : ''}`}
				transition={{ type: 'spring', stiffness: 260, damping: 24, mass: 0.22 }}
			>
				<span className="cursor-follower__halo" />
				<span className="cursor-follower__ring" />
				<span className="cursor-follower__core" />
			</motion.div>
		</motion.div>
	);
};

export default Cursor;

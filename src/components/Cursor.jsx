import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { usePointerCapabilities } from '@/hooks/usePointerCapabilities';

const SIZE_MAP = {
	sm: 30,
	md: 40,
	lg: 52,
};

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const getInteractiveTarget = (target) => {
	if (!(target instanceof Element)) return null;
	return target.closest('[data-cursor-target]');
};

const getSize = (element) => {
	const sizeKey = element?.dataset?.cursorSize ?? 'md';
	return SIZE_MAP[sizeKey] ?? SIZE_MAP.md;
};

const getMagneticOffset = (element, pointerPosition) => {
	if (!element || element.dataset.cursorTarget !== 'magnetic') {
		return { x: 0, y: 0 };
	}

	const rect = element.getBoundingClientRect();
	const centerX = rect.left + rect.width / 2;
	const centerY = rect.top + rect.height / 2;
	const maxOffset = 10;

	return {
		x: clamp((centerX - pointerPosition.x) * 0.12, -maxOffset, maxOffset),
		y: clamp((centerY - pointerPosition.y) * 0.12, -maxOffset, maxOffset),
	};
};

const Cursor = () => {
	const { enableFollower } = usePointerCapabilities();
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [cursorVariant, setCursorVariant] = useState('default');
	const [activeTarget, setActiveTarget] = useState(null);

	useEffect(() => {
		if (!enableFollower) return undefined;

		const handlePointerMove = (event) => {
			setMousePosition({ x: event.clientX, y: event.clientY });
		};

		const handlePointerDown = () => setCursorVariant('click');
		const handlePointerUp = () => setCursorVariant(activeTarget ? 'hover' : 'default');
		const handlePointerOver = (event) => {
			const target = getInteractiveTarget(event.target);
			if (!target) return;
			setActiveTarget(target);
			setCursorVariant('hover');
		};

		const handlePointerOut = (event) => {
			const target = getInteractiveTarget(event.target);
			if (!target) return;

			const relatedTarget = getInteractiveTarget(event.relatedTarget);
			if (relatedTarget === target) return;

			setActiveTarget(null);
			setCursorVariant('default');
		};

		const handlePointerLeave = () => {
			setActiveTarget(null);
			setCursorVariant('default');
		};

		window.addEventListener('pointermove', handlePointerMove, { passive: true });
		window.addEventListener('pointerdown', handlePointerDown);
		window.addEventListener('pointerup', handlePointerUp);
		window.addEventListener('pointerleave', handlePointerLeave);
		document.addEventListener('pointerover', handlePointerOver);
		document.addEventListener('pointerout', handlePointerOut);

		return () => {
			window.removeEventListener('pointermove', handlePointerMove);
			window.removeEventListener('pointerdown', handlePointerDown);
			window.removeEventListener('pointerup', handlePointerUp);
			window.removeEventListener('pointerleave', handlePointerLeave);
			document.removeEventListener('pointerover', handlePointerOver);
			document.removeEventListener('pointerout', handlePointerOut);
		};
	}, [activeTarget, enableFollower]);

	const magneticOffset = useMemo(
		() => getMagneticOffset(activeTarget, mousePosition),
		[activeTarget, mousePosition],
	);

	const haloSize = activeTarget ? getSize(activeTarget) : SIZE_MAP.sm;
	const haloX = mousePosition.x - haloSize / 2 - magneticOffset.x;
	const haloY = mousePosition.y - haloSize / 2 - magneticOffset.y;
	const coreX = mousePosition.x - 5 - magneticOffset.x * 0.4;
	const coreY = mousePosition.y - 5 - magneticOffset.y * 0.4;

	if (!enableFollower) return null;

	return (
		<>
			<motion.div
				aria-hidden="true"
				className="cursor-follower-halo fixed left-0 top-0 z-[60] hidden rounded-full pointer-events-none md:block"
				animate={{
					x: haloX,
					y: haloY,
					width: cursorVariant === 'hover' ? haloSize : 30,
					height: cursorVariant === 'hover' ? haloSize : 30,
					opacity: cursorVariant === 'click' ? 0.95 : 1,
					scale: cursorVariant === 'click' ? 0.86 : 1,
				}}
				transition={{
					type: 'spring',
					stiffness: 320,
					damping: 26,
					mass: 0.45,
				}}
			/>
			<motion.div
				aria-hidden="true"
				className="cursor-follower-core fixed left-0 top-0 z-[61] hidden rounded-full pointer-events-none md:block"
				animate={{
					x: coreX,
					y: coreY,
					scale: cursorVariant === 'click' ? 0.8 : 1,
					opacity: activeTarget ? 1 : 0.85,
				}}
				transition={{
					type: 'spring',
					stiffness: 420,
					damping: 30,
					mass: 0.2,
				}}
			/>
		</>
	);
};

export default Cursor;

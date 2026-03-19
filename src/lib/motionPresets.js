export const motionTokens = {
	ease: [0.22, 1, 0.36, 1],
	heroBlurIn: 14,
	sharedBlurIn: 7,
	routeDistanceX: 32,
	sectionDistanceY: 42,
	heroDuration: 0.86,
	routeDuration: 0.62,
	sectionDuration: 0.64,
	routeDelay: 0.06,
	heroStagger: 0.05,
	heroDelayChildren: 0.06,
};

export const routeIndexMap = {
	'/': 0,
	'/proyectos': 1,
	'/about': 2,
	'/contact': 3,
};

export const getRouteTone = (pathname) => {
	if (pathname === '/') return 'home';
	if (pathname === '/proyectos') return 'projects';
	if (pathname === '/about') return 'about';
	if (pathname === '/contact') return 'contact';
	return 'home';
};

export const routeLateralVariants = {
	enter: (direction = 1) => ({
		x: direction * motionTokens.routeDistanceX,
		opacity: 0,
		filter: `blur(${motionTokens.sharedBlurIn}px)`,
	}),
	center: { x: 0, opacity: 1, filter: 'blur(0px)' },
	exit: (direction = 1) => ({
		x: direction * -motionTokens.routeDistanceX,
		opacity: 0,
		filter: `blur(${motionTokens.sharedBlurIn}px)`,
	}),
};

export const routeTransition = {
	duration: motionTokens.routeDuration,
	ease: motionTokens.ease,
	delay: motionTokens.routeDelay,
};

export const heroRevealParent = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			delayChildren: motionTokens.heroDelayChildren,
			staggerChildren: motionTokens.heroStagger,
		},
	},
};

export const heroRevealItem = {
	hidden: {
		opacity: 0,
		y: 28,
		filter: `blur(${motionTokens.heroBlurIn}px)`,
	},
	visible: {
		opacity: 1,
		y: 0,
		filter: 'blur(0px)',
		transition: {
			duration: motionTokens.heroDuration,
			ease: motionTokens.ease,
		},
	},
};

export const heroRevealItemSoft = {
	hidden: {
		opacity: 0,
		y: 24,
		filter: `blur(${motionTokens.sharedBlurIn}px)`,
	},
	visible: {
		opacity: 1,
		y: 0,
		filter: 'blur(0px)',
		transition: {
			duration: motionTokens.heroDuration,
			ease: motionTokens.ease,
		},
	},
};

export const sectionRevealInitial = {
	opacity: 0,
	y: motionTokens.sectionDistanceY,
	filter: `blur(${motionTokens.sharedBlurIn}px)`,
};

export const sectionRevealInView = {
	opacity: 1,
	y: 0,
	filter: 'blur(0px)',
};

export const getSectionRevealTransition = (index = 0, delayStep = 0.06) => ({
	duration: motionTokens.sectionDuration,
	delay: index * delayStep,
	ease: motionTokens.ease,
});

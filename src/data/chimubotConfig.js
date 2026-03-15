const singleFrontFrame = (prefix) => [`${prefix}-frame-0002.png`];
const subtleTwoFrame = (prefix) => [`${prefix}-frame-0002.png`, `${prefix}-frame-0016.png`];

const stableIdleRange = subtleTwoFrame('idle');
const stableThinkingRange = singleFrontFrame('idle');
const stableSleepRange = singleFrontFrame('idle');
const stableActiveRange = singleFrontFrame('idle');
const stableTalkRange = singleFrontFrame('idle');

export const chimubotConfig = {
	sprite: {
		fallbackSrc: '/images/chimubot/frames/idle/idle-frame-0002.png',
		width: 256,
		height: 256,
		states: {
			idle: {
				folder: 'idle',
				files: stableIdleRange,
				fps: 2,
			},
			hover: {
				folder: 'idle',
				files: stableIdleRange,
				fps: 1,
			},
			walking: {
				folder: 'idle',
				files: stableActiveRange,
				fps: 1,
			},
			thinking: {
				folder: 'idle',
				files: stableThinkingRange,
				fps: 1,
			},
			sleeping: {
				folder: 'idle',
				files: stableSleepRange,
				fps: 1,
			},
			perched: {
				folder: 'idle',
				files: stableIdleRange,
				fps: 1,
			},
			active: {
				folder: 'idle',
				files: stableTalkRange,
				fps: 1,
			},
			talk: {
				folder: 'idle',
				files: stableTalkRange,
				fps: 1,
			},
		},
	},
	anchors: {
		hero: { bottom: 20, right: 20 },
		projects: { bottom: 72, right: 28 },
		about: { bottom: 104, right: 24 },
		contact: { bottom: 142, right: 22 },
	},
	popup: {
		autoHideMs: 2600,
		messages: {
			es: {
				idle: 'Chimubot',
				hover: '¿En qué puedo ayudarte hoy?',
				walking: 'Explorando el portfolio...',
				thinking: 'Analizando información...',
				sleeping: 'Modo ahorro de energía activo 🔋',
			},
			en: {
				idle: 'Chimubot',
				hover: 'How can I help you today?',
				walking: 'Exploring the portfolio...',
				thinking: 'Analyzing information...',
				sleeping: 'Power saving mode active 🔋',
			},
		},
	},
	sleep: {
		inactiveMs: 14000,
	},
};

export const VISUAL_VIEWPORTS = Object.freeze({
	desktop: Object.freeze({ width: 1366, height: 768 }),
	mobile: Object.freeze({ width: 390, height: 844 }),
});

const c = (id, path, viewport, state, screenshot, options = {}) => Object.freeze({
	id,
	path,
	viewport,
	state,
	screenshot,
	capture: 'viewport',
	...options,
});

export const VISUAL_BASELINE_CASES = Object.freeze([
	c('vis-01', '/', 'desktop', 'home-es', '01-route-home-desktop-es.png', { capture: 'fullPage' }),
	c('vis-02', '/', 'mobile', 'home-es', '02-route-home-mobile-es.png', { capture: 'fullPage' }),
	c('vis-03', '/proyectos', 'desktop', 'projects-es', '03-route-projects-desktop-es.png', { capture: 'fullPage' }),
	c('vis-04', '/proyectos', 'mobile', 'projects-es', '04-route-projects-mobile-es.png', { capture: 'fullPage' }),
	c('vis-05', '/about', 'desktop', 'profile-es', '05-route-profile-desktop-es.png', { capture: 'fullPage' }),
	c('vis-06', '/about', 'mobile', 'profile-es', '06-route-profile-mobile-es.png', { capture: 'fullPage' }),
	c('vis-07', '/contact', 'desktop', 'contact-initial', '07-route-contact-desktop-initial.png', { capture: 'fullPage' }),
	c('vis-08', '/contact', 'mobile', 'contact-initial', '08-route-contact-mobile-initial.png', { capture: 'fullPage' }),
	c('vis-09', '/demo/sgc', 'desktop', 'sgc-executive', '09-route-sgc-executive-desktop.png', { capture: 'locator', target: '.sgc-platform' }),
	c('vis-10', '/demo/sgc', 'mobile', 'sgc-executive', '10-route-sgc-executive-mobile.png', { capture: 'locator', target: '.sgc-platform' }),
	c('vis-11', '/', 'desktop', 'home-en', '11-route-home-desktop-en.png', { capture: 'fullPage', locale: 'en' }),
	c('vis-12', '/', 'mobile', 'mobile-nav-en', '12-shell-mobile-nav-open-en.png', { locale: 'en', action: 'openMobileMenu' }),
	c('vis-13', '/proyectos', 'desktop', 'nutrisco-modal', '13-project-nutrisco-modal-desktop.png', { action: 'openProject', projectId: 'nutriscoc' }),
	c('vis-14', '/proyectos', 'mobile', 'sgc-modal', '14-project-sgc-modal-mobile.png', { action: 'openProject', projectId: 'voyscout' }),
	c('vis-15', '/contact', 'desktop', 'contact-complete', '15-contact-complete-form-desktop.png', { action: 'completeContactForm', capture: 'locator', target: 'main form' }),
	c('vis-16', '/contact', 'mobile', 'contact-error', '16-contact-error-toast-mobile.png', { action: 'submitContactError' }),
	c('vis-17', '/', 'desktop', 'chimubot-open', '17-overlay-chatbot-open-desktop.png', { action: 'openChimubot' }),
	c('vis-18', '/contact', 'mobile', 'chimubot-open', '18-overlay-chatbot-open-mobile.png', { action: 'openChimubot' }),
	c('vis-19', '/', 'mobile', 'system-log', '19-overlay-system-log-mobile.png', { action: 'openSystemLog', mask: ['system-log-metadata'] }),
	c('vis-20', '/', 'mobile', 'slide-indicator', '20-onboarding-slide-indicator-mobile.png', { slideIndicatorSeen: false }),
	c('vis-21', '/demo/sgc', 'desktop', 'sgc-payments', '21-route-sgc-payments-expanded-desktop.png', { action: 'openSgcPayments', capture: 'locator', target: '.sgc-platform' }),
	c('vis-22', '/about', 'mobile', 'footer-commandbar-hidden', '22-shell-footer-commandbar-hidden-mobile.png', { action: 'scrollFooter' }),
]);

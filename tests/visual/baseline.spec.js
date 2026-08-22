import { expect, test } from '@playwright/test';

import { VISUAL_BASELINE_CASES, VISUAL_VIEWPORTS } from './manifest.js';

const FIXED_TIME = new Date('2026-08-13T12:00:00-04:00').getTime();
const VISUAL_OUTPUT_DIR = 'test-results/visual/current';

const stablePage = async (page, baselineCase) => {
	await page.addInitScript(({ locale, slideIndicatorSeen, fixedTime }) => {
		localStorage.setItem('colivoro-locale', locale);
		if (slideIndicatorSeen === false) localStorage.removeItem('coldev_hasSeenSlideIndicator');
		else localStorage.setItem('coldev_hasSeenSlideIndicator', 'true');
		const NativeDate = Date;
		class FixedDate extends NativeDate {
			constructor(...args) { super(...(args.length ? args : [fixedTime])); }
			static now() { return fixedTime; }
		}
		Object.setPrototypeOf(FixedDate, NativeDate);
		window.Date = FixedDate;
	}, {
		locale: baselineCase.locale || 'es',
		slideIndicatorSeen: baselineCase.slideIndicatorSeen,
		fixedTime: FIXED_TIME,
	});
	await page.route('https://fonts.googleapis.com/**', (route) => route.abort());
	await page.route('https://fonts.gstatic.com/**', (route) => route.abort());
	await page.emulateMedia({ reducedMotion: 'reduce', colorScheme: 'dark' });
};

const waitForImages = async (page) => {
	await page.waitForFunction(() => [...document.images].every((image) => image.complete && image.naturalWidth > 0));
	await page.evaluate(() => document.fonts?.ready);
};

const sweepPage = async (page) => {
	await page.evaluate(async () => {
		for (let y = 0; y < document.documentElement.scrollHeight; y += Math.max(300, window.innerHeight * 0.75)) {
			window.scrollTo(0, y);
			await new Promise((resolve) => setTimeout(resolve, 60));
		}
		window.scrollTo(0, 0);
	});
};

const fillContact = async (page) => {
	await page.getByLabel('Nombre').fill('Cliente Baseline');
	await page.getByLabel('Email').fill('baseline@example.com');
	await page.getByLabel('Asunto').fill('Sistema digital');
	await page.getByLabel('Mensaje').fill('Necesito diseñar un sistema con software e IA.');
};

const runAction = async (page, baselineCase) => {
	switch (baselineCase.action) {
		case 'openMobileMenu':
			await page.getByRole('button', { name: 'Open menu' }).click();
			await expect(page.locator('#mobile-nav-panel')).toBeVisible();
			break;
		case 'openProject':
			await page.locator(`#project-${baselineCase.projectId}`).click();
			await expect(page.getByRole('dialog')).toBeVisible();
			break;
		case 'completeContactForm':
			await fillContact(page);
			break;
		case 'submitContactError':
			await page.route('https://formspree.io/**', (route) => route.fulfill({ status: 500, contentType: 'application/json', body: '{}' }));
			await fillContact(page);
			await page.getByRole('button', { name: /Enviar solicitud/i }).click();
			await expect(page.getByText('No se pudo enviar', { exact: true })).toBeVisible();
			break;
		case 'openChimubot':
			await page.getByRole('button', { name: 'Open assistant' }).click();
			await expect(page.getByRole('dialog')).toBeVisible();
			break;
		case 'openSystemLog':
			await page.getByRole('button', { name: 'Log', exact: true }).click();
			await expect(page.getByRole('dialog')).toBeVisible();
			break;
		case 'openSgcPayments':
			await page.locator('[title="Expandir menu"]').click();
			await page.getByRole('button', { name: /Gestion de Pagos/ }).click();
			await expect(page.getByText('Ingresos Mes')).toBeVisible();
			break;
		case 'scrollFooter':
			await page.locator('footer').scrollIntoViewIfNeeded();
			await expect(page.getByRole('button', { name: 'Log', exact: true })).toBeHidden();
			break;
		default:
			break;
	}
};

for (const baselineCase of VISUAL_BASELINE_CASES) {
	test(`${baselineCase.id} ${baselineCase.state}`, async ({ page }) => {
		await page.setViewportSize(VISUAL_VIEWPORTS[baselineCase.viewport]);
		await stablePage(page, baselineCase);
		await page.goto(baselineCase.path, { waitUntil: 'networkidle' });
		await waitForImages(page);

		if (baselineCase.path === '/demo/sgc') await expect(page.locator('.sgc-platform')).toBeVisible();
		else await expect(page.locator('[data-route-tone]')).toBeVisible();
		if (baselineCase.capture === 'fullPage') await sweepPage(page);
		await runAction(page, baselineCase);
		if (baselineCase.slideIndicatorSeen === false) await expect(page.getByText('Desliza')).toBeVisible({ timeout: 5_000 });

		await page.addStyleTag({ content: '* { animation: none !important; transition: none !important; caret-color: transparent !important; }' });
		await page.waitForTimeout(100);

		const masks = baselineCase.mask?.includes('system-log-metadata')
			? [page.getByText(/Build date:/), page.getByText(/Commit:/)]
			: [];
		const options = { animations: 'disabled', caret: 'hide', mask: masks };
		if (baselineCase.capture === 'fullPage') await page.screenshot({ ...options, fullPage: true, path: `${VISUAL_OUTPUT_DIR}/${baselineCase.screenshot}` });
		else if (baselineCase.capture === 'locator') await page.locator(baselineCase.target).screenshot({ ...options, path: `${VISUAL_OUTPUT_DIR}/${baselineCase.screenshot}` });
		else await page.screenshot({ ...options, path: `${VISUAL_OUTPUT_DIR}/${baselineCase.screenshot}` });
	});
}

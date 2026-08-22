import { describe, expect, it } from 'vitest';

import { buildWhatsAppUrl } from '@/lib/whatsapp';

describe('buildWhatsAppUrl', () => {
	it('construye una URL wa.me fija con número validado y mensaje sanitizado', () => {
		expect(buildWhatsAppUrl({ number: '+1 (202) 555-0100', message: '  Idea & POS?  ' })).toBe(
			'https://wa.me/12025550100?text=Idea%20%26%20POS%3F',
		);
		expect(buildWhatsAppUrl({ number: '+56 9 1234 5678', message: 'Hola\n\tColDev' })).toBe(
			'https://wa.me/56912345678?text=Hola%20ColDev',
		);
	});

	it.each([
		{},
		{ number: '+1 202 555 0100', message: '' },
		{ number: 'call:+1 202 555 0100', message: 'Hola' },
		{ number: '012345678', message: 'Hola' },
		{ number: '1234567', message: 'Hola' },
		{ number: '1234567890123456', message: 'Hola' },
	])('falla cerrado ante configuración ausente o inválida: %o', (input) => {
		expect(buildWhatsAppUrl(input)).toBeNull();
	});
});

const WHATSAPP_NUMBER_CHARACTERS = /^\+?[0-9 ().-]+$/;
const WHATSAPP_E164_DIGITS = /^[1-9]\d{7,14}$/;
const CONTROL_CHARACTERS = /[\u0000-\u001f\u007f]/g;

export const buildWhatsAppUrl = ({ number, message } = {}) => {
	if (typeof number !== 'string' || typeof message !== 'string') return null;

	const rawNumber = number.trim();
	if (!WHATSAPP_NUMBER_CHARACTERS.test(rawNumber)) return null;

	const digits = rawNumber.replace(/\D/g, '');
	if (!WHATSAPP_E164_DIGITS.test(digits)) return null;

	const sanitizedMessage = message
		.replace(CONTROL_CHARACTERS, ' ')
		.replace(/\s+/g, ' ')
		.trim();
	if (!sanitizedMessage) return null;

	return `https://wa.me/${digits}?text=${encodeURIComponent(sanitizedMessage)}`;
};

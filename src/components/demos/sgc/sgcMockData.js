const NOW = new Date();

const monthLabel = (date) =>
	date.toLocaleString('es-CL', {
		month: 'short',
	});

const buildRelativeDate = (monthsAgo, day = 10, hour = 9) =>
	new Date(NOW.getFullYear(), NOW.getMonth() - monthsAgo, day, hour, 12, 0, 0);

const pad = (value) => String(value).padStart(2, '0');

const formatDayMonth = (date) => `${pad(date.getDate())}/${pad(date.getMonth() + 1)}`;

const courses = [
	{ cur_id: 1, cur_codigo: 'IB-101', cur_descripcion: 'Insignia basica' },
	{ cur_id: 2, cur_codigo: 'IA-201', cur_descripcion: 'Insignia avanzada' },
	{ cur_id: 3, cur_codigo: 'DIR-110', cur_descripcion: 'Dirigentes nivel 1' },
	{ cur_id: 4, cur_codigo: 'DIR-210', cur_descripcion: 'Dirigentes nivel 2' },
	{ cur_id: 5, cur_codigo: 'EQU-130', cur_descripcion: 'Equipos territoriales' },
	{ cur_id: 6, cur_codigo: 'SEG-120', cur_descripcion: 'Seguridad en campamento' },
];

const sections = [
	{ cus_id: 11, cur_id: 1 },
	{ cus_id: 12, cur_id: 2 },
	{ cus_id: 13, cur_id: 3 },
	{ cus_id: 14, cur_id: 4 },
	{ cus_id: 15, cur_id: 5 },
	{ cus_id: 16, cur_id: 6 },
];

const diets = [
	{ ali_id: 1, ali_nombre: 'Normal' },
	{ ali_id: 2, ali_nombre: 'Vegetariana' },
	{ ali_id: 3, ali_nombre: 'Sin gluten' },
	{ ali_id: 4, ali_nombre: 'Hipocalorica' },
];

const comunas = [
	{ com_id: 1, com_descripcion: 'Santiago' },
	{ com_id: 2, com_descripcion: 'Providencia' },
	{ com_id: 3, com_descripcion: 'Maipu' },
	{ com_id: 4, com_descripcion: 'La Florida' },
	{ com_id: 5, com_descripcion: 'Puente Alto' },
	{ com_id: 6, com_descripcion: 'Las Condes' },
	{ com_id: 7, com_descripcion: 'San Bernardo' },
	{ com_id: 8, com_descripcion: 'Quilicura' },
];

const providers = [
	{ prv_id: 1, prv_vigente: true },
	{ prv_id: 2, prv_vigente: true },
	{ prv_id: 3, prv_vigente: true },
	{ prv_id: 4, prv_vigente: true },
	{ prv_id: 5, prv_vigente: false },
	{ prv_id: 6, prv_vigente: true },
	{ prv_id: 7, prv_vigente: true },
	{ prv_id: 8, prv_vigente: false },
	{ prv_id: 9, prv_vigente: true },
	{ prv_id: 10, prv_vigente: true },
];

const firstNames = [
	'Camila',
	'Mateo',
	'Sofia',
	'Lucas',
	'Emilia',
	'Tomas',
	'Josefa',
	'Vicente',
	'Catalina',
	'Benjamin',
	'Daniela',
	'Ignacio',
];

const lastNames = [
	'Rojas',
	'Martinez',
	'Gonzalez',
	'Perez',
	'Vargas',
	'Araya',
	'Soto',
	'Reyes',
	'Contreras',
	'Nuñez',
	'Vega',
	'Sepulveda',
];

const people = Array.from({ length: 72 }, (_, index) => {
	const createdDate = buildRelativeDate(index % 12, (index % 26) + 1, 8 + (index % 8));
	const age = 19 + (index % 43);
	const birthDate = new Date(NOW.getFullYear() - age, index % 12, (index % 27) + 1);

	return {
		per_id: index + 1,
		per_nombres: firstNames[index % firstNames.length],
		per_apelpat: lastNames[(index * 3) % lastNames.length],
		com_id: comunas[index % comunas.length].com_id,
		per_fecha_hora: createdDate.toISOString(),
		per_fecha_nac: birthDate.toISOString().slice(0, 10),
	};
});

const registrations = Array.from({ length: 132 }, (_, index) => ({
	pec_id: index + 1,
	per_id: people[index % people.length].per_id,
	cus_id: sections[index % sections.length].cus_id,
	ali_id: diets[index % diets.length].ali_id,
	pec_acreditado: index % 5 !== 0,
}));

const payments = Array.from({ length: 180 }, (_, index) => {
	const course = courses[index % courses.length];
	const monthsAgo = index % 6;
	const paymentDate = buildRelativeDate(monthsAgo, (index % 26) + 1, 9 + (index % 7));
	const isIncome = index % 6 !== 0;
	const base = 82000 + (index % 12) * 9100;

	return {
		pap_id: index + 1,
		cur_id: course.cur_id,
		pap_tipo: isIncome ? 1 : 2,
		pap_valor: String(isIncome ? base + 46000 : Math.round(base * 0.58)),
		pap_fecha_hora: paymentDate.toISOString(),
	};
});

const lastSixMonths = Array.from({ length: 6 }, (_, index) => {
	const date = buildRelativeDate(5 - index, 1, 9);
	return {
		name: monthLabel(date),
		ingresos: 2200000 + index * 190000 + (index % 2) * 85000,
		egresos: 930000 + index * 98000 + (index % 3) * 40000,
	};
});

const lastThirtyDays = Array.from({ length: 30 }, (_, index) => {
	const date = new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate() - (29 - index));
	return {
		date: formatDayMonth(date),
		ingresos: 320000 + (index % 9) * 26000 + index * 4200,
	};
});

const recentPayments = [
	{ id: 1, tipo: 'Ingreso', persona: 'Camila Rojas', curso: 'IB-101', monto: 149000, fecha: 'Hoy 10:18' },
	{ id: 2, tipo: 'Ingreso', persona: 'Mateo Perez', curso: 'DIR-110', monto: 189000, fecha: 'Hoy 09:42' },
	{ id: 3, tipo: 'Egreso', persona: 'Proveedor campamento', curso: 'General', monto: 78000, fecha: 'Ayer 18:11' },
	{ id: 4, tipo: 'Ingreso', persona: 'Sofia Araya', curso: 'IA-201', monto: 176000, fecha: 'Ayer 15:20' },
	{ id: 5, tipo: 'Ingreso', persona: 'Lucas Soto', curso: 'DIR-210', monto: 194000, fecha: 'Ayer 11:05' },
	{ id: 6, tipo: 'Egreso', persona: 'Proveedor transporte', curso: 'General', monto: 64000, fecha: 'Lun 17:46' },
	{ id: 7, tipo: 'Ingreso', persona: 'Josefa Vega', curso: 'SEG-120', monto: 168000, fecha: 'Lun 09:28' },
	{ id: 8, tipo: 'Ingreso', persona: 'Vicente Reyes', curso: 'EQU-130', monto: 158000, fecha: 'Dom 20:13' },
];

export const sgcExecutiveMock = {
	courses,
	sections,
	registrations,
	people,
	diets,
	payments,
	providers,
	comunas,
};

export const sgcPaymentsMock = {
	total_ingresos: 19450000,
	pagos_pendientes: 39,
	cursos_pagados: 12,
	recent_payments: recentPayments,
	balance_stats: lastSixMonths,
	daily_stats: lastThirtyDays,
	curso_stats: [
		{ name: 'IB-101', vigentes: 68, pendientes: 11 },
		{ name: 'IA-201', vigentes: 53, pendientes: 8 },
		{ name: 'DIR-110', vigentes: 61, pendientes: 10 },
		{ name: 'DIR-210', vigentes: 47, pendientes: 7 },
		{ name: 'EQU-130', vigentes: 39, pendientes: 6 },
	],
	inscripcion_stats: [
		{ name: 'Acreditados', value: 266, color: '#10B981' },
		{ name: 'Pendientes', value: 52, color: '#F59E0B' },
		{ name: 'Revision', value: 24, color: '#3B82F6' },
	],
};

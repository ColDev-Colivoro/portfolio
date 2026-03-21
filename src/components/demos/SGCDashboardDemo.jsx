import { useMemo, useState } from 'react';

const COURSE_FILTERS = [
	{ id: 'all', es: 'Todos los cursos', en: 'All courses' },
	{ id: 'insignia', es: 'Insignia basica', en: 'Basic insignia' },
	{ id: 'dirigentes', es: 'Formacion dirigentes', en: 'Leader training' },
];

const SGC_DEMO_DATA = {
	all: {
		executive: {
			kpis: {
				activeCourses: 12,
				enrolledPeople: 342,
				accreditationRate: 78,
				pendingReview: 46,
				monthlyIncome: 19450000,
			},
			balance: [
				{ label: 'Ene', income: 2800000, expense: 1180000 },
				{ label: 'Feb', income: 3040000, expense: 1260000 },
				{ label: 'Mar', income: 3180000, expense: 1380000 },
				{ label: 'Abr', income: 3320000, expense: 1460000 },
				{ label: 'May', income: 3470000, expense: 1520000 },
				{ label: 'Jun', income: 3640000, expense: 1610000 },
			],
			enrollmentState: [
				{ key: 'accredited', es: 'Acreditados', en: 'Accredited', value: 266, color: '#22c55e' },
				{ key: 'pendingDocs', es: 'Pendiente docs', en: 'Pending docs', value: 52, color: '#f59e0b' },
				{ key: 'review', es: 'En revision', en: 'In review', value: 24, color: '#38bdf8' },
			],
			topComunas: [
				{ name: 'Santiago', value: 84 },
				{ name: 'Puente Alto', value: 62 },
				{ name: 'Maipu', value: 54 },
				{ name: 'La Florida', value: 46 },
				{ name: 'Providencia', value: 39 },
			],
			recentRegistrations: [
				{ id: 1, name: 'Camila R.', course: 'Insignia basica', statusEs: 'Acreditado', statusEn: 'Accredited', tone: 'ok' },
				{ id: 2, name: 'Jorge L.', course: 'Dirigentes 2', statusEs: 'Pendiente', statusEn: 'Pending', tone: 'warn' },
				{ id: 3, name: 'Marta V.', course: 'Insignia avanzada', statusEs: 'En revision', statusEn: 'In review', tone: 'info' },
				{ id: 4, name: 'Felipe N.', course: 'Dirigentes 1', statusEs: 'Acreditado', statusEn: 'Accredited', tone: 'ok' },
			],
		},
		payments: {
			kpis: {
				netIncome: 16300000,
				pendingPayments: 39,
				reconciliationRate: 92,
			},
			dailyIncome: [420000, 465000, 438000, 520000, 548000, 511000, 563000, 592000, 618000, 645000],
			byCourse: [
				{ name: 'Insignia basica', paid: 68, pending: 12 },
				{ name: 'Insignia avanzada', paid: 49, pending: 9 },
				{ name: 'Dirigentes 1', paid: 56, pending: 11 },
				{ name: 'Dirigentes 2', paid: 41, pending: 7 },
			],
			methods: [
				{ key: 'transfer', es: 'Transferencia', en: 'Transfer', value: 44, color: '#22c55e' },
				{ key: 'card', es: 'Tarjeta', en: 'Card', value: 36, color: '#38bdf8' },
				{ key: 'cash', es: 'Caja', en: 'Cash', value: 20, color: '#f59e0b' },
			],
		},
	},
	insignia: {
		executive: {
			kpis: {
				activeCourses: 4,
				enrolledPeople: 128,
				accreditationRate: 81,
				pendingReview: 14,
				monthlyIncome: 7160000,
			},
			balance: [
				{ label: 'Ene', income: 920000, expense: 420000 },
				{ label: 'Feb', income: 1080000, expense: 460000 },
				{ label: 'Mar', income: 1160000, expense: 490000 },
				{ label: 'Abr', income: 1210000, expense: 520000 },
				{ label: 'May', income: 1290000, expense: 550000 },
				{ label: 'Jun', income: 1360000, expense: 580000 },
			],
			enrollmentState: [
				{ key: 'accredited', es: 'Acreditados', en: 'Accredited', value: 104, color: '#22c55e' },
				{ key: 'pendingDocs', es: 'Pendiente docs', en: 'Pending docs', value: 15, color: '#f59e0b' },
				{ key: 'review', es: 'En revision', en: 'In review', value: 9, color: '#38bdf8' },
			],
			topComunas: [
				{ name: 'Santiago', value: 26 },
				{ name: 'Puente Alto', value: 21 },
				{ name: 'La Florida', value: 19 },
				{ name: 'Maipu', value: 17 },
				{ name: 'Providencia', value: 13 },
			],
			recentRegistrations: [
				{ id: 1, name: 'Sofia P.', course: 'Insignia basica', statusEs: 'Acreditado', statusEn: 'Accredited', tone: 'ok' },
				{ id: 2, name: 'Daniel M.', course: 'Insignia basica', statusEs: 'Pendiente', statusEn: 'Pending', tone: 'warn' },
				{ id: 3, name: 'Andrea C.', course: 'Insignia avanzada', statusEs: 'Acreditado', statusEn: 'Accredited', tone: 'ok' },
			],
		},
		payments: {
			kpis: {
				netIncome: 5960000,
				pendingPayments: 16,
				reconciliationRate: 94,
			},
			dailyIncome: [156000, 168000, 174000, 188000, 201000, 216000, 224000, 239000, 251000, 262000],
			byCourse: [
				{ name: 'Insignia basica', paid: 52, pending: 9 },
				{ name: 'Insignia avanzada', paid: 43, pending: 7 },
			],
			methods: [
				{ key: 'transfer', es: 'Transferencia', en: 'Transfer', value: 47, color: '#22c55e' },
				{ key: 'card', es: 'Tarjeta', en: 'Card', value: 34, color: '#38bdf8' },
				{ key: 'cash', es: 'Caja', en: 'Cash', value: 19, color: '#f59e0b' },
			],
		},
	},
	dirigentes: {
		executive: {
			kpis: {
				activeCourses: 3,
				enrolledPeople: 94,
				accreditationRate: 73,
				pendingReview: 18,
				monthlyIncome: 5290000,
			},
			balance: [
				{ label: 'Ene', income: 710000, expense: 330000 },
				{ label: 'Feb', income: 780000, expense: 350000 },
				{ label: 'Mar', income: 820000, expense: 370000 },
				{ label: 'Abr', income: 880000, expense: 390000 },
				{ label: 'May', income: 920000, expense: 410000 },
				{ label: 'Jun', income: 960000, expense: 430000 },
			],
			enrollmentState: [
				{ key: 'accredited', es: 'Acreditados', en: 'Accredited', value: 69, color: '#22c55e' },
				{ key: 'pendingDocs', es: 'Pendiente docs', en: 'Pending docs', value: 17, color: '#f59e0b' },
				{ key: 'review', es: 'En revision', en: 'In review', value: 8, color: '#38bdf8' },
			],
			topComunas: [
				{ name: 'Santiago', value: 19 },
				{ name: 'Maipu', value: 16 },
				{ name: 'Puente Alto', value: 15 },
				{ name: 'La Florida', value: 12 },
				{ name: 'San Bernardo', value: 10 },
			],
			recentRegistrations: [
				{ id: 1, name: 'Rodrigo T.', course: 'Dirigentes 1', statusEs: 'Acreditado', statusEn: 'Accredited', tone: 'ok' },
				{ id: 2, name: 'Paula S.', course: 'Dirigentes 2', statusEs: 'Pendiente', statusEn: 'Pending', tone: 'warn' },
				{ id: 3, name: 'Eduardo F.', course: 'Dirigentes 1', statusEs: 'En revision', statusEn: 'In review', tone: 'info' },
			],
		},
		payments: {
			kpis: {
				netIncome: 4380000,
				pendingPayments: 13,
				reconciliationRate: 89,
			},
			dailyIncome: [118000, 126000, 134000, 141000, 153000, 148000, 162000, 171000, 180000, 188000],
			byCourse: [
				{ name: 'Dirigentes 1', paid: 39, pending: 6 },
				{ name: 'Dirigentes 2', paid: 31, pending: 7 },
			],
			methods: [
				{ key: 'transfer', es: 'Transferencia', en: 'Transfer', value: 41, color: '#22c55e' },
				{ key: 'card', es: 'Tarjeta', en: 'Card', value: 33, color: '#38bdf8' },
				{ key: 'cash', es: 'Caja', en: 'Cash', value: 26, color: '#f59e0b' },
			],
		},
	},
};

const getCopy = (lang, es, en) => (lang === 'en' ? en : es);

const formatCurrency = (value, lang) =>
	new Intl.NumberFormat(lang === 'en' ? 'en-US' : 'es-CL', {
		style: 'currency',
		currency: 'CLP',
		maximumFractionDigits: 0,
	}).format(value);

const toPoints = (values) => {
	if (!values?.length) return '';
	const max = Math.max(...values);
	const min = Math.min(...values);
	const range = max - min || 1;
	return values
		.map((value, index) => {
			const x = (index / Math.max(values.length - 1, 1)) * 100;
			const y = 100 - ((value - min) / range) * 100;
			return `${x},${y}`;
		})
		.join(' ');
};

const SGCDashboardDemo = ({ lang = 'es' }) => {
	const [activeView, setActiveView] = useState('executive');
	const [courseFilter, setCourseFilter] = useState('all');

	const activeData = SGC_DEMO_DATA[courseFilter] ?? SGC_DEMO_DATA.all;
	const executive = activeData.executive;
	const payments = activeData.payments;

	const maxBalanceValue = useMemo(
		() => Math.max(...executive.balance.map((month) => Math.max(month.income, month.expense)), 1),
		[executive.balance],
	);

	const enrollmentTotal = useMemo(
		() => executive.enrollmentState.reduce((total, segment) => total + segment.value, 0),
		[executive.enrollmentState],
	);

	const enrollmentGradient = useMemo(() => {
		if (!enrollmentTotal) return '#111827';
		let offset = 0;
		const sectors = executive.enrollmentState
			.map((segment) => {
				const start = offset;
				offset += (segment.value / enrollmentTotal) * 360;
				return `${segment.color} ${start}deg ${offset}deg`;
			})
			.join(', ');
		return `conic-gradient(${sectors})`;
	}, [enrollmentTotal, executive.enrollmentState]);

	const maxComunaValue = useMemo(
		() => Math.max(...executive.topComunas.map((item) => item.value), 1),
		[executive.topComunas],
	);

	const maxCoursePayment = useMemo(
		() =>
			Math.max(
				...payments.byCourse.map((course) => course.paid + course.pending),
				1,
			),
		[payments.byCourse],
	);

	const sparklinePoints = useMemo(() => toPoints(payments.dailyIncome), [payments.dailyIncome]);

	return (
		<div className="rounded-[1.65rem] border border-white/10 bg-background/75 p-4 md:p-6">
			<div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
				<div>
					<p className="text-[11px] uppercase tracking-[0.24em] text-accent">
						{getCopy(lang, 'Demo embebida', 'Embedded demo')}
					</p>
					<h3 className="mt-2 text-xl font-semibold text-foreground md:text-2xl">
						{getCopy(lang, 'Dashboard SGC reconstruido', 'Rebuilt SGC dashboard')}
					</h3>
					<p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
						{getCopy(
							lang,
							'Vista interactiva con datos mock para mostrar KPIs y graficos sin capturas borrosas.',
							'Interactive view with mock data to showcase KPIs and charts without blurry screenshots.',
						)}
					</p>
				</div>

				<div className="flex flex-wrap items-center gap-2">
					<button
						type="button"
						onClick={() => setActiveView('executive')}
						className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
							activeView === 'executive'
								? 'border-accent/50 bg-accent/15 text-accent'
								: 'border-white/10 bg-transparent text-muted-foreground hover:text-foreground'
						}`}
					>
						{getCopy(lang, 'Vista ejecutiva', 'Executive view')}
					</button>
					<button
						type="button"
						onClick={() => setActiveView('payments')}
						className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
							activeView === 'payments'
								? 'border-accent/50 bg-accent/15 text-accent'
								: 'border-white/10 bg-transparent text-muted-foreground hover:text-foreground'
						}`}
					>
						{getCopy(lang, 'Vista pagos', 'Payments view')}
					</button>
					<select
						value={courseFilter}
						onChange={(event) => setCourseFilter(event.target.value)}
						className="rounded-full border border-white/10 bg-background px-4 py-2 text-xs text-foreground"
					>
						{COURSE_FILTERS.map((course) => (
							<option key={course.id} value={course.id}>
								{getCopy(lang, course.es, course.en)}
							</option>
						))}
					</select>
				</div>
			</div>

			{activeView === 'executive' ? (
				<div className="mt-6 space-y-5">
					<div className="grid gap-3 md:grid-cols-5">
						<div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-3">
							<p className="text-[11px] uppercase tracking-[0.2em] text-cyan-200/75">{getCopy(lang, 'Cursos activos', 'Active courses')}</p>
							<p className="mt-2 text-xl font-semibold text-cyan-100">{executive.kpis.activeCourses}</p>
						</div>
						<div className="rounded-2xl border border-blue-500/20 bg-blue-500/10 p-3">
							<p className="text-[11px] uppercase tracking-[0.2em] text-blue-200/75">{getCopy(lang, 'Inscritos', 'Enrolled')}</p>
							<p className="mt-2 text-xl font-semibold text-blue-100">{executive.kpis.enrolledPeople}</p>
						</div>
						<div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-3">
							<p className="text-[11px] uppercase tracking-[0.2em] text-emerald-200/75">{getCopy(lang, 'Acreditacion', 'Accreditation')}</p>
							<p className="mt-2 text-xl font-semibold text-emerald-100">{executive.kpis.accreditationRate}%</p>
						</div>
						<div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-3">
							<p className="text-[11px] uppercase tracking-[0.2em] text-amber-200/75">{getCopy(lang, 'Pendiente revision', 'Pending review')}</p>
							<p className="mt-2 text-xl font-semibold text-amber-100">{executive.kpis.pendingReview}</p>
						</div>
						<div className="rounded-2xl border border-accent/30 bg-accent/10 p-3">
							<p className="text-[11px] uppercase tracking-[0.2em] text-accent/85">{getCopy(lang, 'Ingresos mes', 'Monthly income')}</p>
							<p className="mt-2 text-xl font-semibold text-foreground">{formatCurrency(executive.kpis.monthlyIncome, lang)}</p>
						</div>
					</div>

					<div className="grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
						<div className="rounded-2xl border border-white/10 bg-card/70 p-4">
							<p className="text-xs uppercase tracking-[0.24em] text-accent">{getCopy(lang, 'Balance mensual', 'Monthly balance')}</p>
							<p className="mt-2 text-sm text-muted-foreground">{getCopy(lang, 'Ingresos vs egresos por mes.', 'Income vs expenses by month.')}</p>
							<div className="mt-4 flex h-48 items-end gap-3">
								{executive.balance.map((month) => (
									<div key={month.label} className="flex flex-1 flex-col items-center gap-2">
										<div className="flex h-full w-full items-end justify-center gap-1">
											<div
												className="w-1/2 rounded-t bg-emerald-400/90"
												style={{ height: `${Math.max((month.income / maxBalanceValue) * 100, 4)}%` }}
											/>
											<div
												className="w-1/2 rounded-t bg-rose-400/85"
												style={{ height: `${Math.max((month.expense / maxBalanceValue) * 100, 4)}%` }}
											/>
										</div>
										<span className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{month.label}</span>
									</div>
								))}
							</div>
							<div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
								<span className="inline-flex items-center gap-2">
									<span className="h-2 w-2 rounded-full bg-emerald-400" />
									{getCopy(lang, 'Ingresos', 'Income')}
								</span>
								<span className="inline-flex items-center gap-2">
									<span className="h-2 w-2 rounded-full bg-rose-400" />
									{getCopy(lang, 'Egresos', 'Expenses')}
								</span>
							</div>
						</div>

						<div className="rounded-2xl border border-white/10 bg-card/70 p-4">
							<p className="text-xs uppercase tracking-[0.24em] text-accent">{getCopy(lang, 'Estado inscripciones', 'Enrollment status')}</p>
							<div className="mt-4 flex flex-col items-center gap-4">
								<div className="relative h-40 w-40 rounded-full" style={{ background: enrollmentGradient }}>
									<div className="absolute inset-[18%] flex flex-col items-center justify-center rounded-full bg-background/95">
										<span className="text-xl font-semibold text-foreground">{enrollmentTotal}</span>
										<span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
											{getCopy(lang, 'Personas', 'People')}
										</span>
									</div>
								</div>
								<ul className="w-full space-y-2">
									{executive.enrollmentState.map((segment) => (
										<li key={segment.key} className="flex items-center justify-between text-sm text-muted-foreground">
											<span className="inline-flex items-center gap-2">
												<span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: segment.color }} />
												{getCopy(lang, segment.es, segment.en)}
											</span>
											<span className="font-medium text-foreground">{segment.value}</span>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>

					<div className="grid gap-4 xl:grid-cols-[0.85fr_1.15fr]">
						<div className="rounded-2xl border border-white/10 bg-card/70 p-4">
							<p className="text-xs uppercase tracking-[0.24em] text-accent">{getCopy(lang, 'Top comunas', 'Top districts')}</p>
							<div className="mt-4 space-y-3">
								{executive.topComunas.map((comuna) => (
									<div key={comuna.name}>
										<div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
											<span>{comuna.name}</span>
											<span>{comuna.value}</span>
										</div>
										<div className="h-2 rounded-full bg-white/10">
											<div
												className="h-full rounded-full bg-sky-400"
												style={{ width: `${Math.max((comuna.value / maxComunaValue) * 100, 6)}%` }}
											/>
										</div>
									</div>
								))}
							</div>
						</div>

						<div className="rounded-2xl border border-white/10 bg-card/70 p-4">
							<p className="text-xs uppercase tracking-[0.24em] text-accent">{getCopy(lang, 'Ultimas inscripciones', 'Latest enrollments')}</p>
							<div className="mt-4 overflow-x-auto">
								<table className="w-full min-w-[28rem] text-left text-sm text-muted-foreground">
									<thead className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground/80">
										<tr>
											<th className="pb-3 pr-3">{getCopy(lang, 'Persona', 'Person')}</th>
											<th className="pb-3 pr-3">{getCopy(lang, 'Curso', 'Course')}</th>
											<th className="pb-3">{getCopy(lang, 'Estado', 'Status')}</th>
										</tr>
									</thead>
									<tbody>
										{executive.recentRegistrations.map((registration) => {
											const toneClass =
												registration.tone === 'ok'
													? 'border-emerald-500/25 bg-emerald-500/10 text-emerald-300'
													: registration.tone === 'warn'
														? 'border-amber-500/25 bg-amber-500/10 text-amber-300'
														: 'border-sky-500/25 bg-sky-500/10 text-sky-300';
											return (
												<tr key={registration.id} className="border-t border-white/5">
													<td className="py-3 pr-3 font-medium text-foreground">{registration.name}</td>
													<td className="py-3 pr-3">{registration.course}</td>
													<td className="py-3">
														<span className={`rounded-full border px-2 py-1 text-[11px] ${toneClass}`}>
															{getCopy(lang, registration.statusEs, registration.statusEn)}
														</span>
													</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className="mt-6 space-y-5">
					<div className="grid gap-3 md:grid-cols-3">
						<div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">
							<p className="text-[11px] uppercase tracking-[0.2em] text-emerald-200/80">{getCopy(lang, 'Ingreso neto', 'Net income')}</p>
							<p className="mt-2 text-2xl font-semibold text-emerald-100">{formatCurrency(payments.kpis.netIncome, lang)}</p>
						</div>
						<div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4">
							<p className="text-[11px] uppercase tracking-[0.2em] text-amber-200/80">{getCopy(lang, 'Pagos pendientes', 'Pending payments')}</p>
							<p className="mt-2 text-2xl font-semibold text-amber-100">{payments.kpis.pendingPayments}</p>
						</div>
						<div className="rounded-2xl border border-sky-500/20 bg-sky-500/10 p-4">
							<p className="text-[11px] uppercase tracking-[0.2em] text-sky-200/80">{getCopy(lang, 'Conciliacion', 'Reconciliation')}</p>
							<p className="mt-2 text-2xl font-semibold text-sky-100">{payments.kpis.reconciliationRate}%</p>
						</div>
					</div>

					<div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
						<div className="rounded-2xl border border-white/10 bg-card/70 p-4">
							<p className="text-xs uppercase tracking-[0.24em] text-accent">{getCopy(lang, 'Tendencia diaria', 'Daily trend')}</p>
							<p className="mt-2 text-sm text-muted-foreground">
								{getCopy(lang, 'Ultimos 10 dias de flujo de pagos.', 'Last 10 days of payment flow.')}
							</p>
							<div className="mt-4 h-44 rounded-xl border border-white/10 bg-background/60 p-3">
								<svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
									<polyline fill="none" stroke="#22d3ee" strokeWidth="2.8" strokeLinecap="round" points={sparklinePoints} />
								</svg>
							</div>
						</div>

						<div className="rounded-2xl border border-white/10 bg-card/70 p-4">
							<p className="text-xs uppercase tracking-[0.24em] text-accent">{getCopy(lang, 'Pago por curso', 'Payments by course')}</p>
							<div className="mt-4 space-y-3">
								{payments.byCourse.map((course) => {
									const total = course.paid + course.pending;
									return (
										<div key={course.name}>
											<div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
												<span>{course.name}</span>
												<span>
													{course.paid}/{total}
												</span>
											</div>
											<div className="flex h-2.5 overflow-hidden rounded-full bg-white/10">
												<div
													className="bg-emerald-400"
													style={{ width: `${((course.paid / maxCoursePayment) * 100).toFixed(1)}%` }}
												/>
												<div
													className="bg-amber-400"
													style={{ width: `${((course.pending / maxCoursePayment) * 100).toFixed(1)}%` }}
												/>
											</div>
										</div>
									);
								})}
							</div>
							<div className="mt-3 flex gap-4 text-xs text-muted-foreground">
								<span className="inline-flex items-center gap-2">
									<span className="h-2 w-2 rounded-full bg-emerald-400" />
									{getCopy(lang, 'Pagado', 'Paid')}
								</span>
								<span className="inline-flex items-center gap-2">
									<span className="h-2 w-2 rounded-full bg-amber-400" />
									{getCopy(lang, 'Pendiente', 'Pending')}
								</span>
							</div>
						</div>
					</div>

					<div className="rounded-2xl border border-white/10 bg-card/70 p-4">
						<p className="text-xs uppercase tracking-[0.24em] text-accent">{getCopy(lang, 'Medios de pago', 'Payment methods')}</p>
						<div className="mt-4 grid gap-3 md:grid-cols-3">
							{payments.methods.map((method) => (
								<div key={method.key} className="rounded-xl border border-white/10 bg-background/60 px-4 py-3">
									<div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{getCopy(lang, method.es, method.en)}</div>
									<div className="mt-1 text-xl font-semibold text-foreground">{method.value}%</div>
									<div className="mt-2 h-1.5 rounded-full bg-white/10">
										<div className="h-full rounded-full" style={{ width: `${method.value}%`, backgroundColor: method.color }} />
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default SGCDashboardDemo;

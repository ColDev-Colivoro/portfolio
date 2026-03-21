import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
	Activity,
	ArrowDownRight,
	ArrowUpRight,
	BarChart3,
	CreditCard,
	DollarSign,
	PieChart as PieChartIcon,
	TrendingUp,
	Wallet,
} from 'lucide-react';
import {
	Area,
	AreaChart,
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import { sgcExecutiveMock } from '@/components/demos/sgc/sgcMockData';

const monthLabel = (date) =>
	date
		.toLocaleString('es-CL', { month: 'short' })
		.replace('.', '')
		.replace(/^./, (letter) => letter.toUpperCase());

const formatCurrency = (amount) =>
	new Intl.NumberFormat('es-CL', {
		style: 'currency',
		currency: 'CLP',
		maximumFractionDigits: 0,
	}).format(amount);

const SGCPaymentsDashboard = ({ selectedCourse = 'all' }) => {
	const stats = useMemo(() => {
		const { courses, sections, registrations, payments, people } = sgcExecutiveMock;
		const selectedCourseId = selectedCourse !== 'all' ? Number.parseInt(selectedCourse, 10) : null;

		const selectedSectionIds = selectedCourseId
			? sections.filter((section) => section.cur_id === selectedCourseId).map((section) => section.cus_id)
			: sections.map((section) => section.cus_id);

		const filteredRegistrations = registrations.filter((registration) =>
			selectedSectionIds.includes(registration.cus_id),
		);

		const filteredPayments = selectedCourseId
			? payments.filter((payment) => payment.cur_id === selectedCourseId)
			: payments;

		const totalIngresos = filteredPayments
			.filter((payment) => payment.pap_tipo === 1)
			.reduce((total, payment) => total + Number.parseFloat(payment.pap_valor), 0);

		const pendingRaw = filteredRegistrations.filter((registration) => !registration.pec_acreditado).length;
		const cursosActivos = selectedCourseId
			? 1
			: new Set(filteredPayments.filter((payment) => payment.pap_tipo === 1).map((payment) => payment.cur_id)).size;

		const courseById = Object.fromEntries(courses.map((course) => [course.cur_id, course]));

		const recentPayments = [...filteredPayments]
			.sort((left, right) => new Date(right.pap_fecha_hora) - new Date(left.pap_fecha_hora))
			.slice(0, 8)
			.map((payment, index) => {
				const person = people[(payment.pap_id + index * 5) % people.length];
				const date = new Date(payment.pap_fecha_hora);
				const hours = String(date.getHours()).padStart(2, '0');
				const minutes = String(date.getMinutes()).padStart(2, '0');
				return {
					id: payment.pap_id,
					tipo: payment.pap_tipo === 1 ? 'Ingreso' : 'Egreso',
					persona: `${person.per_nombres} ${person.per_apelpat}`,
					curso: courseById[payment.cur_id]?.cur_codigo ?? 'General',
					monto: Number.parseFloat(payment.pap_valor),
					fecha: `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')} ${hours}:${minutes}`,
				};
			});

		const currentDate = new Date();
		const balanceStats = Array.from({ length: 6 }, (_, offset) => {
			const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - (5 - offset), 1);
			const month = targetDate.getMonth();
			const year = targetDate.getFullYear();

			const monthPayments = filteredPayments.filter((payment) => {
				const paymentDate = new Date(payment.pap_fecha_hora);
				return paymentDate.getMonth() === month && paymentDate.getFullYear() === year;
			});

			const ingresos = monthPayments
				.filter((payment) => payment.pap_tipo === 1)
				.reduce((total, payment) => total + Number.parseFloat(payment.pap_valor), 0);

			const egresos = monthPayments
				.filter((payment) => payment.pap_tipo === 2)
				.reduce((total, payment) => total + Number.parseFloat(payment.pap_valor), 0);

			return {
				name: monthLabel(targetDate),
				ingresos,
				egresos,
			};
		});

		const dailyStats = Array.from({ length: 30 }, (_, offset) => {
			const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - (29 - offset));
			const day = targetDate.getDate();
			const month = targetDate.getMonth();
			const year = targetDate.getFullYear();

			const ingresos = filteredPayments
				.filter((payment) => {
					const paymentDate = new Date(payment.pap_fecha_hora);
					return (
						payment.pap_tipo === 1 &&
						paymentDate.getDate() === day &&
						paymentDate.getMonth() === month &&
						paymentDate.getFullYear() === year
					);
				})
				.reduce((total, payment) => total + Number.parseFloat(payment.pap_valor), 0);

			return {
				date: `${String(day).padStart(2, '0')}/${String(month + 1).padStart(2, '0')}`,
				ingresos,
			};
		});

		const courseStats = courses
			.map((course) => {
				if (selectedCourseId && course.cur_id !== selectedCourseId) return null;

				const relatedSectionIds = sections
					.filter((section) => section.cur_id === course.cur_id)
					.map((section) => section.cus_id);

				const paid = filteredPayments.filter((payment) => payment.cur_id === course.cur_id && payment.pap_tipo === 1).length;
				const pending = registrations.filter(
					(registration) =>
						relatedSectionIds.includes(registration.cus_id) &&
						(selectedCourseId ? true : selectedSectionIds.includes(registration.cus_id)) &&
						!registration.pec_acreditado,
				).length;

				if (!paid && !pending) return null;

				return {
					name: course.cur_codigo,
					vigentes: paid,
					pendientes: pending,
				};
			})
			.filter(Boolean)
			.sort((left, right) => right.vigentes + right.pendientes - (left.vigentes + left.pendientes))
			.slice(0, 5);

		const accredited = filteredRegistrations.filter((registration) => registration.pec_acreditado).length;
		const nonAccredited = Math.max(filteredRegistrations.length - accredited, 0);
		const review = nonAccredited > 0 ? Math.max(1, Math.round(nonAccredited * 0.35)) : 0;
		const pending = Math.max(nonAccredited - review, 0);

		const inscripcionStats = [
			{ name: 'Acreditados', value: accredited, color: '#10B981' },
			{ name: 'Pendientes', value: pending, color: '#F59E0B' },
			{ name: 'Revision', value: review, color: '#3B82F6' },
		];

		return {
			total_ingresos: totalIngresos,
			pagos_pendientes: pendingRaw,
			cursos_pagados: Math.max(cursosActivos, selectedCourseId ? 1 : 0),
			recent_payments: recentPayments,
			balance_stats: balanceStats,
			daily_stats: dailyStats,
			curso_stats: courseStats,
			inscripcion_stats: inscripcionStats,
		};
	}, [selectedCourse]);

	return (
		<div className="mx-auto flex w-full max-w-[1320px] flex-col gap-5 p-4 xl:flex-row">
			<motion.div
				initial={{ opacity: 0, x: -20 }}
				animate={{ opacity: 1, x: 0 }}
				className="flex h-fit w-full flex-shrink-0 flex-col rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl xl:w-72"
			>
				<div className="border-b border-white/10 bg-white/5 p-4">
					<h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white">
						<CreditCard className="text-purple-400" size={16} />
						Ultimos Movimientos
					</h3>
				</div>
				<div className="p-2">
					<div className="space-y-2">
						{stats.recent_payments.map((payment) => (
							<div
								key={payment.id}
								className="group flex items-center justify-between rounded-xl border border-transparent p-3 transition-all hover:border-white/5 hover:bg-white/5"
							>
								<div className="flex items-center gap-3">
									<div
										className={`rounded-full p-2 ${
											payment.tipo === 'Ingreso' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
										}`}
									>
										{payment.tipo === 'Ingreso' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
									</div>
									<div className="min-w-0">
										<p className="w-32 truncate text-xs font-bold text-white/90">{payment.persona}</p>
										<p className="w-32 truncate text-[10px] text-white/40">{payment.curso}</p>
									</div>
								</div>
								<div className="flex-shrink-0 text-right">
									<p
										className={`text-xs font-bold ${
											payment.tipo === 'Ingreso' ? 'text-emerald-400' : 'text-rose-400'
										}`}
									>
										{formatCurrency(payment.monto)}
									</p>
									<p className="text-[10px] text-white/30">{payment.fecha}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</motion.div>

			<div className="flex flex-1 flex-col gap-5">
				<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1 }}
						className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 backdrop-blur-xl"
					>
						<div className="mb-2 flex items-start justify-between">
							<div>
								<p className="text-xs font-medium uppercase tracking-wider text-emerald-200/60">Ingresos Mes</p>
								<h3 className="mt-1 text-xl font-bold text-emerald-100">{formatCurrency(stats.total_ingresos)}</h3>
							</div>
							<div className="rounded-lg bg-emerald-500/20 p-2">
								<DollarSign className="text-emerald-400" size={20} />
							</div>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
						className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4 backdrop-blur-xl"
					>
						<div className="mb-2 flex items-start justify-between">
							<div>
								<p className="text-xs font-medium uppercase tracking-wider text-amber-200/60">Pendientes</p>
								<h3 className="mt-1 text-xl font-bold text-amber-100">{stats.pagos_pendientes}</h3>
							</div>
							<div className="rounded-lg bg-amber-500/20 p-2">
								<Wallet className="text-amber-400" size={20} />
							</div>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3 }}
						className="rounded-2xl border border-blue-500/20 bg-blue-500/10 p-4 backdrop-blur-xl"
					>
						<div className="mb-2 flex items-start justify-between">
							<div>
								<p className="text-xs font-medium uppercase tracking-wider text-blue-200/60">Cursos Activos</p>
								<h3 className="mt-1 text-xl font-bold text-blue-100">{stats.cursos_pagados}</h3>
							</div>
							<div className="rounded-lg bg-blue-500/20 p-2">
								<BarChart3 className="text-blue-400" size={20} />
							</div>
						</div>
					</motion.div>
				</div>

				<div className="grid flex-1 grid-cols-1 gap-4 lg:grid-cols-2">
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.4 }}
						className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
					>
						<h3 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white">
							<Activity className="text-emerald-400" size={14} />
							Balance Mensual
						</h3>
						<div className="min-h-[145px] min-w-0 flex-1">
							<ResponsiveContainer width="100%" height="100%">
								<AreaChart data={stats.balance_stats} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
									<defs>
										<linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
											<stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
											<stop offset="95%" stopColor="#10B981" stopOpacity={0} />
										</linearGradient>
										<linearGradient id="colorEgresos" x1="0" y1="0" x2="0" y2="1">
											<stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
											<stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
										</linearGradient>
									</defs>
									<CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
									<XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} dy={5} />
									<YAxis stroke="rgba(255,255,255,0.3)" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(value) => `$${Math.round(value / 1000)}k`} />
									<Tooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '12px' }} formatter={(value) => formatCurrency(value)} />
									<Legend iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
									<Area type="monotone" dataKey="ingresos" name="Ingresos" stroke="#10B981" fillOpacity={1} fill="url(#colorIngresos)" strokeWidth={2} />
									<Area type="monotone" dataKey="egresos" name="Egresos" stroke="#EF4444" fillOpacity={1} fill="url(#colorEgresos)" strokeWidth={2} />
								</AreaChart>
							</ResponsiveContainer>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.5 }}
						className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
					>
						<h3 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white">
							<TrendingUp className="text-cyan-400" size={14} />
							Tendencia Diaria (30 Dias)
						</h3>
						<div className="min-h-[145px] min-w-0 flex-1">
							<ResponsiveContainer width="100%" height="100%">
								<AreaChart data={stats.daily_stats} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
									<defs>
										<linearGradient id="colorDailyIngresos" x1="0" y1="0" x2="0" y2="1">
											<stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3} />
											<stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
										</linearGradient>
									</defs>
									<CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
									<XAxis dataKey="date" stroke="rgba(255,255,255,0.3)" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} dy={5} minTickGap={30} />
									<YAxis stroke="rgba(255,255,255,0.3)" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(value) => `$${Math.round(value / 1000)}k`} />
									<Tooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '12px' }} formatter={(value) => formatCurrency(value)} />
									<Legend iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
									<Area type="monotone" dataKey="ingresos" name="Ingresos Diarios" stroke="#06B6D4" fillOpacity={1} fill="url(#colorDailyIngresos)" strokeWidth={2} />
								</AreaChart>
							</ResponsiveContainer>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.6 }}
						className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
					>
						<h3 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white">
							<BarChart3 className="text-blue-400" size={14} />
							Pagos por Curso
						</h3>
						<div className="min-h-[145px] min-w-0 flex-1">
							<ResponsiveContainer width="100%" height="100%">
								<BarChart data={stats.curso_stats} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
									<CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
									<XAxis type="number" hide />
									<YAxis dataKey="name" type="category" width={60} tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }} axisLine={false} tickLine={false} />
									<Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '12px' }} />
									<Legend iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
									<Bar dataKey="vigentes" name="Pagados" stackId="a" fill="#10B981" radius={[0, 0, 0, 0]} barSize={12} />
									<Bar dataKey="pendientes" name="Pendientes" stackId="a" fill="#F59E0B" radius={[0, 4, 4, 0]} barSize={12} />
								</BarChart>
							</ResponsiveContainer>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.7 }}
						className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
					>
						<h3 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white">
							<PieChartIcon className="text-amber-400" size={14} />
							Estado General
						</h3>
						<div className="relative flex min-h-[145px] w-full flex-1 items-center justify-center">
							<ResponsiveContainer width="100%" height="100%">
								<PieChart>
									<Pie
										data={stats.inscripcion_stats}
										cx="50%"
										cy="50%"
										innerRadius={50}
										outerRadius={70}
										paddingAngle={4}
										dataKey="value"
										stroke="none"
									>
										{stats.inscripcion_stats.map((entry) => (
											<Cell key={`inscription-cell-${entry.name}`} fill={entry.color} />
										))}
									</Pie>
									<Tooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '12px' }} />
									<Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: '10px', paddingLeft: '10px' }} />
								</PieChart>
							</ResponsiveContainer>
							<div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center pr-24">
								<span className="text-xl font-bold text-white">
									{stats.inscripcion_stats.reduce((accumulator, current) => accumulator + current.value, 0)}
								</span>
								<span className="text-[9px] uppercase tracking-wider text-white/40">Total</span>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default SGCPaymentsDashboard;

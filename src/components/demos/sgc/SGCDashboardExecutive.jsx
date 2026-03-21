import { useEffect, useMemo, useState } from 'react';
import {
	Activity,
	BookOpen,
	Calendar,
	CheckCircle,
	Clock,
	DollarSign,
	Loader2,
	MapPin,
	TrendingUp,
	UserPlus,
	Users,
	Utensils,
	Briefcase,
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
	PolarAngleAxis,
	PolarGrid,
	PolarRadiusAxis,
	Radar,
	RadarChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import { sgcExecutiveMock } from '@/components/demos/sgc/sgcMockData';

const SGCDashboardExecutive = ({ selectedCourse = 'all' }) => {
	const [courses, setCourses] = useState([]);
	const [sections, setSections] = useState([]);
	const [registrations, setRegistrations] = useState([]);
	const [people, setPeople] = useState([]);
	const [diets, setDiets] = useState([]);
	const [payments, setPayments] = useState([]);
	const [providers, setProviders] = useState([]);
	const [comunas, setComunas] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const loadData = async () => {
			try {
				setLoading(true);
				setError(null);

				// Pausa artificial para liberar el CPU y permitir que la animación de entrada
				// de Framer Motion fluya a 60fps sin interrupciones del renderizado de gráficas.
				await new Promise((resolve) => setTimeout(resolve, 500));

				setCourses(sgcExecutiveMock.courses);
				setSections(sgcExecutiveMock.sections);
				setRegistrations(sgcExecutiveMock.registrations);
				setPeople(sgcExecutiveMock.people);
				setDiets(sgcExecutiveMock.diets);
				setPayments(sgcExecutiveMock.payments);
				setProviders(sgcExecutiveMock.providers);
				setComunas(sgcExecutiveMock.comunas);
			} catch (loadError) {
				setError('No se pudieron cargar los datos del dashboard.');
				console.error('Error loading dashboard data:', loadError);
			} finally {
				setLoading(false);
			}
		};

		loadData();
	}, []);

	const stats = useMemo(() => {
		const safeRegistrations = Array.isArray(registrations) ? registrations : [];
		const safeSections = Array.isArray(sections) ? sections : [];
		const safePeople = Array.isArray(people) ? people : [];
		const safePayments = Array.isArray(payments) ? payments : [];

		let filteredRegistrations = safeRegistrations;
		let filteredPayments = safePayments;

		if (selectedCourse !== 'all') {
			const courseId = Number.parseInt(selectedCourse, 10);
			const courseSectionIds = safeSections
				.filter((section) => section.cur_id === courseId)
				.map((section) => section.cus_id);

			filteredRegistrations = safeRegistrations.filter((registration) =>
				courseSectionIds.includes(registration.cus_id),
			);
			filteredPayments = safePayments.filter((payment) => payment.cur_id === courseId);
		}

		const filteredPeopleIds = new Set(filteredRegistrations.map((registration) => registration.per_id));
		const filteredPeople = safePeople.filter((person) => filteredPeopleIds.has(person.per_id));

		const totalInscritos = filteredRegistrations.length;
		const totalAcreditados = filteredRegistrations.filter((registration) => registration.pec_acreditado).length;
		const totalCursos = selectedCourse === 'all' ? courses.length : filteredRegistrations.length > 0 ? 1 : 0;

		const now = new Date();
		const currentMonth = now.getMonth();
		const currentYear = now.getFullYear();

		const newPeopleThisMonth = filteredPeople.filter((person) => {
			const creationDate = new Date(person.per_fecha_hora);
			return creationDate.getMonth() === currentMonth && creationDate.getFullYear() === currentYear;
		}).length;

		const accreditationRate = totalInscritos > 0 ? Math.round((totalAcreditados / totalInscritos) * 100) : 0;

		const totalIncome = filteredPayments
			.filter((payment) => payment.pap_tipo === 1)
			.reduce((sum, payment) => sum + Number.parseFloat(payment.pap_valor), 0);

		return {
			totalInscritos,
			totalAcreditados,
			accreditationRate,
			totalCursos,
			newPeopleThisMonth,
			totalIncome,
		};
	}, [courses, sections, registrations, people, payments, selectedCourse]);

	const chartData = useMemo(() => {
		const safeRegistrations = Array.isArray(registrations) ? registrations : [];
		const safePeople = Array.isArray(people) ? people : [];
		const safePayments = Array.isArray(payments) ? payments : [];
		const safeProviders = Array.isArray(providers) ? providers : [];
		const safeComunas = Array.isArray(comunas) ? comunas : [];

		let filteredRegistrations = safeRegistrations;
		let filteredPayments = safePayments;

		if (selectedCourse !== 'all') {
			const courseId = Number.parseInt(selectedCourse, 10);
			const courseSectionIds = sections.filter((section) => section.cur_id === courseId).map((section) => section.cus_id);
			filteredRegistrations = safeRegistrations.filter((registration) => courseSectionIds.includes(registration.cus_id));
			filteredPayments = safePayments.filter((payment) => payment.cur_id === courseId);
		}

		const filteredPeopleIds = new Set(filteredRegistrations.map((registration) => registration.per_id));
		const filteredPeople = safePeople.filter((person) => filteredPeopleIds.has(person.per_id));

		const trendData = [];
		const today = new Date();
		for (let index = 5; index >= 0; index -= 1) {
			const targetDate = new Date(today.getFullYear(), today.getMonth() - index, 1);
			const monthName = targetDate.toLocaleString('default', { month: 'short' });
			const year = targetDate.getFullYear();

			const monthlyNewPeople = filteredPeople.filter((person) => {
				const createdAt = new Date(person.per_fecha_hora);
				return createdAt.getMonth() === targetDate.getMonth() && createdAt.getFullYear() === year;
			}).length;

			trendData.push({ name: monthName, value: monthlyNewPeople });
		}

		const courseById = new Map(courses.map((course) => [course.cur_id, course]));
		const sectionById = new Map(sections.map((section) => [section.cus_id, section]));
		const personById = new Map(safePeople.map((person) => [person.per_id, person]));

		const courseCounts = {};
		filteredRegistrations.forEach((registration) => {
			const section = sectionById.get(registration.cus_id);
			if (!section) return;
			const course = courseById.get(section.cur_id);
			if (!course) return;
			courseCounts[course.cur_codigo] = (courseCounts[course.cur_codigo] || 0) + 1;
		});

		const topCoursesData = Object.entries(courseCounts)
			.map(([name, value]) => ({ name, value }))
			.sort((left, right) => right.value - left.value)
			.slice(0, 5);

		const dietCounts = {};
		filteredRegistrations.forEach((registration) => {
			const diet = diets.find((item) => item.ali_id === registration.ali_id);
			const dietName = diet ? diet.ali_nombre : 'Sin Especificar';
			dietCounts[dietName] = (dietCounts[dietName] || 0) + 1;
		});

		const pieData = Object.entries(dietCounts)
			.map(([name, value]) => ({ name, value }))
			.sort((left, right) => right.value - left.value);

		const financialData = [];
		for (let index = 5; index >= 0; index -= 1) {
			const targetDate = new Date(today.getFullYear(), today.getMonth() - index, 1);
			const monthName = targetDate.toLocaleString('default', { month: 'short' });
			const year = targetDate.getFullYear();

			const monthlyPayments = filteredPayments.filter((payment) => {
				const paymentDate = new Date(payment.pap_fecha_hora);
				return paymentDate.getMonth() === targetDate.getMonth() && paymentDate.getFullYear() === year;
			});

			const income = monthlyPayments
				.filter((payment) => payment.pap_tipo === 1)
				.reduce((sum, payment) => sum + Number.parseFloat(payment.pap_valor), 0);

			const expense = monthlyPayments
				.filter((payment) => payment.pap_tipo === 2)
				.reduce((sum, payment) => sum + Number.parseFloat(payment.pap_valor), 0);

			financialData.push({ name: monthName, Ingresos: income, Egresos: expense });
		}

		const baseActiveProviders = safeProviders.filter((provider) => provider.prv_vigente).length;
		const providerCoverageRatio = safePayments.length > 0 ? filteredPayments.length / safePayments.length : 0;
		const variationBoost = selectedCourse === 'all' ? 1 : Math.max(Number.parseInt(selectedCourse, 10), 1);
		const activeProviders =
			selectedCourse === 'all'
				? baseActiveProviders
				: Math.max(
						1,
						Math.min(
							baseActiveProviders,
							Math.round(baseActiveProviders * (providerCoverageRatio + 0.25 + (variationBoost % 3) * 0.04)),
						),
				  );
		const inactiveProviders = Math.max(safeProviders.length - activeProviders, 0);
		const providerData = [
			{ name: 'Activos', value: activeProviders },
			{ name: 'Inactivos', value: inactiveProviders },
		];

		const comunaCounts = {};
		filteredRegistrations.forEach((registration, registrationIndex) => {
			const person = personById.get(registration.per_id);
			if (!person) return;
			const comuna = safeComunas.find((item) => item.com_id === person.com_id);
			const comunaName = comuna ? comuna.com_descripcion : 'Desconocida';
			const dynamicWeight = 1 + ((person.per_id + registrationIndex) % 3);
			comunaCounts[comunaName] = (comunaCounts[comunaName] || 0) + dynamicWeight;
		});

		let comunaData = Object.entries(comunaCounts)
			.map(([name, value]) => ({ name, value }))
			.sort((left, right) => right.value - left.value)
			.slice(0, 5);

		if (comunaData.length < 5) {
			const fallbackFactor = selectedCourse === 'all' ? 1 : variationBoost * 0.28;
			const fillerComunas = [
				{ name: 'Santiago', value: Math.round(12 * fallbackFactor) + 1 },
				{ name: 'Providencia', value: Math.round(8 * fallbackFactor) + 1 },
				{ name: 'Las Condes', value: Math.round(10 * fallbackFactor) + 1 },
				{ name: 'Maipu', value: Math.round(9 * fallbackFactor) + 1 },
				{ name: 'La Florida', value: Math.round(7 * fallbackFactor) + 1 },
			];

			const existingNames = comunaData.map((item) => item.name);
			const needed = 5 - comunaData.length;
			const availableFillers = fillerComunas.filter((item) => !existingNames.includes(item.name)).slice(0, needed);
			comunaData = [...comunaData, ...availableFillers].sort((left, right) => right.value - left.value);
		}

		const ageRanges = { '18-25': 0, '26-35': 0, '36-45': 0, '46-60': 0, '60+': 0 };
		filteredRegistrations.forEach((registration) => {
			const person = personById.get(registration.per_id);
			if (!person?.per_fecha_nac) return;
			const birthDate = new Date(person.per_fecha_nac);
			const age = new Date().getFullYear() - birthDate.getFullYear();
			const weight = registration.pec_acreditado ? 2 : 1;
			if (age >= 18 && age <= 25) ageRanges['18-25'] += weight;
			else if (age >= 26 && age <= 35) ageRanges['26-35'] += weight;
			else if (age >= 36 && age <= 45) ageRanges['36-45'] += weight;
			else if (age >= 46 && age <= 60) ageRanges['46-60'] += weight;
			else if (age > 60) ageRanges['60+'] += weight;
		});

		if (Object.values(ageRanges).every((value) => value === 0)) {
			ageRanges['18-25'] = 2;
			ageRanges['26-35'] = 3;
			ageRanges['36-45'] = 2;
			ageRanges['46-60'] = 1;
		}

		const ageData = Object.entries(ageRanges).map(([name, value]) => ({ name, value }));

		const seasonalityCounts = Array(12).fill(0);
		filteredRegistrations.forEach((registration) => {
			const person = personById.get(registration.per_id);
			if (!person?.per_fecha_hora) return;
			const month = new Date(person.per_fecha_hora).getMonth();
			seasonalityCounts[month] += registration.pec_acreditado ? 2 : 1;
		});

		if (seasonalityCounts.every((value) => value === 0)) {
			const fallbackSeasonality = [2, 3, 2, 4, 3, 2, 5, 4, 3, 2, 2, 1];
			fallbackSeasonality.forEach((value, index) => {
				seasonalityCounts[index] = value;
			});
		}

		const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
		const seasonalityData = months.map((month, index) => ({
			subject: month,
			A: seasonalityCounts[index],
			fullMark: Math.max(...seasonalityCounts, 1),
		}));

		return { trendData, topCoursesData, pieData, financialData, providerData, comunaData, ageData, seasonalityData };
	}, [registrations, sections, courses, people, diets, payments, providers, comunas, selectedCourse]);

	const recentActivity = useMemo(() => {
		const safeRegistrations = Array.isArray(registrations) ? registrations : [];
		let filtered = safeRegistrations;

		if (selectedCourse !== 'all') {
			const courseId = Number.parseInt(selectedCourse, 10);
			const courseSectionIds = sections.filter((section) => section.cur_id === courseId).map((section) => section.cus_id);
			filtered = safeRegistrations.filter((registration) => courseSectionIds.includes(registration.cus_id));
		}

		return filtered
			.sort((left, right) => right.pec_id - left.pec_id)
			.slice(0, 5)
			.map((registration) => {
				const person = people.find((item) => item.per_id === registration.per_id);
				const section = sections.find((item) => item.cus_id === registration.cus_id);
				const course = section ? courses.find((item) => item.cur_id === section.cur_id) : null;

				return {
					id: registration.pec_id,
					personName: person ? `${person.per_nombres} ${person.per_apelpat}` : 'Desconocido',
					courseName: course ? course.cur_codigo : 'N/A',
					accredited: registration.pec_acreditado,
				};
			});
	}, [registrations, people, sections, courses, selectedCourse]);

	const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6'];

	if (loading) {
		return (
			<div className="flex h-96 items-center justify-center">
				<Loader2 className="h-12 w-12 animate-spin text-emerald-500" />
			</div>
		);
	}

	if (error) {
		return (
			<div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-8 text-center backdrop-blur-xl">
				<h3 className="mb-2 text-xl font-bold text-white">Error</h3>
				<p className="text-red-200">{error}</p>
				<button
					type="button"
					onClick={() => window.location.reload()}
					className="mt-6 rounded-lg bg-red-500/20 px-6 py-2 text-red-200 transition-colors hover:bg-red-500/30"
				>
					Reintentar
				</button>
			</div>
		);
	}

	return (
		<div className="mx-auto w-full max-w-[1320px] space-y-4 p-4">
			<div className="grid grid-cols-2 gap-4 md:grid-cols-5">
				<KpiItem label="Cursos Activos" value={stats.totalCursos} icon={BookOpen} color="text-emerald-400" />
				<KpiItem label="Total Inscritos" value={stats.totalInscritos} icon={Users} color="text-blue-400" />
				<KpiItem label="% Acreditacion" value={`${stats.accreditationRate}%`} icon={CheckCircle} color="text-purple-400" />
				<KpiItem label="Nuevos (Mes)" value={stats.newPeopleThisMonth} icon={UserPlus} color="text-orange-400" />
				<KpiItem
					label="Ingresos Totales"
					value={`$${stats.totalIncome.toLocaleString('es-CL')}`}
					icon={DollarSign}
					color="text-green-400"
				/>
			</div>

			<div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
				<div className="rounded-xl border border-white/5 bg-white/5 p-4 backdrop-blur-xl lg:col-span-2">
					<h3 className="mb-4 flex items-center gap-2 text-sm font-medium text-white/90">
						<DollarSign className="text-green-400" size={16} />
						Ingresos vs Egresos (Ultimos 6 meses)
					</h3>
					<div className="h-40 xl:h-44">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart data={chartData.financialData}>
								<CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
								<XAxis dataKey="name" stroke="#6B7280" tick={{ fill: '#9CA3AF', fontSize: 12 }} axisLine={false} tickLine={false} />
								<YAxis stroke="#6B7280" tick={{ fill: '#9CA3AF', fontSize: 12 }} axisLine={false} tickLine={false} />
								<Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', color: '#F3F4F6', fontSize: '12px', borderRadius: '8px' }} />
								<Legend wrapperStyle={{ fontSize: '11px', color: '#9CA3AF' }} />
								<Bar dataKey="Ingresos" stackId="a" fill="#10B981" radius={[0, 0, 4, 4]} />
								<Bar dataKey="Egresos" stackId="a" fill="#EF4444" radius={[4, 4, 0, 0]} />
							</BarChart>
						</ResponsiveContainer>
					</div>
				</div>

				<div className="rounded-xl border border-white/5 bg-white/5 p-4 backdrop-blur-xl">
					<h3 className="mb-4 flex items-center gap-2 text-sm font-medium text-white/90">
						<Briefcase className="text-blue-400" size={16} />
						Estado de Proveedores
					</h3>
					<div className="h-40 xl:h-44">
						<ResponsiveContainer width="100%" height="100%">
							<PieChart>
								<Pie data={chartData.providerData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={5} dataKey="value">
									{chartData.providerData.map((entry, index) => (
										<Cell key={`provider-cell-${entry.name}`} fill={index === 0 ? '#10B981' : '#6B7280'} />
									))}
								</Pie>
								<Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', color: '#F3F4F6', fontSize: '12px', borderRadius: '8px' }} />
								<Legend wrapperStyle={{ fontSize: '11px', color: '#9CA3AF' }} verticalAlign="bottom" height={36} />
							</PieChart>
						</ResponsiveContainer>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
				<div className="rounded-xl border border-white/5 bg-white/5 p-4 backdrop-blur-xl">
					<h3 className="mb-4 flex items-center gap-2 text-sm font-medium text-white/90">
						<Users className="text-purple-400" size={16} />
						Distribucion por Edad
					</h3>
					<div className="h-40 xl:h-44">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart data={chartData.ageData} layout="vertical" margin={{ left: 0, right: 20, top: 0, bottom: 0 }}>
								<CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
								<XAxis type="number" stroke="#6B7280" hide />
								<YAxis dataKey="name" type="category" stroke="#9CA3AF" tick={{ fill: '#9CA3AF', fontSize: 11 }} width={40} tickLine={false} axisLine={false} />
								<Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', color: '#F3F4F6', fontSize: '12px', borderRadius: '8px' }} />
								<Bar dataKey="value" fill="#8B5CF6" radius={[0, 4, 4, 0]} barSize={16} />
							</BarChart>
						</ResponsiveContainer>
					</div>
				</div>

				<div className="rounded-xl border border-white/5 bg-white/5 p-4 backdrop-blur-xl">
					<h3 className="mb-4 flex items-center gap-2 text-sm font-medium text-white/90">
						<MapPin className="text-orange-400" size={16} />
						Top 5 Comunas
					</h3>
					<div className="h-40 xl:h-44">
						<ResponsiveContainer width="100%" height="100%">
							<PieChart>
								<Pie data={chartData.comunaData} cx="50%" cy="50%" outerRadius={60} dataKey="value">
									{chartData.comunaData.map((entry, index) => (
										<Cell key={`comuna-cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
									))}
								</Pie>
								<Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', color: '#F3F4F6', fontSize: '12px', borderRadius: '8px' }} />
							</PieChart>
						</ResponsiveContainer>
					</div>
				</div>

				<div className="rounded-xl border border-white/5 bg-white/5 p-4 backdrop-blur-xl">
					<h3 className="mb-4 flex items-center gap-2 text-sm font-medium text-white/90">
						<Calendar className="text-pink-400" size={16} />
						Estacionalidad (Registros)
					</h3>
					<div className="h-40 xl:h-44">
						<ResponsiveContainer width="100%" height="100%">
							<RadarChart cx="50%" cy="50%" outerRadius="60%" data={chartData.seasonalityData}>
								<PolarGrid stroke="rgba(255,255,255,0.1)" />
								<PolarAngleAxis dataKey="subject" tick={{ fill: '#9CA3AF', fontSize: 10 }} />
								<PolarRadiusAxis angle={30} domain={[0, 'auto']} tick={false} axisLine={false} />
								<Radar name="Registros" dataKey="A" stroke="#EC4899" fill="#EC4899" fillOpacity={0.3} />
								<Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', color: '#F3F4F6', fontSize: '12px', borderRadius: '8px' }} />
							</RadarChart>
						</ResponsiveContainer>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
				<div className="rounded-xl border border-white/5 bg-white/5 p-4 backdrop-blur-xl lg:col-span-2">
					<h3 className="mb-4 flex items-center gap-2 text-sm font-medium text-white/90">
						<TrendingUp className="text-emerald-400" size={16} />
						Flujo de Nuevas Personas (Ultimos 6 meses)
					</h3>
					<div className="h-40 xl:h-44">
						<ResponsiveContainer width="100%" height="100%">
							<AreaChart data={chartData.trendData}>
								<defs>
									<linearGradient id="colorPeople" x1="0" y1="0" x2="0" y2="1">
										<stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
										<stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
									</linearGradient>
								</defs>
								<CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
								<XAxis dataKey="name" stroke="#6B7280" tick={{ fill: '#9CA3AF', fontSize: 12 }} axisLine={false} tickLine={false} dy={10} />
								<YAxis stroke="#6B7280" tick={{ fill: '#9CA3AF', fontSize: 12 }} axisLine={false} tickLine={false} />
								<Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', color: '#F3F4F6', fontSize: '12px', borderRadius: '8px' }} />
								<Area type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorPeople)" />
							</AreaChart>
						</ResponsiveContainer>
					</div>
				</div>

				<div className="rounded-xl border border-white/5 bg-white/5 p-4 backdrop-blur-xl">
					<h3 className="mb-4 flex items-center gap-2 text-sm font-medium text-white/90">
						<Utensils className="text-orange-400" size={16} />
						Preferencias Alimenticias
					</h3>
					<div className="h-40 xl:h-44">
						<ResponsiveContainer width="100%" height="100%">
							<PieChart>
								<Pie data={chartData.pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={4} dataKey="value" nameKey="name" stroke="none">
									{chartData.pieData.map((entry, index) => (
										<Cell key={`diet-cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
									))}
								</Pie>
								<Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', color: '#F3F4F6', fontSize: '12px', borderRadius: '8px' }} />
								<Legend wrapperStyle={{ fontSize: '11px', color: '#9CA3AF' }} iconSize={8} layout="vertical" verticalAlign="middle" align="right" />
							</PieChart>
						</ResponsiveContainer>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
				<div className="rounded-xl border border-white/5 bg-white/5 p-4 backdrop-blur-xl">
					<h3 className="mb-4 flex items-center gap-2 text-sm font-medium text-white/90">
						<Activity className="text-purple-400" size={16} />
						Top 5 Cursos (Inscripciones)
					</h3>
					<div className="h-40 xl:h-44">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart data={chartData.topCoursesData} layout="vertical" margin={{ left: 0, right: 20, top: 0, bottom: 0 }}>
								<CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
								<XAxis type="number" stroke="#6B7280" hide />
								<YAxis dataKey="name" type="category" stroke="#9CA3AF" tick={{ fill: '#9CA3AF', fontSize: 11 }} width={90} tickLine={false} axisLine={false} />
								<Tooltip
									contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', color: '#F3F4F6', fontSize: '12px', borderRadius: '8px' }}
									cursor={{ fill: 'rgba(255,255,255,0.05)' }}
								/>
								<Bar dataKey="value" fill="#8B5CF6" radius={[0, 4, 4, 0]} barSize={16} />
							</BarChart>
						</ResponsiveContainer>
					</div>
				</div>

				<div className="overflow-hidden rounded-xl border border-white/5 bg-white/5 p-4 backdrop-blur-xl">
					<h3 className="mb-4 flex items-center gap-2 text-sm font-medium text-white/90">
						<Clock className="text-blue-400" size={16} />
						Ultimas Inscripciones
					</h3>
					<div className="overflow-x-auto">
						<table className="w-full text-left text-xs text-gray-400">
							<thead className="bg-white/5 text-[10px] uppercase text-gray-500">
								<tr>
									<th className="rounded-l-lg px-3 py-2">Nombre</th>
									<th className="px-3 py-2">Curso</th>
									<th className="rounded-r-lg px-3 py-2">Estado</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-white/5">
								{recentActivity.map((item) => (
									<tr key={item.id} className="transition-colors hover:bg-white/5">
										<td className="px-3 py-2 font-medium text-white/90">{item.personName}</td>
										<td className="max-w-[120px] truncate px-3 py-2">{item.courseName}</td>
										<td className="px-3 py-2">
											<span
												className={`rounded border px-2 py-0.5 text-[10px] font-medium ${
													item.accredited
														? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
														: 'border-yellow-500/20 bg-yellow-500/10 text-yellow-400'
												}`}
											>
												{item.accredited ? 'Acreditado' : 'Pendiente'}
											</span>
										</td>
									</tr>
								))}
								{recentActivity.length === 0 ? (
									<tr>
										<td colSpan="3" className="px-3 py-4 text-center text-gray-500">
											No hay actividad reciente
										</td>
									</tr>
								) : null}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

const KpiItem = ({ label, value, icon: Icon, color }) => (
	<div className="group flex items-center justify-between rounded-xl border border-white/5 bg-white/5 p-4 backdrop-blur-xl transition-all duration-300 hover:bg-white/10">
		<div>
			<p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-gray-400">{label}</p>
			<p className="text-xl font-bold tracking-tight text-white">{value}</p>
		</div>
		<div className={`rounded-lg bg-white/5 p-2 opacity-80 transition-opacity group-hover:opacity-100 ${color}`}>
			<Icon size={18} />
		</div>
	</div>
);

export default SGCDashboardExecutive;

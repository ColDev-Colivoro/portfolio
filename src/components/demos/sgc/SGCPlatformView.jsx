import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BarChart3, CreditCard, Filter, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SGCDashboardExecutive from '@/components/demos/sgc/SGCDashboardExecutive';
import SGCPaymentsDashboard from '@/components/demos/sgc/SGCPaymentsDashboard';
import { sgcExecutiveMock } from '@/components/demos/sgc/sgcMockData';

const menuItems = [
	{ id: 'ejecutivo', icon: BarChart3, label: 'Vista Ejecutiva' },
	{ id: 'pagos', icon: CreditCard, label: 'Gestion de Pagos' },
];

const SGCPlatformView = () => {
	const navigate = useNavigate();
	const [collapsed, setCollapsed] = useState(true);
	const [activeView, setActiveView] = useState('ejecutivo');
	const [selectedCourse, setSelectedCourse] = useState('all');

	const pageTitle = activeView === 'pagos' ? 'Gestion Financiera' : 'Vista Ejecutiva';

	return (
		<div className="sgc-platform flex h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
			<aside
				className={`fixed left-0 top-0 z-50 flex h-screen flex-col shadow-2xl transition-[width] duration-300 ${
					collapsed ? 'w-[80px]' : 'w-[280px]'
				}`}
				style={{
					background: collapsed
						? 'linear-gradient(to right, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.72) 100%)'
						: 'linear-gradient(to right, rgba(15, 23, 42, 0.86) 0%, rgba(15, 23, 42, 0.55) 52%, rgba(15, 23, 42, 0.14) 100%)',
					backdropFilter: collapsed ? 'blur(6px)' : 'blur(14px)',
					WebkitBackdropFilter: collapsed ? 'blur(6px)' : 'blur(14px)',
					transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
				}}
			>
				<div className="flex h-20 items-center justify-center px-4">
					<div
						onClick={() => setCollapsed(!collapsed)}
						className={`flex cursor-pointer items-center gap-3 transition-all duration-200 ${collapsed ? 'w-full justify-center' : ''}`}
						title={collapsed ? 'Expandir menu' : 'Contraer menu'}
					>
						<div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-sm font-black text-white shadow-lg transition-transform duration-200 hover:scale-110">
							SGC
						</div>

						<AnimatePresence mode="wait">
							{!collapsed ? (
								<motion.div
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: -20 }}
									transition={{ duration: 0.2 }}
								>
									<h2 className="text-lg font-bold tracking-tight text-white">GIC Panel</h2>
									<p className="text-xs font-medium text-white/50">Scout Chile</p>
								</motion.div>
							) : null}
						</AnimatePresence>
					</div>
				</div>

				<nav className="custom-scrollbar flex-1 space-y-1 overflow-x-hidden overflow-y-auto px-3 py-4">
					{menuItems.map((item, index) => {
						const Icon = item.icon;
						const active = activeView === item.id;

						return (
							<motion.button
								type="button"
								key={item.id}
								onClick={() => setActiveView(item.id)}
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: index * 0.05 }}
								className={`group relative flex w-full items-center gap-4 rounded-xl border px-4 py-3.5 transition-all duration-200 ${
									active
										? 'border-emerald-500/30 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-white shadow-lg shadow-emerald-500/10'
										: 'border-transparent text-white/70 hover:bg-white/5 hover:text-white'
								}`}
								title={collapsed ? item.label : ''}
							>
								<Icon
									className={`flex-shrink-0 transition-all duration-200 ${
										active
											? 'scale-110 text-emerald-400'
											: 'text-white/70 group-hover:scale-110 group-hover:text-white'
									}`}
									size={20}
								/>

								<AnimatePresence mode="wait">
									{!collapsed ? (
										<motion.span
											initial={{ opacity: 0, width: 0 }}
											animate={{ opacity: 1, width: 'auto' }}
											exit={{ opacity: 0, width: 0 }}
											transition={{ duration: 0.2 }}
											className={`overflow-hidden whitespace-nowrap text-sm font-semibold ${active ? 'text-white' : 'text-white/80'}`}
										>
											{item.label}
										</motion.span>
									) : null}
								</AnimatePresence>

								{active && !collapsed ? (
									<motion.div
										layoutId="sgcActiveIndicator"
										className="ml-auto h-2 w-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50"
										transition={{ type: 'spring', stiffness: 300, damping: 30 }}
									/>
								) : null}

								{collapsed ? (
									<div className="pointer-events-none absolute left-full ml-4 whitespace-nowrap rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-xl transition-opacity duration-200 group-hover:opacity-100">
										{item.label}
										<div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-slate-900" />
									</div>
								) : null}
							</motion.button>
						);
					})}

				</nav>

				<div className="border-t border-white/10 p-4">
					<AnimatePresence mode="wait">
						{!collapsed ? (
							<div>
								<p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#c1ffbc]/80">
									Salir de la demo
								</p>
								<motion.button
									type="button"
									onClick={() => navigate('/proyectos')}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									className="group flex w-full items-center gap-3 rounded-xl border border-[#2dfc24]/80 bg-[#0d0d0d] px-3 py-2 text-left text-[#8eff87] shadow-[0_12px_28px_rgba(0,0,0,0.55)] transition-all hover:border-[#33F534] hover:bg-[#151515] hover:shadow-[0_14px_30px_rgba(51,245,52,0.28)]"
								>
									<div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#2dfc24]/70 bg-[#1a1a1a] shadow-[0_8px_18px_rgba(0,0,0,0.5)]">
										<img
											src="/images/branding/logo-navbar-icon.png"
											alt="ColDev"
											className="h-6 w-6 rounded"
										/>
									</div>
									<div className="min-w-0 flex-1">
										<p className="truncate text-sm font-semibold text-[#2dfc24]">Volver a ColDev</p>
										<p className="truncate text-xs text-[#c1ffbc]">Portfolio principal</p>
									</div>
									<Home className="h-4 w-4 text-[#2dfc24] transition-transform group-hover:translate-x-0.5" />
								</motion.button>
							</div>
						) : (
							<motion.button
								type="button"
								onClick={() => navigate('/proyectos')}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className="flex w-full justify-center"
								title="Salir de la demo y volver a ColDev"
							>
								<div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#2dfc24]/80 bg-[#0d0d0d] shadow-[0_10px_24px_rgba(0,0,0,0.6)]">
									<img
										src="/images/branding/logo-navbar-icon.png"
										alt="ColDev"
										className="h-6 w-6 rounded"
									/>
								</div>
							</motion.button>
						)}
					</AnimatePresence>
				</div>
			</aside>

			<div className="flex h-screen flex-1 flex-col" style={{ marginLeft: '80px' }}>
				<header
					className="fixed right-0 top-0 z-40 flex h-16 items-center justify-between border-b border-white/5 bg-slate-900/80 px-8 backdrop-blur-md"
					style={{ left: '80px' }}
				>
					<div className="flex items-center space-x-4 pl-4">
						<span className="text-xl font-bold tracking-tight text-white">{pageTitle}</span>
					</div>
					<div className="flex items-center space-x-4">
						<div className="hidden items-center rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 md:flex">
							<Filter className="mr-2 h-3.5 w-3.5 text-emerald-400" />
							<select
								value={selectedCourse}
								onChange={(event) => setSelectedCourse(event.target.value)}
								className="min-w-[170px] bg-transparent text-xs font-medium text-white outline-none"
							>
								<option className="bg-slate-900" value="all">
									Todos los cursos
								</option>
								{sgcExecutiveMock.courses.map((course) => (
									<option className="bg-slate-900" key={course.cur_id} value={course.cur_id.toString()}>
										{course.cur_codigo}
									</option>
								))}
							</select>
						</div>
					</div>
				</header>

				<main className="mt-16 flex-1 overflow-y-auto">
					<AnimatePresence mode="wait">
						{activeView === 'ejecutivo' ? (
							<motion.div
								key="sgc-ejecutivo"
								initial={{ opacity: 0, x: 12 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -12 }}
								transition={{ duration: 0.2 }}
							>
								<SGCDashboardExecutive selectedCourse={selectedCourse} />
							</motion.div>
						) : (
							<motion.div
								key="sgc-pagos"
								initial={{ opacity: 0, x: 12 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -12 }}
								transition={{ duration: 0.2 }}
							>
								<SGCPaymentsDashboard selectedCourse={selectedCourse} />
							</motion.div>
						)}
					</AnimatePresence>
				</main>
			</div>
		</div>
	);
};

export default SGCPlatformView;

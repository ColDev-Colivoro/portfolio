import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

// Componente Mar2ControlPreview adaptado para ser el contenido del modal
const Mar2ControlModalContent = () => {
  const [openImage, setOpenImage] = useState(null); // {src, title, caption}
  const [openCred, setOpenCred] = useState(false);
  const [filterRole, setFilterRole] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const credCloseRef = useRef(null);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") {
        setOpenImage(null);
        setOpenCred(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (openCred && credCloseRef.current) credCloseRef.current.focus();
  }, [openCred]);

  const panels = [
    { id: 1, role: "All", type: "Login", title: "Login / Demo roles", caption: "Acceso demo con usuarios preconfigurados.", src: "/images/mar2control/Login.png" },
    { id: 2, role: "Admin", type: "Dashboard", title: "Admin — Panel resumen", caption: "Gestión de empresas, usuarios y exportaciones.", src: "/images/mar2control/admin-dashboard.png" },
    { id: 3, role: "Gerente", type: "Dashboard", title: "Gerente — KPIs", caption: "Tendencias y alertas por planta.", src: "/images/mar2control/gerente-kpis.png" },
    { id: 4, role: "Jefe", type: "Form", title: "Jefe — No conformidades", caption: "Detalle y cierre de NC.", src: "/images/mar2control/jefe-calidad.png" },
    { id: 5, role: "Monitor", type: "Form", title: "Monitor — Recolección", caption: "Formularios móviles con fotos y firmas.", src: "/images/mar2control/monitor.png" },
    // { id: 6, role: "All", type: "Report", title: "Reportes & Export", caption: "Generación de PDF/CSV filtrados.", src: "/images/mar2control/report-export.png" }, // Removed as per user request
  ];

  const filtered = panels.filter(p => (filterRole === "All" || p.role === filterRole) && (filterType === "All" || p.type === filterType));

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-12">
      {/* Hero principal */}
      <header className="max-w-6xl mx-auto">
        <div className="bg-secondary rounded-xl shadow-md p-6 md:p-10 flex flex-col md:flex-row items-start gap-6">
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-gradient">Mar2Control — Gestión de Calidad Pesquera</h1>
            <p className="mt-3 text-sm md:text-base text-muted-foreground">Plataforma para inspecciones, trazabilidad y reportes en plantas pesqueras. Demo público con roles preconfigurados.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href="https://controldecalidad.netlify.app" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 bg-accent text-primary-foreground rounded-md text-sm">Abrir demo</a>
              <Button className="inline-flex items-center px-4 py-2 border border-border rounded-md text-sm" onClick={() => setOpenCred(true)}>Ver credenciales demo</Button>
              <span className="inline-flex items-center px-4 py-2 text-sm text-accent relative group">
                Descargar ficha técnica
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Próximamente</span>
              </span>
            </div>
          </div>

          <div className="w-full md:w-64 text-sm text-muted-foreground">
            <div className="bg-secondary/50 p-4 rounded-lg">
              <div className="font-medium text-foreground">Micro-stats</div>
              <div className="mt-2">
                <span className="block">4 roles</span>
                <span className="block">Demo público</span>
                <span className="block">v1.0</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Featured banner / cómo se verá en home (ejemplo de tarjeta destacada) */}
      <main className="max-w-6xl mx-auto mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2">
          <div className="bg-secondary rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gradient">Galería de paneles</h2>
            <p className="text-sm text-muted-foreground mt-1">Filtra por rol o tipo para mostrar los paneles más relevantes.</p>

            {/* filtros */}
            <div className="mt-4 flex flex-wrap gap-3 items-center">
              <div className="flex items-center gap-2">
                <label className="text-sm text-foreground">Rol:</label>
                <select value={filterRole} onChange={e => setFilterRole(e.target.value)} className="border border-border rounded px-2 py-1 text-sm bg-background text-foreground">
                  <option>All</option>
                  <option>Admin</option>
                  <option>Gerente</option>
                  <option>Jefe</option>
                  <option>Monitor</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm text-foreground">Tipo:</label>
                <select value={filterType} onChange={e => setFilterType(e.target.value)} className="border border-border rounded px-2 py-1 text-sm bg-background text-foreground">
                  <option>All</option>
                  <option>Login</option>
                  <option>Dashboard</option>
                  <option>Form</option>
                  <option>Report</option>
                </select>
              </div>
              <div className="ml-auto text-sm text-muted-foreground">{filtered.length} panel(es) mostrados</div>
            </div>

            {/* grid de miniaturas */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map(p => (
                <article key={p.id} className="bg-secondary/50 rounded-lg border border-border overflow-hidden">
                  <button onClick={() => setOpenImage(p)} className="w-full text-left">
                    <div className="h-40 flex items-center justify-center overflow-hidden">
                      <img src={p.src} alt={p.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-sm text-foreground">{p.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{p.caption}</p>
                      <div className="mt-2 text-xs text-gray-500">Rol: {p.role} · Tipo: {p.type}</div>
                    </div>
                  </button>
                </article>
              ))}
            </div>
          </div>

          {/* Demo / iframe opcional */}
          <div className="mt-6 bg-secondary rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-gradient">Demo en vivo</h3>
            <p className="text-sm text-muted-foreground mt-1">Abre el demo público en una pestaña nueva para revisar flujos por rol.</p>
            <div className="mt-3">
              <a href="https://controldecalidad.netlify.app" target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-2 border border-border rounded text-foreground">Abrir demo público</a>
            </div>
          </div>
        </section>

        {/* Columna derecha: tarjeta resumen y CTA */}
        <aside>
          <div className="bg-secondary rounded-xl shadow p-6 sticky top-6">
            <h3 className="text-lg font-semibold text-gradient">Resumen & CTA</h3>
            <p className="text-sm text-muted-foreground mt-2"> <span className="font-medium text-foreground">Caso · Destacado</span>.</p>
            <ul className="mt-3 text-sm space-y-2 text-muted-foreground">
              <li>• 4 roles: admin, gerente, jefe, monitor</li>
              <li>• Demo público con credenciales</li>
              <li>• Galería de paneles y export de reportes</li>
            </ul>
            <div className="mt-4">
              <a href="https://controldecalidad.netlify.app" target="_blank" rel="noopener noreferrer" className="block text-center px-4 py-2 bg-accent text-primary-foreground rounded">Ver caso de estudio</a>
              <span className="block text-center mt-3 px-4 py-2 border border-border rounded text-sm text-foreground relative group">
                Solicitar demo privado
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Próximamente</span>
              </span>
            </div>
          </div>
        </aside>
      </main>

      {/* Modal imagen grande */}
      {openImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpenImage(null)} aria-hidden></div>
          <div className="relative max-w-3xl w-full bg-background rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-foreground">{openImage.title}</h4>
                <p className="text-sm text-muted-foreground">{openImage.caption}</p>
              </div>
              <Button onClick={() => setOpenImage(null)} className="ml-4 text-sm px-3 py-1 border border-border rounded">Cerrar</Button>
            </div>
            <div className="h-72 flex items-center justify-center overflow-hidden">
              <img src={openImage.src} alt={openImage.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-4 flex justify-end gap-3">
              <a href="https://controldecalidad.netlify.app" target="_blank" rel="noopener noreferrer" className="px-3 py-2 border border-border rounded text-sm text-foreground">Abrir demo</a>
              <Button onClick={() => setOpenImage(null)} className="px-3 py-2 bg-accent text-primary-foreground rounded text-sm">Cerrar</Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de credenciales */}
      {openCred && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpenCred(false)} aria-hidden></div>
          <div role="dialog" aria-modal="true" aria-labelledby="cred-title" className="relative max-w-md w-full bg-background rounded-lg shadow-lg p-6">
            <h4 id="cred-title" className="text-lg font-semibold text-foreground">Credenciales demo</h4>
            <p className="text-sm text-muted-foreground mt-2">Usa los siguientes usuarios y, como se indica en el demo, la contraseña puede ser cualquiera.</p>
            <ul className="mt-3 space-y-2 text-sm text-foreground">
              <li><strong>admin</strong> — Administrador</li>
              <li><strong>gerente</strong> — Gerente</li>
              <li><strong>jefe</strong> — Jefe de calidad</li>
              <li><strong>monitor</strong> — Monitor de campo</li>
            </ul>
            <p className="mt-3 text-xs text-gray-500">Nota: contraseña: cualquiera · Empresa: cualquiera</p>
            <div className="mt-4 flex justify-end">
              <Button ref={credCloseRef} onClick={() => setOpenCred(false)} className="px-3 py-2 border border-border rounded text-sm">Cerrar</Button>
            </div>
          </div>
        </div>
      )}

      {/* Footer pequeño de mockup */}
      <footer className="max-w-6xl mx-auto mt-10 text-center text-xs text-gray-500">Mockup visual — reemplaza placeholders por imágenes reales en /public/images/mar2control/</footer>
    </div>
  );
};

const FeaturedProject = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="container mx-auto px-4 pt-8 pb-16">
      <motion.div
        className="max-w-6xl mx-auto bg-secondary rounded-xl shadow-lg p-8 flex flex-col md:flex-row items-center gap-8"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        {/* Imagen del proyecto destacado */}
        <div className="w-full md:w-1/2 relative group">
          <div className="absolute inset-0 bg-accent/20 rounded-lg transform rotate-3 group-hover:rotate-6 transition-transform duration-300"></div>
          <img
            src="/images/mar2control/home.png" // Using home.png as the featured image as per user feedback
            alt="Mar2Control Project"
            className="relative z-10 w-full h-auto rounded-lg shadow-xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent rounded-lg z-20"></div>
        </div>

        {/* Descripción y botón */}
        <div className="w-full md:w-1/2">
          <span className="inline-block px-3 py-1 bg-accent/20 text-accent rounded-full text-sm mb-4">
            Proyecto Destacado
          </span>
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            Mar2Control — Gestión de Calidad Pesquera
          </h3>
          <p className="text-muted-foreground mb-6">
            Plataforma integral para la gestión de calidad en plantas pesqueras,
            ofreciendo inspecciones, trazabilidad y reportes detallados.
            Diseñado para optimizar procesos y asegurar el cumplimiento de estándares.
          </p>
          <button
            className="inline-flex items-center px-4 py-2 bg-accent text-primary-foreground rounded-md text-sm hover:bg-accent/80"
            onClick={openModal}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Ver Caso de Estudio
          </button>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70"
            onClick={closeModal}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-5xl h-[90vh] bg-background rounded-lg shadow-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()} // Evita que el click en el modal cierre el modal
            >
              <div className="absolute top-4 right-4 z-10">
                <button onClick={closeModal} className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm">
                  Cerrar
                </button>
              </div>
              <div className="overflow-y-auto h-full">
                <Mar2ControlModalContent />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FeaturedProject;

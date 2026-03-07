import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

const ProjectModalContent = ({ project }) => {
    const [openImage, setOpenImage] = useState(null);
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

    if (!project || !project.modalDetails) return null;

    const { modalDetails, demoUrl } = project;
    const { gallery = [] } = modalDetails;

    const roles = ["All", ...new Set(gallery.filter(p => p.role).map(p => p.role))];
    const types = ["All", ...new Set(gallery.filter(p => p.type).map(p => p.type))];
    const hasFilters = roles.length > 1 || types.length > 1;

    const filtered = gallery.filter(
        (p) =>
            (filterRole === "All" || p.role === filterRole) &&
            (filterType === "All" || p.type === filterType)
    );

    return (
        <div className="min-h-screen bg-background text-foreground p-6 md:p-12">
            {/* Hero principal */}
            <header className="max-w-6xl mx-auto">
                <div className="bg-secondary rounded-xl shadow-md p-6 md:p-10 flex flex-col md:flex-row items-start gap-6">
                    <div className="flex-1">
                        <h1 className="text-2xl md:text-3xl font-bold text-gradient">
                            {modalDetails.headline}
                        </h1>
                        <p className="mt-3 text-sm md:text-base text-muted-foreground">
                            {modalDetails.description}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-3">
                            {demoUrl && (
                                <a
                                    href={demoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-4 py-2 bg-accent text-primary-foreground rounded-md text-sm cursor-pointer"
                                >
                                    Abrir demo
                                </a>
                            )}
                            {modalDetails.credentials && modalDetails.credentials.length > 0 && (
                                <Button
                                    className="inline-flex items-center px-4 py-2 border border-border rounded-md text-sm"
                                    onClick={() => setOpenCred(true)}
                                >
                                    Ver credenciales demo
                                </Button>
                            )}
                            <span className="inline-flex items-center px-4 py-2 text-sm text-accent relative group">
                                Descargar ficha técnica
                                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                                    Próximamente
                                </span>
                            </span>
                        </div>
                    </div>

                    {modalDetails.microStats && modalDetails.microStats.length > 0 && (
                        <div className="w-full md:w-64 text-sm text-muted-foreground">
                            <div className="bg-secondary/50 p-4 rounded-lg">
                                <div className="font-medium text-foreground">Micro-stats</div>
                                <div className="mt-2 text-foreground">
                                    {modalDetails.microStats.map((stat, i) => (
                                        <span key={i} className="block">
                                            {stat}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            {/* Featured banner / galería */}
            <main className="max-w-6xl mx-auto mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <section className="lg:col-span-2">
                    <div className="bg-secondary rounded-xl shadow-sm p-6">
                        <h2 className="text-lg font-semibold text-gradient">
                            Galería de paneles
                        </h2>
                        {hasFilters && (
                            <p className="text-sm text-muted-foreground mt-1">
                                Filtra por rol o tipo para mostrar los paneles más relevantes.
                            </p>
                        )}

                        {/* filtros */}
                        {hasFilters && (
                            <div className="mt-4 flex flex-wrap gap-3 items-center">
                                {roles.length > 1 && (
                                    <div className="flex items-center gap-2">
                                        <label className="text-sm text-foreground">Rol:</label>
                                        <select
                                            value={filterRole}
                                            onChange={(e) => setFilterRole(e.target.value)}
                                            className="border border-border rounded px-2 py-1 text-sm bg-background text-foreground"
                                        >
                                            {roles.map((r, i) => (
                                                <option key={i} value={r}>
                                                    {r}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                                {types.length > 1 && (
                                    <div className="flex items-center gap-2">
                                        <label className="text-sm text-foreground">Tipo:</label>
                                        <select
                                            value={filterType}
                                            onChange={(e) => setFilterType(e.target.value)}
                                            className="border border-border rounded px-2 py-1 text-sm bg-background text-foreground"
                                        >
                                            {types.map((t, i) => (
                                                <option key={i} value={t}>
                                                    {t}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                                <div className="ml-auto text-sm text-muted-foreground">
                                    {filtered.length} panel(es) mostrados
                                </div>
                            </div>
                        )}

                        {/* grid de miniaturas */}
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filtered.map((p) => (
                                <article
                                    key={p.id}
                                    className="bg-secondary/50 rounded-lg border border-border overflow-hidden"
                                >
                                    <button
                                        onClick={() => setOpenImage(p)}
                                        className="w-full text-left"
                                    >
                                        <div className="h-40 flex items-center justify-center overflow-hidden">
                                            <img
                                                src={p.src}
                                                alt={p.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="p-3">
                                            <h3 className="font-medium text-sm text-foreground">
                                                {p.title}
                                            </h3>
                                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                                {p.caption}
                                            </p>
                                            {(p.role || p.type) && (
                                                <div className="mt-2 text-xs text-gray-500">
                                                    {p.role && `Rol: ${p.role}`}{" "}
                                                    {p.role && p.type && "·"}{" "}
                                                    {p.type && `Tipo: ${p.type}`}
                                                </div>
                                            )}
                                        </div>
                                    </button>
                                </article>
                            ))}
                            {filtered.length === 0 && (
                                <div className="col-span-full text-center text-muted-foreground text-sm py-4">
                                    No hay paneles que coincidan con los filtros.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Demo opcional */}
                    {demoUrl && (
                        <div className="mt-6 bg-secondary rounded-xl shadow-sm p-6">
                            <h3 className="font-semibold text-gradient">Demo en vivo</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                                Abre el demo público en una pestaña nueva para revisar flujos por rol.
                            </p>
                            <div className="mt-3">
                                <a
                                    href={demoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block px-4 py-2 border border-border rounded text-foreground hover:bg-background transition-colors"
                                >
                                    Abrir demo público
                                </a>
                            </div>
                        </div>
                    )}
                </section>

                {/* Columna derecha: tarjeta resumen y CTA */}
                <aside>
                    <div className="bg-secondary rounded-xl shadow p-6 sticky top-6">
                        <h3 className="text-lg font-semibold text-gradient">
                            Resumen & CTA
                        </h3>
                        <p className="text-sm text-muted-foreground mt-2">
                            <span className="font-medium text-foreground">
                                Caso · Destacado
                            </span>
                        </p>
                        {modalDetails.features && modalDetails.features.length > 0 && (
                            <ul className="mt-3 text-sm space-y-2 text-muted-foreground">
                                {modalDetails.features.map((feature, i) => (
                                    <li key={i}>• {feature}</li>
                                ))}
                            </ul>
                        )}
                        <div className="mt-4">
                            {demoUrl ? (
                                <a
                                    href={demoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block text-center px-4 py-2 bg-accent text-primary-foreground rounded hover:bg-accent/90 transition-colors"
                                >
                                    Ver caso de estudio
                                </a>
                            ) : (
                                <span className="block text-center px-4 py-2 bg-accent/50 text-primary-foreground rounded cursor-not-allowed">
                                    Demo no disponible
                                </span>
                            )}

                            <span className="block text-center mt-3 px-4 py-2 border border-border rounded text-sm text-foreground relative group cursor-pointer">
                                Solicitar demo privado
                                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                                    Próximamente
                                </span>
                            </span>
                        </div>
                    </div>
                </aside>
            </main>

            {/* Modal imagen grande */}
            {openImage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setOpenImage(null)}
                        aria-hidden
                    ></div>
                    <div className="relative max-w-3xl w-full bg-background rounded-lg shadow-lg overflow-hidden">
                        <div className="p-4 flex justify-between items-start">
                            <div>
                                <h4 className="font-semibold text-foreground">
                                    {openImage.title}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                    {openImage.caption}
                                </p>
                            </div>
                            <Button
                                onClick={() => setOpenImage(null)}
                                className="ml-4 text-sm px-3 py-1 border border-border rounded bg-secondary hover:bg-background text-foreground"
                            >
                                Cerrar
                            </Button>
                        </div>
                        <div className="h-72 sm:h-96 flex items-center justify-center overflow-hidden bg-black/5">
                            <img
                                src={openImage.src}
                                alt={openImage.title}
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div className="p-4 flex justify-end gap-3">
                            {demoUrl && (
                                <a
                                    href={demoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-3 py-2 border border-border rounded text-sm text-foreground hover:bg-background transition-colors"
                                >
                                    Abrir demo
                                </a>
                            )}
                            <Button
                                onClick={() => setOpenImage(null)}
                                className="px-3 py-2 bg-accent text-primary-foreground rounded text-sm hover:bg-accent/90"
                            >
                                Cerrar
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de credenciales */}
            {openCred && modalDetails.credentials && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/40"
                        onClick={() => setOpenCred(false)}
                        aria-hidden
                    ></div>
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="cred-title"
                        className="relative max-w-md w-full bg-background rounded-lg shadow-lg p-6"
                    >
                        <h4
                            id="cred-title"
                            className="text-lg font-semibold text-foreground"
                        >
                            Credenciales demo
                        </h4>
                        <p className="text-sm text-muted-foreground mt-2">
                            Usa los siguientes usuarios y, como se indica en el demo, la
                            contraseña puede ser cualquiera.
                        </p>
                        <ul className="mt-3 space-y-2 text-sm text-foreground">
                            {modalDetails.credentials.map((cred, i) => (
                                <li key={i}>
                                    <strong>{cred.label}</strong> {cred.text && `— ${cred.text}`}
                                </li>
                            ))}
                        </ul>
                        {modalDetails.credentialsNote && (
                            <p className="mt-3 text-xs text-gray-500">
                                {modalDetails.credentialsNote}
                            </p>
                        )}
                        <div className="mt-4 flex justify-end">
                            <Button
                                ref={credCloseRef}
                                onClick={() => setOpenCred(false)}
                                className="px-3 py-2 border border-border rounded text-sm bg-secondary hover:bg-background text-foreground"
                            >
                                Cerrar
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer pequeño de mockup */}
            <footer className="max-w-6xl mx-auto mt-10 text-center text-xs text-gray-500">
                Imágenes del sistema {project.title}
            </footer>
        </div>
    );
};

export default ProjectModalContent;

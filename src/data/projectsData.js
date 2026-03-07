export const featuredProjects = [
  {
    id: "coldevpos",
    title: "ColDevPOS — Punto de Venta Dinámico",
    subtitle: "Punto de Venta sin Internet. Ni la lluvia, ni la señal nos detienen. Caja, inventario y boleta electrónica SII operando con continuidad en condiciones reales.",
    thumbnail: "/images/coldevpos/home.png",
    demoUrl: "https://controldecalidad.netlify.app",
    tags: ["Proyecto Destacado"],
    modalDetails: {
      headline: "ColDevPOS — Punto de Venta sin Internet",
      description: "Sistema integral de caja, inventario y boleta electrónica SII desarrollado para funcionar offline en entornos críticos de señal.",
      microStats: [
        "Boleta Electrónica",
        "Windows 10+",
        "Soporte Local Chile"
      ],
      features: [
        "Caja rápida offline",
        "Integración API SII Directa",
        "Sincronización transparente de inventario"
      ],
      gallery: [
        { id: 1, role: "Caja", type: "POS", title: "Caja - Ventas fluidas", caption: "Vendes, cobras y actualizas stock de inmediato.", src: "/images/coldevpos/pos.png" },
        { id: 2, role: "Admin", type: "Administración", title: "Admin — Gestor Central", caption: "Dashboard y reportería de sucursales.", src: "/images/coldevpos/admin.png" },
        { id: 3, role: "Caja", type: "Boleta", title: "Boleta SII Integrada", caption: "Emisión offline integrada y sincronización.", src: "/images/coldevpos/boleta.png" },
        { id: 4, role: "Gestor", type: "Inventario", title: "Control de Inventario", caption: "Stock al día, ingresos y mermas.", src: "/images/coldevpos/inventario.png" }
      ],
      credentials: [
        { label: "Demo local", text: "Se ejecuta en Windows localmente" },
        { label: "Offline mode", text: "Persistencia con SQLite" }
      ],
      credentialsNote: "Nota: Requiere instalación del cliente sobremesa MS Windows."
    }
  }
];

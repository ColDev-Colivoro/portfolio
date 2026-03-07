# Design: Refactorización de Proyectos Destacados

## Technical Approach
Implementar el patrón de "Smart Provider / Dumb Component" separando la data estática del proyecto hacia un nuevo archivo de constantes `projectsData.js`. El componente `FeaturedProject.jsx` pasará de ser un componente con todo en duro (hardcoded) a un mapa iterativo que renderizará los proyectos destacados desde los datos. Extraeremos y generalizaremos `ColDevPosModalContent` en un nuevo componente `ProjectModalContent.jsx`.

## Architecture Decisions

### Decision: Ubicación de los datos
**Choice**: Crear un archivo `src/data/projectsData.js` con un array constante exportado.
**Alternatives considered**: Hacer llamadas a una API local JSON, o colocar un estado fijo dentro de `FeaturedProject.jsx`.
**Rationale**: Como es un portfolio personal, los proyectos no cambian cada minuto. Un archivo JS dentro del código base proporciona la seguridad de tipos, carga síncrona inmediata sin loaders, y evita complejidad innecesaria. Es la solución más limpia y rápida para abstraer data en React.

### Decision: Abstracción del Modal
**Choice**: Generalizar el modal en `ProjectModalContent` pasándole el objeto `project` y dejando el modal manejar sus propias lógicas de galería, pero consumiendo la data a partir de `project.gallery` y `project.metrics`.
**Alternatives considered**: Montar múltiples modales distintos uno por cada proyecto, u ocultar lógicas del modal si no hay propiedades de 'Role/Type'.
**Rationale**: La generalización del modal previene la duplicación futura y mantiene un diseño cohesionado de UI. Al validar opcionalmente los campos `roles` en la galería, logramos que sea retrocompatible con la exigencia de UI avanzada de ColDevPOS, y a la vez limpio para proyectos más pequeños que solo tengan fotos sin categorías.

## Data Flow

    [projectsData.js] (Array estático)
           │
           ▼
    [FeaturedProject.jsx] ── Mapea datos y pinta Tarjeta(s)
           │
      (onClick "Ver Caso") pasa objeto `project`
           ▼
    [ProjectModalContent.jsx] ── Renderiza Banner, Título, Galería basada en `project.gallery`


## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/data/projectsData.js` | Create | Archivo nuevo que exporta `featuredProjects` array estructurado y limpio. |
| `src/components/FeaturedProject.jsx` | Modify | Reemplaza contenido HTML duro por iteración de UI a través del array importado desde attributes importados. |
| `src/components/ProjectModalContent.jsx` | Create | Refactor extraído de `ColDevPosModalContent`. Ahora acepta la prop `{ project }` y muestra la galería genéricamente. |

## Interfaces / Contracts

Estructura requerida para el objeto JS que representa un Proyecto Destacado:
```javascript
export const featuredProjects = [
  {
    id: "coldevpos",
    title: "ColDevPOS — Punto de Venta Dinámico",
    subtitle: "Punto de Venta sin Internet. Ni la lluvia, ni la señal nos detienen.",
    thumbnail: "/images/coldevpos/home.png",
    demoUrl: "https://controldecalidad.netlify.app",
    tags: ["Boleta Electrónica", "Windows 10+", "Soporte Local"],
    modalDetails: {
      headline: "ColDevPOS — Punto de Venta sin Internet",
      description: "Sistema integral de caja...",
      features: ["Caja rápida offline", "Integración API SII Directa", "Sincronización transparente de inventario"],
      gallery: [
        { id: 1, role: "Caja", type: "POS", title: "Caja - Ventas fluidas", caption: "Vendes, cobras...", src: "/images/coldevpos/pos.png" }
        // ...
      ],
      credentials: [
        { label: "Demo local", text: "Se ejecuta en Windows localmente" }
      ]
    }
  }
];
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit | Formato de datos en `projectsData.js` | Chequear que cada proyecto cumpla con los atributos mínimos como `id`, `title` y `gallery`. |
| Integration | Renderizado de UI de `FeaturedProject.jsx` | Renderizar el componente usando un MOCK de `projectsData` de 2 ítems y asegurar que se monten 2 tarjetas en pantalla. |
| Integration | Modal dinámico de `ProjectModalContent.jsx` | Inyectar data con y sin sub-roles de galería y verificar que los "selectores" de filtros se rendericen (o se oculten) debidamente. |

## Migration / Rollout
No migration required. El cambio reescribirá el DOM directamente pero se verá visualmente idéntico a nivel UI para ColDevPOS.

## Open Questions
- [ ] ¿Cómo gestionar los estilos si múltiples proyectos tienen acentos de colores distintos? (Por el momento se usará el color genérico del Theme principal/Tailwind actual).

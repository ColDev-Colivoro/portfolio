# Technical Design: App Destacada ColDevPOS Web

## Architecture Decisions

| Decision | Context | Outcome |
|----------|---------|---------|
| "Reemplazo de Variables Root" (Solo Data) | No hay necesidad de codificar nuevo JSX para actualizar este panel principal debido al refactor de la Fase Anterior. | Editaremos directamente variables nativas del Javascript puro que exporta `projectsData.js`. |
| Mantener el Scope de `modalDetails` | La sección interna del modal es valiosa de conservar porque demuestra que el autor creó la Landing Web y el Software Nativo real. | Solo el Object properties externas (`title`, `subtitle`, `thumbnail`) cambiarán, dejando `modalDetails` encapsulando la suite "vieja" intacta. |
| Inserción de nueva imagen WebP/PNG | El nuevo screenshot es pesado. Idealmente hay que usar rutas seguras de Vite. | Ubicar en una carpeta segura como `public/images/coldevpos/landing-dark.png`. |

## Data Flow
- `projectsData.js` -> array local exportado -> *Modified `thumbnail` and `subtitle` props*.
- `FeaturedProject.jsx` -> Importa `featuredProjects` y pinta la nueva foto con sus copys directamente sin notar el cambio estructural.

## File Changes
| Path | Action | Description |
|------|--------|-------------|
| `src/data/projectsData.js` | Update | Reescritura semántica (string replacement) de los textos raíz del proyecto ID: "coldevpos" (No su "modalDetails"). |
| `public/images/coldevpos/landing_web.png` | Add | Insertar la captura Dark enviada por el usuario (el orquestador asume su existencia base). |

## Integration Strategy
- Al ser React y Vite, el "Hot Reloading" detectará el JSON/JS modificado y pintará inmediatamente el viewport principal distinto.
- No hay problemas de asincronicidad, `projectsData.js` es síncrono.

## Automated Testing Strategy
- Validar visual / HMR.
- Validar Suite Existente en `npm run test` para asegurar que el cambio de texto e imagen no falla el render general.

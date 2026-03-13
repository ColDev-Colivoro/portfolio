# Proposal: Refactorización de Proyectos Destacados

## Intent
Actualmente, el componente `FeaturedProject.jsx` está fuertemente acoplado a un único proyecto ("ColDevPOS"). Toda la información (textos, imágenes, enlaces, galerías, credenciales) y la lógica del modal complejo viven dentro del mismo archivo estático. El objetivo de este cambio es abstraer esta información hacia el estado o atributos (props) respaldados por un arreglo de datos puro, haciendo que el componente sea dinámico, reutilizable y capaz de renderizar múltiples proyectos destacados sin necesidad de duplicar código de la interfaz de usuario.

## Scope

### In Scope
- Refactorización de `src/components/FeaturedProject.jsx` para extraer toda la data "harcodeada" de "ColDevPOS" hacia una constante/archivo independiente (ej: `projectsData.js` o state interno temporal).
- Modificación del renderizado principal para que itere sobre un arreglo de proyectos y muestre una tarjeta/layout por cada proyecto destacado (o permita navegar entre ellos con un grid/carrusel simple si hay varios).
- Abstracción de `ColDevPosModalContent` para que reciba como props la información de la galería, filtros (si aplican) y títulos, transformándolo en un `ProjectModalContent` genérico.

### Out of Scope
- Migración a una base de datos externa o CMS para traer los proyectos.
- Rediseño conceptual completo de la UI actual; mantendremos la estética visual de las tarjetas y el modal, solo la haremos dinámica bajo el capó.
- Agregar más de un proyecto ahora mismo (solo prepararemos el sistema para soportarlo).

## Approach
Aplicaremos el patrón de componentes de Presentación vs Contenedor/State. Desacoplaremos los datos de ColDevPOS colocándolos en un arreglo. El componente `FeaturedProject` mapeará este arreglo y renderizará el layout de previsualización para el proyecto. Al hacer clic en "Ver Caso de Estudio", se abrirá el modal genérico y pasará la data de ese objeto específico para que el modal construya su galería interna de forma dinámica.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/components/FeaturedProject.jsx` | Modificado | Refactorizado para mapear datos dinámicos en lugar de HTML/JSX estático. Renombrar funciones monolíticas. |
| `src/data/projectsData.js` (u otra ruta para data estática) | Creado | Nuevo archivo exclusivo para mantener los datos de los proyectos (texto, rutas imgs, métricas). |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Pérdida de características específicas de ColDevPOS (como el filtro "Roles" y "Tipo") | Medio | Evaluar si la estructura de galería genérica puede soportar un sistema de metadata (roles/categorías) en el objeto del proyecto para que siga funcionando el filtrado de ColDevPOS. |
| Problemas de renderizado o scroll con múltiples modales | Bajo | Solo un modal existirá a la vez; el estado controlará *qué* id de proyecto está activo en el modal. |

## Rollback Plan
Al trabajar con un sistema de control de versiones estándar, el rollback consistiría en hacer de forma explícita `git checkout` o `git revert` al commit previo a este refactor, devolviendo `FeaturedProject.jsx` a su estado monolítico. Al no afectar la infraestructura externa de la base de datos o paquetes, el rollback es inmediato.

## Dependencies
- Se requiere tener acceso directo a la carpeta `/images/coldevpos/` en `/public` para referenciar las imágenes temporalmente mientras se modela la data.

## Success Criteria
- [ ] El componente `FeaturedProject` lee su contenido desde un Array u objeto JS limpio.
- [ ] No existen textos "ColDevPOS" o URLs harcodeados directamente en el render principal del JSX.
- [ ] El modal sigue abriendo y mostrando correctamente todas las imágenes y características previas de ColDevPos, pero haciéndolo desde los props.
- [ ] Agregar un segundo objeto temporal de prueba al Array de proyectos exitósamente renderiza una segunda tarjeta destacada con sus propios datos separados en la UI y en el modal.

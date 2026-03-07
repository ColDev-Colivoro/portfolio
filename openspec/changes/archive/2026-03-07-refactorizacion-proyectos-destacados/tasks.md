# Tasks: Refactorización de Proyectos Destacados

## Phase 1: Estructura de Datos (Foundation)

- [x] 1.1 Crear el directorio `src/data` si no existe.
- [x] 1.2 Crear el archivo `src/data/projectsData.js` y exportar un array constante `featuredProjects`.
- [x] 1.3 Migrar y traducir todo el texto duro y enrutamiento a imágenes de "ColDevPOS" desde el actual `FeaturedProject.jsx` hacia el objeto dentro del array `featuredProjects`.

## Phase 2: Abstracción del Modal (Core Component)

- [x] 2.1 Crear el archivo `src/components/ProjectModalContent.jsx`.
- [x] 2.2 Mover el código actual de `ColDevPosModalContent` desde `src/components/FeaturedProject.jsx` al nuevo archivo.
- [x] 2.3 Refactorizar `ProjectModalContent.jsx` para que acepte un props `{ project }` y reemplace todas sus antiguas variables quemadas por lógicas de acceso dinámico (`project.modalDetails.title`, `project.modalDetails.gallery`, etc).
- [x] 2.4 Controlar la existencia de opciones de filtro en UI para la galería: mostrar selects solo si la data `project.modalDetails.gallery` lo requiere o contiene roles/tipos.

## Phase 3: Implementación de la Vista Principal (Integration)

- [x] 3.1 Editar `src/components/FeaturedProject.jsx` para importar `featuredProjects` desde `src/data/projectsData.js`.
- [x] 3.2 Modificar el mapeo externo del componente `FeaturedProject` para envolver la tarjeta actual de JSX dentro de un `.map()` que itere el arreglo de los proyectos. De momento, dejar la UI de tarjeta igual, pero mapeada a la variable.
- [x] 3.3 Importar `ProjectModalContent` y actualizar el state interno para que en vez de un solo "isOpenModal" booleano, guarde el `activeProjectId` que el usuario desee ver.
- [x] 3.4 Asegurarse de que al hacer "Ver Caso" de un proyecto en el mapa, se envíe el objeto completo en el render de `<ProjectModalContent project={activeProjectDada} />`.

## Phase 4: Comprobación y Testing (Verification)

- [x] 4.1 Ejecución del build (`npm run build`) validado existosamente sin errores de importación.
- [ ] 4.2 Probar visualmente los filtros e imágenes del modal ColDevPos para asegurar que nada del comportamiento antiguo del proyecto "destacado" se rompió al recibir datos como props.

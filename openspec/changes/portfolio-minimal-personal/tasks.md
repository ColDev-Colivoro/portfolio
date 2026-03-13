# Tasks: Portfolio Minimal Personal

## Phase 1: Foundation / Content Contracts

- [x] 1.1 Reescribir `src/data/siteContent.js` para que el hero y la navbar expongan solo nombre completo, rol, bajada breve y CTAs de portfolio en ES/EN.
- [x] 1.2 Auditar `src/data/siteContent.js`, `src/data/projectsData.js` y `src/pages/HomePage.jsx` para eliminar framing/copy de producto y dejar framing personal consistente.
- [x] 1.3 Crear o incorporar el asset web del logo gato en `public/images/branding/` y registrar su uso en `src/components/Navbar.jsx` y/o `src/components/Hero.jsx`.
- [x] 1.4 Verificar que los links de CV en `src/data/siteContent.js` y `public/documents/cv/` sigan el flujo `cv/*.tex` → PDF público.

## Phase 2: Identity Shell / First Screen

- [x] 2.1 Rehacer `src/components/Hero.jsx` desde cero para mostrar `José Camilo Colivoro Uribe`, rol principal, statement corto y máximo dos CTAs principales + una acción secundaria discreta.
- [x] 2.2 Refactorizar `src/components/Navbar.jsx` para usar logo gato + identidad personal, simplificar links y mantener selector ES/EN + descarga CV sin look de producto.
- [x] 2.3 Reordenar `src/pages/HomePage.jsx` para una secuencia curada de portfolio: hero, proyectos seleccionados, about, capacidades, certificados y contacto.
- [x] 2.4 Ajustar `src/pages/AboutPage.jsx`, `src/pages/ProjectsPage.jsx` y `src/pages/ContactPage.jsx` para que compartan el nuevo framing personal y la misma jerarquía visual.

## Phase 3: Layout / Sections / Density

- [x] 3.1 Simplificar `src/components/FeaturedProject.jsx` para que funcione como proyecto seleccionado y no como bloque hero secundario cargado.
- [x] 3.2 Refactorizar `src/components/Projects.jsx` y `src/components/ProjectModalContent.jsx` para mostrar proyectos como muestra curada de portfolio y no como landing comercial.
- [x] 3.3 Reequilibrar `src/components/About.jsx` y `src/components/Skills.jsx` para que expliquen enfoque, capacidades y pensamiento sistémico con menos densidad y más aire.
- [x] 3.4 Compactar `src/components/Certificates.jsx`, `src/components/Contact.jsx` y `src/components/Footer.jsx` para que sean sobrios, legibles y no compitan con la identidad principal.
- [x] 3.5 Hacer más discreto `src/components/Chatbot.jsx` o retirarlo del primer recorrido visual si sigue interfiriendo con la lectura del portfolio.

## Phase 4: Visual Language / Motion / Interaction

- [x] 4.1 Reescribir tokens base en `src/index.css` y `src/styles/global.css` para que negro/blanco dominen, `#FF6A00` sea el acento principal y rojo/plateado funcionen solo como microacentos.
- [x] 4.2 Eliminar gradientes ruidosos, glass fuerte, paneles excesivos y tratamientos visuales de landing en `Hero.jsx`, `FeaturedProject.jsx`, `Projects.jsx`, `About.jsx`, `Certificates.jsx` y `Contact.jsx`.
- [x] 4.3 Rediseñar `src/styles/animations.css` y los wrappers de motion en componentes para reemplazar reveals genéricos por un sistema editorial: entrada jerárquica del hero, transiciones de sección sutiles y microinteracciones premium.
- [x] 4.4 Rediseñar `src/components/Cursor.jsx` y `src/App.jsx` para recuperar el follower como una interacción elegante y premium (estilo Antigravity o mejor), con halo sobrio, magnetismo sutil y sin volverlo un efecto pobre o invasivo.
- [x] 4.5 Implementar una transición moderna de proyecto tipo card→panel en `src/components/FeaturedProject.jsx`, `src/components/Projects.jsx` y `src/components/ProjectModalContent.jsx` si mejora la lectura sin recargarla.

## Phase 5: Professional Assets / CV / Certificates

- [x] 5.1 Ajustar `cv/CV_Jose_Camilo_Colivoro_Uribe_ES.tex`, `cv/CV_Jose_Camilo_Colivoro_Uribe_EN.tex` y `cv/cv_style.tex` solo si hace falta para reflejar el nuevo framing personal y minimalista.
- [ ] 5.2 Regenerar los PDFs públicos del CV desde LaTeX y sincronizarlos en `public/documents/cv/`.
- [x] 5.3 Validar que `src/components/Certificates.jsx` y `src/data/siteContent.js` presenten certificados visibles pero secundarios al portfolio, con links funcionales en ES/EN.
- [x] 5.4 Confirmar que `src/components/Contact.jsx` y `src/components/Footer.jsx` mantengan contacto sobrio/privado, priorizando formulario y LinkedIn por sobre exposición de datos.

## Phase 6: Testing / Verification

- [x] 6.1 Actualizar `src/App.test.jsx` y/o `src/components/__tests__/*` para cubrir nombre dominante, rol visible, hero minimal y ausencia de chips/stats/side-card en ES/EN.
- [x] 6.2 Agregar o ajustar tests para navbar, links de CV, orden de secciones y estado refinado/no intrusivo del cursor follower.
- [x] 6.3 Ejecutar `npm run test` y corregir regresiones directamente relacionadas con `portfolio-minimal-personal`.
- [x] 6.4 Ejecutar `npm run build` y corregir errores de compilación o estilos rotos.
- [ ] 6.5 Realizar verificación manual en desktop y móvil: primera pantalla claramente personal, nombre dominante, hero respirado, motion elegante, follower premium sobrio, CTAs funcionales y ritmo visual no amontonado.

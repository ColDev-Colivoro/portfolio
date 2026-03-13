# UI Specification: Actualización ColDevPOS a Interfaz Web (Landing)

## Purpose
Especificar cómo el componente de `FeaturedProject` pasará a mostrar el diseño oscuro "Landing Web" del proyecto principal, manteniendo la data anidada de la galería intocable. 

## Requirements

### Requirement: Nueva Foto Principal (Thumbnail)

El objeto subyacente para ColDevPOS MUST tener actualizado su campo `thumbnail`, indicando la nueva imagen de portada "modo oscuro web".

#### Scenario: Visualización del nuevo Thumbnail
- GIVEN el usuario navega a la sección de Proyectos Destacados
- WHEN el dom carga `FeaturedProject.jsx` con los datos de `projectsData.js`
- THEN la tarjeta flotante muestra en su extremo izquierdo la imagen del frontend (Landing oscura).

### Requirement: Copys Seductores Actualizados

Los textos inmediatos del viewport principal MUST ser actualizados por frases impactantes para un mejor CTR ("Click-Through Rate").

#### Scenario: Carga de nuevos subtítulos e impactos
- GIVEN el arreglo `featuredProjects` tiene la data cargada
- WHEN la interfaz reactiva renderiza la tarjeta ColDevPOS
- THEN el subtítulo enlista los "Bullet points" o narrativa similar a la nueva UI enviada en tu captura de pantalla.

### Requirement: Galería Modal Preservada Automáticamente

Debido al diseño modular pre-existente, las interacciones con el Modal secundario SHALL NO romperse ni ocultarse. La galería "vieja" sobre la caja (modo Windows) vivirá detrás del botón "Ver Caso de Estudio".

#### Scenario: Contención Intacta de Interacciones Internas
- GIVEN que la portada ya es oscura y sobre un diseño web
- WHEN el usuario le da "Ver Caso de Estudio"
- THEN aún acceden a la galería y las demostraciones del software nativo que siguen en JSON intactas en la variable `project.modalDetails.gallery`.

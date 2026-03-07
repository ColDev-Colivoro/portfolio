# UI Specification: Proyectos Destacados

## Purpose
Especificar el comportamiento de la sección "Proyectos Destacados" en el portafolio, haciendo énfasis en cómo el `FeaturedProject` consume y pinta los datos, así como el comportamiento del Modal genérico.

## Requirements

### Requirement: Datos Dinámicos

El componente principal `FeaturedProject` MUST leer su contenido (título, descripción, imagen principal y data para el modal) desde una estructura de datos o arreglo externo (ej. `projectsData`), en lugar de texto estático ('hardcodeado').

#### Scenario: Contenido cargado con éxito
- GIVEN que el archivo de datos contiene la información de "ColDevPOS"
- WHEN el componente `FeaturedProject` se monta en pantalla
- THEN se debe visualizar la tarjeta del proyecto con la imagen, título y descripción proveídos en la estructura de datos.

### Requirement: Apertura del Modal de Casos de Estudio

Al hacer clic en "Ver Caso de Estudio", el sistema SHALL abrir un modal genérico que MUST recibir como dependencias/props la estructura del proyecto seleccionado.

#### Scenario: Visualización del caso de estudio
- GIVEN que el usuario está viendo un proyecto destacado específico ('ColDevPOS')
- WHEN el usuario hace clic en el botón "Ver Caso de Estudio"
- THEN se despliega el `ProjectModalContent` genérico.
- AND este modal exhibe los título principal, banner y la galería interna perteneciente ÚNICAMENTE al proyecto seleccionado.

### Requirement: Galería Dinámica y Filtros Internos

El `ProjectModalContent` SHOULD ser capaz de renderizar galerías de imágenes asociadas al proyecto, posibilitando filtrado solo si las categorías/roles están definidos en los datos del proyecto.

#### Scenario: Galería con Categorías
- GIVEN que en la data del proyecto los paneles fotográficos tienen atributos de 'role' (ej: 'Caja', 'Admin') 
- WHEN el usuario abre el modal
- THEN deben aparecer *selectores* de filtrado correspondientes a esos roles únicos.

#### Scenario: Galería Básica (Sin Categorías Estrictas)
- GIVEN que en la data de un nuevo proyecto secundario, los paneles NO tienen definidos campos 'role' o 'type'
- WHEN el usuario abre el modal
- THEN la galería de imágenes se muestra sin los *selectores* de filtrado, ocupando el espacio de forma limpia. 

### Requirement: Escalabilidad de Múltiples Proyectos

Si el array de datos tiene más de 1 proyecto, la UI SHOULD representarlo, ya sea iterando verticalmente las tarjetas o por medio de un carrusel. Por ahora (Mínimo Producto Viable del refactor) iterará verticalmente.

#### Scenario: Renderizado Múltiple
- GIVEN un `projectsData` que contiene 2 objetos ("ColDevPOS" y "Proyecto X")
- WHEN se renderiza la sección `FeaturedProject`
- THEN deben aparecer 2 tarjetas consecutivas en la pantalla.
- AND hacer clic en "Ver Caso de Estudio" de la segunda tarjeta, debe abrir el contenido de la segunda tarjeta y no mezclar la data.

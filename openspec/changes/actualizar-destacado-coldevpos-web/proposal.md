# Proposal: Actualizar Diseño Destacado a ColDevPOS Web

## Intent
Mejorar la presentación del proyecto más importante del portafolio (ColDevPOS) cambiando la imagen de presentación actual (que muestra la caja interna) por el diseño oscuro, moderno y premium que corresponde a su Landing Page. Esto venderá mucho mejor las habilidades de desarrollo UI del autor.

## Scope

### In Scope
- Actualizar el título y subtítulo del proyecto destacado de ColDevPOS en `projectsData.js` usando frases de impacto ("Caja, boleta e inventario juntos", "Si falla internet, la venta sigue").
- Reemplazar la ruta de imagen `thumbnail` para apuntar a la nueva imagen de la landing page.
- Mantener intactas las imágenes y metadata actuales del modal, que actúan como un visor interior del software ( galería fotográfica y reportes internos ).
- Alojamiento u ordenamiento de la nueva imagen enviada por el usuario en `/public/images/`.

### Out of Scope
- Agregar proyectos estructuralmente nuevos (el cambio afectará al objeto `coldevpos` pre-existente).
- Modificar el código fuente React de `FeaturedProject.jsx` o `ProjectModalContent.jsx`. (El cambio es impulsado puramente por datos en el Array).
- Cambiar el layout existente en toda la app de portafolio.

## Approach
Dado que la arquitectura de "Smart Provider / Dumb Component" ya está instaurada, utilizaremos el **"Reemplazo Parcial / Híbrido"**. Solamente modificaremos el archivo de `src/data/projectsData.js` para reescribir la metadata root del proyecto, actualizando `thumbnail`, `subtitle`, y textualmente la forma en cómo se presenta. Todo el bloque "gallery" permanecerá igual para el modal. 

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/data/projectsData.js` | Modified | Actualización de textos en el objeto y la ruta `thumbnail` |
| `public/images/coldevpos/` | New | Agregaremos la nueva imagen de "landing" que nos proporcionó el usuario. |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| La nueva imagen no calza con el responsive de la tarjeta | Low | Ya hay clases object-cover o similiares aplicables. Vigilar si necesita recortes extra. |
| Olvidar arrastrar/importar la nueva foto en el proyecto | Medium | Solicitaré confirmación del archivo origen para copiarlo a la carpeta /public. |

## Rollback Plan
Restaurar `projectsData.js` a su último commit anterior en la rama (`git checkout HEAD src/data/projectsData.js`) con los datos del sistema viejo.

## Dependencies
- La captura proporcionada de "Todo en una pantalla" debe de estar en `/public/images/coldevpos/landing.png` o equivalente.

## Success Criteria
- [ ] La tarjeta principal muestra la nueva Landing Page oscura (ColDevPOS Web).
- [ ] Los textos copian fraseología estilo The Landing ("Punto de venta sin internet. Ni la lluvia, ni la señal...").
- [ ] Al presionar "Ver caso de estudio", el modal continúa mostrando las fotos del "Caja", "Admin", etc, originales.

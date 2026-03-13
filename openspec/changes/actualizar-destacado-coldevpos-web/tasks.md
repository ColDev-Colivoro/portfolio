# Tasks: Actualizar Diseño Destacado a ColDevPOS Web

## Phase 1: Reemplazo de Medios (Media Replacement)

- [ ] 1.1 Localizar o recibir del usuario la imagen enviada "Todo en una pantalla" (Landing Oscura). 
- [ ] 1.2 Nombrarla `landing_web.png` (o su formato optimizado) y colocarla en `public/images/coldevpos/`.

## Phase 2: Edición Estática (Data Root Edits)

- [x] 2.1 Abrir `src/data/projectsData.js`.
- [x] 2.2 Reemplazar la ruta `/images/coldevpos/home.png` del objeto principal de "coldevpos" (propiedad: `thumbnail`) hacia la nueva foto ingresada.
- [x] 2.3 Reemplazar el `subtitle` con el copys impactante: "Punto de Venta Sin Internet. Ni la lluvia, ni la señal. Nada nos para. Caja, inventario y boleta electrónica SII operando juntos sin salir del mismo flujo para Windows".

## Phase 3: Verificación Rápida y Limpieza

- [ ] 3.1 Realizar HMR / Refresh y verificar que la imagen no rompa su grid contenedor. Las clases `object-cover` ya previenen eso, pero constátalo viendo el proyecto local en Vite.
- [ ] 3.2 Visualiza y prueba el Botón "Ver caso de estudio" e inspecciona que el array fotográfico del Desktop software nativo siga intacto y funcional por dentro.

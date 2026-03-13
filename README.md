# Portfolio - Colivoro Developer

> **José Camilo Colivoro Uribe**  
> *Analista Programador | Full Stack Developer | Software Engineer*

Este repositorio contiene el código fuente de mi portafolio digital, diseñado y construido con un enfoque moderno, integrando una estética audaz ("Glassmorphism" y acentos vibrantes) y arquitectura modular basada en React.

🚀 **Visualiza el portafolio en vivo:** [colivoro-developer.netlify.app](https://colivoro-developer.netlify.app)

---

## 🎯 Objetivo de este Proyecto
Centralizar y exponer mis proyectos más recientes (incluyendo **ColDevPOS**), junto a mi experiencia profesional y stack formativo.

Además, funciona como demostración técnica al integrar funcionalidades dinámicas como enrutamiento optimizado, animaciones y navegación por secciones.

## 💻 Tecnologías y Frameworks
- **Frontend Core**: React 18, Vite.
- **Enrutamiento**: React Router v6 (Manejo de vista principal y vista dedicada para `/proyectos`).
- **Styling**: Tailwind CSS (Configuración con paleta de colores personalizada, clases utilitarias para *glassmorphism* y gradientes sutiles).
- **Animaciones e Interacciones**: Framer Motion, Lucide React (Íconos UI).
- **Componentes Base**: Radix UI (Estructuras accesibles).
- **Backend**: Netlify Functions (Node.js) para extensiones serverless del sitio.
- **Despliegue y CI/CD**: Netlify.

---

## 🧩 Estructura Principal del Proyecto

El código está estructurado en `src/` con las siguientes divisiones lógicas:

- `/pages`: Vistas o páginas completas.
  - `ProjectsPage.jsx`: Vista dedicada a listar proyectos secundarios de forma limpia, evitando recargar la vista principal.
- `/components`: 
  - `Hero.jsx`, `About.jsx`, `Contact.jsx`, `Skills.jsx`, `Footer.jsx`: Componentes seccionales de la vista central.
  - `Navbar.jsx`: Barra de navegación responsive con control de scroll activo y enrutador dinámico.
  - `FeaturedProject.jsx`: Exhibición destacada de **ColDevPOS**, sistema POS offline desarrollado en React, Node y SQLite.
- `App.jsx`: Orquestador principal de las rutas y manejos de estados transversales.
- `/netlify/functions/`: espacio para funciones serverless cuando corresponda.

---

## 🪟 Patrón UI: Modales globales (Case Study)

- Los modales de casos (`FeaturedProject` y `Projects`) se renderizan mediante **portal a `document.body`** usando `src/components/CaseStudyModalShell.jsx`.
- Motivo: evitar desplazamientos o deformaciones cuando el árbol padre usa animaciones con `transform`/`filter`.
- El shell unifica:
  - cierre por backdrop, botón y tecla `Escape`,
  - `scroll-lock` del `body` al abrir/cerrar,
  - scroll interno del contenido con **barra visual oculta** (`scrollbar-none`) manteniendo rueda/touch.

> Si agregas nuevos modales de pantalla completa, reutiliza este patrón para mantener consistencia visual y de accesibilidad base.

---

## 🛠️ Instrucciones Locales

Si deseas revisar el código y ejecutar el proyecto localmente, sigue estos pasos:

1. **Clona este repositorio:**
   ```bash
   git clone https://github.com/username/colivoro-developer.git
   cd colivoro-developer
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Configura variables de entorno:**
   Copia `.env.example` a `.env` en la raíz del proyecto:
   ```bash
   cp .env.example .env
   ```
   En Windows PowerShell:
   ```powershell
   Copy-Item .env.example .env
   ```
   Luego completa:
   ```env
   VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/tu_form_id
   ```

4. **Levanta el entorno local con funciones Netlify (recomendado):**
   ```bash
   netlify dev
   ```
   Esto permite probar funciones Netlify localmente junto al frontend.

5. **Alternativa solo frontend (sin funciones serverless):**
   ```bash
   npm run dev
   ```
   *La aplicación estará disponible usualmente en http://localhost:5173*.

---

## 🔐 Variables de entorno

- `VITE_FORMSPREE_ENDPOINT` (client-side): endpoint de Formspree para el formulario.

> Nunca subas `.env` al repositorio. Este proyecto ignora `.env*` y conserva solo `.env.example`.

---

## ☁️ Configuración en Netlify (producción)

Configura las variables en el sitio de Netlify:

```bash
netlify env:set VITE_FORMSPREE_ENDPOINT "https://formspree.io/f/tu_form_id"
```

Luego despliega:

```bash
netlify deploy --prod
```

---

## 📄 Flujo de CV (Fuente de verdad)

- La fuente de verdad del CV está en `../cv/*.tex` (LaTeX).
- Cuando se actualice contenido o estilo del CV, primero se modifica LaTeX y luego se exporta a PDF.
- Los PDFs públicos usados por el sitio deben mantenerse en `public/documents/cv/`:
   - `jose-colivoro-cv-es.pdf`
   - `jose-colivoro-cv-en.pdf`

---

## 📩 Contacto
¿Hablamos sobre oportunidades o desarrollo de software? Contáctame directamente:

- **Email**: jose.coldev@gmail.com
- **WhatsApp**: +56 9 9493 1221 / +56 9 4586 7825
- **LinkedIn**: [Perfil de José Colivoro](https://linkedin.com/in/camilo-colivoro-1a5206386)

> Creado desde el Sur de Chile 🇨🇱

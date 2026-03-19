import { GoogleGenerativeAI } from '@google/generative-ai';

const MAX_HISTORY_MESSAGES = 10;
const MAX_MESSAGE_LENGTH = 700;

const trimText = (value = '', maxLength = MAX_MESSAGE_LENGTH) =>
  String(value).replace(/\s+/g, ' ').trim().slice(0, maxLength);

const PORTFOLIO_CONTEXT = {
  es: `
Perfil actual del portfolio:
- Nombre: José Camilo Colivoro Uribe
- Rol: Analista Programador / Full Stack Developer
- Enfoque: diseño e implementación de software aplicado a operación real

Capacidades destacadas:
- Desarrollo frontend (React, Vite, Tailwind)
- Backend y APIs (Node.js, Python, SQL)
- Automatización y apoyo con IA aplicada
- Integración de sistemas y continuidad operativa

Proyectos visibles (explicar por: problema, enfoque, resultado y stack):
- Nutriscoc Connect:
  problema: operación corporativa fragmentada entre seguimiento, compromisos y KPIs.
  enfoque: plataforma full stack con backend en Django/DRF, frontend en Next.js + React + TypeScript, y despliegue con PostgreSQL + Docker + Nginx.
  resultado: trazabilidad operacional, paneles para decisión y control por roles.
  stack: Django 5, DRF, Next.js 15, React, TypeScript, PostgreSQL, Docker, Nginx, JWT, Firebase Auth.
- ColDevPOS:
  problema: flujo de venta, inventario y registro con riesgo de fricción en operación real.
  enfoque: ecosistema POS local con UX operativa y persistencia en desktop.
  resultado: continuidad operativa y trazabilidad comercial en una sola arquitectura.
  stack: React, TypeScript, Tauri, SQLite.
- Dashboard SGC (Sistema de Gestión de Cursos, base VoyScout):
  problema: coordinación de cursos con registros y seguimiento dispersos.
  enfoque: gestión centralizada de cursos, asistencia y administración.
  resultado: mejor control de operación académica y seguimiento administrativo.
  stack: Python, Django, SQL, React.
- ColDev Radar Sur:
  problema: operación de campo con baja visibilidad y control de cumplimiento.
  enfoque: paneles operativos y trazabilidad para acciones críticas en terreno.
  resultado: seguimiento estandarizado y decisiones rápidas basadas en evidencia.
  stack: React, TypeScript, KPI Dashboards, Traceability.
- Mar2Control:
  problema: calidad operacional sin una vista unificada de compromisos e incidencias.
  enfoque: dashboards por rol para control de calidad, KPIs y monitoreo.
  resultado: menor fricción de seguimiento y mejor coordinación diaria.
  stack: React, TypeScript, Operational Dashboards, KPI Tracking.

Cómo está hecho el portfolio:
- Frontend SPA en React + Vite + TailwindCSS.
- Navegación por rutas laterales con React Router (`/`, `/proyectos`, `/about`, `/contact`).
- Animaciones con Framer Motion (transiciones laterales compartidas y Hero con movimiento propio).
- Sección Proyectos en Bento curado de 5 bloques con apertura de caso en modal.
- Chatbot Chimubot embebido como overlay con endpoint serverless.
- CommandBar flotante con accesos rápidos y System Log de versión/build/commit.
- Contenido centralizado en `src/data/siteContent.js` y `src/data/projectsData.js`.
- System Log alimentado por metadatos de build inyectados por Vite.
- Endpoint de chat en Netlify Function usando Gemini.
`,
  en: `
Current portfolio profile:
- Name: José Camilo Colivoro Uribe
- Role: Software Analyst / Full Stack Developer
- Focus: designing and implementing software for real operations

Highlighted capabilities:
- Frontend development (React, Vite, Tailwind)
- Backend and APIs (Node.js, Python, SQL)
- Automation and applied AI support
- Systems integration and operational continuity

Visible projects (explain by: problem, approach, outcome, and stack):
- Nutriscoc Connect:
  problem: corporate operations were fragmented across follow-up, commitments, and KPIs.
  approach: full stack platform with Django/DRF backend, Next.js + React + TypeScript frontend, and PostgreSQL + Docker + Nginx deployment.
  outcome: operational traceability, decision dashboards, and role-based control.
  stack: Django 5, DRF, Next.js 15, React, TypeScript, PostgreSQL, Docker, Nginx, JWT, Firebase Auth.
- ColDevPOS:
  problem: sales, inventory, and records had high friction risk in real operation.
  approach: local POS ecosystem with operational UX and desktop persistence.
  outcome: operational continuity and commercial traceability in one architecture.
  stack: React, TypeScript, Tauri, SQLite.
- SGC Dashboard (Course Management System, VoyScout base):
  problem: course coordination had scattered records and follow-up.
  approach: centralized management for courses, attendance, and administration.
  outcome: better academic operations control and admin follow-up.
  stack: Python, Django, SQL, React.
- ColDev Radar Sur:
  problem: field operations lacked visibility and compliance control.
  approach: operational dashboards and traceability for critical field actions.
  outcome: standardized follow-up and faster evidence-based decisions.
  stack: React, TypeScript, KPI Dashboards, Traceability.
- Mar2Control:
  problem: quality operations lacked a unified view of commitments and incidents.
  approach: role-based dashboards for quality control, KPIs, and monitoring.
  outcome: lower follow-up friction and better daily coordination.
  stack: React, TypeScript, Operational Dashboards, KPI Tracking.

How the portfolio is built:
- Frontend SPA with React + Vite + TailwindCSS.
- Route-based lateral navigation with React Router (`/`, `/proyectos`, `/about`, `/contact`).
- Framer Motion animations (shared lateral transitions and independent Hero motion).
- Projects section as a curated 5-block bento with case-study modal.
- Embedded Chimubot chatbot as an overlay with a serverless endpoint.
- Floating CommandBar with quick links and a System Log for version/build/commit.
- Centralized content in `src/data/siteContent.js` and `src/data/projectsData.js`.
- System Log fed by build metadata injected by Vite.
- Chat endpoint on Netlify Functions using Gemini.
`,
};

const buildPortfolioContext = (lang = 'es') => {
  return trimText(PORTFOLIO_CONTEXT[lang] ?? PORTFOLIO_CONTEXT.es, 2400);
};

const buildSystemInstruction = (lang = 'es') => `
Eres el asistente virtual del portafolio de José Camilo Colivoro Uribe (ColDev).

Reglas:
- Responde SIEMPRE en ${lang === 'en' ? 'inglés' : 'español'}.
- Mantén un tono profesional, claro, amable y seguro.
- Sé breve: máximo dos párrafos cortos o bullets compactos.
- Basarte SOLO en el contexto entregado en este mensaje.
- Si preguntan algo fuera del ámbito profesional de José, indica ese límite.
- Si el usuario quiere contactarlo, recomienda usar el formulario o LinkedIn del sitio.
- No entregues teléfonos personales ni inventes información.
- Si preguntan por un proyecto específico, responde con la estructura: problema, enfoque, resultado, stack.
- Si preguntan por cómo está construido el portfolio, explica arquitectura (frontend, rutas, animaciones, data y chatbot) en bullets claros.

Contexto estructurado del portfolio:
${buildPortfolioContext(lang)}
`;

const isContactIntent = (text = '') =>
  /(contact|contacto|linkedin|hablar|hablemos|correo|email|contratar|hire)/i.test(text);

const buildContactReply = (lang = 'es') =>
  lang === 'en'
    ? 'You can contact José using the site contact form or via LinkedIn. If you share your context and goal, he can reply through the right channel.'
    : 'Puedes contactar a José usando el formulario del sitio o vía LinkedIn. Si compartes el contexto y objetivo, te responde por el canal adecuado.';

const buildGeminiHistory = (sanitizedMessages) => {
  const mappedHistory = sanitizedMessages
    .slice(0, -1)
    .map((message) => ({
      role: message.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: message.content }],
    }))
    .filter((item) => item.parts?.[0]?.text);

  const firstUserIndex = mappedHistory.findIndex((item) => item.role === 'user');
  if (firstUserIndex === -1) return [];

  return mappedHistory.slice(firstUserIndex);
};

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let normalizedLang = 'es';

  try {
    const { messages, lang = 'es' } = JSON.parse(event.body ?? '{}');
    const apiKey = process.env.GEMINI_API_KEY;
    normalizedLang = lang === 'en' ? 'en' : 'es';

    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          reply:
            normalizedLang === 'en'
              ? 'I cannot access the AI model configuration right now. Please try again later or use the contact form on the site.'
              : 'No puedo acceder a la configuración del modelo ahora mismo. Intenta nuevamente más tarde o usa el formulario del sitio.',
        }),
      };
    }

    if (!Array.isArray(messages) || messages.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          reply:
            normalizedLang === 'en'
              ? 'Please send a valid message so I can help with José’s portfolio.'
              : 'Por favor envía un mensaje válido para ayudarte con el portfolio de José.',
        }),
      };
    }

    const sanitizedMessages = messages
      .filter((message) => message && (message.role === 'user' || message.role === 'assistant'))
      .slice(-MAX_HISTORY_MESSAGES)
      .map((message) => ({
        role: message.role,
        content: trimText(message.content),
      }));

    const latestMessage = sanitizedMessages[sanitizedMessages.length - 1]?.content ?? '';

    if (!latestMessage) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          reply:
            normalizedLang === 'en'
              ? 'Please write a short question about projects, experience, or technical approach.'
              : 'Escribe una pregunta breve sobre proyectos, experiencia o enfoque técnico.',
        }),
      };
    }

    if (isContactIntent(latestMessage)) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reply: buildContactReply(normalizedLang) }),
      };
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: buildSystemInstruction(normalizedLang),
    });

    const history = buildGeminiHistory(sanitizedMessages);

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(latestMessage);
    const responseText = trimText(result.response.text(), 900);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reply: responseText }),
    };
  } catch (error) {
    console.error('Error in chat function:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        reply:
          normalizedLang === 'en'
            ? 'There was a problem while answering from the assistant. Please try again in a moment.'
            : 'Hubo un problema al responder desde el asistente. Intenta nuevamente en un momento.',
      }),
    };
  }
};

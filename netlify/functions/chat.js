import { GoogleGenerativeAI } from '@google/generative-ai';
import { projectsCatalog } from '../../src/data/projectsData.js';

const MAX_HISTORY_MESSAGES = 10;
const MAX_MESSAGE_LENGTH = 700;

export const normalizeMessageInput = (value = '', maxLength = MAX_MESSAGE_LENGTH) =>
  String(value).replace(/\s+/g, ' ').trim().slice(0, maxLength);

export const normalizeStructuredResponse = (value = '') =>
  String(value)
    .replace(/\r\n?/g, '\n')
    .replace(/[ \t]+$/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .trimEnd();

const PORTFOLIO_CONTEXT_SECTIONS = {
  es: [
    `Perfil profesional:
- Nombre: José Camilo Colivoro Uribe
- Rol: Analista Programador / Full Stack Developer
- Enfoque: diseño e implementación de software aplicado a operación real`,

    `Capacidades:
- Desarrollo frontend (React, Vite, Tailwind)
- Backend y APIs (Node.js, Python, SQL)
- Automatización y apoyo con IA aplicada
- Integración de sistemas y continuidad operativa`,

    `Arquitectura del portfolio:
- Frontend SPA en React + Vite + TailwindCSS.
- Navegación por rutas laterales con React Router ('/', '/proyectos', '/about', '/contact').
- Animaciones con Framer Motion (transiciones laterales compartidas y Hero con movimiento propio).
- Sección Proyectos en Bento curado con apertura de caso en modal y enlaces directos cuando existe una demo pública.
- Chatbot Chimubot embebido como overlay con endpoint serverless.
- CommandBar flotante con accesos rápidos y System Log de versión/build/commit.
- Contenido centralizado en 'src/data/siteContent.js' y 'src/data/projectsData.js'.
- System Log alimentado por metadatos de build inyectados por Vite.
- Endpoint de chat en Netlify Function usando Gemini.`,
  ],
  en: [
    `Professional profile:
- Name: José Camilo Colivoro Uribe
- Role: Software Analyst / Full Stack Developer
- Focus: designing and implementing software for real operations`,

    `Capabilities:
- Frontend development (React, Vite, Tailwind)
- Backend and APIs (Node.js, Python, SQL)
- Automation and applied AI support
- Systems integration and operational continuity`,

    `Portfolio architecture:
- Frontend SPA with React + Vite + TailwindCSS.
- Route-based lateral navigation with React Router ('/', '/proyectos', '/about', '/contact').
- Framer Motion animations (shared lateral transitions and independent Hero motion).
- Projects section as a curated bento with a case-study modal and direct links for public demos.
- Embedded Chimubot chatbot as an overlay with a serverless endpoint.
- Floating CommandBar with quick links and a System Log for version/build/commit.
- Centralized content in 'src/data/siteContent.js' and 'src/data/projectsData.js'.
- System Log fed by build metadata injected by Vite.
- Chat endpoint on Netlify Functions using Gemini.`,
  ],
};

const localize = (value, lang) => value?.[lang] ?? value?.es ?? '';

const buildProjectsContext = (lang) => {
  const labels =
    lang === 'en'
      ? { heading: 'Projects', summary: 'summary', problem: 'problem', outcome: 'outcome', stack: 'stack' }
      : { heading: 'Proyectos', summary: 'resumen', problem: 'problema', outcome: 'resultado', stack: 'stack' };

  const projectBlocks = projectsCatalog
    .filter(({ visible }) => visible)
    .map(
      (project) => `## ${localize(project.title, lang)}
- ${labels.summary}: ${localize(project.summary, lang)}
- ${labels.problem}: ${localize(project.problem, lang)}
- ${labels.outcome}: ${localize(project.impact, lang)}
- ${labels.stack}: ${project.stack.join(', ')}`,
    );

  return `${labels.heading} (explicar por problema, enfoque, resultado y stack):\n\n${projectBlocks.join('\n\n')}`;
};

export const buildPortfolioContext = (lang = 'es') => {
  const sections = PORTFOLIO_CONTEXT_SECTIONS[lang] ?? PORTFOLIO_CONTEXT_SECTIONS.es;
  return [sections[0], sections[1], buildProjectsContext(lang), sections[2]]
    .map((section) => normalizeStructuredResponse(section))
    .join('\n\n');
};

export const buildSystemInstruction = (lang = 'es') => `
Eres el asistente virtual del portafolio de José Camilo Colivoro Uribe (ColDev).

Reglas:
- Responde SIEMPRE en ${lang === 'en' ? 'inglés' : 'español'}.
- Mantén un tono profesional, claro, amable y seguro.
- Sé breve y legible: usa párrafos cortos y listas cuando ayuden a ordenar la respuesta.
- Basarte SOLO en el contexto entregado en este mensaje.
- Si preguntan algo fuera del ámbito profesional de José, indica ese límite.
- Si el usuario quiere contactarlo, recomienda usar el formulario o LinkedIn del sitio.
- No entregues teléfonos personales ni inventes información.
- Si preguntan por un proyecto específico, responde con la estructura: problema, enfoque, resultado, stack.
- Si preguntan por cómo está construido el portfolio, explica arquitectura (frontend, rutas, animaciones, data y chatbot) en bullets claros.
- No cortes una idea o bloque a la mitad. Si una explicación requiere más espacio, entrega primero los bloques más relevantes e indica que puedes continuar.

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
        content: normalizeMessageInput(message.content),
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
    const responseText = normalizeStructuredResponse(result.response.text());

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

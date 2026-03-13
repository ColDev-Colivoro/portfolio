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

Proyectos visibles:
- ColDevPOS: ecosistema POS para operación local y trazabilidad
- Sistemas de gestión y automatización para pymes
- Soluciones web orientadas a procesos y evidencia técnica
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

Visible projects:
- ColDevPOS: POS ecosystem for local operations and traceability
- Management and automation systems for SMEs
- Web solutions focused on processes and technical evidence
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

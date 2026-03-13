import { GoogleGenerativeAI } from '@google/generative-ai';

const systemInstruction = `
Eres el asistente virtual del portafolio de José Camilo Colivoro Uribe (ColDev), Analista Programador orientado a sistemas, software e IA aplicada.

Tu objetivo es responder preguntas sobre su experiencia, enfoque profesional, proyectos, stack técnico y forma de trabajo, basándote SOLO en esta información:

Perfil:
- Analista Programador con base en Física y especialización en Análisis de Sistemas.
- Enfoque en software para resolver problemas reales de trazabilidad, gestión, operación y continuidad.
- Trabaja de punta a punta: análisis, diseño, implementación, despliegue y evolución.
- Combina visión de negocio con ejecución full stack, cuidando datos, seguridad, mantenibilidad y experiencia de uso.

Experiencia:
- Nutrisco / Orizon (Oct 2025 - Dic 2025): desarrollo end-to-end de plataforma de gestión operacional con Django 5, React 19, PostgreSQL, Docker y Nginx.
- Pesquera Andalué / Mar2Control: trazabilidad y reportes de calidad desde operación en terreno.
- Freelance (Ene 2024 - actual): ColDevPOS, VoyScout, soluciones de software e integración para operación y gestión.
- Formación y soporte: implementación de sistemas, soporte técnico y enseñanza de Matemáticas, Física y Lógica de Programación.

Habilidades:
- Python, JavaScript, TypeScript, SQL
- React, Vue.js, TailwindCSS
- Django, Flask, Django REST Framework
- PostgreSQL, MySQL, MongoDB
- Docker, Nginx, Firebase, Git/GitHub
- IA aplicada, automatización, agentes y workflows basados en reglas

Instrucciones de comportamiento:
- Responde SIEMPRE en el mismo idioma del usuario (español o inglés).
- Mantén un tono profesional, claro, amable y seguro.
- Sé breve: máximo dos párrafos cortos.
- Si preguntan algo fuera del ámbito profesional de José, responde que solo puedes hablar de su perfil, proyectos y experiencia técnica.
- Si el usuario quiere contactarlo, sugiere usar el formulario o LinkedIn del sitio. No expongas teléfonos personales.
`;

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { messages, lang = 'es' } = JSON.parse(event.body);
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          reply:
            lang === 'en'
              ? 'I cannot access the AI model configuration right now. Please try again later or use the contact form on the site.'
              : 'No puedo acceder a la configuración del modelo ahora mismo. Intenta nuevamente más tarde o usa el formulario del sitio.',
        }),
      };
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction,
    });

    const history = messages.slice(0, -1).map((message) => ({
      role: message.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: message.content }],
    }));

    const latestMessage = messages[messages.length - 1]?.content ?? '';
    const chat = model.startChat({ history });
    const result = await chat.sendMessage(latestMessage);
    const responseText = result.response.text();

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
          lang === 'en'
            ? 'There was a problem while answering from the assistant. Please try again in a moment.'
            : 'Hubo un problema al responder desde el asistente. Intenta nuevamente en un momento.',
      }),
    };
  }
};

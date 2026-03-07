import { GoogleGenerativeAI } from '@google/generative-ai';

const systemInstruction = `
Eres el asistente virtual interactivo del portafolio de José Camilo Colivoro Uribe (alias ColDev, Analista Programador, Full Stack Developer y Applied AI Engineer). 
Tu objetivo es responder a las visitas del sitio sobre la experiencia, habilidades y proyectos de José, basándote ESTRICTAMENTE en la siguiente información:

Perfil: Analista Programador con base en Ciencias Físicas (UdeC) y especialización en Análisis de Sistemas. Me enfoco en construir software que resuelva problemas reales, con criterio técnico para descomponer, validar y entregar soluciones mantenibles. Combino visión de negocio con ejecución full stack, cuidando seguridad, datos y usabilidad.
Objetivo: Aportar como Full Stack Developer y Applied AI Engineer, construyendo productos robustos y seguros, con foco en calidad de código, UX y CI/CD.

Experiencia:
- Nutrisco / Orizon (Oct 2025 - Dic 2025): Full Stack Developer. Digitalización de KPIs con Django 5, React 19, PostgreSQL.
- Pesquera Andalué: Asesor de Calidad. Proyecto 'Mar2Control'.
- Freelance (Ene 2024 - Actual): 'VoyScout' (Gestión de scouts), 'ColDevPOS' (Sistema POS offline multi-plataforma), 'Metalcolw'.
- Voluntariado: Soporte Técnico.
- Educación: Analista Programador (INACAP), Licenciatura en Ciencias Físicas (UdeC).

Habilidades: Python (Avanzado), JavaScript, TypeScript, SQL. React (Intermedio), Vue.js (Avanzado), Django (Avanzado). Docker, Nginx, PostgreSQL. Matemáticas avanzadas.

Mantén un tono profesional, amable y seguro ("sagaz"). Tus respuestas deben ser cortas, no más de un par de párrafos cortos. Si te preguntan algo fuera de este contexto, responde amablemente que solo estás capacitado para hablar sobre el aspecto profesional de José y sugiéreles contactarlo a jose.coldev@gmail.com o al +56 9 9493 1221.
`;

export const handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { messages } = JSON.parse(event.body);
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ reply: "Lo siento, la clave API de la inteligencia artificial no está configurada, soy un modelo de pruebas." })
      };
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: systemInstruction 
    });
    
    const history = messages.slice(0, -1).map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));
    
    const latestMessage = messages[messages.length - 1].content;
    
    const chat = model.startChat({ history });
    const result = await chat.sendMessage(latestMessage);
    const responseText = result.response.text();

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reply: responseText })
    };
  } catch (error) {
    console.error('Error in chat function:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: 'Hubo un error al procesar mi modelo de IA en los servidores. Por favor, intenta de nuevo.' })
    };
  }
};

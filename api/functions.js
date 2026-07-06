export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Método no permitido' });
  }

  const { messages, systemPrompt } = request.body;

  if (!messages || !Array.isArray(messages)) {
    return response.status(400).json({ error: 'Falta el historial de mensajes' });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return response.status(500).json({ error: 'API key no configurada en el servidor' });
  }

  const geminiContents = messages.map((message) => ({
    role: message.role === 'user' ? 'user' : 'model',
    parts: [{ text: message.content }],
  }));

  try {
    const geminiResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: geminiContents,
          systemInstruction: {
            parts: [{ text: systemPrompt }],
          },
        }),
      }
    );

    if (!geminiResponse.ok) {
      const errorBody = await geminiResponse.text();
      console.error('Error de Gemini:', errorBody);
      return response.status(geminiResponse.status).json({ error: 'Error al consultar Gemini' });
    }

    const data = await geminiResponse.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      return response.status(502).json({ error: 'Respuesta vacía del modelo' });
    }

    return response.status(200).json({ reply });
  } catch (error) {
    console.error('Error inesperado:', error);
    return response.status(500).json({ error: 'Error interno del servidor' });
  }
}
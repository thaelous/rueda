import { GoogleGenAI } from '@google/genai';

export const handler = async (event: any) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const data = JSON.parse(event.body || '{}');
    const { base64Data, mimeType, prompt } = data;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Server GEMINI_API_KEY is not configured in Netlify environment variables.' }),
      };
    }

    const ai = new GoogleGenAI({ apiKey });
    const cleanBase64 = (base64Data || '').replace(/^data:image\/[a-zA-Z+]+;base64,/, '');

    const response = await ai.models.generateContent({
      model: 'gemini-flash-latest',
      contents: [
        {
          parts: [
            {
              inlineData: {
                mimeType: mimeType || 'image/jpeg',
                data: cleanBase64,
              },
            },
            {
              text: prompt || 'Analiza la imagen de la rueda de liderazgo y genera el JSON oficial.',
            },
          ],
        },
      ],
      config: {
        temperature: 0.2,
        responseMimeType: 'application/json',
      },
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: response.text }),
    };
  } catch (error: any) {
    console.error('Netlify function gemini error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error?.message || 'Error processing AI request' }),
    };
  }
};

import { GoogleGenAI } from '@google/genai';
import { ExecutiveReport } from '../types/leadership';

const STORAGE_KEY = 'gemini_api_key';

export function getStoredApiKey(): string {
  // First priority: VITE_GEMINI_API_KEY from environment
  const envKey = (import.meta as any).env?.VITE_GEMINI_API_KEY;
  if (envKey && typeof envKey === 'string' && envKey.trim().length > 0) {
    return envKey.trim();
  }
  // Second priority: localStorage
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? stored.trim() : '';
}

export function saveApiKey(key: string): void {
  localStorage.setItem(STORAGE_KEY, key.trim());
}

export function removeStoredApiKey(): void {
  localStorage.removeItem(STORAGE_KEY);
}

const ANALYSIS_SYSTEM_PROMPT = `
Eres un facilitador senior y consultor ejecutivo en Desarrollo Organizacional, especializado en la "Rueda de Liderazgo" y el modelo de Liderazgo Situacional (SLII® de Ken Blanchard) con rigor psicométrico y metodológico (referencias Martha Alles, Bloom, CCL).

Tu tarea es analizar la imagen provista de una "Rueda laboral aplicada en Liderazgo" completada a mano con trazos geométricos y anotaciones manuscritas, e interpretar fielmente todos sus elementos para estructurar un REPORTE OFICIAL EN FORMATO CUARTILLA EJECUTIVA (máximo 1 página).

Debes inspeccionar visualmente:
1. Encabezado manuscrito: Nombre de la persona evaluada, Fecha 1 (aplicación) y Fecha 2 (seguimiento).
2. Trazos de la rueda octagonal/circular en cada una de las 8 competencias oficiales:
   - Credibilidad e Integridad
   - Toma de decisiones estratégicas
   - Comunicación efectiva
   - Brindar reconocimiento
   - Inteligencia emocional
   - Visión sistémica
   - Manejo de conflictos
   - Feedback y desarrollo de otros
3. Niveles numéricos en escala de 1 a 10 (o porcentajes convertidos a escala de 1.0 a 10.0 con 1 decimal):
   - Nivel de Autoevaluación Actual (trazos internos / primer trazo)
   - Meta acordada (trazos externos / proyección acordada al plazo establecido)
4. Bloques inferiores manuscritos:
   - "Punto Palanca (P.P.)": competencia elegida y las notas/viñetas manuscritas exactas.
   - "Punto Impacto (P.I.)": competencia elegida y las notas/viñetas manuscritas exactas.

CRITERIOS METODOLÓGICOS DEL REPORTE (ESTRICTOS SEGÚN PLANTILLA OFICIAL):
1. Lectura breve: Exactamente hasta 2 fortalezas prioritarias y 2 áreas de oportunidad prioritarias (máximo 4 frases de alto impacto y precisión ejecutiva).
2. Tabla de Acciones recomendadas: Exactamente seis (6) acciones breves:
   - Tres (3) acciones para "Sostener fortalezas" (asociadas a los Puntos Palanca y competencias altas).
   - Tres (3) acciones para "Desarrollar áreas de oportunidad" (asociadas a los Puntos Impacto y competencias en desarrollo).
   - Cada acción DEBE incluir: un verbo observable (Taxonomía de Bloom), una situación de aplicación y una frecuencia o plazo concreto (máximo 2 líneas por acción).
   - Evidencia de aplicación: breve, tangible y verificable (sin burocracia documental excesiva).
3. Integración de Liderazgo Situacional (SLII®):
   - Incorporar explícitamente estilos directivos: E1 (Dirigir), E2 (Guiar), E3 (Apoyar) o E4 (Delegar) según el nivel de competencia y compromiso.
   - Para feedback, tomar en cuenta el modelo Situación-Conducta-Impacto (SCI).
4. Seguimiento: Evidencia principal a revisar y fecha del próximo encuentro (plazo pactado de 5 semanas a 3 meses).

RESPONDE ÚNICAMENTE CON UN OBJETO JSON VÁLIDO CON LA SIGUIENTE ESTRUCTURA EXACTA (sin texto antes ni después, sin markdown adicional):
{
  "metadata": {
    "nombre": "Nombre completo extraído de la hoja manuscrita",
    "puesto": "Puesto inferido o título corporativo (ej. Coordinación de Operaciones / Líder de Equipo)",
    "fechaAplicacion": "Fecha 1 leída (ej. 22 / Jul / 2026)",
    "fechaSeguimiento": "Fecha 2 leída o proyectada a 5 semanas (ej. 22 / Oct / 2026)",
    "facilitador": "Facilitación de Desarrollo Organizacional (SLII®)"
  },
  "competencias": [
    {
      "id": "credibilidad_integridad",
      "name": "Credibilidad e Integridad",
      "actual": 8.0,
      "meta": 9.0,
      "isPuntoPalanca": false,
      "isPuntoImpacto": false
    },
    {
      "id": "toma_decisiones",
      "name": "Toma de decisiones estratégicas",
      "actual": 8.0,
      "meta": 9.0,
      "isPuntoPalanca": false,
      "isPuntoImpacto": false
    },
    {
      "id": "comunicacion_efectiva",
      "name": "Comunicación efectiva",
      "actual": 9.0,
      "meta": 9.5,
      "isPuntoPalanca": false,
      "isPuntoImpacto": false
    },
    {
      "id": "brindar_reconocimiento",
      "name": "Brindar reconocimiento",
      "actual": 9.0,
      "meta": 9.5,
      "isPuntoPalanca": false,
      "isPuntoImpacto": false
    },
    {
      "id": "inteligencia_emocional",
      "name": "Inteligencia emocional",
      "actual": 8.0,
      "meta": 9.0,
      "isPuntoPalanca": false,
      "isPuntoImpacto": false
    },
    {
      "id": "vision_sistemica",
      "name": "Visión sistémica",
      "actual": 5.0,
      "meta": 7.0,
      "isPuntoPalanca": false,
      "isPuntoImpacto": true
    },
    {
      "id": "manejo_conflictos",
      "name": "Manejo de conflictos",
      "actual": 6.0,
      "meta": 8.0,
      "isPuntoPalanca": true,
      "isPuntoImpacto": false
    },
    {
      "id": "feedback_desarrollo",
      "name": "Feedback y desarrollo de otros",
      "actual": 5.0,
      "meta": 8.0,
      "isPuntoPalanca": false,
      "isPuntoImpacto": false
    }
  ],
  "puntosClaveManuscritos": {
    "puntoPalanca": {
      "competencia": "Competencia asignada a P.P.",
      "anotaciones": ["Anotación 1", "Anotación 2", "Anotación 3"]
    },
    "puntoImpacto": {
      "competencia": "Competencia asignada a P.I.",
      "anotaciones": ["Anotación 1", "Anotación 2", "Anotación 3"]
    }
  },
  "lecturaBreve": {
    "fortalezas": [
      "Frase 1 de fortaleza de alto impacto.",
      "Frase 2 de fortaleza de alto impacto."
    ],
    "oportunidades": [
      "Frase 1 de oportunidad de alto impacto.",
      "Frase 2 de oportunidad de alto impacto."
    ]
  },
  "acciones": [
    {
      "id": "acc_1",
      "proposito": "Sostener fortalezas",
      "accionSugerida": "Acción concreta con verbo observable, contexto y frecuencia.",
      "evidencia": "Evidencia breve y verificable.",
      "competenciaRelacionada": "Nombre de competencia",
      "estiloSLII": "E4 - Delegar"
    },
    {
      "id": "acc_2",
      "proposito": "Sostener fortalezas",
      "accionSugerida": "Acción concreta con verbo observable, contexto y frecuencia.",
      "evidencia": "Evidencia breve y verificable.",
      "competenciaRelacionada": "Nombre de competencia",
      "estiloSLII": "E3 - Apoyar"
    },
    {
      "id": "acc_3",
      "proposito": "Sostener fortalezas",
      "accionSugerida": "Acción concreta con verbo observable, contexto y frecuencia.",
      "evidencia": "Evidencia breve y verificable.",
      "competenciaRelacionada": "Nombre de competencia",
      "estiloSLII": "E3 - Apoyar"
    },
    {
      "id": "acc_4",
      "proposito": "Desarrollar áreas de oportunidad",
      "accionSugerida": "Acción concreta con verbo observable, contexto y frecuencia.",
      "evidencia": "Evidencia breve y verificable.",
      "competenciaRelacionada": "Nombre de competencia",
      "estiloSLII": "E2 - Guiar"
    },
    {
      "id": "acc_5",
      "proposito": "Desarrollar áreas de oportunidad",
      "accionSugerida": "Acción concreta con verbo observable, contexto y frecuencia.",
      "evidencia": "Evidencia breve y verificable.",
      "competenciaRelacionada": "Nombre de competencia",
      "estiloSLII": "E2 - Guiar"
    },
    {
      "id": "acc_6",
      "proposito": "Desarrollar áreas de oportunidad",
      "accionSugerida": "Acción concreta con verbo observable, contexto y frecuencia.",
      "evidencia": "Evidencia breve y verificable.",
      "competenciaRelacionada": "Nombre de competencia",
      "estiloSLII": "E1 - Dirigir"
    }
  ],
  "seguimiento": {
    "evidenciaPrincipal": "Descripción concisa de la evidencia que se revisará.",
    "fechaProximoEncuentro": "Fecha exacta acordada.",
    "plazoSemanas": 5,
    "enfoqueSLII": "Resumen de adaptación del estilo de facilitación/liderazgo."
  }
}
`;

export async function analyzeWheelImage(
  base64Data: string,
  mimeType: string = 'image/jpeg',
  onProgress?: (step: string) => void
): Promise<ExecutiveReport> {
  const fullPrompt = `${ANALYSIS_SYSTEM_PROMPT}\n\nAnaliza detenidamente la imagen adjunta y genera el objeto JSON completo según las instrucciones.`;

  onProgress?.('Inspeccionando trazos y geometría de la rueda...');

  let rawText = '';

  // 1. Try Netlify Function proxy first (recommended for production on Netlify)
  try {
    const fnResponse = await fetch('/.netlify/functions/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        base64Data,
        mimeType,
        prompt: fullPrompt,
      }),
    });

    if (fnResponse.ok) {
      const fnData = await fnResponse.json();
      if (fnData && fnData.text) {
        rawText = fnData.text;
      }
    } else {
      console.warn('Netlify function proxy returned status:', fnResponse.status, 'Falling back to direct client SDK...');
    }
  } catch (proxyErr) {
    console.warn('Netlify function proxy not available or failed. Falling back to direct client SDK...', proxyErr);
  }

  // 2. If Netlify proxy didn't succeed, fall back to direct client SDK call (for AI Studio preview or local dev)
  if (!rawText) {
    const enteredApiKey = getStoredApiKey();
    if (!enteredApiKey || !enteredApiKey.trim()) {
      throw new Error('MISSING_API_KEY');
    }

    const apiKey = enteredApiKey.trim();
    const cleanBase64 = base64Data.replace(/^data:image\/[a-zA-Z+]+;base64,/, '');

    onProgress?.('Identificando Puntos Palanca y Puntos Impacto...');

    const ai = new GoogleGenAI({ apiKey });
    const PRIMARY_MODEL = 'gemini-flash-latest';
    let lastError: any = null;

    const maxAttempts = 2;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model: PRIMARY_MODEL,
          contents: [
            {
              parts: [
                {
                  inlineData: {
                    mimeType: mimeType || 'image/jpeg',
                    data: cleanBase64
                  }
                },
                {
                  text: fullPrompt
                }
              ]
            }
          ],
          config: {
            temperature: 0.2,
            responseMimeType: 'application/json'
          }
        });

        rawText = response.text || '';
        if (rawText) break;
      } catch (sdkErr: any) {
        lastError = sdkErr;
        const errStr = String(sdkErr?.message || sdkErr);
        console.error(`Gemini analysis attempt ${attempt} failed with gemini-flash-latest:`, errStr);

        const is503 = errStr.includes('503') || errStr.toLowerCase().includes('service unavailable') || errStr.toLowerCase().includes('high demand') || errStr.toLowerCase().includes('overloaded');
        if (is503 && attempt < maxAttempts) {
          onProgress?.('Servidor de Google ocupado (503). Reintentando en 2 segundos...');
          await new Promise(resolve => setTimeout(resolve, 2000));
          continue;
        }
        break;
      }
    }

    if (!rawText) {
      console.error('Gemini analysis failed:', lastError);
      const msg = lastError?.message || '';
      if (msg.includes('quota') || msg.includes('429') || msg.includes('RESOURCE_EXHAUSTED')) {
        throw new Error('Límite de cuota excedido en la API de Gemini (429). Por favor espera unos minutos o utiliza una API Key con facturación.');
      }
      if (msg.includes('503') || msg.toLowerCase().includes('service unavailable')) {
        throw new Error('El servidor de Gemini está temporalmente ocupado (503). Por favor intenta de nuevo en un momento.');
      }
      if (msg.includes('404') || msg.includes('not found') || msg.includes('no longer available')) {
        throw new Error('El modelo solicitado no está disponible. Se configuró gemini-flash-latest.');
      }
      throw lastError || new Error('No se pudo procesar la imagen con la API de Gemini.');
    }
  }

  onProgress?.('Estructurando acciones bajo modelo de Liderazgo Situacional (SLII)...');

  const cleanedJson = extractJsonString(rawText);
  const parsedReport = JSON.parse(cleanedJson) as ExecutiveReport;

  // Validate basic shape
  if (!parsedReport.competencias || !parsedReport.acciones || !parsedReport.metadata) {
    throw new Error('Estructura de respuesta incompleta');
  }

  return parsedReport;
}

function extractJsonString(text: string): string {
  const trimmed = text.trim();
  // Strip markdown code fences if model wrapped response
  if (trimmed.startsWith('```json')) {
    return trimmed.replace(/^```json\s*/, '').replace(/\s*```$/, '').trim();
  }
  if (trimmed.startsWith('```')) {
    return trimmed.replace(/^```\s*/, '').replace(/\s*```$/, '').trim();
  }
  return trimmed;
}

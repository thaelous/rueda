import React, { useState } from 'react';
import { Key, Check, AlertTriangle, ExternalLink, ShieldCheck, X } from 'lucide-react';
import { saveApiKey, removeStoredApiKey, getStoredApiKey } from '../services/geminiService';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onKeySaved: () => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onClose,
  onKeySaved
}) => {
  const currentKey = getStoredApiKey();
  const [apiKeyInput, setApiKeyInput] = useState(currentKey);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    if (apiKeyInput.trim()) {
      saveApiKey(apiKeyInput.trim());
      setSavedSuccess(true);
      setTimeout(() => {
        setSavedSuccess(false);
        onKeySaved();
        onClose();
      }, 700);
    }
  };

  const handleClear = () => {
    removeStoredApiKey();
    setApiKeyInput('');
    onKeySaved();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-md w-full p-6 text-white shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-9 h-9 rounded-lg bg-blue-900/60 border border-blue-700/60 flex items-center justify-center text-cyan-400">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Configuración de Gemini API</h3>
            <span className="text-[11px] text-slate-400 font-mono">SDK Oficial @google/genai (Client-Side)</span>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mb-4">
          La aplicación se ejecuta 100% en el navegador del cliente. Si no se configuró <code className="text-cyan-300 font-mono">VITE_GEMINI_API_KEY</code>, puedes ingresar tu API Key aquí. Se almacena localmente en tu navegador (<code className="text-cyan-300 font-mono">localStorage</code>) y nunca viaja a servidores intermedios.
        </p>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Google AI Studio / Google Cloud API Key:
            </label>
            <input
              type="password"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder="AQ... o tu clave de API"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm font-mono text-cyan-300 focus:outline-none focus:border-cyan-500 transition"
              autoFocus
            />
            <span className="block text-[10px] text-slate-400 mt-1">
              Admite cualquier clave emitida por Google Cloud o Google AI Studio (prefijos AQ., AIza o personalizados).
            </span>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noreferrer"
              className="text-cyan-400 hover:underline flex items-center gap-1"
            >
              <span>Obtener API Key en Google AI Studio</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            {currentKey && (
              <button
                onClick={handleClear}
                className="text-rose-400 hover:underline"
              >
                Eliminar clave guardada
              </button>
            )}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={!apiKeyInput.trim()}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-lg shadow-blue-900/30 disabled:opacity-50"
          >
            {savedSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>¡Guardada con éxito!</span>
              </>
            ) : (
              <span>Guardar API Key</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

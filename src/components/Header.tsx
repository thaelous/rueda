import React from 'react';
import { Compass, Split, FileText, Sliders, Upload, Edit3, Copy, Printer, Key, CheckCircle, Download, Loader2 } from 'lucide-react';

export type ActiveTab = 'split' | 'cuartilla' | 'radar';

interface HeaderProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onUploadClick: () => void;
  onOpenAdjustModal: () => void;
  onCopyReport: () => void;
  onPrintReport: () => void;
  onOpenApiKeyModal: () => void;
  hasApiKey: boolean;
  copiedSuccess: boolean;
  hasReport: boolean;
  isGeneratingPdf?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  onUploadClick,
  onOpenAdjustModal,
  onCopyReport,
  onPrintReport,
  onOpenApiKeyModal,
  hasApiKey,
  copiedSuccess,
  hasReport,
  isGeneratingPdf = false
}) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-40 print:hidden">
      {/* TOP BRANDING BAR */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* BRAND & TITLES */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Compass className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black tracking-tight text-white uppercase">
                Rueda de Liderazgo
              </h1>
              <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded tracking-wider uppercase shadow-sm">
                Cuartilla Ejecutiva
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium hidden sm:block">
              Análisis visual de trazos, Puntos Palanca / Impacto y Liderazgo Situacional (SLII®)
            </p>
          </div>
        </div>

        {/* PRIMARY ACTION BUTTONS */}
        <div className="flex items-center flex-wrap gap-2 text-xs">
          {/* Upload trigger */}
          <button
            onClick={onUploadClick}
            className="px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-medium transition flex items-center gap-1.5 shadow-sm"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Subir Rueda(s)</span>
          </button>

          {/* Adjust data */}
          <button
            onClick={onOpenAdjustModal}
            disabled={!hasReport}
            className={`px-2.5 py-1.5 rounded-md border transition flex items-center gap-1.5 font-medium ${
              hasReport
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                : 'bg-slate-900 text-slate-600 border-slate-800 cursor-not-allowed opacity-50'
            }`}
            title={hasReport ? 'Ajustar datos manualmente' : 'Primero sube y procesa una rueda'}
          >
            <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline">Ajustar</span>
          </button>

          {/* Copy report */}
          <button
            onClick={onCopyReport}
            disabled={!hasReport}
            className={`px-2.5 py-1.5 rounded-md border transition flex items-center gap-1.5 font-medium ${
              !hasReport
                ? 'bg-slate-900 text-slate-600 border-slate-800 cursor-not-allowed opacity-50'
                : copiedSuccess
                ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
            }`}
            title={hasReport ? 'Copiar texto estructurado del informe al portapapeles' : 'Primero sube y procesa una rueda'}
          >
            {copiedSuccess ? (
              <>
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>¡Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden md:inline">Copiar Reporte</span>
              </>
            )}
          </button>

          {/* Download / Print PDF button */}
          <button
            onClick={onPrintReport}
            className={`px-3 py-1.5 rounded-md font-semibold transition flex items-center gap-1.5 shadow-md ${
              !hasReport
                ? 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-750'
                : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-cyan-900/30'
            }`}
            title={hasReport ? 'Imprimir o guardar en PDF (tamaño carta)' : 'Primero sube y procesa una rueda para generar el PDF'}
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Descargar / Imprimir PDF</span>
          </button>

          {/* API Key settings trigger */}
          <button
            onClick={onOpenApiKeyModal}
            className={`p-1.5 rounded-md border transition flex items-center gap-1 ${
              hasApiKey
                ? 'bg-slate-800/80 border-slate-700 text-cyan-400 hover:border-cyan-500'
                : 'bg-amber-950/70 border-amber-600 text-amber-300 hover:bg-amber-900/70'
            }`}
            title={hasApiKey ? 'API Key configurada' : 'Configurar Gemini API Key'}
          >
            <Key className="w-3.5 h-3.5" />
            {!hasApiKey && <span className="text-[10px] font-bold">Configurar API</span>}
          </button>
        </div>
      </div>

      {/* VIEW TABS SEGMENTED BAR */}
      <div className="bg-slate-950/60 border-t border-slate-800/80 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-1 py-1.5 text-xs">
          <button
            onClick={() => onTabChange('split')}
            className={`px-3 py-1.5 rounded-md font-medium flex items-center gap-2 transition-all ${
              activeTab === 'split'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Split className="w-3.5 h-3.5" />
            <span>Vista Dividida (Hoja + Cuartilla)</span>
          </button>

          <button
            onClick={() => onTabChange('cuartilla')}
            className={`px-3 py-1.5 rounded-md font-medium flex items-center gap-2 transition-all ${
              activeTab === 'cuartilla'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Cuartilla Oficial (Hoja Carta)</span>
          </button>

          <button
            onClick={() => onTabChange('radar')}
            className={`px-3 py-1.5 rounded-md font-medium flex items-center gap-2 transition-all ${
              activeTab === 'radar'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Radar Interactivo</span>
          </button>
        </div>
      </div>
    </header>
  );
};

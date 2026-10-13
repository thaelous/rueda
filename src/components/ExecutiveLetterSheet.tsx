import React, { useState } from 'react';
import { ExecutiveReport, RecommendedAction } from '../types/leadership';
import { RadarChart } from './RadarChart';
import {
  Award,
  Target,
  Calendar,
  User,
  Briefcase,
  Compass,
  FileCheck,
  Edit2,
  Check,
  RotateCcw,
  Sparkles
} from 'lucide-react';

interface ExecutiveLetterSheetProps {
  report: ExecutiveReport;
  onEditRequested?: () => void;
  selectedCompetencyId?: string | null;
  onSelectCompetency?: (id: string) => void;
  onReportChange?: (updatedReport: ExecutiveReport) => void;
  id?: string;
  isBatchMode?: boolean;
}

export const ExecutiveLetterSheet: React.FC<ExecutiveLetterSheetProps> = ({
  report,
  selectedCompetencyId,
  onSelectCompetency,
  onReportChange,
  id = 'cuartilla-reporte',
  isBatchMode = false
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [hasEdits, setHasEdits] = useState<boolean>(false);

  // Helper to update metadata fields
  const handleMetadataBlur = (field: keyof typeof report.metadata, value: string) => {
    if (!onReportChange) return;
    const trimmed = value.trim();
    if (trimmed !== report.metadata[field]) {
      setHasEdits(true);
      onReportChange({
        ...report,
        metadata: {
          ...report.metadata,
          [field]: trimmed
        }
      });
    }
  };

  // Helper to update brief findings (fortalezas / oportunidades)
  const handleLecturaBlur = (category: 'fortalezas' | 'oportunidades', index: number, value: string) => {
    if (!onReportChange) return;
    const trimmed = value.trim();
    const currentList = [...report.lecturaBreve[category]];
    if (trimmed !== currentList[index]) {
      currentList[index] = trimmed;
      setHasEdits(true);
      onReportChange({
        ...report,
        lecturaBreve: {
          ...report.lecturaBreve,
          [category]: currentList
        }
      });
    }
  };

  // Helper to update action row
  const handleActionBlur = (index: number, field: keyof RecommendedAction, value: string) => {
    if (!onReportChange) return;
    const trimmed = value.trim();
    const currentActions = [...report.acciones];
    if (trimmed !== (currentActions[index][field] || '')) {
      currentActions[index] = {
        ...currentActions[index],
        [field]: trimmed
      };
      setHasEdits(true);
      onReportChange({
        ...report,
        acciones: currentActions
      });
    }
  };

  // Helper to update follow-up fields
  const handleSeguimientoBlur = (field: keyof typeof report.seguimiento, value: string) => {
    if (!onReportChange) return;
    const trimmed = value.trim();
    if (trimmed !== String(report.seguimiento[field] || '')) {
      setHasEdits(true);
      onReportChange({
        ...report,
        seguimiento: {
          ...report.seguimiento,
          [field]: trimmed
        }
      });
    }
  };

  const editableClass = isEditing
    ? 'outline-none hover:bg-amber-50/70 focus:bg-white focus:ring-1 focus:ring-blue-500 rounded px-1 transition-all cursor-text text-inherit'
    : 'outline-none cursor-default';

  return (
    <div className="w-full flex flex-col items-center py-2 print:p-0">
      {/* IN-SITU EDIT MODE TOGGLE BAR (Visible on screen, excluded from batch & hidden on print) */}
      {!isBatchMode && onReportChange && (
        <div className="w-full max-w-[850px] mb-2 px-1 flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm ${
                isEditing
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold ring-2 ring-amber-300'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
              }`}
              title={isEditing ? 'Desactivar edición in-situ' : 'Activar modo de edición directa sobre la cuartilla'}
            >
              {isEditing ? (
                <>
                  <Check className="w-3.5 h-3.5 text-slate-950" />
                  <span>Modo Edición Activo</span>
                </>
              ) : (
                <>
                  <Edit2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Editar Cuartilla In-Situ</span>
                </>
              )}
            </button>

            {isEditing && (
              <span className="text-[11px] text-amber-300 font-medium flex items-center gap-1 animate-pulse">
                <Sparkles className="w-3 h-3" />
                Haz clic sobre cualquier texto, nombre, fecha o acción para editarlo directamente
              </span>
            )}

            {!isEditing && hasEdits && (
              <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                <Check className="w-3 h-3" />
                Cambios guardados en la cuartilla
              </span>
            )}
          </div>

          {isEditing && (
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="text-xs text-slate-400 hover:text-slate-200 underline font-medium"
            >
              Cerrar Edición
            </button>
          )}
        </div>
      )}

      {/* Letter sheet container: 8.5 x 11 inch proportions */}
      <article
        id={id}
        className="cuartilla-container cuartilla-print-target w-full max-w-[850px] bg-white text-slate-900 shadow-2xl rounded-sm print:shadow-none print:rounded-none border border-slate-200 print:border-none p-6 md:p-8 font-sans leading-tight print:p-0 min-h-[1000px] print:min-h-0"
      >
        {/* INSTITUTIONAL HEADER */}
        <header className="border-b-2 border-slate-900 pb-2 mb-6 avoid-page-break">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-blue-800 print:text-black shrink-0" />
                <span className="text-[10.5px] font-extrabold tracking-wider text-blue-900 uppercase">
                  Desarrollo Organizacional • Facilitación de Liderazgo (SLII®)
                </span>
              </div>
              <h1 className="text-lg md:text-xl font-black tracking-tight text-slate-900 uppercase mt-0.5">
                Reporte Individual de Resultados y Recomendaciones
              </h1>
              <p className="text-[10.5px] text-slate-500 font-medium">
                Herramienta diagnóstica de autoevaluación, alineación y desarrollo de competencias directivas
              </p>
            </div>
            <div className="text-right shrink-0">
              <span className="inline-block bg-slate-900 text-white text-[9.5px] font-bold px-2 py-0.5 tracking-wider uppercase rounded-xs">
                Cuartilla Oficial
              </span>
              <p
                contentEditable={isEditing}
                suppressContentEditableWarning={true}
                className={`text-[8.5px] text-slate-400 mt-1 font-mono ${editableClass}`}
                title={isEditing ? 'Editar referencia del reporte' : undefined}
              >
                REF: SLII-RL-{report.metadata.fechaAplicacion.replace(/[^a-zA-Z0-9]/g, '') || '2026'}
              </p>
            </div>
          </div>

          {/* METADATA STRIP: ROBUST RESPONSIVE GRID (ZERO OVERLAPPING) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 pt-2.5 border-t border-slate-200 text-xs">
            {/* 1. Evaluado */}
            <div className="flex items-start gap-2 min-w-0">
              <User className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <div className="min-w-0 flex-1">
                <span className="block text-[8.5px] uppercase font-bold text-slate-400 tracking-wider">
                  Evaluado(a)
                </span>
                <span
                  contentEditable={isEditing}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => handleMetadataBlur('nombre', e.currentTarget.textContent || '')}
                  className={`font-bold text-slate-900 block text-[11px] break-words ${editableClass}`}
                  title={isEditing ? 'Editar nombre del evaluado' : undefined}
                >
                  {report.metadata.nombre || '—'}
                </span>
              </div>
            </div>

            {/* 2. Puesto / Rol */}
            <div className="flex items-start gap-2 min-w-0">
              <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <div className="min-w-0 flex-1">
                <span className="block text-[8.5px] uppercase font-bold text-slate-400 tracking-wider">
                  Puesto / Rol
                </span>
                <span
                  contentEditable={isEditing}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => handleMetadataBlur('puesto', e.currentTarget.textContent || '')}
                  className={`font-semibold text-slate-800 block text-[11px] break-words ${editableClass}`}
                  title={isEditing ? 'Editar puesto o rol' : undefined}
                >
                  {report.metadata.puesto || '—'}
                </span>
              </div>
            </div>

            {/* 3. Fecha Aplicación */}
            <div className="flex items-start gap-2 min-w-0">
              <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <div className="min-w-0 flex-1">
                <span className="block text-[8.5px] uppercase font-bold text-slate-400 tracking-wider">
                  Fecha Aplicación
                </span>
                <span
                  contentEditable={isEditing}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => handleMetadataBlur('fechaAplicacion', e.currentTarget.textContent || '')}
                  className={`font-semibold text-slate-800 block text-[11px] break-words ${editableClass}`}
                  title={isEditing ? 'Editar fecha de aplicación' : undefined}
                >
                  {report.metadata.fechaAplicacion || '—'}
                </span>
              </div>
            </div>

            {/* 4. Seguimiento */}
            <div className="flex items-start gap-2 min-w-0">
              <Target className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
              <div className="min-w-0 flex-1">
                <span className="block text-[8.5px] uppercase font-bold text-blue-700 tracking-wider">
                  Seguimiento (5 semanas)
                </span>
                <span
                  contentEditable={isEditing}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => handleMetadataBlur('fechaSeguimiento', e.currentTarget.textContent || '')}
                  className={`font-bold text-blue-900 block text-[11px] break-words ${editableClass}`}
                  title={isEditing ? 'Editar fecha de seguimiento' : undefined}
                >
                  {report.metadata.fechaSeguimiento || '—'}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* SECTION 1: RADAR CHART (WITH CLEAR MARGIN BEFORE IT) */}
        <section className="mb-3 bg-slate-50/70 p-2 rounded border border-slate-200/90 avoid-page-break">
          <div className="flex items-center justify-between mb-0.5">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-700"></span>
              Gráfica de Araña — Competencias del Liderazgo
            </h2>
            <div className="text-[9.5px] text-slate-500 font-medium">
              Escala de 1 a 10 · 8 Dimensiones Clave
            </div>
          </div>

          <div className="flex justify-center items-center py-0.5 radar-chart-print-container">
            <RadarChart
              data={report.competencias}
              size={330}
              isPrintMode={true}
              selectedId={selectedCompetencyId}
              onSelectCompetency={onSelectCompetency}
            />
          </div>

          {/* Mandatory criteria note from Word document */}
          <p className="text-center text-[9.5px] text-slate-500 italic mt-0.5 font-serif border-t border-slate-200/60 pt-1">
            "Resultados basados en autoevaluación y diálogo individual; no constituyen una evaluación de desempeño de terceros."
          </p>
        </section>

        {/* SECTION 2: LECTURA BREVE (EDITABLE IN SITU) */}
        <section className="mb-3 avoid-page-break">
          <div className="flex items-center justify-between border-b border-slate-300 pb-1 mb-1.5">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-blue-700" />
              Lectura Breve de Hallazgos Prioritarios
            </h2>
            <span className="text-[9.5px] font-bold text-slate-400">Máximo 4 postulados ejecutivos</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {/* Fortalezas (P.P.) */}
            <div className="box-fortalezas bg-blue-50/70 border border-blue-200 border-l-4 border-l-blue-700 p-2 rounded-r">
              <span className="text-[9.5px] uppercase font-bold tracking-wider text-blue-900 block mb-1">
                Fortalezas Prioritarias (Puntos Palanca - P.P.)
              </span>
              <ul className="space-y-1 text-[10.5px] text-slate-800 leading-snug">
                {report.lecturaBreve.fortalezas.map((frase, idx) => (
                  <li key={`fort-${idx}`} className="flex items-start gap-1.5">
                    <span className="text-blue-700 font-bold shrink-0 mt-0.5">•</span>
                    <span
                      contentEditable={isEditing}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => handleLecturaBlur('fortalezas', idx, e.currentTarget.textContent || '')}
                      className={`flex-1 ${editableClass}`}
                      title={isEditing ? 'Editar hallazgo de fortaleza' : undefined}
                    >
                      {frase}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Áreas de Oportunidad (P.I.) */}
            <div className="box-oportunidades bg-rose-50/70 border border-rose-200 border-l-4 border-l-rose-700 p-2 rounded-r">
              <span className="text-[9.5px] uppercase font-bold tracking-wider text-rose-900 block mb-1">
                Áreas de Oportunidad Prioritarias (Puntos Impacto - P.I.)
              </span>
              <ul className="space-y-1 text-[10.5px] text-slate-800 leading-snug">
                {report.lecturaBreve.oportunidades.map((frase, idx) => (
                  <li key={`opo-${idx}`} className="flex items-start gap-1.5">
                    <span className="text-rose-700 font-bold shrink-0 mt-0.5">•</span>
                    <span
                      contentEditable={isEditing}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => handleLecturaBlur('oportunidades', idx, e.currentTarget.textContent || '')}
                      className={`flex-1 ${editableClass}`}
                      title={isEditing ? 'Editar hallazgo de oportunidad' : undefined}
                    >
                      {frase}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 3: ACCIONES RECOMENDADAS (COMPACT TABLE OF 6 ACTIONS - EDITABLE IN SITU) */}
        <section className="mb-3 avoid-page-break">
          <div className="flex items-center justify-between border-b border-slate-300 pb-1 mb-1.5">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5 text-blue-700" />
              Acciones Recomendadas (Compromiso a Plazo Acordado)
            </h2>
            <span className="text-[9.5px] text-slate-500 font-medium">Verbo observable + Situación + Plazo / Frecuencia</span>
          </div>

          <div className="overflow-hidden border border-slate-300 rounded text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white border-b border-slate-800 text-[9.5px] font-bold uppercase tracking-wider">
                  <th className="py-1 px-2.5 w-1/4 border-r border-slate-700 bg-slate-900 text-white">Propósito</th>
                  <th className="py-1 px-2.5 w-1/2 border-r border-slate-700 bg-slate-900 text-white">Acción sugerida (Observable)</th>
                  <th className="py-1 px-2.5 w-1/4 bg-slate-900 text-white">Evidencia de aplicación</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {report.acciones.map((acc, index) => {
                  const isSostener = acc.proposito === 'Sostener fortalezas';
                  return (
                    <tr
                      key={acc.id || index}
                      className={`hover:bg-slate-50/80 transition-colors ${
                        isSostener ? 'bg-white' : 'bg-slate-50/40'
                      }`}
                    >
                      <td className="py-1 px-2.5 border-r border-slate-200 align-top">
                        <span
                          className={`inline-block text-[9px] font-bold px-1.5 py-0.5 rounded ${
                            isSostener
                              ? 'bg-blue-100 text-blue-900 border border-blue-200'
                              : 'bg-amber-100 text-amber-900 border border-amber-200'
                          }`}
                        >
                          {acc.proposito}
                        </span>
                        <div
                          contentEditable={isEditing}
                          suppressContentEditableWarning={true}
                          onBlur={(e) => handleActionBlur(index, 'estiloSLII', e.currentTarget.textContent || '')}
                          className={`text-[8px] text-slate-500 font-mono mt-0.5 ${editableClass}`}
                          title={isEditing ? 'Editar estilo SLII' : undefined}
                        >
                          {acc.estiloSLII || 'SLII®'}
                        </div>
                      </td>
                      <td className="py-1 px-2.5 border-r border-slate-200 align-top text-slate-900 leading-snug text-[10.5px]">
                        <span className="font-semibold text-slate-950 mr-1">{index + 1}.</span>
                        <span
                          contentEditable={isEditing}
                          suppressContentEditableWarning={true}
                          onBlur={(e) => handleActionBlur(index, 'accionSugerida', e.currentTarget.textContent || '')}
                          className={editableClass}
                          title={isEditing ? 'Editar acción observable' : undefined}
                        >
                          {acc.accionSugerida}
                        </span>
                      </td>
                      <td className="py-1 px-2.5 align-top text-slate-600 text-[10px] leading-snug font-serif italic">
                        <span
                          contentEditable={isEditing}
                          suppressContentEditableWarning={true}
                          onBlur={(e) => handleActionBlur(index, 'evidencia', e.currentTarget.textContent || '')}
                          className={editableClass}
                          title={isEditing ? 'Editar evidencia verificable' : undefined}
                        >
                          {acc.evidencia}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 4: SEGUIMIENTO & ENFOQUE SLII (EDITABLE IN SITU) */}
        <footer className="pt-2 border-t border-slate-300 mt-2 avoid-page-break">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs mb-2">
            <div className="bg-slate-100/70 p-2 rounded border border-slate-200">
              <span className="text-[9.5px] uppercase font-bold text-slate-700 block mb-0.5">
                Compromiso de Seguimiento (Evidencia a Revisar)
              </span>
              <p
                contentEditable={isEditing}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleSeguimientoBlur('evidenciaPrincipal', e.currentTarget.textContent || '')}
                className={`text-[10.5px] text-slate-800 leading-snug ${editableClass}`}
                title={isEditing ? 'Editar compromiso de seguimiento' : undefined}
              >
                {report.seguimiento.evidenciaPrincipal}
              </p>
            </div>
            <div className="bg-slate-100/70 p-2 rounded border border-slate-200">
              <span className="text-[9.5px] uppercase font-bold text-slate-700 block mb-0.5">
                Próximo Encuentro & Integración SLII®
              </span>
              <div className="text-[10.5px] text-slate-800 leading-snug">
                <span>
                  <strong>Fecha:</strong>{' '}
                  <span
                    contentEditable={isEditing}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => handleSeguimientoBlur('fechaProximoEncuentro', e.currentTarget.textContent || '')}
                    className={`inline font-semibold ${editableClass}`}
                    title={isEditing ? 'Editar fecha próximo encuentro' : undefined}
                  >
                    {report.seguimiento.fechaProximoEncuentro}
                  </span>
                  {' '}({report.seguimiento.plazoSemanas || 5} semanas).
                </span>
                <span
                  contentEditable={isEditing}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => handleSeguimientoBlur('enfoqueSLII', e.currentTarget.textContent || '')}
                  className={`text-slate-600 block mt-0.5 ${editableClass}`}
                  title={isEditing ? 'Editar enfoque SLII' : undefined}
                >
                  {report.seguimiento.enfoqueSLII}
                </span>
              </div>
            </div>
          </div>

          {/* SIGNATURE BLOCKS (EDITABLE FIRMAS / NOMBRES) */}
          <div className="grid grid-cols-2 gap-8 pt-4 text-center text-[10px]">
            <div>
              <div className="border-t border-slate-400 w-3/4 mx-auto pt-1">
                <span
                  contentEditable={isEditing}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => handleMetadataBlur('nombre', e.currentTarget.textContent || '')}
                  className={`font-bold text-slate-900 block ${editableClass}`}
                  title={isEditing ? 'Editar nombre para firma' : undefined}
                >
                  {report.metadata.nombre}
                </span>
                <span className="text-slate-500">Firma del Líder Evaluado</span>
              </div>
            </div>
            <div>
              <div className="border-t border-slate-400 w-3/4 mx-auto pt-1">
                <span
                  contentEditable={isEditing}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => handleMetadataBlur('facilitador', e.currentTarget.textContent || '')}
                  className={`font-bold text-slate-900 block ${editableClass}`}
                  title={isEditing ? 'Editar nombre o entidad del facilitador' : undefined}
                >
                  {report.metadata.facilitador || 'Facilitación y Consultoría DO'}
                </span>
                <span className="text-slate-500">Acreditación Liderazgo Situacional (SLII®)</span>
              </div>
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
};

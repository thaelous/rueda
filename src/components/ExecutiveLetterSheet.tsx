import React from 'react';
import { ExecutiveReport } from '../types/leadership';
import { RadarChart } from './RadarChart';
import { Award, Target, Calendar, User, Briefcase, Compass, FileCheck } from 'lucide-react';

interface ExecutiveLetterSheetProps {
  report: ExecutiveReport;
  onEditRequested?: () => void;
  selectedCompetencyId?: string | null;
  onSelectCompetency?: (id: string) => void;
  id?: string;
}

export const ExecutiveLetterSheet: React.FC<ExecutiveLetterSheetProps> = ({
  report,
  selectedCompetencyId,
  onSelectCompetency,
  id = 'cuartilla-reporte'
}) => {
  return (
    <div className="w-full flex justify-center py-4 print:p-0">
      {/* Letter sheet container: 8.5 x 11 inch proportions */}
      <article
        id={id}
        className="cuartilla-container cuartilla-print-target w-full max-w-[850px] bg-white text-slate-900 shadow-2xl rounded-sm print:shadow-none print:rounded-none border border-slate-200 print:border-none p-6 md:p-8 font-sans leading-tight print:p-0 min-h-[1000px] print:min-h-0"
      >
        {/* INSTITUTIONAL HEADER */}
        <header className="border-b-2 border-slate-900 pb-2.5 mb-3 avoid-page-break">
          <div className="flex items-start justify-between">
            <div>
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
              <p className="text-[8.5px] text-slate-400 mt-1 font-mono">
                REF: SLII-RL-{report.metadata.fechaAplicacion.replace(/[^a-zA-Z0-9]/g, '') || '2026'}
              </p>
            </div>
          </div>

          {/* METADATA STRIP */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2 pt-2 border-t border-slate-200 text-xs">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <div>
                <span className="block text-[8.5px] uppercase font-bold text-slate-400">Evaluado(a)</span>
                <span className="font-bold text-slate-900 truncate block text-[11px]">{report.metadata.nombre || '—'}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <div>
                <span className="block text-[8.5px] uppercase font-bold text-slate-400">Puesto / Rol</span>
                <span className="font-semibold text-slate-800 truncate block text-[11px]">{report.metadata.puesto || '—'}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <div>
                <span className="block text-[8.5px] uppercase font-bold text-slate-400">Fecha Aplicación</span>
                <span className="font-semibold text-slate-800 block text-[11px]">{report.metadata.fechaAplicacion || '—'}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <div>
                <span className="block text-[8.5px] uppercase font-bold text-blue-700">Seguimiento (5 semanas)</span>
                <span className="font-bold text-blue-900 block text-[11px]">{report.metadata.fechaSeguimiento || '—'}</span>
              </div>
            </div>
          </div>
        </header>

        {/* SECTION 1: RADAR CHART (OCCUPIES APPROX 1/3 OF THE PAGE) */}
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

        {/* SECTION 2: LECTURA BREVE (MAX 4 HIGH-IMPACT PHRASES) */}
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
                    <span>{frase}</span>
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
                    <span>{frase}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 3: ACCIONES RECOMENDADAS (COMPACT TABLE OF 6 ACTIONS) */}
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
                        {acc.estiloSLII && (
                          <span className="block text-[8px] text-slate-500 font-mono mt-0.5">
                            {acc.estiloSLII}
                          </span>
                        )}
                      </td>
                      <td className="py-1 px-2.5 border-r border-slate-200 align-top text-slate-900 leading-snug text-[10.5px]">
                        <span className="font-semibold text-slate-950 mr-1">{index + 1}.</span>
                        {acc.accionSugerida}
                      </td>
                      <td className="py-1 px-2.5 align-top text-slate-600 text-[10px] leading-snug font-serif italic">
                        {acc.evidencia}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 4: SEGUIMIENTO & ENFOQUE SLII */}
        <footer className="pt-2 border-t border-slate-300 mt-2 avoid-page-break">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs mb-2">
            <div className="bg-slate-100/70 p-2 rounded border border-slate-200">
              <span className="text-[9.5px] uppercase font-bold text-slate-700 block mb-0.5">
                Compromiso de Seguimiento (Evidencia a Revisar)
              </span>
              <p className="text-[10.5px] text-slate-800 leading-snug">
                {report.seguimiento.evidenciaPrincipal}
              </p>
            </div>
            <div className="bg-slate-100/70 p-2 rounded border border-slate-200">
              <span className="text-[9.5px] uppercase font-bold text-slate-700 block mb-0.5">
                Próximo Encuentro & Integración SLII®
              </span>
              <p className="text-[10.5px] text-slate-800 leading-snug">
                <strong>Fecha:</strong> {report.seguimiento.fechaProximoEncuentro} ({report.seguimiento.plazoSemanas || 5} semanas).{' '}
                <span className="text-slate-600 block mt-0.5">{report.seguimiento.enfoqueSLII}</span>
              </p>
            </div>
          </div>

          {/* SIGNATURE BLOCKS */}
          <div className="grid grid-cols-2 gap-8 pt-4 text-center text-[10px]">
            <div>
              <div className="border-t border-slate-400 w-3/4 mx-auto pt-1">
                <span className="font-bold text-slate-900 block">{report.metadata.nombre}</span>
                <span className="text-slate-500">Firma del Líder Evaluado</span>
              </div>
            </div>
            <div>
              <div className="border-t border-slate-400 w-3/4 mx-auto pt-1">
                <span className="font-bold text-slate-900 block">Facilitación y Consultoría DO</span>
                <span className="text-slate-500">Acreditación Liderazgo Situacional (SLII®)</span>
              </div>
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
};

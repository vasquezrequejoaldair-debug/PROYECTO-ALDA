import React, { useState } from 'react';
import { 
  Wrench, 
  FileText, 
  LayoutTemplate, 
  ClipboardCheck, 
  CheckCircle2, 
  Clock, 
  Copy, 
  Check, 
  ExternalLink, 
  Sparkles,
  Smartphone,
  Eye,
  Sliders
} from 'lucide-react';
import { RealEstateMarketingState, DigitalToolManualItem, LotPostTemplate, ToolControlAuditItem } from '../types';

interface CauseCBlockProps {
  state: RealEstateMarketingState;
  onUpdateState: (newState: Partial<RealEstateMarketingState>) => void;
  onNavigateTab: (tab: string) => void;
}

export const CauseCBlock: React.FC<CauseCBlockProps> = ({
  state,
  onUpdateState,
  onNavigateTab
}) => {
  const [subTab, setSubTab] = useState<'c1' | 'c2' | 'c3'>('c1');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Active template for simulator
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(0);
  const activeTemplate = state.postTemplates[selectedTemplateIndex] || state.postTemplates[0];

  // Editable simulation variables
  const [simHook, setSimHook] = useState(activeTemplate?.hook || '');
  const [simPrice, setSimPrice] = useState(activeTemplate?.priceUSD || 18500);
  const [simInitial, setSimInitial] = useState(activeTemplate?.initialDepositUSD || 2500);
  const [simM2, setSimM2] = useState(activeTemplate?.dimensionsM2 || 160);

  // Calculate KPI IUHD
  const requiredTools = state.digitalTools.filter(t => t.isRequired).length;
  const usedTools = state.digitalTools.filter(t => t.isRequired && t.isUsedInDailyOps).length;
  const iuhd = requiredTools > 0 ? ((usedTools / requiredTools) * 100).toFixed(1) : '0';

  const handleToggleToolUsage = (id: string) => {
    const updated = state.digitalTools.map(tool => {
      if (tool.id === id) {
        return { ...tool, isUsedInDailyOps: !tool.isUsedInDailyOps };
      }
      return tool;
    });
    onUpdateState({ digitalTools: updated });
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-slate-900 border border-purple-800/80 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-bold uppercase tracking-wider">
                Bloque Causa C
              </span>
              <span className="text-xs text-slate-400">• Venta de Lotes</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Causa C: Limitado Uso de Herramientas Digitales
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Implantación del ecosistema tecnológico inmobiliario: manuales SOP para CRM y pautas, plantillas estructuradas de publicaciones de lotes y formatos de auditoría continua.
            </p>
          </div>

          {/* Causa C KPI Card */}
          <div className="bg-slate-800/90 border border-purple-700/60 p-4 rounded-xl min-w-[220px]">
            <div className="text-[11px] font-bold uppercase tracking-wider text-purple-300">
              KPI Causa C (IUHD)
            </div>
            <div className="text-2xl font-black text-white mt-0.5">
              {iuhd}%
            </div>
            <div className="text-[10px] text-slate-400 font-mono mt-1">
              IUHD = (Herr. Utilizadas / Requeridas) * 100
            </div>
            <div className="text-xs font-semibold text-emerald-400 mt-1.5 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {usedTools} de {requiredTools} herramientas en uso diario
            </div>
          </div>
        </div>

        {/* Sub-tabs selector for the 3 tools */}
        <div className="flex gap-2 mt-6 pt-4 border-t border-purple-800/50 overflow-x-auto">
          <button
            onClick={() => setSubTab('c1')}
            className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
              subTab === 'c1'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>C.1 MANUAL DE HERRAMIENTAS</span>
            <span className="px-1.5 py-0.2 rounded-full bg-slate-900/60 text-[10px]">
              {state.digitalTools.length}
            </span>
          </button>

          <button
            onClick={() => setSubTab('c2')}
            className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
              subTab === 'c2'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <LayoutTemplate className="w-4 h-4" />
            <span>C.2 PLANTILLA DE EDICIÓN</span>
            <span className="px-1.5 py-0.2 rounded-full bg-slate-900/60 text-[10px]">
              Estructura Post Lotes
            </span>
          </button>

          <button
            onClick={() => setSubTab('c3')}
            className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
              subTab === 'c3'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <ClipboardCheck className="w-4 h-4" />
            <span>C.3 FORMATO DE CONTROL</span>
            <span className="px-1.5 py-0.2 rounded-full bg-slate-900/60 text-[10px]">
              Auditoría Semanal
            </span>
          </button>
        </div>
      </div>

      {/* SUB-TOOL C.1: MANUAL DE HERRAMIENTAS */}
      {subTab === 'c1' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-purple-600" />
                Herramienta C.1: Manuales de Herramientas Digitales Requeridas
              </h3>
              <p className="text-xs text-slate-500">
                Catálogo de software comercial para captación de lotes. Haz clic en el interruptor para marcar uso diario y actualizar el KPI IUHD.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {state.digitalTools.map((tool) => {
              const is24h = tool.releaseDate === '2026-11-11';

              return (
                <div 
                  key={tool.id}
                  className={`bg-white dark:bg-slate-900 border rounded-xl p-4 shadow-sm flex flex-col justify-between transition-all ${
                    is24h ? 'border-amber-400 ring-1 ring-amber-400/40' : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300">
                        {tool.category}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {is24h && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 animate-pulse">
                            ⚠️ VENCE EN 24H
                          </span>
                        )}
                        <span className="text-[10px] font-semibold text-slate-400">
                          {tool.version}
                        </span>
                      </div>
                    </div>

                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      {tool.toolName}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                      {tool.description}
                    </p>

                    <div className="mt-3 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
                      <span className="truncate">SOP: {tool.manualUrlOrGuide}</span>
                      <span className="text-purple-600 dark:text-purple-400 font-semibold">{tool.status}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex justify-between items-center text-xs mb-2">
                      <span className="text-slate-400">Fecha Límite SOP:</span>
                      <span className={`font-semibold ${is24h ? 'text-rose-600' : 'text-slate-700 dark:text-slate-300'}`}>
                        {tool.releaseDate}
                      </span>
                    </div>

                    <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg">
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        ¿En uso diario por el equipo?
                      </span>
                      <button
                        onClick={() => handleToggleToolUsage(tool.id)}
                        className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                          tool.isUsedInDailyOps
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {tool.isUsedInDailyOps ? '✓ Activa' : 'Inactiva'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB-TOOL C.2: PLANTILLA DE EDICIÓN */}
      {subTab === 'c2' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <LayoutTemplate className="w-4 h-4 text-purple-600" />
                Herramienta C.2: Plantilla de Edición de Publicaciones de Lotes
              </h3>
              <p className="text-xs text-slate-500">
                Estructura canónica de alta conversión: Gancho Visual + Beneficios Clave + Ficha Técnica + Llamado a la Acción + Hashtags
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Editor & Selector (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              {/* Template selector buttons */}
              <div className="flex gap-2">
                {state.postTemplates.map((t, idx) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setSelectedTemplateIndex(idx);
                      setSimHook(t.hook);
                      setSimPrice(t.priceUSD);
                      setSimInitial(t.initialDepositUSD);
                      setSimM2(t.dimensionsM2);
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                      selectedTemplateIndex === idx
                        ? 'bg-purple-600 text-white border-purple-500 shadow-md'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    {t.name}
                  </button>
                ))}
              </div>

              {/* Editable Fields Box */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-4 shadow-sm">
                <div className="font-bold text-xs uppercase tracking-wider text-purple-600 dark:text-purple-400 flex items-center gap-2">
                  <Sliders className="w-4 h-4" />
                  Estructura y Parámetros del Anuncio de Lote
                </div>

                {/* Hook */}
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    1. Gancho Visual (Hook de los primeros 3 segundos):
                  </label>
                  <textarea
                    rows={2}
                    value={simHook}
                    onChange={(e) => setSimHook(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
                  />
                </div>

                {/* Technical specs */}
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Área (m²):</label>
                    <input
                      type="number"
                      value={simM2}
                      onChange={(e) => setSimM2(Number(e.target.value))}
                      className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Precio Total ($ USD):</label>
                    <input
                      type="number"
                      value={simPrice}
                      onChange={(e) => setSimPrice(Number(e.target.value))}
                      className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold text-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Inicial ($ USD):</label>
                    <input
                      type="number"
                      value={simInitial}
                      onChange={(e) => setSimInitial(Number(e.target.value))}
                      className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold text-sky-600"
                    />
                  </div>
                </div>

                {/* Benefits */}
                <div>
                  <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    2. Beneficios Clave del Proyecto:
                  </div>
                  <div className="space-y-1.5">
                    {activeTemplate.benefits.map((b, i) => (
                      <div key={i} className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 p-2 rounded flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Legal and CTA */}
                <div>
                  <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    3. Respaldo Jurídico & Llamado a la Acción (CTA):
                  </div>
                  <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 font-medium mb-2">
                    🛡️ {activeTemplate.legalStatus}
                  </div>
                  <div className="p-2.5 rounded-lg bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-xs text-sky-800 dark:text-sky-300 font-medium">
                    {activeTemplate.cta}
                  </div>
                </div>
              </div>
            </div>

            {/* Live Social Media Post Preview (5 cols) */}
            <div className="lg:col-span-5">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xl sticky top-24">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-purple-600" />
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      Vista Previa de Publicación en Redes
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      const fullCopy = `${simHook}\n\n🏡 PROYECTO: ${activeTemplate.name}\n📍 Ubicación: ${activeTemplate.location}\n📐 Área: ${simM2} m²\n💵 Precio: $${simPrice.toLocaleString()} USD | Inicial: $${simInitial.toLocaleString()} USD (${activeTemplate.directFinancingMonths} meses sin intereses)\n\n✨ BENEFICIOS:\n${activeTemplate.benefits.map(b => `• ${b}`).join('\n')}\n\n⚖️ SEGURIDAD: ${activeTemplate.legalStatus}\n\n${activeTemplate.cta}\n\n${activeTemplate.hashtags.join(' ')}`;
                      handleCopyText(fullCopy, 'sim-copy');
                    }}
                    className="text-[11px] font-bold px-2.5 py-1 rounded bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 flex items-center gap-1 hover:bg-purple-200 transition-colors"
                  >
                    {copiedId === 'sim-copy' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === 'sim-copy' ? '¡Copiado!' : 'Copiar Copy'}</span>
                  </button>
                </div>

                {/* Simulated Post Card */}
                <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-950 text-xs">
                  {/* Account header */}
                  <div className="p-3 bg-white dark:bg-slate-900 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-600 to-emerald-500 flex items-center justify-center font-bold text-white text-xs">
                      LR
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white leading-tight">Inmobiliaria Los Robles</div>
                      <div className="text-[10px] text-slate-400">Publicidad • Venta de Lotes Campestres</div>
                    </div>
                  </div>

                  {/* Visual mockup banner */}
                  <div className="bg-gradient-to-br from-emerald-800 via-slate-800 to-indigo-900 h-44 p-4 text-white flex flex-col justify-between relative overflow-hidden">
                    <div className="relative z-10">
                      <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded shadow">
                        LOTES DESDE {simM2} m²
                      </span>
                      <h4 className="font-black text-sm text-white mt-2 drop-shadow">
                        {activeTemplate.lotType}
                      </h4>
                    </div>

                    <div className="relative z-10 bg-slate-950/70 p-2.5 rounded-lg backdrop-blur border border-white/20">
                      <div className="text-[10px] text-emerald-300 font-bold uppercase">Financiamiento Directo</div>
                      <div className="text-base font-black text-white">
                        Cuota Inicial: ${simInitial.toLocaleString()} USD
                      </div>
                      <div className="text-[10px] text-slate-300">
                        Total: ${simPrice.toLocaleString()} USD | Título en Mano
                      </div>
                    </div>
                  </div>

                  {/* Copy content */}
                  <div className="p-3 bg-white dark:bg-slate-900 space-y-2 text-slate-700 dark:text-slate-300">
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {simHook}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      📍 <strong>Ubicación:</strong> {activeTemplate.location}
                    </p>
                    <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                      🛡️ <strong>Seguridad:</strong> {activeTemplate.legalStatus}
                    </p>
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-1">
                      {activeTemplate.hashtags.map((tag, tI) => (
                        <span key={tI} className="text-[10px] text-sky-600 font-semibold">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TOOL C.3: FORMATO DE CONTROL */}
      {subTab === 'c3' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <ClipboardCheck className="w-4 h-4 text-purple-600" />
                Herramienta C.3: Formato de Control y Auditoría de Adopción
              </h3>
              <p className="text-xs text-slate-500">
                Auditoría semanal de horas de uso y tasa de adopción de herramientas por asesor comercial
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-x-auto shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-3">Asesor Auditado</th>
                  <th className="p-3">Herramienta</th>
                  <th className="p-3">Categoría</th>
                  <th className="p-3">Horas Requeridas</th>
                  <th className="p-3">Horas Reales</th>
                  <th className="p-3">Tasa Adopción</th>
                  <th className="p-3">Estado Auditoría</th>
                  <th className="p-3">Última Revisión</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                {state.toolAudits.map((aud) => (
                  <tr key={aud.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="p-3 font-bold text-slate-900 dark:text-white">{aud.advisorName}</td>
                    <td className="p-3 text-purple-600 dark:text-purple-400 font-semibold">{aud.toolName}</td>
                    <td className="p-3 text-slate-500">{aud.category}</td>
                    <td className="p-3 font-mono">{aud.requiredWeeklyHours} hrs/sem</td>
                    <td className="p-3 font-mono">{aud.actualWeeklyHours} hrs/sem</td>
                    <td className="p-3 font-mono font-bold text-slate-900 dark:text-white">
                      {aud.adoptionPercentage}%
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        aud.complianceStatus === 'Óptimo' 
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                          : aud.complianceStatus === 'Regular'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                          : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                      }`}>
                        {aud.complianceStatus}
                      </span>
                    </td>
                    <td className="p-3 text-slate-400">{aud.lastAuditDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

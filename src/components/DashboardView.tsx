import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Users, 
  Target, 
  Layers, 
  GraduationCap, 
  Wrench, 
  Share2, 
  Calendar,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { RealEstateMarketingState, KPICalculation } from '../types';
import { getKPISemaphore } from '../utils/kpiCalculator';

interface DashboardViewProps {
  state: RealEstateMarketingState;
  kpis: KPICalculation;
  onNavigateTab: (tab: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  state,
  kpis,
  onNavigateTab
}) => {
  const ieemSem = getKPISemaphore(kpis.ieem);
  const peeepSem = getKPISemaphore(kpis.peeep);
  const cpSem = getKPISemaphore(kpis.cp);
  const iuhdSem = getKPISemaphore(kpis.iuhd);
  const pcpSem = getKPISemaphore(kpis.pcp);

  // Calculate pending tasks
  const pendingMatrix = state.operationalMatrix.filter(o => o.status !== 'Ejecutada');
  const pendingTrainings = state.trainingPrograms.filter(t => t.status !== 'Ejecutada');
  const pendingTools = state.digitalTools.filter(t => !t.isUsedInDailyOps);
  const pendingPosts = state.editorialCalendar.filter(p => p.status === 'Programada');
  const totalPending = pendingMatrix.length + pendingTrainings.length + pendingTools.length + pendingPosts.length;

  // Real estate metrics
  const totalLeads = state.funnelStages[0]?.currentLeads || 0;
  const visitLeads = state.funnelStages[2]?.currentLeads || 0;
  const closedLots = state.funnelStages[3]?.currentLeads || 0;
  const conversionRateLots = totalLeads > 0 ? ((closedLots / totalLeads) * 100).toFixed(1) : '0';

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Problem Statement & Status Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 rounded-2xl p-6 border border-slate-700/80 shadow-xl text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold">
              <AlertCircle className="w-3.5 h-3.5" />
              Problemática Principal Diagnosticada
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Bajas Estrategias de Marketing Definida
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Monitoreo y resolución de las 4 causas raíces para la inmobiliaria especializada en venta de lotes residenciales y campestres, integrando 12 herramientas comerciales con seguimiento de KPIs en tiempo real.
            </p>
          </div>

          {/* Master IEEM Gauge Widget */}
          <div className="bg-slate-800/90 border border-slate-700 p-4 rounded-xl flex items-center gap-5 shadow-lg backdrop-blur">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-700"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className={kpis.ieem >= 75 ? 'text-emerald-400' : kpis.ieem >= 50 ? 'text-amber-400' : 'text-rose-400'}
                  strokeDasharray={`${kpis.ieem}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-xl font-black text-white">{kpis.ieem}%</span>
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">IEEM</span>
              </div>
            </div>
            <div>
              <div className="text-xs uppercase font-bold text-slate-400">Índice Global de Ejecución</div>
              <div className="text-sm font-bold text-white mt-0.5">
                {kpis.totalExecutedStrategies} de {kpis.totalPlannedStrategies} Estrategias
              </div>
              <div className="mt-1">
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${ieemSem.bg} ${ieemSem.color} border ${ieemSem.border}`}>
                  {ieemSem.label}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Formal KPI Metric Cards with Exact Formulas */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-sky-600" />
            Cuadro de Mando de Indicadores Clave (KPIs Formulados)
          </h3>
          <span className="text-xs text-slate-500">Actualizado en tiempo real con datos de causas</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* KPI General: IEEM */}
          <div className="bg-white dark:bg-slate-900 border border-sky-200 dark:border-sky-900/60 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow relative">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 px-2 py-0.5 rounded">
                Problemática
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${ieemSem.bg} ${ieemSem.color}`}>
                {ieemSem.label}
              </span>
            </div>
            <div className="mt-3">
              <div className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                Índice de Ejecución Estrategias (IEEM)
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                {kpis.ieem}%
              </div>
              <div className="text-[10px] text-slate-500 font-mono mt-1 bg-slate-50 dark:bg-slate-800/80 p-1.5 rounded border border-slate-100 dark:border-slate-800">
                IEEM = (Estrategias Ejec. / Planif.) * 100
              </div>
              <div className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-2 flex justify-between">
                <span>Avance:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {kpis.totalExecutedStrategies} / {kpis.totalPlannedStrategies}
                </span>
              </div>
            </div>
          </div>

          {/* KPI Causa A: PEEEP */}
          <div 
            onClick={() => onNavigateTab('cause-a')}
            className="cursor-pointer bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm hover:border-sky-400 transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded flex items-center gap-1">
                <Layers className="w-3 h-3" /> Causa A
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${peeepSem.bg} ${peeepSem.color}`}>
                {peeepSem.label}
              </span>
            </div>
            <div className="mt-3">
              <div className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                Ejecución Planificada (PEEEP)
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white mt-1 group-hover:text-sky-600">
                {kpis.peeep}%
              </div>
              <div className="text-[10px] text-slate-500 font-mono mt-1 bg-slate-50 dark:bg-slate-800/80 p-1.5 rounded border border-slate-100 dark:border-slate-800">
                PEEEP = (Estrat. Ejec. / Planif.) * 100
              </div>
              <div className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-2 flex justify-between">
                <span>Matriz Operativa:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {kpis.executedA} / {kpis.plannedA}
                </span>
              </div>
            </div>
          </div>

          {/* KPI Causa B: CP */}
          <div 
            onClick={() => onNavigateTab('cause-b')}
            className="cursor-pointer bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm hover:border-emerald-400 transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded flex items-center gap-1">
                <GraduationCap className="w-3 h-3" /> Causa B
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${cpSem.bg} ${cpSem.color}`}>
                {cpSem.label}
              </span>
            </div>
            <div className="mt-3">
              <div className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                Capacitación Personal (CP)
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white mt-1 group-hover:text-emerald-600">
                {kpis.cp}%
              </div>
              <div className="text-[10px] text-slate-500 font-mono mt-1 bg-slate-50 dark:bg-slate-800/80 p-1.5 rounded border border-slate-100 dark:border-slate-800">
                CP = (Capac. Ejec. / Programadas) * 100
              </div>
              <div className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-2 flex justify-between">
                <span>Módulos Realizados:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {kpis.executedTrainings} / {kpis.scheduledTrainings}
                </span>
              </div>
            </div>
          </div>

          {/* KPI Causa C: IUHD */}
          <div 
            onClick={() => onNavigateTab('cause-c')}
            className="cursor-pointer bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm hover:border-purple-400 transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-2 py-0.5 rounded flex items-center gap-1">
                <Wrench className="w-3 h-3" /> Causa C
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${iuhdSem.bg} ${iuhdSem.color}`}>
                {iuhdSem.label}
              </span>
            </div>
            <div className="mt-3">
              <div className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                Uso Herramientas (IUHD)
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white mt-1 group-hover:text-purple-600">
                {kpis.iuhd}%
              </div>
              <div className="text-[10px] text-slate-500 font-mono mt-1 bg-slate-50 dark:bg-slate-800/80 p-1.5 rounded border border-slate-100 dark:border-slate-800">
                IUHD = (Herr. Usadas / Requeridas) * 100
              </div>
              <div className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-2 flex justify-between">
                <span>Herramientas Activas:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {kpis.usedTools} / {kpis.requiredTools}
                </span>
              </div>
            </div>
          </div>

          {/* KPI Causa D: PCP */}
          <div 
            onClick={() => onNavigateTab('cause-d')}
            className="cursor-pointer bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm hover:border-pink-400 transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-pink-700 dark:text-pink-400 bg-pink-50 dark:bg-pink-950/60 px-2 py-0.5 rounded flex items-center gap-1">
                <Share2 className="w-3 h-3" /> Causa D
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${pcpSem.bg} ${pcpSem.color}`}>
                {pcpSem.label}
              </span>
            </div>
            <div className="mt-3">
              <div className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                Cumplimiento Publicaciones (PCP)
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white mt-1 group-hover:text-pink-600">
                {kpis.pcp}%
              </div>
              <div className="text-[10px] text-slate-500 font-mono mt-1 bg-slate-50 dark:bg-slate-800/80 p-1.5 rounded border border-slate-100 dark:border-slate-800">
                PCP = (Publ. Realiz. / Programadas) * 100
              </div>
              <div className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-2 flex justify-between">
                <span>Posts Publicados:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {kpis.completedPosts} / {kpis.scheduledPosts}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Charts & Funnel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Comparative Bar Chart: Planificado vs Ejecutado por Causa */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-sky-600" />
                Comparativa de Ejecución por Causa Raíz
              </h4>
              <p className="text-xs text-slate-500">Planificado vs Ejecutado en tiempo real</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-slate-500">
                <span className="w-3 h-3 bg-slate-300 dark:bg-slate-700 rounded-sm inline-block" /> Planificado
              </span>
              <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-semibold">
                <span className="w-3 h-3 bg-sky-500 rounded-sm inline-block" /> Ejecutado
              </span>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            {/* Causa A */}
            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                <span>Causa A: Planificación de Marketing (PEEEP)</span>
                <span className="font-bold">{kpis.executedA} / {kpis.plannedA} ({kpis.peeep}%)</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden flex">
                <div 
                  className="bg-indigo-500 h-full rounded-full transition-all duration-700"
                  style={{ width: `${kpis.peeep}%` }}
                />
              </div>
            </div>

            {/* Causa B */}
            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                <span>Causa B: Capacitación del Personal (CP)</span>
                <span className="font-bold">{kpis.executedTrainings} / {kpis.scheduledTrainings} ({kpis.cp}%)</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden flex">
                <div 
                  className="bg-emerald-500 h-full rounded-full transition-all duration-700"
                  style={{ width: `${kpis.cp}%` }}
                />
              </div>
            </div>

            {/* Causa C */}
            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                <span>Causa C: Herramientas Digitales (IUHD)</span>
                <span className="font-bold">{kpis.usedTools} / {kpis.requiredTools} ({kpis.iuhd}%)</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden flex">
                <div 
                  className="bg-purple-500 h-full rounded-full transition-all duration-700"
                  style={{ width: `${kpis.iuhd}%` }}
                />
              </div>
            </div>

            {/* Causa D */}
            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                <span>Causa D: Redes Sociales (PCP)</span>
                <span className="font-bold">{kpis.completedPosts} / {kpis.scheduledPosts} ({kpis.pcp}%)</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden flex">
                <div 
                  className="bg-pink-500 h-full rounded-full transition-all duration-700"
                  style={{ width: `${kpis.pcp}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-3 gap-2 text-center">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg">
              <div className="text-[10px] text-slate-500 font-medium">Total Tareas</div>
              <div className="text-sm font-bold text-slate-800 dark:text-slate-200">
                {kpis.plannedA + kpis.scheduledTrainings + kpis.requiredTools + kpis.scheduledPosts}
              </div>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-950/30 p-2 rounded-lg border border-emerald-100 dark:border-emerald-900/40">
              <div className="text-[10px] text-emerald-700 dark:text-emerald-400 font-medium">Ejecutadas</div>
              <div className="text-sm font-bold text-emerald-700 dark:text-emerald-300">
                {kpis.executedA + kpis.executedTrainings + kpis.usedTools + kpis.completedPosts}
              </div>
            </div>
            <div className="bg-amber-50 dark:bg-amber-950/30 p-2 rounded-lg border border-amber-100 dark:border-amber-900/40">
              <div className="text-[10px] text-amber-700 dark:text-amber-400 font-medium">Pendientes</div>
              <div className="text-sm font-bold text-amber-700 dark:text-amber-300">
                {totalPending}
              </div>
            </div>
          </div>
        </div>

        {/* Real Estate Conversion Funnel (Herramienta A.3) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-sky-600" />
                Embudo Comercial de Venta de Lotes (A.3)
              </h4>
              <p className="text-xs text-slate-500">Volumen de prospectos por fase hacia el cierre notarial</p>
            </div>
            <button
              onClick={() => onNavigateTab('cause-a')}
              className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1"
            >
              Ver Embudo <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-2.5">
            {state.funnelStages.map((stage, idx) => {
              const widths = ['100%', '82%', '64%', '48%', '36%'];
              const bgColors = [
                'bg-sky-600',
                'bg-sky-500',
                'bg-indigo-500',
                'bg-emerald-600',
                'bg-amber-500'
              ];

              return (
                <div key={stage.id} className="relative">
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-800 text-[10px] font-bold flex items-center justify-center">
                        {idx + 1}
                      </span>
                      {stage.stage}
                    </span>
                    <span className="text-slate-500">
                      <strong>{stage.currentLeads}</strong> leads / meta: {stage.targetLeads} ({stage.conversionRate}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800/80 h-4 rounded-md overflow-hidden p-0.5">
                    <div 
                      className={`${bgColors[idx]} h-full rounded transition-all duration-700 flex items-center justify-end px-2`}
                      style={{ width: widths[idx] }}
                    >
                      <span className="text-[9px] font-bold text-white leading-none">
                        {stage.currentLeads}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
            <span>Conversión Global (Prospecto a Lote Vendido):</span>
            <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">
              {conversionRateLots}% ({closedLots} Lotes Firmados)
            </span>
          </div>
        </div>
      </div>

      {/* Critical 24h Alerts and Pending Milestones Section */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-500" />
              Gestión de Vencimientos y Alertas Automáticas (Lookahead 24h)
            </h4>
            <p className="text-xs text-slate-500">
              Hitos configurados para notificación automática 24 horas antes del plazo establecido
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('alerts')}
            className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <span>Bandeja de Correo y Alertas</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* A.3 Alert Item */}
          <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20 relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-sky-100 dark:bg-sky-900/60 text-sky-800 dark:text-sky-300">
                A.3 Embudo
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200 dark:bg-amber-800 text-amber-900 dark:text-amber-100 animate-pulse">
                Vence en 24h
              </span>
            </div>
            <h5 className="font-semibold text-xs text-slate-900 dark:text-white line-clamp-2">
              {state.funnelStages[0]?.keyMilestone}
            </h5>
            <div className="mt-3 pt-2 border-t border-amber-200/60 dark:border-amber-900/40 text-[11px] text-slate-600 dark:text-slate-400 space-y-1">
              <div className="flex justify-between">
                <span>Fecha Límite:</span>
                <span className="font-bold text-rose-600">{state.funnelStages[0]?.milestoneDate}</span>
              </div>
              <div className="flex justify-between">
                <span>Responsable:</span>
                <span className="font-medium text-slate-800 dark:text-slate-200 truncate max-w-[120px]">
                  {state.funnelStages[0]?.milestoneResponsible}
                </span>
              </div>
            </div>
          </div>

          {/* B.1 Alert Item */}
          <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20 relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300">
                B.1 Capacitación
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200 dark:bg-amber-800 text-amber-900 dark:text-amber-100 animate-pulse">
                Vence en 24h
              </span>
            </div>
            <h5 className="font-semibold text-xs text-slate-900 dark:text-white line-clamp-2">
              {state.trainingPrograms[0]?.moduleName}
            </h5>
            <div className="mt-3 pt-2 border-t border-amber-200/60 dark:border-amber-900/40 text-[11px] text-slate-600 dark:text-slate-400 space-y-1">
              <div className="flex justify-between">
                <span>Fecha Programada:</span>
                <span className="font-bold text-rose-600">{state.trainingPrograms[0]?.scheduledDate}</span>
              </div>
              <div className="flex justify-between">
                <span>Instructor:</span>
                <span className="font-medium text-slate-800 dark:text-slate-200 truncate max-w-[120px]">
                  {state.trainingPrograms[0]?.instructor}
                </span>
              </div>
            </div>
          </div>

          {/* C.1 Alert Item */}
          <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20 relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-900/60 text-purple-800 dark:text-purple-300">
                C.1 Herramientas
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200 dark:bg-amber-800 text-amber-900 dark:text-amber-100 animate-pulse">
                Vence en 24h
              </span>
            </div>
            <h5 className="font-semibold text-xs text-slate-900 dark:text-white line-clamp-2">
              Entrega del SOP {state.digitalTools[0]?.toolName}
            </h5>
            <div className="mt-3 pt-2 border-t border-amber-200/60 dark:border-amber-900/40 text-[11px] text-slate-600 dark:text-slate-400 space-y-1">
              <div className="flex justify-between">
                <span>Fecha Límite:</span>
                <span className="font-bold text-rose-600">{state.digitalTools[0]?.releaseDate}</span>
              </div>
              <div className="flex justify-between">
                <span>Responsable:</span>
                <span className="font-medium text-slate-800 dark:text-slate-200 truncate max-w-[120px]">
                  {state.digitalTools[0]?.responsible}
                </span>
              </div>
            </div>
          </div>

          {/* D.1 Alert Item */}
          <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20 relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-pink-100 dark:bg-pink-900/60 text-pink-800 dark:text-pink-300">
                D.1 Plan RRSS
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200 dark:bg-amber-800 text-amber-900 dark:text-amber-100 animate-pulse">
                Vence en 24h
              </span>
            </div>
            <h5 className="font-semibold text-xs text-slate-900 dark:text-white line-clamp-2">
              {state.actionPlans[0]?.objective}
            </h5>
            <div className="mt-3 pt-2 border-t border-amber-200/60 dark:border-amber-900/40 text-[11px] text-slate-600 dark:text-slate-400 space-y-1">
              <div className="flex justify-between">
                <span>Fecha Límite:</span>
                <span className="font-bold text-rose-600">{state.actionPlans[0]?.deadline}</span>
              </div>
              <div className="flex justify-between">
                <span>Responsable:</span>
                <span className="font-medium text-slate-800 dark:text-slate-200 truncate max-w-[120px]">
                  {state.actionPlans[0]?.responsible}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

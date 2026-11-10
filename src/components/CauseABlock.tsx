import React, { useState } from 'react';
import { 
  Layers, 
  Grid3X3, 
  Table, 
  Filter, 
  Plus, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ArrowRight,
  TrendingUp,
  DollarSign,
  User,
  Calendar
} from 'lucide-react';
import { RealEstateMarketingState, FodaItem, OperationalMatrixItem, FunnelStageData } from '../types';

interface CauseABlockProps {
  state: RealEstateMarketingState;
  onUpdateState: (newState: Partial<RealEstateMarketingState>) => void;
  onNavigateTab: (tab: string) => void;
}

export const CauseABlock: React.FC<CauseABlockProps> = ({
  state,
  onUpdateState,
  onNavigateTab
}) => {
  const [subTab, setSubTab] = useState<'a1' | 'a2' | 'a3'>('a1');
  const [fodaFilter, setFodaFilter] = useState<string>('ALL');

  // Form states for adding items
  const [showAddFoda, setShowAddFoda] = useState(false);
  const [newFoda, setNewFoda] = useState<Partial<FodaItem>>({
    type: 'FO',
    title: '',
    description: '',
    objective: '',
    priority: 'Alta'
  });

  const [showAddOp, setShowAddOp] = useState(false);
  const [newOp, setNewOp] = useState<Partial<OperationalMatrixItem>>({
    fodaRef: state.fodaItems[0]?.title || '',
    strategy: '',
    funnelStage: 'Atracción',
    channel: 'Meta Ads',
    responsible: 'Lic. Aldair Vásquez',
    deadline: '2026-11-20',
    status: 'Planificada',
    deliverable: '',
    budget: 500
  });

  // Calculate PEEEP
  const totalPlanned = state.operationalMatrix.length;
  const totalExecuted = state.operationalMatrix.filter(o => o.status === 'Ejecutada').length;
  const peeep = totalPlanned > 0 ? ((totalExecuted / totalPlanned) * 100).toFixed(1) : '0';

  const handleToggleOpStatus = (id: string, newStatus: OperationalMatrixItem['status']) => {
    const updated = state.operationalMatrix.map(item => {
      if (item.id === id) {
        return { ...item, status: newStatus };
      }
      return item;
    });
    onUpdateState({ operationalMatrix: updated });
  };

  const handleToggleMilestone = (id: string) => {
    const updated = state.funnelStages.map(stage => {
      if (stage.id === id) {
        const nextStatus: FunnelStageData['milestoneStatus'] = stage.milestoneStatus === 'Completada' ? 'En Proceso' : 'Completada';
        return { ...stage, milestoneStatus: nextStatus };
      }
      return stage;
    });
    onUpdateState({ funnelStages: updated });
  };

  const handleAddFoda = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFoda.title || !newFoda.description) return;
    const item: FodaItem = {
      id: `foda-${Date.now()}`,
      code: `${newFoda.type}-${state.fodaItems.length + 1}`,
      type: newFoda.type || 'FO',
      title: newFoda.title,
      description: newFoda.description,
      objective: newFoda.objective || 'Incrementar la captación de compradores de lotes',
      priority: newFoda.priority || 'Alta'
    };
    onUpdateState({ fodaItems: [...state.fodaItems, item] });
    setNewFoda({ type: 'FO', title: '', description: '', objective: '', priority: 'Alta' });
    setShowAddFoda(false);
  };

  const handleAddOp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOp.strategy || !newOp.deliverable) return;
    const item: OperationalMatrixItem = {
      id: `op-${Date.now()}`,
      code: `OP-0${state.operationalMatrix.length + 1}`,
      fodaRef: newOp.fodaRef || 'Estrategia FODA',
      strategy: newOp.strategy,
      funnelStage: newOp.funnelStage || 'Atracción',
      channel: newOp.channel || 'Canal Digital',
      responsible: newOp.responsible || 'Responsable Comercial',
      deadline: newOp.deadline || '2026-11-25',
      status: 'Planificada',
      deliverable: newOp.deliverable,
      budget: Number(newOp.budget) || 300
    };
    onUpdateState({ operationalMatrix: [...state.operationalMatrix, item] });
    setShowAddOp(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-slate-900 border border-indigo-800/80 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs font-bold uppercase tracking-wider">
                Bloque Causa A
              </span>
              <span className="text-xs text-slate-400">• Venta de Lotes</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Causa A: Deficiente Planificación de Marketing
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Estructuración estratégica mediante el cruce de fortalezas y debilidades de la inmobiliaria, despliegue en la matriz operativa comercial y gobierno de las 5 etapas del embudo.
            </p>
          </div>

          {/* Causa A KPI Card */}
          <div className="bg-slate-800/90 border border-indigo-700/60 p-4 rounded-xl min-w-[220px]">
            <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-300">
              KPI Causa A (PEEEP)
            </div>
            <div className="text-2xl font-black text-white mt-0.5">
              {peeep}%
            </div>
            <div className="text-[10px] text-slate-400 font-mono mt-1">
              PEEEP = (Estrat. Ejecutadas / Planificadas) * 100
            </div>
            <div className="text-xs font-semibold text-emerald-400 mt-1.5 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {totalExecuted} de {totalPlanned} estrategias ejecutadas
            </div>
          </div>
        </div>

        {/* Sub-tabs selector for the 3 tools */}
        <div className="flex gap-2 mt-6 pt-4 border-t border-indigo-800/50 overflow-x-auto">
          <button
            onClick={() => setSubTab('a1')}
            className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
              subTab === 'a1'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Grid3X3 className="w-4 h-4" />
            <span>A.1 FODA CRUZADO</span>
            <span className="px-1.5 py-0.2 rounded-full bg-slate-900/60 text-[10px]">
              {state.fodaItems.length}
            </span>
          </button>

          <button
            onClick={() => setSubTab('a2')}
            className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
              subTab === 'a2'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Table className="w-4 h-4" />
            <span>A.2 MATRIZ OPERATIVA</span>
            <span className="px-1.5 py-0.2 rounded-full bg-slate-900/60 text-[10px]">
              {state.operationalMatrix.length}
            </span>
          </button>

          <button
            onClick={() => setSubTab('a3')}
            className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
              subTab === 'a3'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span>A.3 GESTIÓN DEL EMBUDO</span>
            <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 font-black text-[10px]">
              5 Etapas
            </span>
          </button>
        </div>
      </div>

      {/* SUB-TOOL A.1: FODA CRUZADO */}
      {subTab === 'a1' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Grid3X3 className="w-4 h-4 text-indigo-600" />
                Herramienta A.1: Matriz FODA Cruzado para Lotes
              </h3>
              <p className="text-xs text-slate-500">
                Estrategias de cruce adaptadas al sector inmobiliario (FO, DO, FA, DA)
              </p>
            </div>

            <div className="flex items-center gap-2">
              {/* Type Filter */}
              <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg text-xs">
                {['ALL', 'FO', 'DO', 'FA', 'DA'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFodaFilter(type)}
                    className={`px-2.5 py-1 rounded-md font-semibold ${
                      fodaFilter === type
                        ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowAddFoda(!showAddFoda)}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Nueva Estrategia</span>
              </button>
            </div>
          </div>

          {/* Form to add strategy */}
          {showAddFoda && (
            <form onSubmit={handleAddFoda} className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-indigo-200 dark:border-indigo-900/60 space-y-3">
              <div className="font-bold text-xs text-indigo-700 dark:text-indigo-400 uppercase">
                Agregar Estrategia al FODA Cruzado
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">Tipo de Estrategia</label>
                  <select
                    value={newFoda.type}
                    onChange={(e) => setNewFoda({ ...newFoda, type: e.target.value as any })}
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  >
                    <option value="FO">FO (Fortalezas + Oportunidades)</option>
                    <option value="DO">DO (Debilidades + Oportunidades)</option>
                    <option value="FA">FA (Fortalezas + Amenazas)</option>
                    <option value="DA">DA (Debilidades + Amenazas)</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">Título de la Estrategia</label>
                  <input
                    type="text"
                    required
                    value={newFoda.title}
                    onChange={(e) => setNewFoda({ ...newFoda, title: e.target.value })}
                    placeholder="Ej. Campaña de Lotes con Cuota Inicial Fraccionada"
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">Descripción de Acción</label>
                <textarea
                  required
                  rows={2}
                  value={newFoda.description}
                  onChange={(e) => setNewFoda({ ...newFoda, description: e.target.value })}
                  placeholder="Explique cómo aprovechar la fortaleza o mitigar la debilidad en la venta de lotes..."
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">Objetivo Cuantificable</label>
                  <input
                    type="text"
                    value={newFoda.objective}
                    onChange={(e) => setNewFoda({ ...newFoda, objective: e.target.value })}
                    placeholder="Ej. Aumentar 30% las visitas guiadas a terreno"
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">Prioridad</label>
                  <select
                    value={newFoda.priority}
                    onChange={(e) => setNewFoda({ ...newFoda, priority: e.target.value as any })}
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  >
                    <option value="Alta">Alta</option>
                    <option value="Media">Media</option>
                    <option value="Baja">Baja</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddFoda(false)}
                  className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-700"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold"
                >
                  Guardar en FODA
                </button>
              </div>
            </form>
          )}

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {state.fodaItems
              .filter(item => fodaFilter === 'ALL' || item.type === fodaFilter)
              .map((item) => {
                const badgeColor = 
                  item.type === 'FO' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300' :
                  item.type === 'DO' ? 'bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300 border-sky-300' :
                  item.type === 'FA' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300' :
                  'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-300';

                return (
                  <div key={item.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm hover:border-indigo-400 transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${badgeColor}`}>
                          {item.code} ({item.type})
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">
                          Prioridad: {item.priority}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                      <div className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                        Meta Comercial:
                      </div>
                      <div className="text-slate-700 dark:text-slate-300 font-medium text-[11px]">
                        {item.objective}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* SUB-TOOL A.2: MATRIZ OPERATIVA */}
      {subTab === 'a2' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Table className="w-4 h-4 text-indigo-600" />
                Herramienta A.2: Matriz Operativa Comercial
              </h3>
              <p className="text-xs text-slate-500">
                Jala estrategias del FODA cruzado y especifica: embudo, canal, responsable, entregable y presupuesto
              </p>
            </div>

            <button
              onClick={() => setShowAddOp(!showAddOp)}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Nueva Entrada Operativa</span>
            </button>
          </div>

          {/* Form to add Matrix item */}
          {showAddOp && (
            <form onSubmit={handleAddOp} className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-indigo-200 dark:border-indigo-900/60 space-y-3">
              <div className="font-bold text-xs text-indigo-700 dark:text-indigo-400 uppercase">
                Vincular Estrategia de FODA a Matriz Operativa
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">Estrategia FODA Origen</label>
                  <select
                    value={newOp.fodaRef}
                    onChange={(e) => setNewOp({ ...newOp, fodaRef: e.target.value })}
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  >
                    {state.fodaItems.map(f => (
                      <option key={f.id} value={`${f.code} - ${f.title}`}>
                        {f.code} - {f.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">Etapa del Embudo</label>
                  <select
                    value={newOp.funnelStage}
                    onChange={(e) => setNewOp({ ...newOp, funnelStage: e.target.value as any })}
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  >
                    <option value="Atracción">Atracción</option>
                    <option value="Interacción">Interacción</option>
                    <option value="Conversión">Conversión</option>
                    <option value="Cierre">Cierre</option>
                    <option value="Fidelización">Fidelización</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">Canal de Difusión</label>
                  <input
                    type="text"
                    required
                    value={newOp.channel}
                    onChange={(e) => setNewOp({ ...newOp, channel: e.target.value })}
                    placeholder="Ej. Meta Ads / WhatsApp / Terreno"
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">Táctica / Estrategia Operativa Específica</label>
                <input
                  type="text"
                  required
                  value={newOp.strategy}
                  onChange={(e) => setNewOp({ ...newOp, strategy: e.target.value })}
                  placeholder="Ej. Pauta con video de dron mostrando habilitación urbana y precio inicial"
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">Responsable</label>
                  <input
                    type="text"
                    required
                    value={newOp.responsible}
                    onChange={(e) => setNewOp({ ...newOp, responsible: e.target.value })}
                    placeholder="Nombre del responsable"
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">Fecha Límite</label>
                  <input
                    type="date"
                    required
                    value={newOp.deadline}
                    onChange={(e) => setNewOp({ ...newOp, deadline: e.target.value })}
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">Presupuesto ($ USD)</label>
                  <input
                    type="number"
                    value={newOp.budget}
                    onChange={(e) => setNewOp({ ...newOp, budget: Number(e.target.value) })}
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">Entregable Tangible</label>
                <input
                  type="text"
                  required
                  value={newOp.deliverable}
                  onChange={(e) => setNewOp({ ...newOp, deliverable: e.target.value })}
                  placeholder="Ej. Set de 4 creativos de lotes cargados en Ads Manager"
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddOp(false)}
                  className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-700"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold"
                >
                  Guardar en Matriz
                </button>
              </div>
            </form>
          )}

          {/* Matrix Table */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-x-auto shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-3">Código</th>
                  <th className="p-3">Estrategia & FODA</th>
                  <th className="p-3">Embudo</th>
                  <th className="p-3">Canal</th>
                  <th className="p-3">Responsable</th>
                  <th className="p-3">Plazo</th>
                  <th className="p-3">Entregable</th>
                  <th className="p-3">Estado (Click para cambiar)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                {state.operationalMatrix.map((item) => {
                  const isExecuted = item.status === 'Ejecutada';
                  const isTomorrow = item.deadline === '2026-11-11';

                  return (
                    <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="p-3 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        {item.code}
                      </td>
                      <td className="p-3 max-w-xs">
                        <div className="font-bold text-slate-900 dark:text-white">{item.strategy}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">{item.fodaRef}</div>
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {item.funnelStage}
                        </span>
                      </td>
                      <td className="p-3 text-slate-600 dark:text-slate-400">{item.channel}</td>
                      <td className="p-3 text-slate-700 dark:text-slate-300">{item.responsible}</td>
                      <td className="p-3">
                        <div className={`font-semibold ${isTomorrow ? 'text-amber-600 dark:text-amber-400 flex items-center gap-1' : 'text-slate-600 dark:text-slate-400'}`}>
                          {item.deadline}
                          {isTomorrow && <span className="text-[9px] bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 px-1 rounded">24h</span>}
                        </div>
                      </td>
                      <td className="p-3 text-slate-500 max-w-[180px] truncate" title={item.deliverable}>
                        {item.deliverable}
                      </td>
                      <td className="p-3">
                        <select
                          value={item.status}
                          onChange={(e) => handleToggleOpStatus(item.id, e.target.value as any)}
                          className={`text-xs font-bold px-2 py-1 rounded-md border transition-all ${
                            item.status === 'Ejecutada'
                              ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300'
                              : item.status === 'En Progreso'
                              ? 'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border-sky-300'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300'
                          }`}
                        >
                          <option value="Planificada">Planificada</option>
                          <option value="En Progreso">En Progreso</option>
                          <option value="Ejecutada">Ejecutada</option>
                          <option value="Cancelada">Cancelada</option>
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-TOOL A.3: GESTIÓN DEL EMBUDO */}
      {subTab === 'a3' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Filter className="w-4 h-4 text-indigo-600" />
                Herramienta A.3: Gestión Integral del Embudo de Lotes
              </h3>
              <p className="text-xs text-slate-500">
                Atracción, Interacción, Conversión, Cierre y Fidelización con hitos fechados para alertas preventivas
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('alerts')}
              className="text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-3 py-1.5 rounded-lg border border-amber-300 flex items-center gap-1.5"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Ver Alertas 24h del Embudo</span>
            </button>
          </div>

          <div className="space-y-3">
            {state.funnelStages.map((stage, idx) => {
              const is24h = stage.milestoneDate === '2026-11-11';
              const isDone = stage.milestoneStatus === 'Completada';

              return (
                <div 
                  key={stage.id}
                  className={`bg-white dark:bg-slate-900 border rounded-xl p-4 shadow-sm transition-all ${
                    is24h ? 'border-amber-400 ring-1 ring-amber-400/30' : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                    <div className="space-y-1 max-w-xl">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-md bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <h4 className="font-black text-sm text-slate-900 dark:text-white">
                          Fase {idx + 1}: {stage.stage}
                        </h4>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold">
                          Meta: {stage.targetLeads} leads ({stage.currentLeads} actuales)
                        </span>
                        {is24h && (
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 animate-pulse">
                            ⚠️ VENCE EN 24H
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {stage.description}
                      </p>

                      {/* Tactics list */}
                      <div className="pt-2 flex flex-wrap gap-1.5">
                        {stage.tactics.map((tactic, tIdx) => (
                          <span 
                            key={tIdx}
                            className="text-[10px] bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700"
                          >
                            ✓ {tactic}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Milestone and Action trigger */}
                    <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-200 dark:border-slate-700/80 min-w-[280px]">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Hito Crítico para Notificación
                      </div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">
                        {stage.keyMilestone}
                      </div>

                      <div className="mt-2 text-[11px] text-slate-600 dark:text-slate-400 space-y-1">
                        <div className="flex justify-between">
                          <span>Fecha límite:</span>
                          <span className={`font-bold ${is24h ? 'text-rose-600' : 'text-slate-800 dark:text-slate-200'}`}>
                            {stage.milestoneDate}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Responsable:</span>
                          <span className="font-medium text-slate-800 dark:text-slate-200">{stage.milestoneResponsible}</span>
                        </div>
                      </div>

                      <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          isDone 
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                        }`}>
                          {stage.milestoneStatus}
                        </span>

                        <button
                          onClick={() => handleToggleMilestone(stage.id)}
                          className={`text-xs font-semibold px-2.5 py-1 rounded transition-colors ${
                            isDone 
                              ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300' 
                              : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm'
                          }`}
                        >
                          {isDone ? 'Reabrir Hito' : 'Marcar Completado'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

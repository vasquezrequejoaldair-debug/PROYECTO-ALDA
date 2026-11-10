import React, { useState } from 'react';
import { 
  GraduationCap, 
  Calendar, 
  Video, 
  FileCheck2, 
  Plus, 
  CheckCircle2, 
  Clock, 
  Award, 
  BookOpen, 
  Users, 
  Check, 
  X,
  FileText
} from 'lucide-react';
import { RealEstateMarketingState, TrainingProgramItem, WorkshopItem, EvaluationItem } from '../types';

interface CauseBBlockProps {
  state: RealEstateMarketingState;
  onUpdateState: (newState: Partial<RealEstateMarketingState>) => void;
  onNavigateTab: (tab: string) => void;
}

export const CauseBBlock: React.FC<CauseBBlockProps> = ({
  state,
  onUpdateState,
  onNavigateTab
}) => {
  const [subTab, setSubTab] = useState<'b1' | 'b2' | 'b3'>('b1');

  // Form states
  const [showAddTrain, setShowAddTrain] = useState(false);
  const [newTrain, setNewTrain] = useState<Partial<TrainingProgramItem>>({
    code: `MOD-0${state.trainingPrograms.length + 1}`,
    moduleName: '',
    topics: [''],
    scheduledDate: '2026-11-20',
    durationHours: 4,
    instructor: 'Especialista Inmobiliario',
    enrolledAttendees: 12,
    status: 'Programada'
  });

  const [showAddEval, setShowAddEval] = useState(false);
  const [newEval, setNewEval] = useState<Partial<EvaluationItem>>({
    staffName: '',
    role: 'Asesor Comercial',
    testTopic: 'Conocimientos Legales y Técnicos de Lotes',
    score: 16,
    maxScore: 20,
    feedback: 'Aprobó satisfactoriamente'
  });

  // Calculate KPI CP
  const totalScheduled = state.trainingPrograms.length;
  const totalExecuted = state.trainingPrograms.filter(t => t.status === 'Ejecutada').length;
  const cp = totalScheduled > 0 ? ((totalExecuted / totalScheduled) * 100).toFixed(1) : '0';

  const handleToggleTrainingStatus = (id: string) => {
    const updated = state.trainingPrograms.map(train => {
      if (train.id === id) {
        const nextStatus: TrainingProgramItem['status'] = train.status === 'Ejecutada' ? 'Programada' : 'Ejecutada';
        const attended = nextStatus === 'Ejecutada' ? train.enrolledAttendees : 0;
        return { ...train, status: nextStatus, attendedCount: attended };
      }
      return train;
    });
    onUpdateState({ trainingPrograms: updated });
  };

  const handleToggleWorkshopStatus = (id: string, status: WorkshopItem['reviewStatus']) => {
    const updated = state.workshops.map(w => {
      if (w.id === id) {
        return { ...w, reviewStatus: status };
      }
      return w;
    });
    onUpdateState({ workshops: updated });
  };

  const handleAddTraining = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTrain.moduleName) return;
    const item: TrainingProgramItem = {
      id: `train-${Date.now()}`,
      code: newTrain.code || `MOD-0${state.trainingPrograms.length + 1}`,
      moduleName: newTrain.moduleName,
      topics: newTrain.topics?.filter(t => t.trim().length > 0) || ['Manejo de objeciones de lotes'],
      scheduledDate: newTrain.scheduledDate || '2026-11-22',
      durationHours: Number(newTrain.durationHours) || 3,
      instructor: newTrain.instructor || 'Instructor Comercial',
      enrolledAttendees: Number(newTrain.enrolledAttendees) || 12,
      attendedCount: 0,
      status: 'Programada'
    };
    onUpdateState({ trainingPrograms: [...state.trainingPrograms, item] });
    setShowAddTrain(false);
  };

  const handleAddEval = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEval.staffName) return;
    const scoreVal = Number(newEval.score) || 14;
    const item: EvaluationItem = {
      id: `eval-${Date.now()}`,
      staffName: newEval.staffName,
      role: newEval.role || 'Asesor Comercial',
      testTopic: newEval.testTopic || 'Evaluación de Lotes',
      score: scoreVal,
      maxScore: 20,
      date: new Date().toISOString().split('T')[0],
      feedback: newEval.feedback || '',
      passed: scoreVal >= 14
    };
    onUpdateState({ evaluations: [...state.evaluations, item] });
    setShowAddEval(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 border border-emerald-800/80 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold uppercase tracking-wider">
                Bloque Causa B
              </span>
              <span className="text-xs text-slate-400">• Venta de Lotes</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Causa B: Escasa Capacitación de Personal
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Profesionalización del equipo comercial en argumentos legales de títulos de propiedad, técnicas de cierre en terreno y manejo de herramientas digitales mediante talleres y evaluaciones continuas.
            </p>
          </div>

          {/* Causa B KPI Card */}
          <div className="bg-slate-800/90 border border-emerald-700/60 p-4 rounded-xl min-w-[220px]">
            <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
              KPI Causa B (CP)
            </div>
            <div className="text-2xl font-black text-white mt-0.5">
              {cp}%
            </div>
            <div className="text-[10px] text-slate-400 font-mono mt-1">
              CP = (Capacitaciones Ejec. / Programadas) * 100
            </div>
            <div className="text-xs font-semibold text-emerald-400 mt-1.5 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {totalExecuted} de {totalScheduled} módulos ejecutados
            </div>
          </div>
        </div>

        {/* Sub-tabs selector for the 3 tools */}
        <div className="flex gap-2 mt-6 pt-4 border-t border-emerald-800/50 overflow-x-auto">
          <button
            onClick={() => setSubTab('b1')}
            className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
              subTab === 'b1'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>B.1 PROGRAMA DE CAPACITACIÓN</span>
            <span className="px-1.5 py-0.2 rounded-full bg-slate-900/60 text-[10px]">
              {state.trainingPrograms.length}
            </span>
          </button>

          <button
            onClick={() => setSubTab('b2')}
            className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
              subTab === 'b2'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>B.2 TALLER DE CREACIÓN</span>
            <span className="px-1.5 py-0.2 rounded-full bg-slate-900/60 text-[10px]">
              {state.workshops.length}
            </span>
          </button>

          <button
            onClick={() => setSubTab('b3')}
            className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
              subTab === 'b3'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <FileCheck2 className="w-4 h-4" />
            <span>B.3 EVALUACIÓN</span>
            <span className="px-1.5 py-0.2 rounded-full bg-slate-900/60 text-[10px]">
              {state.evaluations.length}
            </span>
          </button>
        </div>
      </div>

      {/* SUB-TOOL B.1: PROGRAMA DE CAPACITACIÓN */}
      {subTab === 'b1' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-600" />
                Herramienta B.1: Programa de Capacitación Especializado en Lotes
              </h3>
              <p className="text-xs text-slate-500">
                Módulos planificados con fechas de ejecución, instructor y control de asistencia
              </p>
            </div>

            <button
              onClick={() => setShowAddTrain(!showAddTrain)}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Nuevo Módulo</span>
            </button>
          </div>

          {/* Add form */}
          {showAddTrain && (
            <form onSubmit={handleAddTraining} className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/60 space-y-3">
              <div className="font-bold text-xs text-emerald-700 dark:text-emerald-400 uppercase">
                Registrar Nuevo Módulo de Capacitación
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">Código</label>
                  <input
                    type="text"
                    value={newTrain.code}
                    onChange={(e) => setNewTrain({ ...newTrain, code: e.target.value })}
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">Nombre del Módulo</label>
                  <input
                    type="text"
                    required
                    value={newTrain.moduleName}
                    onChange={(e) => setNewTrain({ ...newTrain, moduleName: e.target.value })}
                    placeholder="Ej. Protocolo de Visitas Guiadas al Terreno"
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">Fecha Programada</label>
                  <input
                    type="date"
                    required
                    value={newTrain.scheduledDate}
                    onChange={(e) => setNewTrain({ ...newTrain, scheduledDate: e.target.value })}
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">Instructor / Entrenador</label>
                  <input
                    type="text"
                    required
                    value={newTrain.instructor}
                    onChange={(e) => setNewTrain({ ...newTrain, instructor: e.target.value })}
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">Horas Lectivas</label>
                  <input
                    type="number"
                    value={newTrain.durationHours}
                    onChange={(e) => setNewTrain({ ...newTrain, durationHours: Number(e.target.value) })}
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddTrain(false)}
                  className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-700"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold"
                >
                  Programar Capacitación
                </button>
              </div>
            </form>
          )}

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {state.trainingPrograms.map((train) => {
              const isExecuted = train.status === 'Ejecutada';
              const is24h = train.scheduledDate === '2026-11-11';

              return (
                <div
                  key={train.id}
                  className={`bg-white dark:bg-slate-900 border rounded-xl p-4 shadow-sm flex flex-col justify-between transition-all ${
                    is24h ? 'border-amber-400 ring-1 ring-amber-400/40' : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                        {train.code}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {is24h && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 animate-pulse">
                            ⚠️ VENCE EN 24H
                          </span>
                        )}
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            isExecuted
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                              : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                          }`}
                        >
                          {train.status}
                        </span>
                      </div>
                    </div>

                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      {train.moduleName}
                    </h4>

                    {/* Topics */}
                    <div className="mt-3 space-y-1">
                      <div className="text-[10px] uppercase font-bold text-slate-400">Temario Práctico:</div>
                      {train.topics.map((topic, i) => (
                        <div key={i} className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-1.5">
                          <span className="text-emerald-500 mt-0.5">•</span>
                          <span>{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                    <div className="flex justify-between items-center text-slate-500 mb-3">
                      <span><strong>Fecha:</strong> {train.scheduledDate} ({train.durationHours} hrs)</span>
                      <span><strong>Instructor:</strong> {train.instructor}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-[11px] text-slate-600 dark:text-slate-400">
                        Asistencia: <strong>{train.attendedCount}</strong> de {train.enrolledAttendees} inscritos
                      </div>

                      <button
                        onClick={() => handleToggleTrainingStatus(train.id)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                          isExecuted
                            ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                            : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{isExecuted ? 'Marcar Pendiente' : 'Ejecutar Capacitación'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB-TOOL B.2: TALLER DE CREACIÓN */}
      {subTab === 'b2' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Video className="w-4 h-4 text-emerald-600" />
                Herramienta B.2: Taller de Creación de Contenido Inmobiliario
              </h3>
              <p className="text-xs text-slate-500">
                Entrenamientos prácticos donde los asesores generan piezas de venta de lotes y las entregan para revisión
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {state.workshops.map((wsh) => (
              <div key={wsh.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                      {wsh.modality}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      wsh.reviewStatus === 'Aprobado' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {wsh.reviewStatus}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {wsh.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                    {wsh.objective}
                  </p>

                  {/* Deliverable preview box */}
                  {wsh.samplePreviewText && (
                    <div className="mt-3 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-700 dark:text-slate-300 font-mono">
                      <div className="text-[9px] uppercase font-bold text-slate-400 mb-1">Estructura del Entregable:</div>
                      {wsh.samplePreviewText}
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-500">Entregables:</span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {wsh.deliverablesSubmitted} de {wsh.targetDeliverables} Asesores
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleToggleWorkshopStatus(wsh.id, 'Aprobado')}
                      className="flex-1 py-1 px-2 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[11px] flex items-center justify-center gap-1"
                    >
                      <Check className="w-3 h-3" /> Aprobar
                    </button>
                    <button
                      onClick={() => handleToggleWorkshopStatus(wsh.id, 'En Corrección')}
                      className="py-1 px-2 rounded bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-700 dark:text-slate-300 font-semibold text-[11px]"
                    >
                      Observar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TOOL B.3: EVALUACIÓN */}
      {subTab === 'b3' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-emerald-600" />
                Herramienta B.3: Evaluaciones de Rendimiento del Personal
              </h3>
              <p className="text-xs text-slate-500">
                Calificaciones teóricas y prácticas en aspectos legales, planos y objeciones (Escala 0-20, nota mínima aprobatoria 14)
              </p>
            </div>

            <button
              onClick={() => setShowAddEval(!showAddEval)}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Calificar Asesor</span>
            </button>
          </div>

          {/* Add evaluation modal */}
          {showAddEval && (
            <form onSubmit={handleAddEval} className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/60 space-y-3">
              <div className="font-bold text-xs text-emerald-700 dark:text-emerald-400 uppercase">
                Registrar Calificación de Asesor
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">Nombre del Asesor</label>
                  <input
                    type="text"
                    required
                    value={newEval.staffName}
                    onChange={(e) => setNewEval({ ...newEval, staffName: e.target.value })}
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">Rol</label>
                  <input
                    type="text"
                    value={newEval.role}
                    onChange={(e) => setNewEval({ ...newEval, role: e.target.value })}
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">Nota (0 a 20)</label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={newEval.score}
                    onChange={(e) => setNewEval({ ...newEval, score: Number(e.target.value) })}
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold text-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">Tema Evaluado</label>
                <input
                  type="text"
                  required
                  value={newEval.testTopic}
                  onChange={(e) => setNewEval({ ...newEval, testTopic: e.target.value })}
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">Retroalimentación / Observaciones</label>
                <input
                  type="text"
                  value={newEval.feedback}
                  onChange={(e) => setNewEval({ ...newEval, feedback: e.target.value })}
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddEval(false)}
                  className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-700"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold"
                >
                  Guardar Evaluación
                </button>
              </div>
            </form>
          )}

          {/* Evaluations Table */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-x-auto shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-3">Colaborador</th>
                  <th className="p-3">Puesto</th>
                  <th className="p-3">Tema de Evaluación</th>
                  <th className="p-3">Nota Obtenida</th>
                  <th className="p-3">Resultado</th>
                  <th className="p-3">Retroalimentación</th>
                  <th className="p-3">Fecha</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                {state.evaluations.map((ev) => (
                  <tr key={ev.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="p-3 font-bold text-slate-900 dark:text-white">{ev.staffName}</td>
                    <td className="p-3 text-slate-500">{ev.role}</td>
                    <td className="p-3 text-slate-700 dark:text-slate-300">{ev.testTopic}</td>
                    <td className="p-3">
                      <span className={`text-sm font-black font-mono ${ev.passed ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {ev.score} / 20
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        ev.passed 
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300' 
                          : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                      }`}>
                        {ev.passed ? 'Aprobado' : 'Requiere Refuerzo'}
                      </span>
                    </td>
                    <td className="p-3 text-slate-600 dark:text-slate-400 max-w-xs">{ev.feedback}</td>
                    <td className="p-3 text-slate-400">{ev.date}</td>
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

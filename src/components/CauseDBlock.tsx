import React, { useState } from 'react';
import { 
  Share2, 
  Target, 
  Calendar, 
  FlaskConical, 
  Plus, 
  CheckCircle2, 
  Clock, 
  Eye, 
  TrendingUp, 
  Award,
  Video,
  Sparkles,
  Users
} from 'lucide-react';
import { RealEstateMarketingState, SocialMediaActionPlanItem, EditorialCalendarItem, ABTestItem } from '../types';

interface CauseDBlockProps {
  state: RealEstateMarketingState;
  onUpdateState: (newState: Partial<RealEstateMarketingState>) => void;
  onNavigateTab: (tab: string) => void;
}

export const CauseDBlock: React.FC<CauseDBlockProps> = ({
  state,
  onUpdateState,
  onNavigateTab
}) => {
  const [subTab, setSubTab] = useState<'d1' | 'd2' | 'd3'>('d1');

  // Form states
  const [showAddPlan, setShowAddPlan] = useState(false);
  const [newPlan, setNewPlan] = useState<Partial<SocialMediaActionPlanItem>>({
    code: `ACT-0${state.actionPlans.length + 1}`,
    objective: '',
    targetAudience: 'Familias para Primera Vivienda',
    contentPillar: 'Recorridos de Terreno & Dron',
    deadline: '2026-11-25',
    responsible: 'Lic. Aldair Vásquez (Marketing)',
    status: 'Planificada'
  });

  const [showAddPost, setShowAddPost] = useState(false);
  const [newPost, setNewPost] = useState<Partial<EditorialCalendarItem>>({
    scheduledDate: '2026-11-15',
    platform: 'Facebook',
    postType: 'Reel con Dron',
    title: '',
    copy: '',
    responsible: 'Lic. Aldair Vásquez',
    status: 'Programada',
    interactions: 0,
    leadsGenerated: 0
  });

  // Calculate KPI PCP
  const scheduledPosts = state.editorialCalendar.length;
  const completedPosts = state.editorialCalendar.filter(p => p.status === 'Realizada').length;
  const pcp = scheduledPosts > 0 ? ((completedPosts / scheduledPosts) * 100).toFixed(1) : '0';

  const handleTogglePostStatus = (id: string, newStatus: EditorialCalendarItem['status']) => {
    const updated = state.editorialCalendar.map(p => {
      if (p.id === id) {
        return { ...p, status: newStatus };
      }
      return p;
    });
    onUpdateState({ editorialCalendar: updated });
  };

  const handleTogglePlanStatus = (id: string) => {
    const updated = state.actionPlans.map(plan => {
      if (plan.id === id) {
        const nextStatus: SocialMediaActionPlanItem['status'] = plan.status === 'Ejecutada' ? 'En Ejecución' : 'Ejecutada';
        return { ...plan, status: nextStatus };
      }
      return plan;
    });
    onUpdateState({ actionPlans: updated });
  };

  const handleAddPlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlan.objective) return;
    const item: SocialMediaActionPlanItem = {
      id: `act-${Date.now()}`,
      code: newPlan.code || `ACT-0${state.actionPlans.length + 1}`,
      objective: newPlan.objective,
      targetAudience: newPlan.targetAudience || 'Familias para Primera Vivienda',
      contentPillar: newPlan.contentPillar || 'Recorridos de Terreno & Dron',
      deadline: newPlan.deadline || '2026-11-25',
      responsible: newPlan.responsible || 'Lic. Aldair Vásquez',
      status: 'Planificada'
    };
    onUpdateState({ actionPlans: [...state.actionPlans, item] });
    setShowAddPlan(false);
  };

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title || !newPost.copy) return;
    const item: EditorialCalendarItem = {
      id: `cal-${Date.now()}`,
      scheduledDate: newPost.scheduledDate || '2026-11-18',
      platform: newPost.platform || 'Facebook',
      postType: newPost.postType || 'Reel con Dron',
      title: newPost.title,
      copy: newPost.copy,
      responsible: newPost.responsible || 'Equipo de Marketing',
      status: 'Programada',
      interactions: 0,
      leadsGenerated: 0
    };
    onUpdateState({ editorialCalendar: [...state.editorialCalendar, item] });
    setShowAddPost(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-pink-950 via-slate-900 to-slate-900 border border-pink-800/80 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/40 text-xs font-bold uppercase tracking-wider">
                Bloque Causa D
              </span>
              <span className="text-xs text-slate-400">• Venta de Lotes</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Causa D: Limitado Uso de Redes Sociales
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Estrategia multicanal en Facebook, Instagram, TikTok y YouTube para captar inversionistas y familias, calendario editorial disciplinado y optimización continua mediante pruebas A/B.
            </p>
          </div>

          {/* Causa D KPI Card */}
          <div className="bg-slate-800/90 border border-pink-700/60 p-4 rounded-xl min-w-[220px]">
            <div className="text-[11px] font-bold uppercase tracking-wider text-pink-300">
              KPI Causa D (PCP)
            </div>
            <div className="text-2xl font-black text-white mt-0.5">
              {pcp}%
            </div>
            <div className="text-[10px] text-slate-400 font-mono mt-1">
              PCP = (Publ. Realizadas / Programadas) * 100
            </div>
            <div className="text-xs font-semibold text-emerald-400 mt-1.5 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {completedPosts} de {scheduledPosts} publicaciones realizadas
            </div>
          </div>
        </div>

        {/* Sub-tabs selector for the 3 tools */}
        <div className="flex gap-2 mt-6 pt-4 border-t border-pink-800/50 overflow-x-auto">
          <button
            onClick={() => setSubTab('d1')}
            className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
              subTab === 'd1'
                ? 'bg-pink-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Target className="w-4 h-4" />
            <span>D.1 PLAN DE ACCIÓN RRSS</span>
            <span className="px-1.5 py-0.2 rounded-full bg-slate-900/60 text-[10px]">
              {state.actionPlans.length}
            </span>
          </button>

          <button
            onClick={() => setSubTab('d2')}
            className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
              subTab === 'd2'
                ? 'bg-pink-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>D.2 CALENDARIO DE CONTROL</span>
            <span className="px-1.5 py-0.2 rounded-full bg-slate-900/60 text-[10px]">
              {state.editorialCalendar.length} Posts
            </span>
          </button>

          <button
            onClick={() => setSubTab('d3')}
            className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
              subTab === 'd3'
                ? 'bg-pink-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <FlaskConical className="w-4 h-4" />
            <span>D.3 GUÍA DE PRUEBA A/B</span>
            <span className="px-1.5 py-0.2 rounded-full bg-slate-900/60 text-[10px]">
              {state.abTests.length} Tests
            </span>
          </button>
        </div>
      </div>

      {/* SUB-TOOL D.1: PLAN DE ACCIÓN */}
      {subTab === 'd1' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-pink-600" />
                Herramienta D.1: Plan de Acción de Redes Sociales para Venta de Lotes
              </h3>
              <p className="text-xs text-slate-500">
                Objetivos de captación, segmentación de audiencias y pilares de contenido con fechas límite para alertas
              </p>
            </div>

            <button
              onClick={() => setShowAddPlan(!showAddPlan)}
              className="px-3 py-1.5 rounded-lg bg-pink-600 hover:bg-pink-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Nuevo Plan de Acción</span>
            </button>
          </div>

          {/* Add Plan Form */}
          {showAddPlan && (
            <form onSubmit={handleAddPlan} className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-pink-200 dark:border-pink-900/60 space-y-3">
              <div className="font-bold text-xs text-pink-700 dark:text-pink-400 uppercase">
                Crear Nuevo Objetivo en el Plan de Acción
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">Código</label>
                  <input
                    type="text"
                    value={newPlan.code}
                    onChange={(e) => setNewPlan({ ...newPlan, code: e.target.value })}
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">Audiencia Objetivo</label>
                  <select
                    value={newPlan.targetAudience}
                    onChange={(e) => setNewPlan({ ...newPlan, targetAudience: e.target.value as any })}
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                  >
                    <option value="Familias para Primera Vivienda">Familias para Primera Vivienda</option>
                    <option value="Inversionistas de Lotes">Inversionistas de Lotes</option>
                    <option value="Jóvenes Emprendedores">Jóvenes Emprendedores</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">Pilar de Contenido</label>
                  <select
                    value={newPlan.contentPillar}
                    onChange={(e) => setNewPlan({ ...newPlan, contentPillar: e.target.value as any })}
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                  >
                    <option value="Recorridos de Terreno & Dron">Recorridos de Terreno & Dron</option>
                    <option value="Legal & Títulos Independizados">Legal & Títulos Independizados</option>
                    <option value="Testimonios de Propietarios">Testimonios de Propietarios</option>
                    <option value="Promociones & Facilidades">Promociones & Facilidades</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">Objetivo Específico</label>
                <input
                  type="text"
                  required
                  value={newPlan.objective}
                  onChange={(e) => setNewPlan({ ...newPlan, objective: e.target.value })}
                  placeholder="Ej. Captar 150 familias mediante reels con drone y testimoniales"
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">Fecha Límite</label>
                  <input
                    type="date"
                    required
                    value={newPlan.deadline}
                    onChange={(e) => setNewPlan({ ...newPlan, deadline: e.target.value })}
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">Responsable</label>
                  <input
                    type="text"
                    required
                    value={newPlan.responsible}
                    onChange={(e) => setNewPlan({ ...newPlan, responsible: e.target.value })}
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddPlan(false)}
                  className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-700"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-pink-600 hover:bg-pink-700 text-white rounded-lg text-xs font-bold"
                >
                  Registrar en Plan
                </button>
              </div>
            </form>
          )}

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {state.actionPlans.map((plan) => {
              const is24h = plan.deadline === '2026-11-11';
              const isDone = plan.status === 'Ejecutada';

              return (
                <div 
                  key={plan.id}
                  className={`bg-white dark:bg-slate-900 border rounded-xl p-4 shadow-sm flex flex-col justify-between transition-all ${
                    is24h ? 'border-amber-400 ring-1 ring-amber-400/40' : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-pink-100 dark:bg-pink-950/60 text-pink-800 dark:text-pink-300">
                        {plan.code}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {is24h && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 animate-pulse">
                            ⚠️ VENCE EN 24H
                          </span>
                        )}
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isDone 
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}>
                          {plan.status}
                        </span>
                      </div>
                    </div>

                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      {plan.objective}
                    </h4>

                    <div className="mt-3 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-400 font-semibold">Público:</span>
                        <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-medium">
                          {plan.targetAudience}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-400 font-semibold">Pilar:</span>
                        <span className="bg-pink-50 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300 px-2 py-0.5 rounded font-medium">
                          {plan.contentPillar}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                    <div className="flex justify-between items-center mb-3">
                      <span><strong>Fecha Límite:</strong> <span className={is24h ? 'text-rose-600 font-bold' : ''}>{plan.deadline}</span></span>
                      <span><strong>Responsable:</strong> {plan.responsible}</span>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={() => handleTogglePlanStatus(plan.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                          isDone 
                            ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                            : 'bg-pink-600 text-white hover:bg-pink-700 shadow-sm'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{isDone ? 'Reabrir Plan' : 'Marcar como Ejecutado'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB-TOOL D.2: CALENDARIO DE CONTROL */}
      {subTab === 'd2' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-pink-600" />
                Herramienta D.2: Calendario de Control de Publicaciones
              </h3>
              <p className="text-xs text-slate-500">
                Parrilla editorial multicanal. El estado de las publicaciones impacta directamente en el KPI PCP.
              </p>
            </div>

            <button
              onClick={() => setShowAddPost(!showAddPost)}
              className="px-3 py-1.5 rounded-lg bg-pink-600 hover:bg-pink-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Programar Publicación</span>
            </button>
          </div>

          {/* Add Post Form */}
          {showAddPost && (
            <form onSubmit={handleAddPost} className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-pink-200 dark:border-pink-900/60 space-y-3">
              <div className="font-bold text-xs text-pink-700 dark:text-pink-400 uppercase">
                Programar Nuevo Contenido de Lotes
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">Fecha Programada</label>
                  <input
                    type="date"
                    required
                    value={newPost.scheduledDate}
                    onChange={(e) => setNewPost({ ...newPost, scheduledDate: e.target.value })}
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">Plataforma</label>
                  <select
                    value={newPost.platform}
                    onChange={(e) => setNewPost({ ...newPost, platform: e.target.value as any })}
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                  >
                    <option value="Facebook">Facebook</option>
                    <option value="Instagram">Instagram</option>
                    <option value="TikTok">TikTok</option>
                    <option value="YouTube">YouTube</option>
                    <option value="WhatsApp Status">WhatsApp Status</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">Formato</label>
                  <select
                    value={newPost.postType}
                    onChange={(e) => setNewPost({ ...newPost, postType: e.target.value as any })}
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                  >
                    <option value="Reel con Dron">Reel con Dron</option>
                    <option value="Carrusel de Planos">Carrusel de Planos</option>
                    <option value="Video Testimonio">Video Testimonio</option>
                    <option value="Infografía Legal">Infografía Legal</option>
                    <option value="Historia En Vivo">Historia En Vivo</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">Título / Concepto del Post</label>
                <input
                  type="text"
                  required
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  placeholder="Ej. Descubre las 3 manzanas con vista al río"
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">Copy de la Publicación</label>
                <textarea
                  rows={2}
                  required
                  value={newPost.copy}
                  onChange={(e) => setNewPost({ ...newPost, copy: e.target.value })}
                  placeholder="Texto persuasivo para el post..."
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddPost(false)}
                  className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-700"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-pink-600 hover:bg-pink-700 text-white rounded-lg text-xs font-bold"
                >
                  Agregar a Parrilla
                </button>
              </div>
            </form>
          )}

          {/* Posts Table */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-x-auto shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-3">Fecha</th>
                  <th className="p-3">Red Social</th>
                  <th className="p-3">Formato</th>
                  <th className="p-3">Título & Contenido</th>
                  <th className="p-3">Responsable</th>
                  <th className="p-3">Resultados</th>
                  <th className="p-3">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                {state.editorialCalendar.map((post) => {
                  const isDone = post.status === 'Realizada';

                  return (
                    <tr key={post.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                      <td className="p-3 font-semibold text-slate-900 dark:text-white whitespace-nowrap">
                        {post.scheduledDate}
                      </td>
                      <td className="p-3">
                        <span className="font-bold text-pink-600 dark:text-pink-400">
                          {post.platform}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-semibold text-slate-700 dark:text-slate-300">
                          {post.postType}
                        </span>
                      </td>
                      <td className="p-3 max-w-sm">
                        <div className="font-bold text-slate-900 dark:text-white">{post.title}</div>
                        <div className="text-[11px] text-slate-500 truncate mt-0.5">{post.copy}</div>
                      </td>
                      <td className="p-3 text-slate-500 whitespace-nowrap">{post.responsible}</td>
                      <td className="p-3 whitespace-nowrap">
                        {isDone ? (
                          <div className="text-[11px] text-slate-700 dark:text-slate-300">
                            <strong>{post.interactions}</strong> interacc. / <strong>{post.leadsGenerated}</strong> leads
                          </div>
                        ) : (
                          <span className="text-slate-400 text-[10px]">Pendiente de métricas</span>
                        )}
                      </td>
                      <td className="p-3">
                        <select
                          value={post.status}
                          onChange={(e) => handleTogglePostStatus(post.id, e.target.value as any)}
                          className={`text-xs font-bold px-2 py-1 rounded-md border ${
                            isDone 
                              ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300'
                          }`}
                        >
                          <option value="Programada">Programada</option>
                          <option value="Realizada">Realizada</option>
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

      {/* SUB-TOOL D.3: GUÍA DE PRUEBA A/B */}
      {subTab === 'd3' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-pink-600" />
                Herramienta D.3: Guía de Experimentos y Pruebas A/B en Campañas de Lotes
              </h3>
              <p className="text-xs text-slate-500">
                Comparativa científica de anuncios para reducir el Costo por Lead (CPL) y aumentar citas en terreno
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {state.abTests.map((test) => (
              <div key={test.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400">
                      Variable Evaluada: {test.variableTested}
                    </div>
                    <h4 className="font-bold text-base text-slate-900 dark:text-white mt-0.5">
                      {test.testName}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 font-semibold">Ganador Seleccionado:</span>
                    <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-black text-xs border border-emerald-300">
                      Variante {test.winner}
                    </span>
                  </div>
                </div>

                {/* Variants Side-by-Side comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Variant A */}
                  <div className={`p-4 rounded-xl border transition-all ${
                    test.winner === 'A' 
                      ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-400 ring-1 ring-emerald-400/30' 
                      : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700'
                  }`}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-xs text-slate-900 dark:text-white">
                        {test.variantA.label}
                      </span>
                      {test.winner === 'A' && (
                        <span className="text-[10px] bg-emerald-600 text-white font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Award className="w-3 h-3" /> GANADOR
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mb-3">
                      {test.variantA.description}
                    </p>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="bg-white dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-800">
                        <div className="text-[10px] text-slate-400">Inversión</div>
                        <div className="font-bold">${test.variantA.spendUSD}</div>
                      </div>
                      <div className="bg-white dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-800">
                        <div className="text-[10px] text-slate-400">Prospectos</div>
                        <div className="font-bold text-sky-600">{test.variantA.leads}</div>
                      </div>
                      <div className="bg-white dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-800">
                        <div className="text-[10px] text-slate-400">CPL Promedio</div>
                        <div className="font-bold text-emerald-600">${test.variantA.cplUSD}</div>
                      </div>
                    </div>
                  </div>

                  {/* Variant B */}
                  <div className={`p-4 rounded-xl border transition-all ${
                    test.winner === 'B' 
                      ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-400 ring-1 ring-emerald-400/30' 
                      : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700'
                  }`}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-xs text-slate-900 dark:text-white">
                        {test.variantB.label}
                      </span>
                      {test.winner === 'B' && (
                        <span className="text-[10px] bg-emerald-600 text-white font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Award className="w-3 h-3" /> GANADOR
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mb-3">
                      {test.variantB.description}
                    </p>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="bg-white dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-800">
                        <div className="text-[10px] text-slate-400">Inversión</div>
                        <div className="font-bold">${test.variantB.spendUSD}</div>
                      </div>
                      <div className="bg-white dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-800">
                        <div className="text-[10px] text-slate-400">Prospectos</div>
                        <div className="font-bold text-sky-600">{test.variantB.leads}</div>
                      </div>
                      <div className="bg-white dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-800">
                        <div className="text-[10px] text-slate-400">CPL Promedio</div>
                        <div className="font-bold text-emerald-600">${test.variantB.cplUSD}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Conclusion */}
                <div className="mt-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs">
                  <span className="font-bold text-slate-900 dark:text-white">Conclusión & Aprendizaje Aplicado: </span>
                  <span className="text-slate-600 dark:text-slate-300">{test.conclusion}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

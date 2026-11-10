import { RealEstateMarketingState, KPICalculation } from '../types';

export function calculateKPIs(state: RealEstateMarketingState): KPICalculation {
  // Causa A: Estrategias en Matriz Operativa (A.2) y FODA
  const totalPlannedA = state.operationalMatrix.length;
  const executedA = state.operationalMatrix.filter(item => item.status === 'Ejecutada').length;
  const peeep = totalPlannedA > 0 ? Math.round((executedA / totalPlannedA) * 1000) / 10 : 0;

  // Causa B: Capacitaciones (B.1)
  const scheduledTrainings = state.trainingPrograms.length;
  const executedTrainings = state.trainingPrograms.filter(item => item.status === 'Ejecutada').length;
  const cp = scheduledTrainings > 0 ? Math.round((executedTrainings / scheduledTrainings) * 1000) / 10 : 0;

  // Causa C: Herramientas Digitales (C.1)
  const requiredTools = state.digitalTools.filter(tool => tool.isRequired).length;
  const usedTools = state.digitalTools.filter(tool => tool.isRequired && tool.isUsedInDailyOps).length;
  const iuhd = requiredTools > 0 ? Math.round((usedTools / requiredTools) * 1000) / 10 : 0;

  // Causa D: Publicaciones (D.2 Calendario de Control)
  const scheduledPosts = state.editorialCalendar.length;
  const completedPosts = state.editorialCalendar.filter(post => post.status === 'Realizada').length;
  const pcp = scheduledPosts > 0 ? Math.round((completedPosts / scheduledPosts) * 1000) / 10 : 0;

  // Problemática: Indice de Ejecución de Estrategias de Marketing (IEEM)
  // Total de estrategias operativas y planes de acción planificados vs ejecutados
  const totalPlannedStrategies = totalPlannedA + state.actionPlans.length;
  const totalExecutedStrategies = executedA + state.actionPlans.filter(p => p.status === 'Ejecutada').length;
  const ieem = totalPlannedStrategies > 0 ? Math.round((totalExecutedStrategies / totalPlannedStrategies) * 1000) / 10 : 0;

  return {
    ieem,
    totalPlannedStrategies,
    totalExecutedStrategies,
    peeep,
    plannedA: totalPlannedA,
    executedA,
    cp,
    scheduledTrainings,
    executedTrainings,
    iuhd,
    requiredTools,
    usedTools,
    pcp,
    scheduledPosts,
    completedPosts
  };
}

export function getKPISemaphore(value: number): { label: string; color: string; bg: string; border: string } {
  if (value >= 75) {
    return {
      label: 'Nivel Óptimo',
      color: 'text-emerald-700 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-950/40',
      border: 'border-emerald-300 dark:border-emerald-700'
    };
  }
  if (value >= 50) {
    return {
      label: 'Nivel Regular',
      color: 'text-amber-700 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-950/40',
      border: 'border-amber-300 dark:border-amber-700'
    };
  }
  return {
    label: 'Nivel Crítico',
    color: 'text-rose-700 dark:text-rose-400',
    bg: 'bg-rose-50 dark:bg-rose-950/40',
    border: 'border-rose-300 dark:border-rose-700'
  };
}

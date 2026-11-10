import React, { useState } from 'react';
import { 
  Bell, 
  Mail, 
  Send, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Eye, 
  Settings, 
  RefreshCw, 
  Filter, 
  Check, 
  X,
  ExternalLink,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { RealEstateMarketingState, AlertNotification, EmailLog } from '../types';
import { generateEmailHtml } from '../utils/alertEngine';

interface AlertsManagerViewProps {
  state: RealEstateMarketingState;
  onUpdateState: (newState: Partial<RealEstateMarketingState>) => void;
  onSendAlert: (alertId: string) => Promise<void>;
  onTriggerDailyCheck: () => Promise<void>;
}

export const AlertsManagerView: React.FC<AlertsManagerViewProps> = ({
  state,
  onUpdateState,
  onSendAlert,
  onTriggerDailyCheck
}) => {
  const [selectedAlertForPreview, setSelectedAlertForPreview] = useState<AlertNotification | null>(null);
  const [selectedLogForPreview, setSelectedLogForPreview] = useState<EmailLog | null>(null);
  const [filterTool, setFilterTool] = useState<string>('ALL');
  const [recipientEmailInput, setRecipientEmailInput] = useState(state.userEmail);
  const [isSavingEmail, setIsSavingEmail] = useState(false);
  const [sendingAlertId, setSendingAlertId] = useState<string | null>(null);
  const [isCheckingAuto, setIsCheckingAuto] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const pending24hAlerts = state.alerts.filter(a => a.is24hAlert && a.status === 'Pendiente');
  const otherAlerts = state.alerts.filter(a => !a.is24hAlert);

  const handleSaveEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingEmail(true);
    const updatedAlerts = state.alerts.map(a => ({ ...a, recipientEmail: recipientEmailInput }));
    onUpdateState({ userEmail: recipientEmailInput, alerts: updatedAlerts });
    setTimeout(() => {
      setIsSavingEmail(false);
      setFeedbackMsg('Correo del responsable comercial actualizado exitosamente.');
      setTimeout(() => setFeedbackMsg(null), 3500);
    }, 400);
  };

  const handleSendSingleAlert = async (alert: AlertNotification) => {
    try {
      setSendingAlertId(alert.id);
      await onSendAlert(alert.id);
      setFeedbackMsg(`Alerta enviada exitosamente a ${alert.recipientEmail}`);
      setTimeout(() => setFeedbackMsg(null), 4000);
    } catch (err: any) {
      setFeedbackMsg(`Error al enviar alerta: ${err.message}`);
    } finally {
      setSendingAlertId(null);
    }
  };

  const handleRunDailyLookahead = async () => {
    try {
      setIsCheckingAuto(true);
      await onTriggerDailyCheck();
      setFeedbackMsg('Escaneo preventivo 24h completado. Se procesaron los hitos de A.3, B.1, C.1 y D.1.');
      setTimeout(() => setFeedbackMsg(null), 4000);
    } catch (err: any) {
      setFeedbackMsg(`Error en verificación: ${err.message}`);
    } finally {
      setIsCheckingAuto(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-slate-900 border border-amber-800/80 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Bell className="w-3.5 h-3.5" />
                Automatización de Alertas (24 Horas Antes)
              </span>
              <span className="text-xs text-slate-400">• Control Preventivo</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Sistema de Gestión y Envío de Alertas por Correo
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Monitoreo continuo de hitos con vencimiento a 1 día en <strong>Gestión del Embudo (A.3)</strong>, <strong>Programa de Capacitación (B.1)</strong>, <strong>Manual de Herramientas (C.1)</strong> y <strong>Plan de Acción RRSS (D.1)</strong>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <button
              onClick={handleRunDailyLookahead}
              disabled={isCheckingAuto}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <RefreshCw className={`w-4 h-4 ${isCheckingAuto ? 'animate-spin' : ''}`} />
              <span>{isCheckingAuto ? 'Escaneando...' : 'Ejecutar Escaneo 24h'}</span>
            </button>
          </div>
        </div>

        {/* Status Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-4 border-t border-amber-800/50 text-xs">
          <div className="bg-slate-800/70 p-3 rounded-xl border border-slate-700/60">
            <div className="text-slate-400 text-[11px]">Alertas 24h Pendientes</div>
            <div className="text-xl font-black text-amber-400 mt-0.5">
              {pending24hAlerts.length}
            </div>
          </div>
          <div className="bg-slate-800/70 p-3 rounded-xl border border-slate-700/60">
            <div className="text-slate-400 text-[11px]">Hitos Monitoreados</div>
            <div className="text-xl font-black text-white mt-0.5">
              {state.alerts.length}
            </div>
          </div>
          <div className="bg-slate-800/70 p-3 rounded-xl border border-slate-700/60">
            <div className="text-slate-400 text-[11px]">Correos Despachados</div>
            <div className="text-xl font-black text-emerald-400 mt-0.5">
              {state.emailLogs.length}
            </div>
          </div>
          <div className="bg-slate-800/70 p-3 rounded-xl border border-slate-700/60">
            <div className="text-slate-400 text-[11px]">Destinatario Activo</div>
            <div className="text-xs font-bold text-sky-400 mt-1 truncate" title={state.userEmail}>
              {state.userEmail}
            </div>
          </div>
        </div>
      </div>

      {feedbackMsg && (
        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 text-xs text-emerald-800 dark:text-emerald-300 font-semibold flex items-center justify-between">
          <span>{feedbackMsg}</span>
          <button onClick={() => setFeedbackMsg(null)}><X className="w-4 h-4" /></button>
        </div>
      )}

      {/* Recipient Configuration Box */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
        <form onSubmit={handleSaveEmail} className="flex flex-col sm:flex-row items-start sm:items-end gap-3 justify-between">
          <div className="flex-1 w-full">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-1">
              <Mail className="w-3.5 h-3.5 text-amber-500" />
              Bandeja de Correo Electrónico para Alertas Automatizadas:
            </label>
            <input
              type="email"
              required
              value={recipientEmailInput}
              onChange={(e) => setRecipientEmailInput(e.target.value)}
              placeholder="correo@ejemplo.com"
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
            />
          </div>
          <button
            type="submit"
            disabled={isSavingEmail}
            className="px-4 py-2.5 rounded-lg bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5 whitespace-nowrap shadow-sm"
          >
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>Actualizar Destinatario</span>
          </button>
        </form>
      </div>

      {/* Section 1: 24h High-Priority Alerts (Vencen Mañana) */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <h3 className="font-black text-base text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500 animate-ping inline-block" />
              Alertas Preventivas de 24 Horas (Vencimiento Mañana: 2026-11-11)
            </h3>
            <p className="text-xs text-slate-500">
              Corresponden a los hitos configurados en las 4 herramientas clave: A.3, B.1, C.1 y D.1
            </p>
          </div>

          <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg text-xs">
            {['ALL', 'A.3', 'B.1', 'C.1', 'D.1'].map(t => (
              <button
                key={t}
                onClick={() => setFilterTool(t)}
                className={`px-2 py-0.5 rounded font-semibold ${
                  filterTool === t ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow-sm' : 'text-slate-500'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {state.alerts
            .filter(a => a.is24hAlert && (filterTool === 'ALL' || a.sourceTool === filterTool))
            .map((alert) => {
              const isSent = alert.status === 'Enviada';

              return (
                <div 
                  key={alert.id}
                  className="bg-white dark:bg-slate-900 border-2 border-amber-400/80 rounded-xl p-4 shadow-md flex flex-col justify-between relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 font-black text-[9px] uppercase px-3 py-0.5 rounded-bl-lg tracking-wider">
                    VENCE EN 24 HORAS
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-black px-2 py-0.5 rounded bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300">
                        {alert.sourceToolName}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isSent ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {alert.status}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                      {alert.taskTitle}
                    </h4>

                    <div className="mt-3 p-2.5 rounded-lg bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Fecha Límite:</span>
                        <span className="font-bold text-rose-600">{alert.dueDate} (Mañana)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Responsable:</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{alert.responsible}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Destinatario Correo:</span>
                        <span className="font-mono text-slate-700 dark:text-slate-300">{alert.recipientEmail}</span>
                      </div>
                      {alert.sentAt && (
                        <div className="flex justify-between text-emerald-700 dark:text-emerald-400">
                          <span>Último envío:</span>
                          <span className="font-semibold">{alert.sentAt}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex gap-2 justify-end">
                    <button
                      onClick={() => setSelectedAlertForPreview(alert)}
                      className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Previsualizar Correo</span>
                    </button>

                    <button
                      onClick={() => handleSendSingleAlert(alert)}
                      disabled={sendingAlertId === alert.id}
                      className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{sendingAlertId === alert.id ? 'Enviando...' : isSent ? 'Reenviar Correo' : 'Enviar Correo Ahora'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Section 2: Email Logs & Audit Trail */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-sky-600" />
              Historial de Correos Electrónicos Enviados (Log de Notificaciones)
            </h3>
            <p className="text-xs text-slate-500">
              Registro auditado de alertas preventivas despachadas a los responsables de venta de lotes
            </p>
          </div>
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
            {state.emailLogs.length} Correos en Historial
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-3">Fecha / Hora</th>
                <th className="p-3">Herramienta</th>
                <th className="p-3">Asunto del Correo</th>
                <th className="p-3">Destinatario</th>
                <th className="p-3">Fecha Límite</th>
                <th className="p-3">Estado</th>
                <th className="p-3">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
              {state.emailLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="p-3 text-slate-500 whitespace-nowrap">{log.sentAt}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300">
                      {log.sourceTool}
                    </span>
                  </td>
                  <td className="p-3 max-w-xs font-semibold text-slate-900 dark:text-white truncate">
                    {log.subject}
                  </td>
                  <td className="p-3 font-mono text-slate-600 dark:text-slate-400">{log.recipientEmail}</td>
                  <td className="p-3 text-rose-600 font-bold whitespace-nowrap">{log.dueDate}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                      ✓ {log.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => setSelectedLogForPreview(log)}
                      className="text-xs text-sky-600 hover:text-sky-700 font-semibold flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Ver HTML</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Email HTML Preview */}
      {(selectedAlertForPreview || selectedLogForPreview) && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 animate-fadeIn">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400" />
                <h4 className="font-bold text-sm">
                  Vista Previa del Correo Electrónico Automatizado (HTML)
                </h4>
              </div>
              <button
                onClick={() => {
                  setSelectedAlertForPreview(null);
                  setSelectedLogForPreview(null);
                }}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-1 bg-slate-100 dark:bg-slate-950">
              <div 
                className="bg-white rounded-xl shadow p-2"
                dangerouslySetInnerHTML={{
                  __html: selectedLogForPreview
                    ? selectedLogForPreview.htmlPreview
                    : selectedAlertForPreview
                    ? generateEmailHtml(selectedAlertForPreview, state.companyName, state.projectName)
                    : ''
                }}
              />
            </div>

            <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs">
              <span className="text-slate-500">
                Diseñado para entrega en bandeja de entrada móvil y escritorio
              </span>
              <button
                onClick={() => {
                  setSelectedAlertForPreview(null);
                  setSelectedLogForPreview(null);
                }}
                className="px-4 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 font-bold text-slate-700 dark:text-slate-300"
              >
                Cerrar Vista Previa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

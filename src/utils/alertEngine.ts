import { RealEstateMarketingState, AlertNotification, EmailLog } from '../types';

export function scanAndGenerateAlerts(state: RealEstateMarketingState, referenceDateStr: string = '2026-11-10'): AlertNotification[] {
  const refDate = new Date(referenceDateStr);
  const alerts: AlertNotification[] = [];

  // Helper to calculate hours remaining and check if it's 1 day before (24h)
  const evaluateDate = (dueDateStr: string) => {
    const due = new Date(dueDateStr);
    const diffMs = due.getTime() - refDate.getTime();
    const diffHours = Math.round(diffMs / (1000 * 60 * 60));
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    const is24h = diffDays === 1; // Exactly 1 day before!
    return { diffHours, diffDays, is24h };
  };

  // 1. A.3 Gestión del Embudo
  state.funnelStages.forEach((stage) => {
    if (stage.milestoneStatus !== 'Completada') {
      const { diffHours, is24h } = evaluateDate(stage.milestoneDate);
      alerts.push({
        id: `alert-a3-${stage.id}`,
        taskId: stage.id,
        taskTitle: `Embudo [${stage.stage}]: ${stage.keyMilestone}`,
        sourceTool: 'A.3',
        sourceToolName: 'Gestión del Embudo (A.3)',
        dueDate: stage.milestoneDate,
        responsible: stage.milestoneResponsible,
        alertTriggerDate: referenceDateStr,
        hoursRemaining: diffHours,
        is24hAlert: is24h,
        status: is24h ? 'Pendiente' : 'Pendiente',
        recipientEmail: state.userEmail
      });
    }
  });

  // 2. B.1 Programa de Capacitación
  state.trainingPrograms.forEach((train) => {
    if (train.status !== 'Ejecutada') {
      const { diffHours, is24h } = evaluateDate(train.scheduledDate);
      alerts.push({
        id: `alert-b1-${train.id}`,
        taskId: train.id,
        taskTitle: `Capacitación [${train.code}]: ${train.moduleName}`,
        sourceTool: 'B.1',
        sourceToolName: 'Programa de Capacitación (B.1)',
        dueDate: train.scheduledDate,
        responsible: `${train.instructor} / Equipo Comercial`,
        alertTriggerDate: referenceDateStr,
        hoursRemaining: diffHours,
        is24hAlert: is24h,
        status: is24h ? 'Pendiente' : 'Pendiente',
        recipientEmail: state.userEmail
      });
    }
  });

  // 3. C.1 Manual de Herramientas Digitales
  state.digitalTools.forEach((tool) => {
    if (tool.status !== 'Publicado') {
      const { diffHours, is24h } = evaluateDate(tool.releaseDate);
      alerts.push({
        id: `alert-c1-${tool.id}`,
        taskId: tool.id,
        taskTitle: `Herramienta [${tool.toolName}]: Finalización de manual ${tool.version}`,
        sourceTool: 'C.1',
        sourceToolName: 'Manual de Herramientas Digitales (C.1)',
        dueDate: tool.releaseDate,
        responsible: tool.responsible,
        alertTriggerDate: referenceDateStr,
        hoursRemaining: diffHours,
        is24hAlert: is24h,
        status: is24h ? 'Pendiente' : 'Pendiente',
        recipientEmail: state.userEmail
      });
    }
  });

  // 4. D.1 Plan de Acción de Redes Sociales
  state.actionPlans.forEach((plan) => {
    if (plan.status !== 'Ejecutada') {
      const { diffHours, is24h } = evaluateDate(plan.deadline);
      alerts.push({
        id: `alert-d1-${plan.id}`,
        taskId: plan.id,
        taskTitle: `Plan RRSS [${plan.code}]: ${plan.objective}`,
        sourceTool: 'D.1',
        sourceToolName: 'Plan de Acción Redes Sociales (D.1)',
        dueDate: plan.deadline,
        responsible: plan.responsible,
        alertTriggerDate: referenceDateStr,
        hoursRemaining: diffHours,
        is24hAlert: is24h,
        status: is24h ? 'Pendiente' : 'Pendiente',
        recipientEmail: state.userEmail
      });
    }
  });

  return alerts;
}

export function generateEmailHtml(alert: AlertNotification, companyName: string, projectName: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Alerta Preventiva de Marketing Inmobiliario</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; padding: 20px; margin: 0;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border: 1px solid #e2e8f0;">
        <!-- Header -->
        <tr>
          <td style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 24px; text-align: center;">
            <div style="color: #38bdf8; font-size: 20px; font-weight: bold; letter-spacing: 1px;">🏡 ${companyName.toUpperCase()}</div>
            <div style="color: #94a3b8; font-size: 13px; margin-top: 4px;">Proyecto: ${projectName}</div>
            <div style="display: inline-block; background-color: #0369a1; color: #ffffff; padding: 3px 10px; border-radius: 9999px; font-size: 11px; margin-top: 8px; font-weight: 600;">
              SISTEMA DE ALERTA AUTOMATIZADA PREVENTIVA (24 HORAS)
            </div>
          </td>
        </tr>

        <!-- Alert Badge -->
        <tr>
          <td style="padding: 24px 28px 12px 28px;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #fef3c7; border: 1px solid #fde68a; border-radius: 8px; padding: 12px 16px;">
              <tr>
                <td>
                  <span style="font-size: 16px;">⚠️</span>
                  <strong style="color: #92400e; font-size: 14px; margin-left: 8px;">RECORDATORIO AUTOMÁTICO: VENCE MAÑANA (${alert.dueDate})</strong>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Body Content -->
        <tr>
          <td style="padding: 12px 28px 24px 28px; color: #334155; font-size: 14px; line-height: 1.6;">
            <p>Estimado(a) <strong>${alert.responsible}</strong>,</p>
            <p>El sistema de control de marketing inmobiliario le recuerda que la siguiente tarea/hito crítico debe ser completada y documentada para asegurar el cumplimiento del cronograma comercial y la captación de prospectos para venta de lotes.</p>

            <!-- Task Box -->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 5px solid #0ea5e9; border-radius: 6px; margin: 16px 0;">
              <tr>
                <td style="padding: 16px;">
                  <div style="font-size: 12px; font-weight: bold; color: #0284c7; text-transform: uppercase;">
                    ${alert.sourceToolName}
                  </div>
                  <div style="font-size: 16px; font-weight: bold; color: #0f172a; margin: 6px 0;">
                    ${alert.taskTitle}
                  </div>
                  <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 10px 0;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 13px; color: #475569;">
                    <tr>
                      <td width="35%" style="padding: 4px 0;"><strong>Fecha Límite:</strong></td>
                      <td style="padding: 4px 0; color: #dc2626; font-weight: bold;">${alert.dueDate} (24h restantes)</td>
                    </tr>
                    <tr>
                      <td style="padding: 4px 0;"><strong>Responsable:</strong></td>
                      <td style="padding: 4px 0;">${alert.responsible}</td>
                    </tr>
                    <tr>
                      <td style="padding: 4px 0;"><strong>Destinatario Alerta:</strong></td>
                      <td style="padding: 4px 0;">${alert.recipientEmail}</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <p style="margin-top: 20px;">
              <strong>Instrucción de Entrega:</strong><br>
              Una vez finalizada la tarea, por favor ingrese al sistema para marcarla como <em>Ejecutada / Completada</em> y adjunte el entregable en el módulo de <strong>Gestión Documental</strong> para que los indicadores <strong>(IEEM, PEEEP, CP, IUHD, PCP)</strong> se actualicen en tiempo real.
            </p>

            <div style="text-align: center; margin: 28px 0 16px 0;">
              <a href="#" style="background-color: #0284c7; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 6px; font-weight: bold; display: inline-block; font-size: 14px;">
                Ver en la Plataforma de Marketing
              </a>
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px 28px; text-align: center; color: #94a3b8; font-size: 12px;">
            Este correo es generado de manera automática 24 horas antes del vencimiento por el sistema de optimización de causas de marketing de venta de lotes.<br>
            © ${new Date().getFullYear()} ${companyName}. Todos los derechos reservados.
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

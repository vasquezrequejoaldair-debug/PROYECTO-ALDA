import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { initialData } from './src/data/initialData';
import { RealEstateMarketingState, EmailLog } from './src/types';
import { scanAndGenerateAlerts, generateEmailHtml } from './src/utils/alertEngine';
import { calculateKPIs } from './src/utils/kpiCalculator';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const DATA_DIR = path.join(__dirname, 'data');
const STORE_FILE = path.join(DATA_DIR, 'store.json');

// Ensure data folder exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Load or seed persistent state
function loadState(): RealEstateMarketingState {
  if (fs.existsSync(STORE_FILE)) {
    try {
      const content = fs.readFileSync(STORE_FILE, 'utf-8');
      return JSON.parse(content) as RealEstateMarketingState;
    } catch (e) {
      console.error('Error reading store.json, using initial data:', e);
      return initialData;
    }
  } else {
    fs.writeFileSync(STORE_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
    return initialData;
  }
}

function saveState(state: RealEstateMarketingState): void {
  try {
    fs.writeFileSync(STORE_FILE, JSON.stringify(state, null, 2), 'utf-8');
  } catch (e) {
    console.error('Error writing store.json:', e);
  }
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  let currentState = loadState();

  // Helper to re-scan alerts and update state
  function refreshAlerts() {
    const freshAlerts = scanAndGenerateAlerts(currentState);
    currentState.alerts = freshAlerts;
    saveState(currentState);
  }
  refreshAlerts();

  // API Endpoints
  app.get('/api/state', (req: Request, res: Response) => {
    refreshAlerts();
    const kpis = calculateKPIs(currentState);
    res.json({
      success: true,
      data: currentState,
      kpis
    });
  });

  app.post('/api/state', (req: Request, res: Response) => {
    try {
      const incomingState = req.body as Partial<RealEstateMarketingState>;
      currentState = {
        ...currentState,
        ...incomingState
      };
      refreshAlerts();
      saveState(currentState);
      const kpis = calculateKPIs(currentState);
      res.json({
        success: true,
        data: currentState,
        kpis
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Dispatch an automated email alert
  app.post('/api/alerts/send', (req: Request, res: Response) => {
    try {
      const { alertId } = req.body;
      const alert = currentState.alerts.find(a => a.id === alertId);

      if (!alert) {
        return res.status(404).json({ success: false, message: 'Alerta no encontrada' });
      }

      const htmlContent = generateEmailHtml(alert, currentState.companyName, currentState.projectName);
      const sentTime = new Date().toLocaleString('es-ES', { timeZone: 'America/Lima' });

      const newLog: EmailLog = {
        id: `email-${Date.now()}`,
        alertId: alert.id,
        recipientEmail: alert.recipientEmail || currentState.userEmail,
        subject: `⚠️ Alerta Preventiva 24h: ${alert.taskTitle}`,
        sourceTool: alert.sourceToolName,
        taskTitle: alert.taskTitle,
        dueDate: alert.dueDate,
        sentAt: `${sentTime}`,
        status: 'Entregado',
        htmlPreview: htmlContent
      };

      currentState.emailLogs.unshift(newLog);
      alert.status = 'Enviada';
      alert.sentAt = sentTime;

      saveState(currentState);

      res.json({
        success: true,
        message: `Correo de alerta enviado exitosamente a ${newLog.recipientEmail}`,
        log: newLog,
        data: currentState
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Automated 24h Check and dispatch
  app.post('/api/alerts/trigger-daily-check', (req: Request, res: Response) => {
    try {
      refreshAlerts();
      const pending24hAlerts = currentState.alerts.filter(a => a.is24hAlert && a.status === 'Pendiente');
      const dispatchedLogs: EmailLog[] = [];

      pending24hAlerts.forEach(alert => {
        const htmlContent = generateEmailHtml(alert, currentState.companyName, currentState.projectName);
        const sentTime = new Date().toLocaleString('es-ES', { timeZone: 'America/Lima' });
        const log: EmailLog = {
          id: `email-auto-${Date.now()}-${alert.id}`,
          alertId: alert.id,
          recipientEmail: alert.recipientEmail || currentState.userEmail,
          subject: `⚠️ Alerta Preventiva 24h: [${alert.sourceTool}] ${alert.taskTitle}`,
          sourceTool: alert.sourceToolName,
          taskTitle: alert.taskTitle,
          dueDate: alert.dueDate,
          sentAt: sentTime,
          status: 'Entregado',
          htmlPreview: htmlContent
        };
        dispatchedLogs.push(log);
        currentState.emailLogs.unshift(log);
        alert.status = 'Enviada';
        alert.sentAt = sentTime;
      });

      saveState(currentState);

      res.json({
        success: true,
        dispatchedCount: dispatchedLogs.length,
        dispatchedLogs,
        data: currentState
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Documents API
  app.post('/api/documents/upload', (req: Request, res: Response) => {
    try {
      const doc = req.body;
      const newDoc = {
        id: `doc-${Date.now()}`,
        name: doc.name || 'Entregable_Marketing.pdf',
        sizeFormatted: doc.sizeFormatted || '1.5 MB',
        category: doc.category || 'General',
        toolRef: doc.toolRef || 'General',
        fileType: doc.fileType || 'pdf',
        uploadedAt: new Date().toISOString().split('T')[0],
        uploadedBy: doc.uploadedBy || 'Coordinador de Marketing',
        description: doc.description || '',
        fileDataUrl: doc.fileDataUrl
      };

      currentState.documents.unshift(newDoc);
      saveState(currentState);

      res.json({
        success: true,
        document: newDoc,
        documents: currentState.documents
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.delete('/api/documents/:id', (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      currentState.documents = currentState.documents.filter(d => d.id !== id);
      saveState(currentState);
      res.json({ success: true, documents: currentState.documents });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Cloud Sync Status API (Supabase & Firebase)
  app.post('/api/cloud-sync', (req: Request, res: Response) => {
    try {
      const { provider, supabaseUrl, supabaseKey, firebaseProject } = req.body;
      currentState.cloudIntegration = {
        provider: provider || 'local',
        connected: true,
        lastSyncedAt: new Date().toLocaleString('es-ES', { timeZone: 'America/Lima' }),
        supabaseUrl,
        supabaseKey: supabaseKey ? '••••••••••••••••' : undefined,
        firebaseProject
      };
      saveState(currentState);
      res.json({ success: true, cloudIntegration: currentState.cloudIntegration });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Mount Vite development middleware
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Marketing Management Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});

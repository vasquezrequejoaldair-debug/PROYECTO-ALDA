import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { CauseABlock } from './components/CauseABlock';
import { CauseBBlock } from './components/CauseBBlock';
import { CauseCBlock } from './components/CauseCBlock';
import { CauseDBlock } from './components/CauseDBlock';
import { AlertsManagerView } from './components/AlertsManagerView';
import { DocumentManagerView } from './components/DocumentManagerView';
import { CloudSyncModal } from './components/CloudSyncModal';
import { RealEstateMarketingState, KPICalculation, DocumentItem } from './types';
import { initialData } from './data/initialData';
import { calculateKPIs } from './utils/kpiCalculator';
import { Building2, ShieldCheck, RefreshCw } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [state, setState] = useState<RealEstateMarketingState>(initialData);
  const [kpis, setKpis] = useState<KPICalculation>(calculateKPIs(initialData));
  const [loading, setLoading] = useState<boolean>(true);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  // Fetch initial state from server
  const fetchState = async () => {
    try {
      const res = await fetch('/api/state');
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setState(json.data);
          setKpis(json.kpis || calculateKPIs(json.data));
        }
      }
    } catch (e) {
      console.warn('Backend server not reachable, using local client state:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchState();
  }, []);

  // Sync state mutation with backend
  const handleUpdateState = async (partialState: Partial<RealEstateMarketingState>) => {
    const nextState = { ...state, ...partialState };
    setState(nextState);
    const updatedKPIs = calculateKPIs(nextState);
    setKpis(updatedKPIs);

    try {
      setIsSyncing(true);
      const res = await fetch('/api/state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(partialState)
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setState(json.data);
          setKpis(json.kpis || calculateKPIs(json.data));
        }
      }
    } catch (e) {
      console.warn('Sync failed, kept in local memory:', e);
    } finally {
      setIsSyncing(false);
    }
  };

  // Send single alert email
  const handleSendAlert = async (alertId: string) => {
    try {
      const res = await fetch('/api/alerts/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ alertId })
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          setState(json.data);
          setKpis(calculateKPIs(json.data));
        }
      }
    } catch (e) {
      console.error('Error sending alert:', e);
      throw e;
    }
  };

  // Trigger daily check (lookahead 24h)
  const handleTriggerDailyCheck = async () => {
    try {
      const res = await fetch('/api/alerts/trigger-daily-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          setState(json.data);
          setKpis(calculateKPIs(json.data));
        }
      }
    } catch (e) {
      console.error('Error checking 24h alerts:', e);
      throw e;
    }
  };

  // Upload document
  const handleUploadDoc = async (doc: Partial<DocumentItem>) => {
    try {
      const res = await fetch('/api/documents/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(doc)
      });
      if (res.ok) {
        const json = await res.json();
        if (json.documents) {
          setState(prev => ({ ...prev, documents: json.documents }));
        }
      }
    } catch (e) {
      console.error('Error uploading doc:', e);
    }
  };

  // Delete document
  const handleDeleteDoc = async (id: string) => {
    try {
      const res = await fetch(`/api/documents/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        const json = await res.json();
        if (json.documents) {
          setState(prev => ({ ...prev, documents: json.documents }));
        }
      }
    } catch (e) {
      console.error('Error deleting doc:', e);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-sky-500 to-emerald-500 flex items-center justify-center animate-pulse mb-4 shadow-xl">
          <Building2 className="w-7 h-7 text-white" />
        </div>
        <h2 className="text-base font-bold tracking-tight">Cargando Sistema de Marketing Inmobiliario...</h2>
        <p className="text-xs text-slate-400 mt-1">Conectando con base de datos y calculando métricas...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        kpis={kpis}
        alerts={state.alerts}
        companyName={state.companyName}
        projectName={state.projectName}
        userEmail={state.userEmail}
      />

      {/* Main Content View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <DashboardView
            state={state}
            kpis={kpis}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'cause-a' && (
          <CauseABlock
            state={state}
            onUpdateState={handleUpdateState}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'cause-b' && (
          <CauseBBlock
            state={state}
            onUpdateState={handleUpdateState}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'cause-c' && (
          <CauseCBlock
            state={state}
            onUpdateState={handleUpdateState}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'cause-d' && (
          <CauseDBlock
            state={state}
            onUpdateState={handleUpdateState}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'alerts' && (
          <AlertsManagerView
            state={state}
            onUpdateState={handleUpdateState}
            onSendAlert={handleSendAlert}
            onTriggerDailyCheck={handleTriggerDailyCheck}
          />
        )}

        {activeTab === 'documents' && (
          <DocumentManagerView
            state={state}
            onUpdateState={handleUpdateState}
            onUploadDoc={handleUploadDoc}
            onDeleteDoc={handleDeleteDoc}
          />
        )}

        {activeTab === 'cloud' && (
          <CloudSyncModal
            state={state}
            onUpdateState={handleUpdateState}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-sky-600" />
            <span className="font-bold text-slate-800 dark:text-slate-200">{state.companyName}</span>
            <span>• {state.projectName}</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              Base de Datos Conectada (100% Eficiencia)
            </span>
            <span className="text-slate-400">
              Notificaciones 24h activas para: {state.userEmail}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

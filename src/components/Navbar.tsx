import React from 'react';
import { 
  Building2, 
  BarChart3, 
  Layers, 
  GraduationCap, 
  Wrench, 
  Share2, 
  Bell, 
  FolderArchive, 
  Cloud,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { KPICalculation, AlertNotification } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  kpis: KPICalculation;
  alerts: AlertNotification[];
  companyName: string;
  projectName: string;
  userEmail: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  kpis,
  alerts,
  companyName,
  projectName,
  userEmail
}) => {
  const pending24hAlertsCount = alerts.filter(a => a.is24hAlert && a.status === 'Pendiente').length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard & KPIs', icon: BarChart3, badge: `${kpis.ieem}%` },
    { id: 'cause-a', label: 'Causa A: Planificación', icon: Layers, badge: `${kpis.peeep}%` },
    { id: 'cause-b', label: 'Causa B: Capacitación', icon: GraduationCap, badge: `${kpis.cp}%` },
    { id: 'cause-c', label: 'Causa C: Herramientas', icon: Wrench, badge: `${kpis.iuhd}%` },
    { id: 'cause-d', label: 'Causa D: Redes Sociales', icon: Share2, badge: `${kpis.pcp}%` },
    { 
      id: 'alerts', 
      label: 'Alertas por Correo (24h)', 
      icon: Bell, 
      alertCount: pending24hAlertsCount 
    },
    { id: 'documents', label: 'Gestión Documental', icon: FolderArchive },
    { id: 'cloud', label: 'Firebase / Supabase', icon: Cloud }
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white shadow-xl">
      {/* Top branding bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-sky-500/20">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-lg text-white tracking-tight">{companyName}</h1>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-medium">
                Venta de Lotes
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1.5">
              <span>{projectName}</span>
              <span className="text-slate-600">•</span>
              <span className="text-amber-400 font-medium">Problemática: Bajas estrategias de marketing</span>
            </p>
          </div>
        </div>

        {/* Global KPI and Alert highlights */}
        <div className="flex items-center gap-3">
          {/* Global IEEM */}
          <div className="bg-slate-800/90 border border-slate-700/80 px-3 py-1.5 rounded-lg flex items-center gap-2.5">
            <div className="text-right">
              <div className="text-[10px] uppercase font-semibold tracking-wider text-slate-400">IEEM General</div>
              <div className="text-base font-extrabold text-sky-400">{kpis.ieem}%</div>
            </div>
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-400 font-bold text-xs">
              IEEM
            </div>
          </div>

          {/* 24h Alerts Indicator Button */}
          <button
            onClick={() => setActiveTab('alerts')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${
              pending24hAlertsCount > 0
                ? 'bg-amber-500/15 border-amber-500/40 text-amber-300 hover:bg-amber-500/25 animate-pulse'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
            title="Ver alertas automáticas 24h antes"
          >
            <Bell className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-semibold">
              {pending24hAlertsCount > 0 ? `${pending24hAlertsCount} Alertas 24h` : '0 Alertas'}
            </span>
          </button>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="border-t border-slate-800/80 bg-slate-950/60 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1 py-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-md font-bold ${
                      isActive ? 'bg-sky-700 text-sky-100' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                {item.alertCount !== undefined && item.alertCount > 0 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold bg-amber-500 text-slate-950">
                    {item.alertCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};

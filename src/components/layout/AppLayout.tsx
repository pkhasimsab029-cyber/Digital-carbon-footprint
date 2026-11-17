import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useEco } from '../../context/EcoContext';
import { CheckCircle2, Info, AlertTriangle } from 'lucide-react';

interface AppLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  step?: string;
  actions?: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  title,
  subtitle,
  step,
  actions
}) => {
  const { toast } = useEco();

  return (
    <div className="min-h-screen bg-[#F4F9F6] text-slate-800 flex">
      {/* Fixed Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72 transition-all duration-300">
        {/* Reusable Header */}
        <Header
          title={title}
          subtitle={subtitle}
          step={step}
          actions={actions}
        />

        {/* Page Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-in fade-in duration-200">
          {children}
        </main>
      </div>

      {/* Global Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl bg-white shadow-2xl border border-slate-200/80 animate-in slide-in-from-bottom-5 duration-300">
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-blue-600 shrink-0" />}
          {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />}
          <p className="text-xs sm:text-sm font-semibold text-slate-800">{toast.message}</p>
        </div>
      )}
    </div>
  );
};

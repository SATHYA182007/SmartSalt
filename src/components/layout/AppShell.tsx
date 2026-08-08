import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useAppStore } from '../../store/useAppStore';

export const AppShell: React.FC = () => {
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const { tickRealtimeUpdate, isLiveSimulating } = useAppStore();

  // Setup periodic live data simulation timer (5 seconds)
  React.useEffect(() => {
    if (!isLiveSimulating) return;
    const interval = setInterval(() => {
      tickRealtimeUpdate();
    }, 5000);
    return () => clearInterval(interval);
  }, [isLiveSimulating, tickRealtimeUpdate]);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <Sidebar isMobileOpen={isMobileOpen} onMobileClose={() => setIsMobileOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64 transition-all duration-300">
        <Header onMobileMenuToggle={() => setIsMobileOpen(!isMobileOpen)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

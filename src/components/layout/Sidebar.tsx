import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Grid3X3,
  Activity,
  BrainCircuit,
  Eye,
  Bell,
  CloudRain,
  User,
  Radio,
  Router as RouterIcon,
  ShieldCheck,
  Sliders,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Zap,
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

interface SidebarProps {
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, onMobileClose }) => {
  const { role, user, logout } = useAppStore();
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const operatorLinks = [
    { to: '/operator/dashboard', label: 'Overview', icon: LayoutDashboard },
    { to: '/operator/blocks', label: 'Salt Blocks', icon: Grid3X3 },
    { to: '/operator/monitoring', label: 'Live Monitoring', icon: Activity },
    { to: '/operator/ai-insights', label: 'AI Insights', icon: BrainCircuit },
    { to: '/operator/crystallization', label: 'Crystallization', icon: Eye },
    { to: '/operator/alerts', label: 'Alerts', icon: Bell },
    { to: '/operator/weather', label: 'Weather & Rain Risk', icon: CloudRain },
    { to: '/operator/profile', label: 'Profile', icon: User },
  ];

  const adminLinks = [
    { to: '/admin/dashboard', label: 'System Overview', icon: LayoutDashboard },
    { to: '/admin/nodes', label: 'Sensor Nodes', icon: Radio },
    { to: '/admin/gateways', label: 'Gateways', icon: RouterIcon },
    { to: '/admin/device-health', label: 'Device Health', icon: ShieldCheck },
    { to: '/admin/calibration', label: 'Calibration', icon: Sliders },
    { to: '/admin/alerts', label: 'Alerts', icon: Bell },
    { to: '/admin/settings', label: 'System Settings', icon: Sliders },
    { to: '/admin/profile', label: 'Profile', icon: User },
  ];

  const links = role === 'admin' ? adminLinks : operatorLinks;

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          onClick={onMobileClose}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-40 bg-white border-r border-slate-200 flex flex-col transition-all duration-300 ease-in-out ${
          isCollapsed ? 'w-20' : 'w-64'
        } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Brand Header */}
        <div className="h-20 px-4 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center overflow-hidden py-1">
            <img
              src="/sslogo-transparent.png"
              alt="SmartSalt AI"
              className={`${isCollapsed ? 'h-10' : 'h-14'} w-auto object-contain shrink-0 transition-all`}
            />
          </div>

          {/* Desktop Toggle Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Section */}
        <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={onMobileClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all group ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-200 font-semibold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  } ${isCollapsed ? 'justify-center px-0' : ''}`
                }
                title={isCollapsed ? link.label : undefined}
              >
                <Icon className={`w-5 h-5 shrink-0 transition-transform group-hover:scale-105`} />
                {!isCollapsed && <span className="truncate">{link.label}</span>}
              </NavLink>
            );
          })}
        </div>

        {/* Live Hardware Network Banner at Bottom */}
        {!isCollapsed && (
          <div className="p-3 mx-3 mb-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-slate-600 font-medium">LoRa Node Mesh</span>
            </div>
            <span className="font-semibold text-emerald-600 flex items-center gap-1">
              <Zap className="w-3 h-3" /> 46/48
            </span>
          </div>
        )}

        {/* User Footer */}
        <div className="p-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
              alt={user?.name || 'User'}
              className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0"
            />
            {!isCollapsed && (
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-slate-900 truncate">{user?.name || 'Operator'}</span>
                <span className="text-[11px] text-slate-500 truncate">{user?.email}</span>
              </div>
            )}
          </div>
          {!isCollapsed && (
            <button
              onClick={logout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              title="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </aside>
    </>
  );
};

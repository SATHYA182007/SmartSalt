import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Bell, Play, Pause, ChevronDown, User, Shield, LogOut, ArrowRightLeft } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { NotificationDrawer } from '../alerts/NotificationDrawer';
import { Badge } from '../ui/Badge';

interface HeaderProps {
  onMobileMenuToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMobileMenuToggle }) => {
  const navigate = useNavigate();
  const { user, role, setRole, isLiveSimulating, toggleLiveSimulation, notifications, logout } = useAppStore();
  const [isNotifOpen, setIsNotifOpen] = React.useState(false);
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleRoleSwitch = () => {
    const newRole = role === 'operator' ? 'admin' : 'operator';
    setRole(newRole);
    setIsProfileOpen(false);
    navigate(newRole === 'admin' ? '/admin/dashboard' : '/operator/dashboard');
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between">
      {/* Left: Mobile Menu Toggle & Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMobileMenuToggle}
          className="lg:hidden p-2 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
            {role === 'admin' ? 'Infrastructure Monitor' : 'Salt Field Operations'}
          </h1>
          <p className="text-xs text-slate-500 hidden sm:block">
            {role === 'admin'
              ? 'Hardware network, LoRaWAN gateways & probe calibration'
              : 'Real-time brine concentration & AI harvest predictions'}
          </p>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Live Simulation Ticker Button */}
        <button
          onClick={toggleLiveSimulation}
          className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
            isLiveSimulating
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
              : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
          }`}
          title={isLiveSimulating ? 'Pause real-time sensor updates' : 'Resume real-time sensor updates'}
        >
          {isLiveSimulating ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-current text-emerald-600" />
              <span className="hidden sm:inline">Telemetry Live</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current text-slate-500" />
              <span className="hidden sm:inline">Telemetry Paused</span>
            </>
          )}
        </button>

        {/* Notification Bell Button */}
        <div className="relative">
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                {unreadCount}
              </span>
            )}
          </button>
          <NotificationDrawer isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
        </div>

        {/* Role Badge */}
        <div className="hidden md:block">
          <Badge variant={role === 'admin' ? 'blue' : 'success'} size="md">
            {role === 'admin' ? 'System Administrator' : 'Field Operator'}
          </Badge>
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <img
              src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
              alt={user?.name || 'Profile'}
              className="w-8 h-8 rounded-full object-cover border border-slate-200"
            />
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>

          {isProfileOpen && (
            <>
              <div onClick={() => setIsProfileOpen(false)} className="fixed inset-0 z-40" />
              <div className="absolute right-0 top-12 z-50 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 divide-y divide-slate-100">
                <div className="px-4 py-2">
                  <p className="text-xs font-bold text-slate-900 truncate">{user?.name}</p>
                  <p className="text-[11px] text-slate-500 truncate">{user?.organization}</p>
                </div>

                <div className="py-1">
                  <button
                    onClick={handleRoleSwitch}
                    className="w-full px-4 py-2 text-left text-xs font-semibold text-blue-600 hover:bg-blue-50 flex items-center gap-2"
                  >
                    <ArrowRightLeft className="w-3.5 h-3.5" />
                    Switch to {role === 'operator' ? 'Admin Role' : 'Operator Role'}
                  </button>
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      navigate(role === 'admin' ? '/admin/profile' : '/operator/profile');
                    }}
                    className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    View Profile
                  </button>
                </div>

                <div className="pt-1">
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      logout();
                      navigate('/auth');
                    }}
                    className="w-full px-4 py-2 text-left text-xs font-medium text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5 text-rose-500" />
                    Sign Out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

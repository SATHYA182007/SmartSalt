import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { User, Mail, Shield, Building, LogOut, Key, ArrowRightLeft } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, role, setRole, logout } = useAppStore();

  const handleRoleSwitch = () => {
    const newRole = role === 'operator' ? 'admin' : 'operator';
    setRole(newRole);
    navigate(newRole === 'admin' ? '/admin/dashboard' : '/operator/dashboard');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100">
          <img
            src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
            alt={user?.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-100 shadow-sm"
          />
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <h1 className="text-2xl font-extrabold text-slate-900">{user?.name}</h1>
              <Badge variant={role === 'admin' ? 'blue' : 'success'} size="md">
                {role === 'admin' ? 'System Administrator' : 'Field Operator'}
              </Badge>
            </div>
            <p className="text-xs text-slate-500">{user?.email}</p>
            <p className="text-xs font-semibold text-slate-700">{user?.organization}</p>
          </div>
        </div>

        {/* Profile Details Form */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Account Credentials</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-slate-400 font-semibold flex items-center gap-1.5">
                <User className="w-4 h-4 text-blue-600" /> Full Name
              </span>
              <span className="font-bold text-slate-900 text-sm block">{user?.name}</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-slate-400 font-semibold flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-blue-600" /> Email Address
              </span>
              <span className="font-bold text-slate-900 text-sm block">{user?.email}</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-slate-400 font-semibold flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-blue-600" /> Active Role
              </span>
              <span className="font-bold text-slate-900 text-sm block capitalize">{role}</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-slate-400 font-semibold flex items-center gap-1.5">
                <Building className="w-4 h-4 text-blue-600" /> Organization
              </span>
              <span className="font-bold text-slate-900 text-sm block">{user?.organization}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Button onClick={handleRoleSwitch} variant="secondary" leftIcon={<ArrowRightLeft className="w-4 h-4" />}>
              Switch to {role === 'operator' ? 'Admin Role' : 'Operator Role'}
            </Button>
            <Button variant="outline" leftIcon={<Key className="w-4 h-4" />}>
              Change Password
            </Button>
          </div>

          <Button
            onClick={() => {
              logout();
              navigate('/auth');
            }}
            variant="danger"
            leftIcon={<LogOut className="w-4 h-4" />}
          >
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

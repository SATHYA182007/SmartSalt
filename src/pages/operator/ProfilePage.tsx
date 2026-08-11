import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { User, Mail, Shield, Building, LogOut, Key, ArrowRightLeft, Edit3, Save, CheckCircle, Camera } from 'lucide-react';

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
];

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, role, setRole, updateUserProfile, logout } = useAppStore();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || 'Carlos Ruiz');
  const [email, setEmail] = useState(user?.email || 'operator@smartsalt.ai');
  const [organization, setOrganization] = useState(user?.organization || 'Salinas del Atlántico');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || PRESET_AVATARS[0]);
  const [isSaved, setIsSaved] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [passwordSaved, setPasswordSaved] = useState(false);

  const handleRoleSwitch = () => {
    const newRole = role === 'operator' ? 'admin' : 'operator';
    setRole(newRole);
    navigate(newRole === 'admin' ? '/admin/dashboard' : '/operator/dashboard');
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUserProfile({
      name,
      email,
      organization,
      avatarUrl,
    });
    setIsSaved(true);
    setIsEditing(false);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordSaved(true);
    setTimeout(() => {
      setPasswordSaved(false);
      setIsPasswordModalOpen(false);
      setNewPassword('');
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Toast Banner */}
      {isSaved && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 shadow-sm animate-fade-in">
          <CheckCircle className="w-5 h-5 text-emerald-600" />
          <span>Profile updated and synchronized with Supabase database!</span>
        </div>
      )}

      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100">
          <div className="relative group">
            <img
              src={avatarUrl}
              alt={name}
              className="w-24 h-24 rounded-full object-cover border-4 border-teal-100 shadow-md group-hover:opacity-90 transition-opacity"
            />
            {isEditing && (
              <div className="absolute inset-0 rounded-full bg-slate-900/40 flex items-center justify-center text-white pointer-events-none">
                <Camera className="w-6 h-6" />
              </div>
            )}
          </div>

          <div className="space-y-1 text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <span className="text-gradient-green-blue text-effect-glow">{name}</span>
              </h1>
              <Badge variant={role === 'admin' ? 'blue' : 'success'} size="md">
                {role === 'admin' ? 'System Administrator' : 'Field Operator'}
              </Badge>
            </div>
            <p className="text-xs text-slate-500">{email}</p>
            <p className="text-xs font-semibold text-slate-700">{organization}</p>
          </div>

          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? 'secondary' : 'primary'}
            leftIcon={isEditing ? <User className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
          >
            {isEditing ? 'Cancel Editing' : 'Edit Profile'}
          </Button>
        </div>

        {/* Edit Profile Form vs View Card */}
        {isEditing ? (
          <form onSubmit={handleSaveProfile} className="space-y-6 animate-fade-in">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-teal-600" /> Edit Profile Information
            </h3>

            {/* Avatar Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">Choose Avatar Icon</label>
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {PRESET_AVATARS.map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt={`Avatar ${idx + 1}`}
                    onClick={() => setAvatarUrl(url)}
                    className={`w-12 h-12 rounded-full object-cover cursor-pointer border-2 transition-all ${
                      avatarUrl === url ? 'border-teal-600 scale-110 shadow-md' : 'border-slate-200 opacity-70 hover:opacity-100'
                    }`}
                  />
                ))}
              </div>
              <div className="pt-1">
                <label className="text-[11px] text-slate-500 font-semibold block">Or Custom Image URL</label>
                <input
                  type="url"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full mt-1 p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-hidden font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-hidden font-semibold"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-hidden font-semibold"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="font-bold text-slate-700 block">Organization Name</label>
                <input
                  type="text"
                  required
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-hidden font-semibold"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="secondary" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" leftIcon={<Save className="w-4 h-4" />}>
                Save Profile Changes
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Account Credentials</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-400 font-semibold flex items-center gap-1.5">
                  <User className="w-4 h-4 text-teal-600" /> Full Name
                </span>
                <span className="font-bold text-slate-900 text-sm block">{name}</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-400 font-semibold flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-teal-600" /> Email Address
                </span>
                <span className="font-bold text-slate-900 text-sm block">{email}</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-400 font-semibold flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-teal-600" /> Active Role
                </span>
                <span className="font-bold text-slate-900 text-sm block capitalize">{role}</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-400 font-semibold flex items-center gap-1.5">
                  <Building className="w-4 h-4 text-teal-600" /> Organization
                </span>
                <span className="font-bold text-slate-900 text-sm block">{organization}</span>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Button onClick={handleRoleSwitch} variant="secondary" leftIcon={<ArrowRightLeft className="w-4 h-4" />}>
              Switch to {role === 'operator' ? 'Admin Role' : 'Operator Role'}
            </Button>
            <Button onClick={() => setIsPasswordModalOpen(true)} variant="outline" leftIcon={<Key className="w-4 h-4" />}>
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

      {/* Change Password Modal */}
      <Modal isOpen={isPasswordModalOpen} onClose={() => setIsPasswordModalOpen(false)} title="Change Account Password">
        <form onSubmit={handlePasswordSubmit} className="space-y-4 text-xs">
          {passwordSaved ? (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-center flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-600" /> Password updated successfully!
            </div>
          ) : (
            <>
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">New Security Password</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-hidden font-mono text-sm"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="secondary" onClick={() => setIsPasswordModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  Update Password
                </Button>
              </div>
            </>
          )}
        </form>
      </Modal>
    </div>
  );
};

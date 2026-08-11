import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { authService, DEMO_USERS } from '../services/authService';
import { useAppStore } from '../store/useAppStore';
import { Button } from '../components/ui/Button';
import { Role } from '../types';
import { ArrowRight, ArrowLeft, ShieldCheck, UserCheck, Lock, Mail, User, Radio, Sparkles } from 'lucide-react';

export const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const { setUser, setRole } = useAppStore();

  const [activeTab, setActiveTab] = React.useState<'signin' | 'signup'>('signin');
  const [selectedRole, setSelectedRole] = React.useState<Role | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  // Form states
  const [email, setEmail] = React.useState('operator@smartsalt.ai');
  const [password, setPassword] = React.useState('demo123');
  const [name, setName] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const handleQuickLogin = async (role: Role) => {
    setIsLoading(true);
    const demoEmail = role === 'admin' ? 'admin@smartsalt.ai' : 'operator@smartsalt.ai';
    const loggedUser = await authService.login(demoEmail, role);
    setUser(loggedUser);
    setRole(role);
    setIsLoading(false);

    if (role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/operator/dashboard');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const targetRole = selectedRole || (email.includes('admin') ? 'admin' : 'operator');
    const loggedUser = await authService.login(email, targetRole);
    setUser(loggedUser);
    setRole(targetRole);
    setIsLoading(false);

    if (targetRole === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/operator/dashboard');
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-sans overflow-hidden bg-slate-900">
      {/* Full Page Salt Field Background Image Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: `url('/salt-field-bg.png')` }}
      />
      {/* Dark gradient & subtle glass overlay for sharp visual hierarchy */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-teal-950/65 to-slate-950/85 backdrop-blur-[3px]" />

      {/* Back to Landing Page Floating Button */}
      <div className="relative z-10 w-full max-w-5xl mb-4 flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/90 backdrop-blur-md border border-white/50 hover:bg-white text-slate-800 text-xs font-bold transition-all shadow-lg shadow-slate-950/20 group"
        >
          <ArrowLeft className="w-4 h-4 text-teal-600 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Landing Page</span>
        </button>
      </div>

      <div className="relative z-10 w-full max-w-5xl bg-white/95 backdrop-blur-xl border border-white/60 rounded-3xl shadow-2xl shadow-slate-950/40 overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        {/* LEFT COLUMN: SmartSalt AI Branding & Visual */}
        <div className="relative p-8 sm:p-12 text-white flex flex-col justify-between overflow-hidden bg-slate-900">
          {/* Salt Field Image Background in Left Panel */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
            style={{ backgroundImage: `url('/salt-field-bg.png')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/90 via-teal-900/85 to-slate-950/90" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl pointer-events-none" />

          {/* Logo Header */}
          <div className="relative z-10 space-y-4">
            <div
              onClick={() => navigate('/')}
              className="flex items-center cursor-pointer group"
            >
              <img
                src="/sslogo-transparent.png"
                alt="SmartSalt AI Logo"
                className="h-14 sm:h-16 w-auto object-contain brightness-0 invert drop-shadow-md transition-transform group-hover:scale-105"
              />
            </div>
            <p className="text-teal-100 text-sm font-medium leading-relaxed max-w-sm">
              Intelligent IoT Sensing & AI Production Control for Salt Evaporation Fields.
            </p>
          </div>

          {/* Center Showcase Card */}
          <div className="relative z-10 my-8 p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-200">
              <Sparkles className="w-4 h-4 text-cyan-300 animate-pulse" /> Demo Accounts Included
            </div>
            <p className="text-xs text-teal-50 leading-relaxed">
              Test either role instantly: Field Operator (monitoring brine EC & harvest prediction) or System Administrator (hardware node mesh & gateways).
            </p>
          </div>

          {/* Footer badge */}
          <div className="relative z-10 text-xs text-teal-200 flex items-center gap-2">
            <Radio className="w-4 h-4 text-emerald-400 animate-pulse" /> LoRa Mesh Hardware Control Center
          </div>
        </div>

        {/* RIGHT COLUMN: Authentication & Role Selection Form */}
        <div className="p-8 sm:p-12 flex flex-col justify-center space-y-6">
          {/* Quick Demo Credentials Bar */}
          <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200/60 space-y-2">
            <span className="text-xs font-bold text-teal-900 uppercase block tracking-wider">
              Quick Demo Access (One-Click Login)
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('operator')}
                className="p-2.5 rounded-xl bg-white border border-teal-200 hover:bg-gradient-to-r hover:from-emerald-600 hover:to-teal-600 hover:text-white text-teal-700 text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
              >
                <UserCheck className="w-4 h-4" /> Field Operator
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('admin')}
                className="p-2.5 rounded-xl bg-white border border-teal-200 hover:bg-slate-900 hover:text-white text-slate-800 text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4 text-teal-600" /> System Admin
              </button>
            </div>
          </div>

          {/* Form Tabs */}
          <div className="flex border-b border-slate-200 text-sm font-bold">
            <button
              onClick={() => setActiveTab('signin')}
              className={`pb-3 px-4 border-b-2 transition-all ${
                activeTab === 'signin'
                  ? 'border-teal-600 text-teal-700'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab('signup')}
              className={`pb-3 px-4 border-b-2 transition-all ${
                activeTab === 'signup'
                  ? 'border-teal-600 text-teal-700'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {activeTab === 'signup' && (
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="Carlos Ruiz"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  placeholder="operator@smartsalt.ai"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            {activeTab === 'signup' && (
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Confirm Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
            )}

            {/* Role Choice Selector Cards */}
            <div className="pt-2">
              <label className="text-xs font-bold text-slate-700 block mb-2">Select Your Workspace Role</label>
              <div className="grid grid-cols-2 gap-3">
                <div
                  onClick={() => setSelectedRole('operator')}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    selectedRole === 'operator' || (!selectedRole && !email.includes('admin'))
                      ? 'border-teal-500 bg-teal-50/80 ring-2 ring-teal-500/20'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <span className="font-extrabold text-xs text-slate-900 block">Field Operator</span>
                  <span className="text-[10px] text-slate-500 block">Monitor salt-field production</span>
                </div>

                <div
                  onClick={() => setSelectedRole('admin')}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    selectedRole === 'admin' || email.includes('admin')
                      ? 'border-teal-500 bg-teal-50/80 ring-2 ring-teal-500/20'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <span className="font-extrabold text-xs text-slate-900 block">System Administrator</span>
                  <span className="text-[10px] text-slate-500 block">Manage hardware infrastructure</span>
                </div>
              </div>
            </div>

            <Button type="submit" isLoading={isLoading} variant="primary" className="w-full" size="lg">
              {activeTab === 'signin' ? 'Sign In To Control Center' : 'Create SmartSalt Account'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

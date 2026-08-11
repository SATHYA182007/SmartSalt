import React, { useState, useEffect } from 'react';
import { Button } from '../../components/ui/Button';
import { Sliders, Save, CheckCircle, Bell, RefreshCw, Radio, ShieldCheck } from 'lucide-react';

interface SystemSettings {
  loraRegion: string;
  uplinkRate: string;
  ecDropThreshold: number;
  rainRiskThreshold: number;
  emailAlerts: boolean;
  smsAlerts: boolean;
  pushNotifications: boolean;
}

const DEFAULT_SETTINGS: SystemSettings = {
  loraRegion: 'EU868',
  uplinkRate: '5s',
  ecDropThreshold: 15,
  rainRiskThreshold: 40,
  emailAlerts: true,
  smsAlerts: true,
  pushNotifications: true,
};

export const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<SystemSettings>(() => {
    const stored = localStorage.getItem('smartsalt_settings');
    if (!stored) return DEFAULT_SETTINGS;
    try {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    localStorage.setItem('smartsalt_settings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleResetDefaults = () => {
    setSettings(DEFAULT_SETTINGS);
    localStorage.setItem('smartsalt_settings', JSON.stringify(DEFAULT_SETTINGS));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Toast */}
      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 shadow-sm animate-fade-in">
          <CheckCircle className="w-5 h-5 text-emerald-600" />
          <span>System telemetry and alert threshold settings saved successfully!</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white shadow-md shadow-teal-500/25">
            <Sliders className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span className="text-gradient-green-blue text-effect-glow">System & Telemetry Settings</span>
            </h1>
            <p className="text-xs text-slate-500">
              LoRa frequency band configuration, telemetry uplink sampling rate & AI threshold parameters
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={handleResetDefaults} variant="secondary" leftIcon={<RefreshCw className="w-4 h-4" />}>
            Reset Defaults
          </Button>
          <Button onClick={handleSave} variant="primary" leftIcon={<Save className="w-4 h-4" />}>
            {saved ? 'Saved!' : 'Save Settings'}
          </Button>
        </div>
      </div>

      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-6">
        {/* LoRaWAN Parameters */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Radio className="w-4 h-4 text-teal-600" /> LoRaWAN Mesh Parameters
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <label className="font-bold text-slate-900 block">LoRa Frequency Region</label>
              <select
                value={settings.loraRegion}
                onChange={(e) => setSettings({ ...settings, loraRegion: e.target.value })}
                className="w-full p-2 bg-white border border-slate-200 rounded-lg font-semibold text-slate-700 focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
              >
                <option value="EU868">EU868 (868.1 - 868.5 MHz)</option>
                <option value="US915">US915 (902.3 - 914.9 MHz)</option>
                <option value="AS923">AS923 (923.2 MHz)</option>
              </select>
              <span className="text-[10px] text-slate-500 block">Active band for Gateway GW-01, GW-02, GW-03</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <label className="font-bold text-slate-900 block">Telemetry Uplink Rate</label>
              <select
                value={settings.uplinkRate}
                onChange={(e) => setSettings({ ...settings, uplinkRate: e.target.value })}
                className="w-full p-2 bg-white border border-slate-200 rounded-lg font-semibold text-slate-700 focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
              >
                <option value="5s">5 Seconds (Real-time Live Ticker)</option>
                <option value="15s">15 Seconds (Standard)</option>
                <option value="60s">60 Seconds (Power Saver)</option>
              </select>
              <span className="text-[10px] text-slate-500 block">Interval for sensor telemetry polling</span>
            </div>
          </div>
        </div>

        {/* AI Anomaly & Rain Alert Thresholds */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-teal-600" /> AI Anomaly & Rain Alert Thresholds
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <label className="font-bold text-slate-900 block">EC Drop Anomaly Threshold (%)</label>
              <input
                type="number"
                value={settings.ecDropThreshold}
                onChange={(e) => setSettings({ ...settings, ecDropThreshold: Number(e.target.value) })}
                className="w-full p-2 bg-white border border-slate-200 rounded-lg font-semibold text-slate-700 focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
              />
              <span className="text-[10px] text-slate-500 block">Trigger critical alert if EC drops &gt; {settings.ecDropThreshold}% in 2h</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <label className="font-bold text-slate-900 block">Rain Risk Probability Threshold (%)</label>
              <input
                type="number"
                value={settings.rainRiskThreshold}
                onChange={(e) => setSettings({ ...settings, rainRiskThreshold: Number(e.target.value) })}
                className="w-full p-2 bg-white border border-slate-200 rounded-lg font-semibold text-slate-700 focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
              />
              <span className="text-[10px] text-slate-500 block">Trigger dilution warning if rain probability &gt; {settings.rainRiskThreshold}%</span>
            </div>
          </div>
        </div>

        {/* Dispatch Channels */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Bell className="w-4 h-4 text-teal-600" /> Dispatch Notification Channels
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <label className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between cursor-pointer hover:bg-slate-100/70 transition-colors">
              <div>
                <span className="font-bold text-slate-900 block">Email Alerts</span>
                <span className="text-[10px] text-slate-500">Send critical alerts to operator email</span>
              </div>
              <input
                type="checkbox"
                checked={settings.emailAlerts}
                onChange={(e) => setSettings({ ...settings, emailAlerts: e.target.checked })}
                className="w-4 h-4 text-teal-600 rounded-md focus:ring-teal-500 accent-teal-600"
              />
            </label>

            <label className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between cursor-pointer hover:bg-slate-100/70 transition-colors">
              <div>
                <span className="font-bold text-slate-900 block">SMS Gateway</span>
                <span className="text-[10px] text-slate-500">Twilio SMS dispatch for rain alerts</span>
              </div>
              <input
                type="checkbox"
                checked={settings.smsAlerts}
                onChange={(e) => setSettings({ ...settings, smsAlerts: e.target.checked })}
                className="w-4 h-4 text-teal-600 rounded-md focus:ring-teal-500 accent-teal-600"
              />
            </label>

            <label className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between cursor-pointer hover:bg-slate-100/70 transition-colors">
              <div>
                <span className="font-bold text-slate-900 block">Push Notifications</span>
                <span className="text-[10px] text-slate-500">In-app realtime drawer popups</span>
              </div>
              <input
                type="checkbox"
                checked={settings.pushNotifications}
                onChange={(e) => setSettings({ ...settings, pushNotifications: e.target.checked })}
                className="w-4 h-4 text-teal-600 rounded-md focus:ring-teal-500 accent-teal-600"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

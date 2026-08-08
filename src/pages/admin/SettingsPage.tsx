import React from 'react';
import { Button } from '../../components/ui/Button';
import { Sliders, Radio, Save, ShieldCheck } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [saved, setSaved] = React.useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-200">
            <Sliders className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">System & Telemetry Settings</h1>
            <p className="text-xs text-slate-500">
              LoRa frequency band configuration, telemetry uplink sampling rate & AI threshold parameters
            </p>
          </div>
        </div>

        <Button onClick={handleSave} variant="primary" leftIcon={<Save className="w-4 h-4" />}>
          {saved ? 'Saved!' : 'Save Settings'}
        </Button>
      </div>

      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">LoRaWAN Mesh Parameters</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <label className="font-bold text-slate-900 block">LoRa Frequency Region</label>
              <select className="w-full p-2 bg-white border border-slate-200 rounded-lg font-semibold text-slate-700">
                <option value="EU868">EU868 (868.1 - 868.5 MHz)</option>
                <option value="US915">US915 (902.3 - 914.9 MHz)</option>
                <option value="AS923">AS923 (923.2 MHz)</option>
              </select>
              <span className="text-[10px] text-slate-500 block">Used by Gateway GW-01, GW-02, GW-03</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <label className="font-bold text-slate-900 block">Telemetry Uplink Rate</label>
              <select className="w-full p-2 bg-white border border-slate-200 rounded-lg font-semibold text-slate-700">
                <option value="5s">5 Seconds (Real-time Live Ticker)</option>
                <option value="15s">15 Seconds (Standard)</option>
                <option value="60s">60 Seconds (Power Saver)</option>
              </select>
              <span className="text-[10px] text-slate-500 block">Interval for sensor telemetry polling</span>
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">AI Anomaly & Rain Alert Thresholds</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <label className="font-bold text-slate-900 block">EC Drop Anomaly Threshold</label>
              <input
                type="number"
                defaultValue={15}
                className="w-full p-2 bg-white border border-slate-200 rounded-lg font-semibold text-slate-700"
              />
              <span className="text-[10px] text-slate-500 block">Trigger critical alert if EC drops &gt; X% in 2 hours</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <label className="font-bold text-slate-900 block">Rain Risk Probability Threshold</label>
              <input
                type="number"
                defaultValue={40}
                className="w-full p-2 bg-white border border-slate-200 rounded-lg font-semibold text-slate-700"
              />
              <span className="text-[10px] text-slate-500 block">Trigger dilution warning if rain probability &gt; X%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

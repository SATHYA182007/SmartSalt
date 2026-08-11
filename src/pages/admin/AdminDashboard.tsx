import React from 'react';
import { useNavigate } from 'react-router-dom';
import { deviceService } from '../../services/deviceService';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import {
  Radio,
  Router as RouterIcon,
  ShieldCheck,
  Sliders,
  AlertTriangle,
  CheckCircle2,
  Wifi,
  Battery,
  ArrowRight,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const stats = deviceService.getSystemStats();
  const gateways = deviceService.getGateways();
  const nodes = deviceService.getSensorNodes();

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-slate-950/20 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-600/30 text-teal-300 text-xs font-semibold border border-teal-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> LoRaWAN Mesh Infrastructure
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-teal-100 to-cyan-200 text-effect-glow">SmartSalt Infrastructure</h1>
            <p className="text-slate-400 text-sm max-w-2xl">
              Hardware node network health, LoRa gateway backhauls, battery longevity & probe calibration schedules.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button onClick={() => navigate('/admin/nodes')} variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Manage Nodes
            </Button>
          </div>
        </div>
      </div>

      {/* 6 Key System Admin KPI Cards */}
      <div className="grid grid-cols-1 min-[380px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs">
          <span className="text-xs font-semibold text-slate-400 uppercase block">Total Sensor Nodes</span>
          <div className="text-2xl font-black text-slate-900 mt-1">{stats.totalNodes}</div>
          <span className="text-[10px] text-slate-500 mt-1 block">Across 12 Salt Pans</span>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs">
          <span className="text-xs font-semibold text-slate-400 uppercase block">Online Nodes</span>
          <div className="text-2xl font-black text-emerald-600 mt-1">{stats.onlineNodes}</div>
          <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">95.8% Uptime</span>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs">
          <span className="text-xs font-semibold text-slate-400 uppercase block">Offline Nodes</span>
          <div className="text-2xl font-black text-rose-600 mt-1">{stats.offlineNodes}</div>
          <span className="text-[10px] text-rose-600 font-semibold mt-1 block">Attention Required</span>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs">
          <span className="text-xs font-semibold text-slate-400 uppercase block">LoRa Gateways</span>
          <div className="text-2xl font-black text-gradient-green-blue mt-1">{stats.totalGateways}</div>
          <span className="text-[10px] text-slate-500 mt-1 block">3 Active Gateway Masts</span>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs">
          <span className="text-xs font-semibold text-slate-400 uppercase block">Healthy Devices</span>
          <div className="text-2xl font-black text-slate-900 mt-1">{stats.onlineNodes}</div>
          <span className="text-[10px] text-slate-500 mt-1 block">IP68 Seal Intact</span>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs">
          <span className="text-xs font-semibold text-slate-400 uppercase block">Calibration Due</span>
          <div className="text-2xl font-black text-amber-600 mt-1">{stats.calibrationDueCount}</div>
          <span className="text-[10px] text-amber-600 font-semibold mt-1 block">EC Probes Due</span>
        </div>
      </div>

      {/* Gateways Overview Section */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <RouterIcon className="w-5 h-5 text-teal-600" />
            <h3 className="font-bold text-slate-900 text-base">LoRaWAN Gateway Infrastructure</h3>
          </div>
          <Button onClick={() => navigate('/admin/gateways')} variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
            Manage Gateways
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {gateways.map((gw) => (
            <div key={gw.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-slate-900 text-sm">{gw.id}</span>
                <Badge variant={gw.status === 'ONLINE' ? 'success' : 'warning'} size="sm">
                  {gw.status}
                </Badge>
              </div>
              <div>
                <h4 className="font-bold text-xs text-slate-800">{gw.name}</h4>
                <p className="text-[11px] text-slate-500">{gw.location}</p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs border-t border-slate-200 pt-2">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase block">Connected Nodes</span>
                  <span className="font-bold text-slate-900">{gw.connectedNodes} Nodes</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase block">Backhaul</span>
                  <span className="font-bold text-teal-600">{gw.internetBackhaul}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Offline/Degraded Hardware Alert List */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 text-base">Sensor Nodes Requiring Maintenance</h3>
        <div className="divide-y divide-slate-100">
          {nodes
            .filter((n) => n.status !== 'ONLINE' || n.calibrationStatus !== 'OK')
            .slice(0, 5)
            .map((node) => (
              <div key={node.id} className="py-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 font-bold flex items-center justify-center">
                    !
                  </span>
                  <div>
                    <span className="font-bold text-slate-900 block">{node.id} ({node.nodeName})</span>
                    <span className="text-slate-500">Block: {node.blockName} • Last seen: {node.lastSeen}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={node.status === 'OFFLINE' ? 'danger' : 'warning'} size="sm">
                    {node.status}
                  </Badge>
                  <Button onClick={() => navigate(`/operator/sensors/${node.id}`)} variant="outline" size="sm">
                    Inspect
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

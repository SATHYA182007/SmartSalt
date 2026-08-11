import React from 'react';
import { deviceService } from '../../services/deviceService';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Router as RouterIcon, Wifi, Activity, CheckCircle2, RefreshCw } from 'lucide-react';

export const GatewaysPage: React.FC = () => {
  const gateways = deviceService.getGateways();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white shadow-md shadow-teal-500/25">
            <RouterIcon className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span className="text-gradient-green-blue text-effect-glow">LoRaWAN Gateway Network</span>
            </h1>
            <p className="text-xs text-slate-500">
              868 MHz LoRa concentration gateways, backhaul links, packet delivery rate & gateway uptime
            </p>
          </div>
        </div>

        <Button variant="secondary" leftIcon={<RefreshCw className="w-4 h-4 text-teal-600" />}>
          Sync All Gateways
        </Button>
      </div>

      {/* Gateways Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {gateways.map((gw) => (
          <div key={gw.id} className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="font-extrabold text-slate-900 text-base">{gw.id}</span>
              <Badge variant={gw.status === 'ONLINE' ? 'success' : 'warning'} size="sm">
                {gw.status}
              </Badge>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 text-sm">{gw.name}</h3>
              <p className="text-xs text-slate-500">{gw.location}</p>
            </div>

            <div className="space-y-2 border-y border-slate-100 py-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Connected Nodes:</span>
                <span className="font-extrabold text-slate-900">{gw.connectedNodes} Sensor Nodes</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500">Signal Health:</span>
                <span className="font-extrabold text-teal-600">{gw.signalHealth}%</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500">Internet Backhaul:</span>
                <span className="font-bold text-slate-800">{gw.internetBackhaul}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500">Uptime:</span>
                <span className="font-extrabold text-emerald-600">{gw.uptimePercent}%</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500">IP Address:</span>
                <span className="font-mono text-slate-600 text-[11px]">{gw.ipAddress}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Last sync: {gw.lastSync}</span>
              <Button variant="outline" size="sm">
                Diagnostics
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

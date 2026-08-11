import React from 'react';
import { deviceService } from '../../services/deviceService';
import { Badge } from '../../components/ui/Badge';
import { ShieldCheck, Battery, Wifi, Sliders, AlertTriangle } from 'lucide-react';

export const DeviceHealthPage: React.FC = () => {
  const nodes = deviceService.getSensorNodes();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white shadow-md shadow-teal-500/25">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span className="text-gradient-green-blue text-effect-glow">Hardware & Device Health Diagnostics</span>
            </h1>
            <p className="text-xs text-slate-500">
              LiFePO4 battery degradation curves, IP67/IP68 enclosure seal integrity & LoRa link budgets
            </p>
          </div>
        </div>
      </div>

      {/* Grid overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
          <span className="text-xs text-slate-400 font-semibold block uppercase">Battery Degradation</span>
          <div className="text-2xl font-black text-emerald-600 mt-1">94.2% Healthy</div>
          <span className="text-[10px] text-slate-500 mt-1 block">46/48 nodes above 80% charge</span>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
          <span className="text-xs text-slate-400 font-semibold block uppercase">IP67 Enclosure Seals</span>
          <div className="text-2xl font-black text-slate-900 mt-1">46 Sealed</div>
          <span className="text-[10px] text-rose-600 font-semibold mt-1 block">2 check required</span>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
          <span className="text-xs text-slate-400 font-semibold block uppercase">LoRa Link RSSI Margin</span>
          <div className="text-2xl font-black text-gradient-green-blue mt-1">-68 dBm Avg</div>
          <span className="text-[10px] text-slate-500 mt-1 block">Strong link margin to GW-01</span>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
          <span className="text-xs text-slate-400 font-semibold block uppercase">Probe Drift Offset</span>
          <div className="text-2xl font-black text-amber-600 mt-1">4 Calibrations</div>
          <span className="text-[10px] text-amber-600 font-semibold mt-1 block">Scheduled for recalibration</span>
        </div>
      </div>

      {/* Health Breakdown Cards */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 text-base">Node Health Telemetry Audit</h3>

        <div className="divide-y divide-slate-100">
          {nodes.map((node) => (
            <div key={node.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 font-bold flex items-center justify-center border border-teal-100">
                  {node.id.slice(-2)}
                </span>
                <div>
                  <span className="font-bold text-slate-900 block">{node.id} ({node.blockName})</span>
                  <span className="text-slate-500">Firmware: {node.firmwareVersion} • Gateway: {node.gatewayId}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-slate-700 font-semibold">
                <span>Battery: <strong className="text-emerald-600">{node.batteryLevel}%</strong></span>
                <span>Signal: <strong className="text-teal-600">{node.signalDbm} dBm</strong></span>
                <span>Enclosure: <Badge variant={node.ip67Status === 'SEALED' ? 'success' : 'danger'} size="sm">{node.ip67Status}</Badge></span>
                <span>Calibration: <Badge variant={node.calibrationStatus === 'OK' ? 'success' : 'warning'} size="sm">{node.calibrationStatus}</Badge></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

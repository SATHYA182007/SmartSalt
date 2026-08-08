import React from 'react';
import { deviceService } from '../../services/deviceService';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Sliders, RefreshCw, CheckCircle2, AlertTriangle, Zap, Thermometer, Droplets } from 'lucide-react';

export const CalibrationPage: React.FC = () => {
  const nodes = deviceService.getSensorNodes();
  const calibrationDueNodes = nodes.filter((n) => n.calibrationStatus !== 'OK');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-500 text-white shadow-md shadow-amber-200">
            <Sliders className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Sensor Probe Calibration Schedule</h1>
            <p className="text-xs text-slate-500">
              RS485 EC conductivity probe zero-point drift, temperature offsets & level probe recalibration
            </p>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase block">EC Probe Calibration</span>
            <span className="text-2xl font-black text-slate-900 mt-1 block">44 / 48 Valid</span>
            <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">±0.2 mS/cm accuracy</span>
          </div>
          <Zap className="w-8 h-8 text-blue-600 opacity-80" />
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase block">Temperature Sensor</span>
            <span className="text-2xl font-black text-slate-900 mt-1 block">48 / 48 Valid</span>
            <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">±0.1°C thermal accuracy</span>
          </div>
          <Thermometer className="w-8 h-8 text-amber-500 opacity-80" />
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase block">Water Level Probes</span>
            <span className="text-2xl font-black text-slate-900 mt-1 block">46 / 48 Valid</span>
            <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">±0.05 cm level offset</span>
          </div>
          <Droplets className="w-8 h-8 text-sky-500 opacity-80" />
        </div>
      </div>

      {/* Schedule Table */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 text-base">Node Probe Calibration Log ({nodes.length} Nodes)</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4">Node ID</th>
                <th className="py-3 px-4">Block</th>
                <th className="py-3 px-4">Last Calibrated</th>
                <th className="py-3 px-4">Next Due</th>
                <th className="py-3 px-4">Drift Offset</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium">
              {nodes.map((node) => (
                <tr key={node.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900">{node.id}</td>
                  <td className="py-3 px-4 font-semibold text-blue-600">{node.blockName}</td>
                  <td className="py-3 px-4 text-slate-600">{node.lastCalibrated}</td>
                  <td className="py-3 px-4 text-slate-600">{node.nextCalibrationDue}</td>
                  <td className="py-3 px-4 text-slate-500">+0.04 mS/cm</td>
                  <td className="py-3 px-4">
                    <Badge variant={node.calibrationStatus === 'OK' ? 'success' : 'warning'} size="sm">
                      {node.calibrationStatus}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Button variant="outline" size="sm" leftIcon={<RefreshCw className="w-3 h-3 text-blue-600" />}>
                      Recalibrate
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

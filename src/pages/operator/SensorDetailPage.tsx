import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { deviceService } from '../../services/deviceService';
import { sensorService } from '../../services/sensorService';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { SensorTrendChart } from '../../components/charts/SensorTrendChart';
import { Radio, Battery, Wifi, ArrowLeft, Sliders, ShieldCheck } from 'lucide-react';

export const SensorDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const node = deviceService.getNodeById(id || 'NODE-A03-01') || deviceService.getSensorNodes()[0];
  const block = sensorService.getBlockById(node.blockId) || sensorService.getSaltBlocks()[2];

  return (
    <div className="space-y-6">
      {/* Back button & Header */}
      <div className="flex items-center gap-3">
        <Button onClick={() => navigate(-1)} variant="outline" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
          Back
        </Button>
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span className="text-gradient-green-blue text-effect-glow">{node.nodeName} ({node.id})</span>
          </h1>
          <p className="text-xs text-slate-500">Node ID: {node.id} • Deployed in {node.blockName}</p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
          <span className="text-xs text-slate-400 font-semibold block uppercase">Sensor Status</span>
          <div className="mt-1 flex items-center justify-between">
            <Badge variant={node.status === 'ONLINE' ? 'success' : 'danger'} size="md">
              {node.status}
            </Badge>
            <Radio className="w-5 h-5 text-teal-600" />
          </div>
          <span className="text-[10px] text-slate-500 mt-2 block">IP67 Enclosure Seal: {node.ip67Status}</span>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
          <span className="text-xs text-slate-400 font-semibold block uppercase">Battery Telemetry</span>
          <div className="mt-1 flex items-center justify-between">
            <span className="text-2xl font-black text-emerald-600">{node.batteryLevel}%</span>
            <Battery className="w-5 h-5 text-emerald-600" />
          </div>
          <span className="text-[10px] text-slate-500 mt-2 block">LiFePO4 Solar Charging Active</span>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
          <span className="text-xs text-slate-400 font-semibold block uppercase">LoRa Link RSSI</span>
          <div className="mt-1 flex items-center justify-between">
            <span className="text-2xl font-black text-teal-600">{node.signalDbm} dBm</span>
            <Wifi className="w-5 h-5 text-teal-600" />
          </div>
          <span className="text-[10px] text-slate-500 mt-2 block">Quality: {node.signalQuality}</span>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
          <span className="text-xs text-slate-400 font-semibold block uppercase">Calibration Status</span>
          <div className="mt-1 flex items-center justify-between">
            <Badge variant={node.calibrationStatus === 'OK' ? 'success' : 'warning'} size="md">
              {node.calibrationStatus}
            </Badge>
            <Sliders className="w-5 h-5 text-amber-500" />
          </div>
          <span className="text-[10px] text-slate-500 mt-2 block">Due: {node.nextCalibrationDue}</span>
        </div>
      </div>

      {/* Sensor Probes Specs */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900">Active Integrated Probes</h3>
        <div className="flex flex-wrap gap-2">
          {node.sensorTypes.map((type) => (
            <span key={type} className="px-3 py-1.5 rounded-xl bg-teal-50 text-teal-800 font-bold text-xs border border-teal-200">
              {type === 'EC' ? 'RS485 EC Conductivity Probe' : type === 'TEMP' ? 'Submersible Temp Sensor' : type === 'WATER_LEVEL' ? 'Hydrostatic Level Sensor' : 'Crystal Vision Camera'}
            </span>
          ))}
        </div>
      </div>

      {/* Historical Trend */}
      <SensorTrendChart blockId={block.id} />
    </div>
  );
};

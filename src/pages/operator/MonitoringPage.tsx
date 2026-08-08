import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { sensorService } from '../../services/sensorService';
import { SensorTrendChart } from '../../components/charts/SensorTrendChart';
import { LiveIndicator } from '../../components/ui/LiveIndicator';
import { Badge } from '../../components/ui/Badge';
import {
  Zap,
  Thermometer,
  Droplets,
  CloudRain,
  Battery,
  Wifi,
  Clock,
  TrendingUp,
  TrendingDown,
  Minus,
} from 'lucide-react';

export const MonitoringPage: React.FC = () => {
  const { blocks, selectedBlockId, setSelectedBlockId } = useAppStore();
  const activeBlock = blocks.find((b) => b.id === selectedBlockId) || blocks[2]; // Default A03
  const reading = sensorService.getLatestReading(activeBlock.id);

  return (
    <div className="space-y-6">
      {/* Header with Block Selector & Live Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-black text-slate-900">Live Telemetry — {activeBlock.name}</h1>
            <LiveIndicator status="ONLINE" label="LIVE FEED" />
          </div>
          <p className="text-xs text-slate-500">{activeBlock.zone} • LoRa Node Telemetry Mesh</p>
        </div>

        {/* Block Selector */}
        <div className="flex items-center gap-3">
          <label className="text-xs font-bold text-slate-500 uppercase">Select Block:</label>
          <select
            value={selectedBlockId}
            onChange={(e) => setSelectedBlockId(e.target.value)}
            className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {blocks.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name} ({b.crystallizationStage})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 7 Key Live Telemetry Cards with "Why does this matter?" context callouts */}
      <div className="grid grid-cols-1 min-[450px]:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Card 1: EC Conductivity */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">EC / Salinity</span>
            <Zap className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-blue-600">{activeBlock.currentEc}</span>
            <span className="text-xs font-bold text-slate-400">mS/cm</span>
          </div>
          <div className="mt-2 flex items-center gap-1 text-xs font-bold text-emerald-600">
            <TrendingUp className="w-4 h-4" /> ↑ Rising (+1.8 mS/h)
          </div>
          <p className="text-[11px] text-slate-600 mt-2 bg-blue-50/60 p-2 rounded-lg border border-blue-100">
            <strong className="text-slate-900">Why this matters:</strong> Brine concentration is increasing toward target sodium chloride crystallization density.
          </p>
        </div>

        {/* Card 2: Temperature */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Brine Temperature</span>
            <Thermometer className="w-4 h-4 text-amber-500" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-slate-900">{activeBlock.temp}</span>
            <span className="text-xs font-bold text-slate-400">°C</span>
          </div>
          <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-slate-500">
            <Minus className="w-4 h-4 text-slate-400" /> Stable Ambient
          </div>
          <p className="text-[11px] text-slate-600 mt-2 bg-slate-50 p-2 rounded-lg border border-slate-200">
            <strong className="text-slate-900">Why this matters:</strong> High temperature sustains thermal evaporation momentum without thermal shock.
          </p>
        </div>

        {/* Card 3: Water Level */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Water Level</span>
            <Droplets className="w-4 h-4 text-sky-500" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-slate-900">{activeBlock.waterLevel}</span>
            <span className="text-xs font-bold text-slate-400">cm</span>
          </div>
          <div className="mt-2 flex items-center gap-1 text-xs font-bold text-blue-600">
            <TrendingDown className="w-4 h-4" /> ↓ Falling (-0.4 cm/day)
          </div>
          <p className="text-[11px] text-slate-600 mt-2 bg-slate-50 p-2 rounded-lg border border-slate-200">
            <strong className="text-slate-900">Why this matters:</strong> Falling water level confirms continuous volumetric evaporation loss.
          </p>
        </div>

        {/* Card 4: Weather & Rain Risk */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Rain Dilution Risk</span>
            <CloudRain className="w-4 h-4 text-slate-500" />
          </div>
          <div className="flex items-center justify-between my-1">
            <Badge
              variant={
                activeBlock.rainRisk === 'HIGH'
                  ? 'danger'
                  : activeBlock.rainRisk === 'MODERATE'
                  ? 'warning'
                  : 'success'
              }
              size="md"
            >
              {activeBlock.rainRisk} RISK
            </Badge>
            <span className="text-xs font-bold text-slate-700">Humidity: {activeBlock.humidity}%</span>
          </div>
          <p className="text-[11px] text-slate-600 mt-3 bg-slate-50 p-2 rounded-lg border border-slate-200">
            <strong className="text-slate-900">Why this matters:</strong> Rain within 24h could dilute concentrated salt crust in active pan.
          </p>
        </div>
      </div>

      {/* Secondary Hardware Health Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Battery className="w-5 h-5 text-emerald-600" />
            <div>
              <span className="text-xs font-bold text-slate-900 block">Node Battery Level</span>
              <span className="text-[11px] text-slate-500">LiFePO4 Solar Charge System</span>
            </div>
          </div>
          <span className="text-base font-extrabold text-emerald-600">{reading.battery}%</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Wifi className="w-5 h-5 text-blue-600" />
            <div>
              <span className="text-xs font-bold text-slate-900 block">LoRa Signal Strength</span>
              <span className="text-[11px] text-slate-500">Gateway Link Margin (RSSI)</span>
            </div>
          </div>
          <span className="text-base font-extrabold text-blue-600">{reading.signalStrength} dBm</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-slate-400" />
            <div>
              <span className="text-xs font-bold text-slate-900 block">Last Packet Synchronization</span>
              <span className="text-[11px] text-slate-500">LoRaWAN Uplink Frequency</span>
            </div>
          </div>
          <span className="text-xs font-bold text-slate-700">{reading.timestamp}</span>
        </div>
      </div>

      {/* Interactive Recharts Trend Chart for Selected Block */}
      <SensorTrendChart blockId={activeBlock.id} />
    </div>
  );
};

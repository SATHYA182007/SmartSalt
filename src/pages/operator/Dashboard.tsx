import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import { sensorService } from '../../services/sensorService';
import { aiService } from '../../services/aiService';
import { alertService } from '../../services/alertService';
import { SaltFieldMap } from '../../components/maps/SaltFieldMap';
import { SensorTrendChart } from '../../components/charts/SensorTrendChart';
import { AIInsightCard } from '../../components/ai/AIInsightCard';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { LiveIndicator } from '../../components/ui/LiveIndicator';
import {
  Grid3X3,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Radio,
  ArrowRight,
  TrendingUp,
  Droplets,
  Bell,
  Sparkles,
} from 'lucide-react';

export const OperatorDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { blocks, selectedBlockId, setSelectedBlockId, user } = useAppStore();

  const selectedBlock = blocks.find((b) => b.id === selectedBlockId) || blocks[2]; // Default A03
  const aiInsight = React.useMemo(() => aiService.getAIInsightForBlock(selectedBlockId), [selectedBlockId]);
  const activeAlerts = alertService.getAlerts().filter((a) => a.status !== 'RESOLVED');

  const totalBlocks = blocks.length;
  const normalBlocks = blocks.filter((b) => b.status === 'NORMAL').length;
  const actionRequiredBlocks = blocks.filter((b) => b.status === 'ACTION_REQUIRED').length;
  const avgHarvestReadiness = Math.round(
    blocks.reduce((acc, b) => acc + b.harvestReadiness, 0) / blocks.length
  );

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-700 to-cyan-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-teal-950/20 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_top_right,#ffffff_0%,transparent_70%)] opacity-10 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs text-teal-100 text-xs font-semibold border border-white/20">
              <LiveIndicator label="LoRa Telemetry Active" status="ONLINE" />
              <span>Maris Salt Works Co.</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-teal-100 to-cyan-200 text-effect-glow">
              Good morning, {user?.name || 'Operator'}
            </h1>
            <p className="text-teal-100 text-sm max-w-2xl leading-relaxed">
              Salt Field Evaporation Overview — 12 active crystallization blocks monitored via LoRa sensor mesh.
              Average harvest readiness is currently <strong className="text-white">{avgHarvestReadiness}%</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Button
              onClick={() => navigate('/operator/ai-insights')}
              variant="secondary"
              className="bg-white text-teal-800 hover:bg-teal-50 border-none shadow-md font-bold"
              leftIcon={<Sparkles className="w-4 h-4 text-teal-600" />}
            >
              AI Harvest Engine
            </Button>
            <Button
              onClick={() => navigate('/operator/monitoring')}
              variant="outline"
              className="bg-white/10 text-white hover:bg-white/20 border-white/30 font-semibold"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Live Telemetry
            </Button>
          </div>
        </div>
      </div>

      {/* 5 Main KPI Cards with "Why does this matter?" context callouts */}
      <div className="grid grid-cols-1 min-[450px]:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        {/* KPI 1 */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Active Blocks</span>
            <Grid3X3 className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">{totalBlocks}</div>
          <p className="text-[11px] text-slate-500 mt-1">
            <strong className="text-slate-700 font-semibold">Why this matters:</strong> 100% of field pans equipped with automated sensor nodes.
          </p>
        </div>

        {/* KPI 2 */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Blocks Normal</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-600">{normalBlocks}</div>
          <p className="text-[11px] text-slate-500 mt-1">
            <strong className="text-slate-700 font-semibold">Why this matters:</strong> Optimal evaporation & salinity progression without rain risk.
          </p>
        </div>

        {/* KPI 3 */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Action Required</span>
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-black text-rose-600">{actionRequiredBlocks}</div>
          <p className="text-[11px] text-slate-500 mt-1">
            <strong className="text-slate-700 font-semibold">Why this matters:</strong> Rain dilution risk or EC drop requiring immediate gate adjustment.
          </p>
        </div>

        {/* KPI 4 */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Avg Harvest Readiness</span>
            <Droplets className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl font-black text-gradient-green-blue">{avgHarvestReadiness}%</div>
          <p className="text-[11px] text-slate-500 mt-1">
            <strong className="text-slate-700 font-semibold">Why this matters:</strong> 3 blocks are within 48 hours of optimal salt crust harvesting density.
          </p>
        </div>

        {/* KPI 5 */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Connected Sensors</span>
            <Radio className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">46/48</div>
          <p className="text-[11px] text-slate-500 mt-1">
            <strong className="text-slate-700 font-semibold">Why this matters:</strong> 95.8% telemetry uptime across LoRa gateways.
          </p>
        </div>
      </div>

      {/* Spatial Field Map */}
      <SaltFieldMap
        blocks={blocks}
        selectedBlockId={selectedBlockId}
        onSelectBlock={(id) => setSelectedBlockId(id)}
      />

      {/* Grid Layout: Left Recharts Trend, Right AI Quick Snapshot & Active Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Recharts Trend Chart for Selected Block (2 Columns) */}
        <div className="lg:col-span-2 space-y-6">
          <SensorTrendChart blockId={selectedBlockId} />

          {/* Quick Active Sensor Reading Cards for Selected Block */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-xl bg-white border border-slate-200">
              <span className="text-xs text-slate-400 font-medium block">Electrical Conductivity</span>
              <div className="flex items-center justify-between mt-1">
                <span className="text-lg font-black text-teal-600">{selectedBlock.currentEc} mS/cm</span>
                <span className="text-xs font-bold text-emerald-600 flex items-center">
                  <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> Rising
                </span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">Brine concentration increasing.</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200">
              <span className="text-xs text-slate-400 font-medium block">Brine Temperature</span>
              <div className="flex items-center justify-between mt-1">
                <span className="text-lg font-black text-slate-900">{selectedBlock.temp}°C</span>
                <span className="text-xs font-semibold text-slate-500">Stable</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">Sustains evaporation momentum.</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200">
              <span className="text-xs text-slate-400 font-medium block">Water Level</span>
              <div className="flex items-center justify-between mt-1">
                <span className="text-lg font-black text-slate-900">{selectedBlock.waterLevel} cm</span>
                <span className="text-xs font-bold text-teal-600">Falling</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">Volumetric loss via evaporation.</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200">
              <span className="text-xs text-slate-400 font-medium block">Rain Risk</span>
              <div className="flex items-center justify-between mt-1">
                <Badge
                  variant={
                    selectedBlock.rainRisk === 'HIGH'
                      ? 'danger'
                      : selectedBlock.rainRisk === 'MODERATE'
                      ? 'warning'
                      : 'success'
                  }
                  size="sm"
                >
                  {selectedBlock.rainRisk}
                </Badge>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">Rain risk evaluated for pan.</p>
            </div>
          </div>
        </div>

        {/* Right Column: AI Insight Summary & Hardware Alerts Feed (1 Column) */}
        <div className="space-y-6">
          {/* AI Snapshot Card */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-teal-600" />
                <h3 className="font-bold text-slate-900 text-sm">AI Prediction ({selectedBlock.name})</h3>
              </div>
              <button
                onClick={() => navigate('/operator/ai-insights')}
                className="text-xs font-bold text-teal-600 hover:underline flex items-center gap-1"
              >
                Full AI Engine <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Stage:</span>
                <span className="font-bold text-slate-900">{aiInsight.crystallizationStage}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Harvest Readiness:</span>
                <span className="font-extrabold text-teal-600">{aiInsight.harvestReadiness}%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Estimated Harvest:</span>
                <span className="font-semibold text-slate-900">{aiInsight.estimatedHarvestWindow}</span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${aiInsight.harvestReadiness}%` }}
                />
              </div>

              <p className="text-xs text-slate-600 bg-teal-50/70 p-3 rounded-xl border border-teal-100">
                {aiInsight.summary}
              </p>
            </div>
          </div>

          {/* Active Field Alerts Feed */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-rose-600" />
                <h3 className="font-bold text-slate-900 text-sm">Active Hardware Alerts</h3>
              </div>
              <button
                onClick={() => navigate('/operator/alerts')}
                className="text-xs font-bold text-slate-500 hover:text-slate-900 hover:underline"
              >
                View all ({activeAlerts.length})
              </button>
            </div>

            <div className="space-y-3">
              {activeAlerts.slice(0, 3).map((alert) => (
                <div
                  key={alert.id}
                  onClick={() => navigate('/operator/alerts')}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100/80 transition-colors cursor-pointer space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">{alert.title}</span>
                    <Badge variant={alert.severity === 'CRITICAL' ? 'danger' : 'warning'} size="sm">
                      {alert.blockName}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-slate-600 line-clamp-2">{alert.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { sensorService, HistoricalDataPoint } from '../../services/sensorService';
import { Zap, Thermometer, Droplets, CloudRain } from 'lucide-react';

interface SensorTrendChartProps {
  blockId: string;
}

export const SensorTrendChart: React.FC<SensorTrendChartProps> = ({ blockId }) => {
  const [timeframe, setTimeframe] = React.useState<'6H' | '24H' | '7D' | '30D'>('24H');
  const [activeMetric, setActiveMetric] = React.useState<'ec' | 'temp' | 'waterLevel'>('ec');

  const data: HistoricalDataPoint[] = React.useMemo(() => {
    return sensorService.getHistoricalData(blockId, timeframe);
  }, [blockId, timeframe]);

  const metricConfig = {
    ec: {
      name: 'Salinity EC',
      unit: 'mS/cm',
      color: '#2563EB',
      gradientId: 'colorEc',
      icon: Zap,
    },
    temp: {
      name: 'Brine Temp',
      unit: '°C',
      color: '#F59E0B',
      gradientId: 'colorTemp',
      icon: Thermometer,
    },
    waterLevel: {
      name: 'Water Level',
      unit: 'cm',
      color: '#0284C7',
      gradientId: 'colorWater',
      icon: Droplets,
    },
  };

  const current = metricConfig[activeMetric];

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-6 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 sm:p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 shrink-0">
            <current.icon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">{current.name} Historical Telemetry</h3>
            <p className="text-[11px] sm:text-xs text-slate-500">
              Sensor readings over time for <span className="font-semibold text-slate-700">Block {blockId}</span>
            </p>
          </div>
        </div>

        {/* Metric Selector & Timeframe Toggles */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Metric Selector Tabs */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
            {(['ec', 'temp', 'waterLevel'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setActiveMetric(m)}
                className={`px-2 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold transition-all ${
                  activeMetric === m
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {m === 'ec' ? 'EC' : m === 'temp' ? 'Temp' : 'Water Level'}
              </button>
            ))}
          </div>

          {/* Timeframe selector */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
            {(['6H', '24H', '7D', '30D'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={`px-2 sm:px-2.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold transition-all ${
                  timeframe === t
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-60 sm:h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorEc" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorWater" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0284C7" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#0284C7" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} domain={['auto', 'auto']} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                borderColor: '#e2e8f0',
                borderRadius: '12px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                fontSize: '12px',
                fontWeight: 600,
              }}
              formatter={(value: any) => [`${value} ${current.unit}`, current.name]}
            />
            <Area
              type="monotone"
              dataKey={activeMetric}
              stroke={current.color}
              strokeWidth={3}
              fillOpacity={1}
              fill={`url(#${current.gradientId})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Footer Analysis Callout */}
      <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-100 flex items-center justify-between text-xs">
        <span className="text-slate-600">
          <strong className="text-slate-900 font-semibold">Telemetry Insight:</strong> Steady evaporation curve detected. Brine density gains correlated with solar radiation index.
        </span>
        <span className="font-semibold text-blue-600 shrink-0">Optimal Growth Trend</span>
      </div>
    </div>
  );
};

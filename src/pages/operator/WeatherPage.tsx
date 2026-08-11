import React from 'react';
import { weatherService } from '../../services/weatherService';
import { Badge } from '../../components/ui/Badge';
import { CloudRain, Sun, Wind, Thermometer, Droplets, AlertCircle, ShieldAlert } from 'lucide-react';

export const WeatherPage: React.FC = () => {
  const weather = weatherService.getWeatherData();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white shadow-md shadow-teal-500/25">
            <CloudRain className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span className="text-gradient-green-blue text-effect-glow">Salt Production Weather Risk</span>
            </h1>
            <p className="text-xs text-slate-500">
              Solar gain, evaporation rate, rain probability & brine dilution risk model
            </p>
          </div>
        </div>

        <Badge variant={weather.riskLevel === 'HIGH' ? 'danger' : 'warning'} size="md">
          {weather.riskLevel} RAIN RISK
        </Badge>
      </div>

      {/* Main Weather Risk Summary Box */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-50/80 via-white to-teal-50/80 border border-amber-200 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-amber-800 font-extrabold text-base">
          <ShieldAlert className="w-5 h-5 text-amber-600" /> Salt Field Weather Risk Evaluation
        </div>
        <p className="text-slate-800 text-sm font-medium leading-relaxed">{weather.riskSummary}</p>
        <div className="pt-2 text-xs font-semibold text-teal-700">
          * Example Action: Rain may dilute concentrated brine in Block A03 (EC 185 mS/cm). Prepare emergency brine pump-over if rain exceeds 5mm.
        </div>
      </div>

      {/* 6 Key Salt-Evaporation Weather Metric Cards */}
      <div className="grid grid-cols-1 min-[380px]:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {/* Card 1: Ambient Temp */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Ambient Air Temp</span>
            <Thermometer className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-black text-slate-900">{weather.temperature}°C</div>
          <p className="text-[11px] text-slate-500 mt-2">Drives thermal evaporation momentum across pans.</p>
        </div>

        {/* Card 2: Humidity */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Relative Humidity</span>
            <Droplets className="w-4 h-4 text-cyan-500" />
          </div>
          <div className="text-3xl font-black text-slate-900">{weather.humidity}%</div>
          <p className="text-[11px] text-slate-500 mt-2">Lower humidity accelerates moisture transition.</p>
        </div>

        {/* Card 3: Rain Probability */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Rain Probability (18h)</span>
            <CloudRain className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-3xl font-black text-rose-600">{weather.rainProbability}%</div>
          <p className="text-[11px] text-slate-500 mt-2">Risk threshold for active crystallization pans.</p>
        </div>

        {/* Card 4: 24h Rainfall */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">24h Accumulated Rain</span>
            <CloudRain className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">{weather.rainfall24h} mm</div>
          <p className="text-[11px] text-slate-500 mt-2">Zero rainfall recorded in last 24 hours.</p>
        </div>

        {/* Card 5: Wind Speed */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Wind Speed</span>
            <Wind className="w-4 h-4 text-cyan-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">{weather.windSpeed} km/h</div>
          <p className="text-[11px] text-slate-500 mt-2">Air movement removes vapor layer over pans.</p>
        </div>

        {/* Card 6: Evaporation Rate */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Evaporation Rate</span>
            <Sun className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-black text-gradient-green-blue">{weather.evaporationRate} mm/day</div>
          <p className="text-[11px] text-slate-500 mt-2">High evaporation momentum supported by solar gain.</p>
        </div>
      </div>

      {/* 24-Hour Forecast Timeline */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900">24-Hour Production Forecast Timeline</h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {weather.forecast24h.map((f, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-1">
              <span className="text-[10px] font-bold text-slate-400 block">{f.time}</span>
              <span className="text-base font-extrabold text-slate-900">{f.temp}°C</span>
              <span className="text-xs font-bold text-teal-600 block">{f.rainProb}% Rain</span>
              <span className="text-[10px] font-semibold text-slate-500 block truncate">{f.condition}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

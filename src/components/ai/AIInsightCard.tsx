import React from 'react';
import { AIInsight } from '../../types';
import { Badge } from '../ui/Badge';
import { StageTracker } from './StageTracker';
import { FactorBreakdown } from './FactorBreakdown';
import { BrainCircuit, Sparkles, Calendar, Droplets, CloudRain, ShieldCheck, Zap } from 'lucide-react';

interface AIInsightCardProps {
  insight: AIInsight;
}

export const AIInsightCard: React.FC<AIInsightCardProps> = ({ insight }) => {
  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-200">
            <BrainCircuit className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-extrabold text-slate-900">AI Salt Field Intelligence</h3>
              <Badge variant="blue" size="sm" icon={<Sparkles className="w-3 h-3" />}>
                Neural Model v2.4
              </Badge>
            </div>
            <p className="text-xs text-slate-500">{insight.lastAnalyzed}</p>
          </div>
        </div>

        {/* AI Confidence Indicator */}
        <div className="flex items-center gap-3 bg-blue-50/80 border border-blue-100 px-4 py-2 rounded-xl">
          <ShieldCheck className="w-5 h-5 text-blue-600" />
          <div>
            <span className="block text-[10px] uppercase tracking-wider font-bold text-slate-400">AI Model Confidence</span>
            <span className="text-base font-extrabold text-blue-600">{insight.confidence}%</span>
          </div>
        </div>
      </div>

      {/* Main AI Summary Box */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50/90 via-slate-50 to-white border border-blue-100 text-sm">
        <div className="flex items-center gap-2 text-blue-700 font-bold mb-1">
          <Sparkles className="w-4 h-4" /> AI Field Synthesis ({insight.blockName})
        </div>
        <p className="text-slate-700 font-medium leading-relaxed">{insight.summary}</p>
      </div>

      {/* 6 Key AI Indicator Cards */}
      <div className="grid grid-cols-1 min-[380px]:grid-cols-2 lg:grid-cols-5 gap-3">
        {/* Card 1: Concentration */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Brine Concentration
          </span>
          <div className="flex items-center justify-between">
            <span className="text-base font-extrabold text-slate-900">{insight.salinityEstimate}</span>
            <Zap className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">Target ~210 mS/cm</span>
        </div>

        {/* Card 2: Crystallization Stage */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Crystallization Stage
          </span>
          <div className="flex items-center justify-between">
            <span className="text-base font-extrabold text-slate-900 truncate">{insight.crystallizationStage}</span>
            <span className="text-xs font-bold text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded">
              S{insight.crystallizationStageNumber}
            </span>
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">Stage {insight.crystallizationStageNumber} of 5</span>
        </div>

        {/* Card 3: Harvest Readiness */}
        <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200">
          <span className="text-[11px] font-semibold text-blue-700 uppercase tracking-wider block mb-1">
            Harvest Readiness
          </span>
          <div className="flex items-center justify-between">
            <span className="text-xl font-black text-blue-600">{insight.harvestReadiness}%</span>
            <Droplets className="w-5 h-5 text-blue-600" />
          </div>
          <span className="text-[10px] text-blue-600 font-medium mt-1 block">NaCl Crust Target</span>
        </div>

        {/* Card 4: Estimated Window */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Harvest Window
          </span>
          <div className="flex items-center justify-between">
            <span className="text-sm font-extrabold text-slate-900">{insight.estimatedHarvestWindow}</span>
            <Calendar className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">Predicted completion</span>
        </div>

        {/* Card 5: Rain Impact */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 col-span-2 lg:col-span-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Rain Risk Impact
          </span>
          <div className="flex items-center justify-between">
            <span
              className={`text-sm font-extrabold ${
                insight.rainRisk === 'HIGH'
                  ? 'text-rose-600'
                  : insight.rainRisk === 'MODERATE'
                  ? 'text-amber-600'
                  : 'text-emerald-600'
              }`}
            >
              {insight.rainRisk}
            </span>
            <CloudRain className="w-4 h-4 text-slate-500" />
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block truncate">{insight.rainImpactDescription}</span>
        </div>
      </div>

      {/* 5-Stage Crystallization Stepper */}
      <div className="pt-2 border-t border-slate-100">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
          NaCl Crystallization Stage Progression
        </h4>
        <StageTracker currentStageNumber={insight.crystallizationStageNumber} />
      </div>

      {/* Why This Prediction Factor Breakdown */}
      <div className="pt-2 border-t border-slate-100">
        <FactorBreakdown factors={insight.factors} />
      </div>
    </div>
  );
};

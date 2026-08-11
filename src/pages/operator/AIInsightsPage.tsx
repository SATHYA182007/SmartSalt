import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { aiService } from '../../services/aiService';
import { AIInsightCard } from '../../components/ai/AIInsightCard';
import { BrainCircuit, Sparkles, Sliders } from 'lucide-react';

export const AIInsightsPage: React.FC = () => {
  const { blocks, selectedBlockId, setSelectedBlockId } = useAppStore();
  const activeBlock = blocks.find((b) => b.id === selectedBlockId) || blocks[2]; // Default Block A03

  const insight = React.useMemo(() => {
    return aiService.getAIInsightForBlock(activeBlock.id);
  }, [activeBlock.id]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white shadow-md shadow-teal-500/25">
            <BrainCircuit className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span className="text-gradient-green-blue text-effect-glow">AI Salt Field Intelligence Engine</span>
            </h1>
            <p className="text-xs text-slate-500">
              Predictive brine concentration, NaCl crystallization stage, and harvest readiness calculation
            </p>
          </div>
        </div>

        {/* Block Selector */}
        <div className="flex items-center gap-3">
          <label className="text-xs font-bold text-slate-500 uppercase">Select Target Block:</label>
          <select
            value={selectedBlockId}
            onChange={(e) => setSelectedBlockId(e.target.value)}
            className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            {blocks.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name} — {b.harvestReadiness}% Readiness ({b.crystallizationStage})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main AI Insight Card Component */}
      <AIInsightCard insight={insight} />

      {/* Technical Decoupling Architecture Banner */}
      <div className="p-5 rounded-2xl bg-slate-100/80 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
        <Sliders className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-900 block font-semibold mb-0.5">Backend & Machine Learning API Ready:</strong>
          The AI engine service layer (<code className="bg-slate-200/80 px-1 py-0.5 rounded text-teal-800 font-mono">src/services/aiService.ts</code>) evaluates deterministic salt field telemetry. It is fully architected to swap out the mock inference logic with live Supabase / Python ML inference API endpoints (<code className="bg-slate-200/80 px-1 py-0.5 rounded font-mono">/api/v1/predict-harvest</code>) without changing UI components.
        </div>
      </div>
    </div>
  );
};

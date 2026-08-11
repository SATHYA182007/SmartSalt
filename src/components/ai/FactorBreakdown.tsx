import React from 'react';
import { AIInsightFactor } from '../../types';
import { PlusCircle, MinusCircle, HelpCircle } from 'lucide-react';

interface FactorBreakdownProps {
  factors: AIInsightFactor[];
}

export const FactorBreakdown: React.FC<FactorBreakdownProps> = ({ factors }) => {
  return (
    <div className="space-y-3">
      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
        <span>Why This Prediction? (Key Sensor Determinants)</span>
        <span className="text-[10px] text-teal-600 font-semibold lowercase">Neural weights validated</span>
      </h4>

      <div className="space-y-2">
        {factors.map((factor, idx) => (
          <div
            key={idx}
            className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3 transition-colors hover:bg-slate-100/60"
          >
            {factor.type === 'positive' && (
              <PlusCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            )}
            {factor.type === 'negative' && (
              <MinusCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            )}
            {factor.type === 'neutral' && (
              <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            )}

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">{factor.label}</span>
                <span
                  className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                    factor.type === 'positive'
                      ? 'bg-emerald-100 text-emerald-800'
                      : factor.type === 'negative'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {factor.type === 'positive' ? '+ Positive Gain' : factor.type === 'negative' ? '- Rain Dilution' : 'Neutral'}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">{factor.impact}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

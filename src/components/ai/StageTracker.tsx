import React from 'react';
import { Check } from 'lucide-react';

interface StageTrackerProps {
  currentStageNumber: number; // 1 to 5
}

export const STAGES = [
  { stage: 1, title: 'Brine Intake', desc: 'Initial seawater filling (EC < 110 mS/cm)' },
  { stage: 2, title: 'Concentration', desc: 'Solar evaporation & heavy brine' },
  { stage: 3, title: 'Pre-crystal', desc: 'Calcium sulfate deposition' },
  { stage: 4, title: 'Crystallization', desc: 'Active NaCl crystal growth' },
  { stage: 5, title: 'Harvest Ready', desc: 'Optimal salt crust density' },
];

export const StageTracker: React.FC<StageTrackerProps> = ({ currentStageNumber }) => {
  return (
    <div className="w-full space-y-4">
      {/* Progress Bar Container */}
      <div className="relative">
        <div className="overflow-hidden h-2.5 mb-4 text-xs flex rounded-full bg-slate-100 border border-slate-200">
          <div
            style={{ width: `${(currentStageNumber / 5) * 100}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600 transition-all duration-500 ease-out"
          />
        </div>

        {/* Stepper Grid - Responsive */}
        <div className="grid grid-cols-5 gap-1 sm:gap-2 text-center">
          {STAGES.map((s) => {
            const isPassed = s.stage < currentStageNumber;
            const isCurrent = s.stage === currentStageNumber;

            return (
              <div key={s.stage} className="flex flex-col items-center min-w-0">
                <div
                  className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isPassed
                      ? 'bg-blue-600 text-white shadow-xs'
                      : isCurrent
                      ? 'bg-blue-600 text-white ring-2 sm:ring-4 ring-blue-100 shadow-md scale-105 sm:scale-110'
                      : 'bg-slate-100 text-slate-400 border border-slate-200'
                  }`}
                >
                  {isPassed ? <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : s.stage}
                </div>
                <span
                  className={`mt-1.5 text-[10px] sm:text-xs font-semibold truncate w-full ${
                    isCurrent ? 'text-blue-600 font-bold' : isPassed ? 'text-slate-900' : 'text-slate-400'
                  }`}
                >
                  {s.title}
                </span>
                <span className="text-[10px] text-slate-400 hidden lg:block max-w-[120px] mt-0.5 leading-tight">
                  {s.desc}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

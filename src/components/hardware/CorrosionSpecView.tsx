import React from 'react';
import { ArrowRight, ShieldCheck, CheckCircle2, Lock, Cpu } from 'lucide-react';

export const CorrosionSpecView: React.FC = () => {
  const steps = [
    { label: 'High Saline Salt Brine', detail: 'Saturated NaCl solution & marine aerosol' },
    { label: 'Corrosion-Resistant Probes', detail: 'Polymer-encapsulated RS485 electrodes' },
    { label: 'Sealed Cable Glands', detail: 'IP68 waterproof strain-relief pass-throughs' },
    { label: 'IP67/IP68 NEMA Enclosure', detail: 'Double O-ring gasket seal with moisture desiccant' },
    { label: 'Protected Electronics', detail: 'ESP32-LoRa SoC & battery isolated from corrosion' },
  ];

  const highlights = [
    'FRP / HDPE non-conductive mounting poles',
    'Polymer sensor probe holder brackets',
    'Sealed double-compression cable glands',
    'Minimal exposed metallic surfaces',
    'Conformal-coated PCB internal circuitry',
    'Titanium / High-grade 316L electrode contacts',
  ];

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50/80 text-teal-800 text-xs font-bold border border-teal-200/80 shadow-xs">
          <ShieldCheck className="w-4 h-4 text-teal-600" /> Corrosion-Resistant Engineering
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Electronics Stay Isolated From The Brine.
        </h2>
        <p className="text-slate-600 text-sm">
          Salt evaporation pans present extreme saline aerosol and immersion challenges. SmartSalt AI isolates all active electronic microcontrollers behind multi-stage physical protective layers.
        </p>
      </div>

      {/* Visual Workflow Line */}
      <div className="py-4">
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 relative">
          {steps.map((step, idx) => (
            <div key={idx} className="relative flex flex-col items-center text-center p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-extrabold text-xs flex items-center justify-center mb-2 shadow-md shadow-cyan-500/20">
                {idx + 1}
              </div>
              <span className="font-bold text-xs text-slate-900 leading-tight mb-1">{step.label}</span>
              <span className="text-[10px] text-slate-500">{step.detail}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Bullet Points */}
      <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {highlights.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50/70 border border-slate-200/60">
            <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
            <span className="text-xs font-semibold text-slate-700">{item}</span>
          </div>
        ))}
      </div>

      {/* Engineering Integrity Disclaimer */}
      <div className="p-4 rounded-2xl bg-slate-100/80 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
        <Lock className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-900">Engineering Standard:</strong> SmartSalt hardware incorporates polymer isolation and IP68 sealed cable glands designed for continuous marine saline pan deployment. Probes require periodic freshwater rinsing during scheduled node maintenance.
        </div>
      </div>
    </div>
  );
};

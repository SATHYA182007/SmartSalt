import React from 'react';
import { Shield, Zap, Radio, Sun, Camera, Thermometer, Droplets, Cpu } from 'lucide-react';

export const HardwareNodeDiagram: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-b from-slate-50 via-white to-blue-50/40 border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs overflow-hidden">
      {/* Background Subtle Tech Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left Interactive SVG Vector Illustration of Hardware Node */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="relative w-full max-w-md aspect-square bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex items-center justify-center">
            <svg viewBox="0 0 500 500" className="w-full h-full drop-shadow-md">
              {/* Sky Background */}
              <rect x="10" y="10" width="480" height="340" rx="16" fill="#EFF6FF" />

              {/* Salt Evaporation Pond Water */}
              <path d="M 10 320 Q 250 300 490 320 L 490 490 L 10 490 Z" fill="#93C5FD" opacity="0.6" />
              <path d="M 10 350 Q 250 335 490 350 L 490 490 L 10 490 Z" fill="#3B82F6" opacity="0.75" />

              {/* Salt Crust Texture along shoreline */}
              <path d="M 10 320 Q 150 315 250 325 T 490 320 L 490 340 Q 250 330 10 340 Z" fill="#FFFFFF" opacity="0.9" />

              {/* FRP Corrosion Resistant Mast Pole */}
              <rect x="235" y="90" width="18" height="310" rx="4" fill="#475569" stroke="#1E293B" strokeWidth="2" />
              <rect x="238" y="90" width="4" height="310" fill="#94A3B8" />

              {/* Solar Panel Assembly */}
              <g transform="translate(170, 45)">
                {/* Mount */}
                <rect x="65" y="30" width="20" height="20" fill="#334155" />
                {/* Panel Plate */}
                <polygon points="10,25 140,25 125,5 25,5" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
                <polygon points="14,23 136,23 122,8 28,8" fill="#1E40AF" />
                {/* Grid lines */}
                <line x1="75" y1="5" x2="75" y2="25" stroke="#60A5FA" strokeWidth="1" />
                <line x1="45" y1="14" x2="105" y2="14" stroke="#60A5FA" strokeWidth="1" />
              </g>

              {/* LoRa Antenna */}
              <g transform="translate(240, 10)">
                <rect x="2" y="0" width="4" height="60" fill="#0F172A" rx="2" />
                <circle cx="4" cy="2" r="3" fill="#2563EB" />
                {/* LoRa signal waves */}
                <circle cx="4" cy="2" r="10" fill="none" stroke="#3B82F6" strokeWidth="1.5" opacity="0.6" strokeDasharray="3 3" />
                <circle cx="4" cy="2" r="18" fill="none" stroke="#2563EB" strokeWidth="1.5" opacity="0.4" strokeDasharray="4 4" />
              </g>

              {/* IP67 Control Enclosure Box */}
              <g transform="translate(200, 140)">
                <rect x="0" y="0" width="88" height="110" rx="10" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="3" />
                <rect x="8" y="8" width="72" height="94" rx="6" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
                {/* Seal Gland status light */}
                <circle cx="74" cy="18" r="4" fill="#16A34A" />
                {/* OLED Display */}
                <rect x="18" y="24" width="52" height="30" rx="4" fill="#0F172A" />
                <text x="24" y="42" fill="#38BDF8" fontSize="10" fontFamily="monospace" fontWeight="bold">
                  185mS
                </text>
                <text x="24" y="50" fill="#4ADE80" fontSize="8" fontFamily="monospace">
                  LoRa: OK
                </text>
                {/* Brand label */}
                <text x="18" y="72" fill="#1E293B" fontSize="9" fontWeight="bold" fontFamily="sans-serif">
                  SMARTSALT
                </text>
                <text x="18" y="82" fill="#64748B" fontSize="7" fontFamily="sans-serif">
                  NODE A03 • IP68
                </text>
              </g>

              {/* Protected Submersible Cables & Glands */}
              <g transform="translate(225, 250)">
                {/* Glands */}
                <rect x="8" y="0" width="8" height="14" fill="#334155" />
                <rect x="22" y="0" width="8" height="14" fill="#334155" />
                {/* Heavy Duty Cables */}
                <path d="M 12 14 C 12 100 60 140 60 210" fill="none" stroke="#0F172A" strokeWidth="4" />
                <path d="M 26 14 C 26 80 -20 120 -20 200" fill="none" stroke="#2563EB" strokeWidth="4" />
              </g>

              {/* Submersible Probes in Brine Water */}
              {/* EC Salinity Conductivity Probe */}
              <g transform="translate(275, 410)">
                <rect x="0" y="0" width="20" height="50" rx="4" fill="#1E293B" />
                <rect x="4" y="38" width="12" height="8" fill="#38BDF8" />
                <circle cx="10" cy="42" r="2" fill="#FFFFFF" />
                <text x="-25" y="-6" fill="#1E293B" fontSize="10" fontWeight="bold">
                  EC / Salinity Probe
                </text>
              </g>

              {/* Temperature & Level Probe */}
              <g transform="translate(195, 400)">
                <rect x="0" y="0" width="16" height="55" rx="3" fill="#2563EB" />
                <circle cx="8" cy="45" r="4" fill="#F59E0B" />
                <text x="-65" y="-6" fill="#1E293B" fontSize="10" fontWeight="bold">
                  Temp & Level Sensor
                </text>
              </g>
            </svg>
          </div>
        </div>

        {/* Right Hardware Specifications Callouts */}
        <div className="w-full lg:w-1/2 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold">
            <Shield className="w-3.5 h-3.5" /> IP67 / IP68 Corrosion Isolated Engineering
          </div>

          <h3 className="text-2xl font-extrabold text-slate-900 leading-tight">
            Industrial Sensor Hardware Node
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Engineered specifically for harsh salt-evaporation pan environments. Sealed IP67/IP68 polymer enclosure
            keeps active electronics safe from corrosive saline aerosols and saltwater submersion.
          </p>

          {/* Specs List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-start gap-3">
              <Sun className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-xs text-slate-900 block">Monocrystalline Solar</span>
                <span className="text-[11px] text-slate-500">Autonomous solar charging + LiFePO4 battery</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-start gap-3">
              <Radio className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-xs text-slate-900 block">LoRa Long Range Mesh</span>
                <span className="text-[11px] text-slate-500">Up to 15km telemetry backhaul to Gateway</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-xs text-slate-900 block">RS485 EC Probe</span>
                <span className="text-[11px] text-slate-500">Submersible conductivity sensor (0–250 mS/cm)</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-start gap-3">
              <Camera className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-xs text-slate-900 block">Crystal Vision Camera</span>
                <span className="text-[11px] text-slate-500">Optical camera for crystal coverage AI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

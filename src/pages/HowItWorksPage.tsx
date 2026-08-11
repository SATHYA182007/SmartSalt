import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LandingNavbar } from '../components/layout/LandingNavbar';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ArrowRight, Cpu, Radio, Router as RouterIcon, Cloud, BrainCircuit, LayoutDashboard, ShieldCheck } from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      <LandingNavbar />

      <section className="py-16 bg-slate-50/70 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <Badge variant="blue" size="md">System Architecture</Badge>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
              <span className="text-gradient-green-blue text-effect-glow">From Salt Pan Probes To AI Prediction</span>
            </h1>
            <p className="text-slate-600 text-base">
              SmartSalt AI uses an end-to-end industrial IoT architecture designed for high-saline salt field environments.
            </p>
          </div>

          {/* Architecture Pipeline */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="p-3 rounded-xl bg-teal-50 text-teal-600 w-fit border border-teal-100">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg">1. ESP32 Sensor Node</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Polymer-isolated submersible RS485 probes measure EC conductivity, brine temperature, and hydrostatic water levels every 10 seconds.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="p-3 rounded-xl bg-teal-50 text-teal-600 w-fit border border-teal-100">
                <Radio className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg">2. 868MHz LoRa Mesh</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Low-power long-range packets travel up to 15km through dense saline fog to field LoRaWAN gateways.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="p-3 rounded-xl bg-teal-50 text-teal-600 w-fit border border-teal-100">
                <RouterIcon className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg">3. Gateway Backhaul</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Field gateway hubs transmit telemetry packets over 4G Cellular / Satellite backhaul to cloud servers.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="p-3 rounded-xl bg-teal-50 text-teal-600 w-fit border border-teal-100">
                <Cloud className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg">4. Supabase & Cloud Storage</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Real-time MQTT ingestion feeds normalized sensor readings directly into Supabase database stores.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 w-fit border border-emerald-100">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg">5. AI Prediction Model</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Neural models process thermal physics and evaporation momentum to calculate harvest readiness and rain dilution risks.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white w-fit shadow-md shadow-teal-500/25">
                <LayoutDashboard className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg">6. Operator Control Center</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Field operators receive real-time block alerts and harvest predictions to make optimal salt production decisions.
              </p>
            </div>
          </div>

          <div className="text-center pt-6">
            <Button onClick={() => navigate('/auth')} variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Launch Demo Dashboard
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

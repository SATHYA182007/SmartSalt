import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LandingNavbar } from '../components/layout/LandingNavbar';
import { HardwareNodeDiagram } from '../components/hardware/HardwareNodeDiagram';
import { CorrosionSpecView } from '../components/hardware/CorrosionSpecView';
import { BrandSplashLoader } from '../components/common/BrandSplashLoader';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import {
  ArrowRight,
  Shield,
  Zap,
  Radio,
  BrainCircuit,
  CloudRain,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Eye,
  Thermometer,
  Droplets,
  Layers,
  Sparkles,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-500 selection:text-white">
      {/* Brand Initial Entry Splash Loader */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <BrandSplashLoader
            key="brand-splash"
            onComplete={() => setIsLoading(false)}
            duration={2000}
          />
        )}
      </AnimatePresence>

      {/* Public Navbar */}
      <LandingNavbar />

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-28 bg-gradient-to-b from-teal-50/50 via-white to-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Top Hero Text */}
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-teal-50 via-cyan-50 to-emerald-50 border border-teal-200/80 text-teal-800 text-xs font-extrabold uppercase tracking-wider shadow-xs"
            >
              <Sparkles className="w-4 h-4 text-cyan-600 animate-pulse" /> Intelligent Monitoring for Smarter Salt Production
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]"
            >
              Turn Every Salt Block Into An <span className="animate-text-gradient">Intelligent Production Zone.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-600 font-medium max-w-3xl mx-auto leading-relaxed"
            >
              SmartSalt AI combines real-time IoT sensing, LoRa connectivity and AI-powered analysis to monitor brine conditions, crystallization and harvest readiness.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-4 pt-2"
            >
              <Button
                onClick={() => navigate('/auth')}
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                Explore Smart Monitoring
              </Button>
              <Button
                onClick={() => navigate('/how-it-works')}
                variant="outline"
                size="lg"
              >
                View How It Works
              </Button>
            </motion.div>
          </div>

          {/* Borderless Live Field Telemetry Text Ticker */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="w-full py-3 border-y border-slate-200/80 overflow-hidden relative bg-slate-50/40"
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 animate-text-gradient font-black text-xs uppercase tracking-wider shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Telemetry
              </div>

              {/* Scrolling Text Content */}
              <div className="overflow-hidden whitespace-nowrap w-full flex items-center">
                <motion.div
                  animate={{ x: ['0%', '-50%'] }}
                  transition={{ repeat: Infinity, ease: 'linear', duration: 28 }}
                  className="inline-flex items-center gap-8 text-xs font-semibold text-slate-600 font-mono tracking-tight"
                >
                  <span><strong className="text-slate-900">PAN A-01:</strong> 185 mS/cm EC • OPTIMAL SALINITY</span>
                  <span className="text-slate-300">•</span>
                  <span><strong className="text-slate-900">PAN A-02:</strong> 94.2% NaCl CRUST PURITY</span>
                  <span className="text-slate-300">•</span>
                  <span><strong className="text-slate-900">LORA MESH:</strong> 14 NODES ONLINE (100% HEALTHY)</span>
                  <span className="text-slate-300">•</span>
                  <span><strong className="text-slate-900">HARVEST WINDOW:</strong> 3.5 DAYS TO PEAK CRUST</span>
                  <span className="text-slate-300">•</span>
                  <span><strong className="text-slate-900">WEATHER SENSORS:</strong> 34.2°C AMBIENT • 0% DILUTION RISK</span>
                  <span className="text-slate-300">•</span>
                  {/* Duplicate set for seamless continuous looping */}
                  <span><strong className="text-slate-900">PAN A-01:</strong> 185 mS/cm EC • OPTIMAL SALINITY</span>
                  <span className="text-slate-300">•</span>
                  <span><strong className="text-slate-900">PAN A-02:</strong> 94.2% NaCl CRUST PURITY</span>
                  <span className="text-slate-300">•</span>
                  <span><strong className="text-slate-900">LORA MESH:</strong> 14 NODES ONLINE (100% HEALTHY)</span>
                  <span className="text-slate-300">•</span>
                  <span><strong className="text-slate-900">HARVEST WINDOW:</strong> 3.5 DAYS TO PEAK CRUST</span>
                  <span className="text-slate-300">•</span>
                  <span><strong className="text-slate-900">WEATHER SENSORS:</strong> 34.2°C AMBIENT • 0% DILUTION RISK</span>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Hero Performance Metrics Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            id="platform"
            className="pt-4"
          >
            {/* Pure Typographic Performance Statistics Bar */}
            <div className="pt-6 border-t border-slate-200/70">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-slate-200/80">
                <div className="space-y-1">
                  <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight block">
                    99.8<span className="animate-text-gradient">%</span>
                  </span>
                  <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">Salinity Precision</span>
                  <span className="text-[11px] text-slate-500 block">Continuous EC compensation</span>
                </div>

                <div className="space-y-1 pl-4">
                  <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight block">
                    15 <span className="animate-text-gradient">km</span>
                  </span>
                  <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">LoRa Field Mesh</span>
                  <span className="text-[11px] text-slate-500 block">Pan-to-gateway backhaul</span>
                </div>

                <div className="space-y-1 pl-4">
                  <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight block">
                    &lt; 45<span className="animate-text-gradient">s</span>
                  </span>
                  <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">Alert Latency</span>
                  <span className="text-[11px] text-slate-500 block">Instant sluice gate triggers</span>
                </div>

                <div className="space-y-1 pl-4">
                  <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight block">
                    +24.5<span className="animate-text-gradient">%</span>
                  </span>
                  <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">Yield Boost</span>
                  <span className="text-[11px] text-slate-500 block">AI harvest window timing</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 1 — THE PROBLEM */}
      <section className="py-20 bg-slate-50/70 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <Badge variant="neutral" size="md">Traditional Challenges</Badge>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Salt Fields Are Dynamic Systems.
            </h2>
            <p className="text-slate-600 text-sm">
              Manual hydrometer sampling and unpredictable weather risk create harvest losses.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Changing Brine Concentration</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Salinity fluctuates rapidly during solar evaporation peaks. Manual sampling misses critical saturation windows.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                <CloudRain className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Unpredictable Rainfall</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Sudden rainfall dilutes concentrated brine pans, resetting weeks of solar gain unless sluice gates close immediately.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Manual Field Inspection</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Walking dozens of vast salt pans under scorching sun leads to delayed data and missed crystallization stages.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Difficult Crystallization Timing</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Premature or late harvesting decreases sodium chloride purity and reduces overall field yield per hectare.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — HOW SMARTSALT WORKS */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <Badge variant="blue" size="md">End-To-End Architecture</Badge>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">How SmartSalt Works</h2>
            <p className="text-slate-600 text-sm">
              Continuous hardware sensing to AI decision engine in 5 seamless steps
            </p>
          </div>

          {/* 5-Step Visual Pipeline */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {[
              { num: 1, name: 'SENSE', desc: 'RS485 Probes & Sensors in Brine' },
              { num: 2, name: 'TRANSMIT', desc: 'ESP32 LoRa Node to Gateway' },
              { num: 3, name: 'ANALYZE', desc: 'Cloud Telemetry Engine & MQTT' },
              { num: 4, name: 'PREDICT', desc: 'AI Salinity & Harvest Model' },
              { num: 5, name: 'ACT', desc: 'Operator Dashboard & Sluice Action' },
            ].map((s) => (
              <div key={s.num} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
                <span className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-extrabold text-sm flex items-center justify-center mx-auto shadow-md shadow-cyan-500/20">
                  {s.num}
                </span>
                <h4 className="font-extrabold text-slate-900 text-sm">{s.name}</h4>
                <p className="text-xs text-slate-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEDICATED HARDWARE ARCHITECTURE DEEP DIVE */}
      <section id="hardware-architecture" className="py-20 bg-slate-50/70 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <Badge variant="blue" size="md">Hardware Architecture</Badge>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Industrial Sensor Node Engineering
            </h2>
            <p className="text-slate-600 text-sm">
              Purpose-built telemetry nodes for high-saline salt evaporation pans
            </p>
          </div>

          <HardwareNodeDiagram />
        </div>
      </section>

      {/* SECTION 3 — HARDWARE CARDS */}
      <section id="hardware" className="py-20 bg-slate-50/70 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <Badge variant="neutral" size="md">Sensor Hardware Ecosystem</Badge>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Industrial Probe Node Modules
            </h2>
            <p className="text-slate-600 text-sm">
              Purpose-built telemetry nodes for high-saline salt evaporation pans
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <Zap className="w-8 h-8 text-teal-600" />
              <h3 className="font-bold text-slate-900 text-base">EC / Salinity Probe</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Measures electrical conductivity (0–250 mS/cm) directly in saturated salt brine to track sodium chloride saturation.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <Thermometer className="w-8 h-8 text-amber-500" />
              <h3 className="font-bold text-slate-900 text-base">Submersible Temp Probe</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Monitors liquid brine temperature to calculate thermal evaporation rate and solar gain indices.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <Droplets className="w-8 h-8 text-cyan-500" />
              <h3 className="font-bold text-slate-900 text-base">Water-Level Probe</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Hydrostatic pressure sensor tracks millimeter-level pan water loss via solar evaporation.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <CloudRain className="w-8 h-8 text-teal-500" />
              <h3 className="font-bold text-slate-900 text-base">Weather Sensor Suite</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Integrated humidity, ambient temperature, and solar radiation sensors evaluate rain risk.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <Eye className="w-8 h-8 text-emerald-600" />
              <h3 className="font-bold text-slate-900 text-base">Crystal Vision Camera</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Optical camera captures high-resolution imagery of salt crust formation for computer vision analysis.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <Radio className="w-8 h-8 text-cyan-600" />
              <h3 className="font-bold text-slate-900 text-base">LoRa Mesh Node</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ultra-low power 868MHz transmitter sends telemetry up to 15km backhaul to Gateway.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — AI INTELLIGENCE */}
      <section id="ai-intelligence" className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <Badge variant="blue" size="md">Neural Engine</Badge>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">AI Salt Field Intelligence</h2>
            <p className="text-slate-600 text-sm">
              Machine learning models trained on brine density, thermal physics, and weather risk
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <BrainCircuit className="w-8 h-8 text-teal-600" />
              <h3 className="font-extrabold text-slate-900 text-base">Salinity Estimation</h3>
              <p className="text-xs text-slate-600">Calculates precise sodium chloride saturation levels from temperature-compensated EC.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <Layers className="w-8 h-8 text-cyan-600" />
              <h3 className="font-extrabold text-slate-900 text-base">5-Stage Crystallization Detection</h3>
              <p className="text-xs text-slate-600">Tracks progression from raw seawater brine to harvest-ready NaCl salt crust density.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <Sparkles className="w-8 h-8 text-emerald-600" />
              <h3 className="font-extrabold text-slate-900 text-base">Harvest Readiness Prediction</h3>
              <p className="text-xs text-slate-600">Predicts optimal harvest window (e.g. 3–4 Days) with 91%+ confidence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — LIVE FIELD PREVIEW */}
      <section className="py-20 bg-slate-50/70 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <Badge variant="neutral" size="md">Live Dashboard Preview</Badge>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Real-Time Field Block Status</h2>
            <p className="text-slate-600 text-sm">Instant visual status across active salt evaporation pans</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { id: 'A01', name: 'Block A01', status: 'NORMAL', ec: 142, readiness: 45 },
              { id: 'A02', name: 'Block A02', status: 'MONITORING', ec: 162, readiness: 68 },
              { id: 'A03', name: 'Block A03', status: 'ACTION_REQUIRED', ec: 185, readiness: 87 },
              { id: 'A04', name: 'Block A04', status: 'NORMAL', ec: 110, readiness: 22 },
            ].map((b) => (
              <div key={b.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 text-base">{b.id}</span>
                  <Badge
                    variant={
                      b.status === 'ACTION_REQUIRED' ? 'danger' : b.status === 'MONITORING' ? 'warning' : 'success'
                    }
                    size="sm"
                  >
                    {b.status}
                  </Badge>
                </div>
                <div className="text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">EC Level:</span>
                    <span className="font-bold text-teal-600">{b.ec} mS/cm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Harvest Readiness:</span>
                    <span className="font-bold text-slate-900">{b.readiness}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — CORROSION-RESISTANT DESIGN */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CorrosionSpecView />
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 bg-gradient-to-br from-teal-700 via-cyan-800 to-slate-900 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-400/20 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">Make Every Salt Block Measurable.</h2>
          <p className="text-teal-100 text-base max-w-xl mx-auto">
            Connect hardware sensors, monitor crystallization, and optimize salt production harvest windows today.
          </p>
          <div className="pt-2">
            <Button
              onClick={() => navigate('/auth')}
              variant="secondary"
              size="lg"
              className="bg-white text-teal-900 hover:bg-teal-50 shadow-xl border-none"
              rightIcon={<ArrowRight className="w-5 h-5 text-teal-600" />}
            >
              Enter SmartSalt AI
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { StageTracker } from '../../components/ai/StageTracker';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Eye, Camera, ShieldCheck, Sparkles, RefreshCw, ZoomIn, Layers } from 'lucide-react';

export const CrystallizationPage: React.FC = () => {
  const { blocks, selectedBlockId, setSelectedBlockId } = useAppStore();
  const activeBlock = blocks.find((b) => b.id === selectedBlockId) || blocks[2]; // Default A03

  const [isAnalyzing, setIsAnalyzing] = React.useState(false);

  const handleReanalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white shadow-md shadow-teal-500/25">
            <Eye className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span className="text-gradient-green-blue text-effect-glow">Camera & Crystal Formation AI</span>
            </h1>
            <p className="text-xs text-slate-500">
              Optical vision monitoring of NaCl crystal coverage, crust density, and saturation state
            </p>
          </div>
        </div>

        {/* Block selector & re-analyze button */}
        <div className="flex items-center gap-3">
          <select
            value={selectedBlockId}
            onChange={(e) => setSelectedBlockId(e.target.value)}
            className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            {blocks.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name} ({b.crystallizationStage})
              </option>
            ))}
          </select>
          <Button
            onClick={handleReanalyze}
            isLoading={isAnalyzing}
            variant="secondary"
            leftIcon={<RefreshCw className="w-4 h-4 text-teal-600" />}
          >
            Re-Analyze Image
          </Button>
        </div>
      </div>

      {/* Grid: Left Simulated Camera Feed with AI Bounding Overlay, Right Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Camera Feed Simulator (2 Columns) */}
        <div className="lg:col-span-2 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-teal-600" />
              <span className="font-bold text-slate-900 text-sm">
                Optical Vision Submersible Camera Feed ({activeBlock.name})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="success" size="sm">
                ● Live Camera Active
              </Badge>
              <span className="text-[11px] text-slate-400 font-mono">1080p Optical Feed</span>
            </div>
          </div>

          {/* Simulated Camera Viewfinder with AI Polygon Overlay */}
          <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-slate-300 bg-slate-900 shadow-inner group">
            {/* Background Simulated High Res Salt Evaporation Pond Crystal Image */}
            <img
              src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1200&auto=format&fit=crop&q=80"
              alt="Salt Evaporation Pan Crystal Formation"
              className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
            />

            {/* AI Grid Scan Overlay Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0d9488_1px,transparent_1px),linear-gradient(to_bottom,#0d9488_1px,transparent_1px)] bg-[size:40px_40px] opacity-25 pointer-events-none" />

            {/* AI Optical Detection Bounding Boxes */}
            <div className="absolute top-1/4 left-1/4 w-1/3 h-1/2 border-2 border-dashed border-emerald-400 bg-emerald-500/10 rounded-lg p-2 flex flex-col justify-between pointer-events-none">
              <span className="bg-emerald-600 text-white text-[10px] font-mono font-bold px-1.5 py-0.5 rounded w-fit">
                Dense NaCl Crust (78%)
              </span>
              <span className="text-[10px] text-emerald-300 font-mono text-right">Confidence: 91%</span>
            </div>

            <div className="absolute bottom-6 right-8 w-1/4 h-1/3 border-2 border-dashed border-teal-400 bg-teal-500/10 rounded-lg p-2 pointer-events-none">
              <span className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white text-[10px] font-mono font-bold px-1.5 py-0.5 rounded">
                Active Saturated Brine
              </span>
            </div>

            {/* Top Right Live Telemetry Stamp */}
            <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-[11px] font-mono text-slate-200 space-y-0.5">
              <div>CAM_ID: CAM-{activeBlock.id}-01</div>
              <div>BRINE_EC: {activeBlock.currentEc} mS/cm</div>
              <div>STAGE: {activeBlock.crystallizationStage}</div>
            </div>
          </div>

          {/* Camera Controls */}
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Snapshot taken: 15s ago via IP68 optical housing</span>
            <div className="flex items-center gap-2">
              <button className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold flex items-center gap-1">
                <ZoomIn className="w-3.5 h-3.5" /> High Res Zoom
              </button>
              <button className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold flex items-center gap-1">
                <Layers className="w-3.5 h-3.5" /> Toggle AI Overlay
              </button>
            </div>
          </div>
        </div>

        {/* Right: Crystallization Metrics & 5-Stage Stepper (1 Column) */}
        <div className="space-y-6">
          {/* Key Vision Metrics */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <h3 className="font-bold text-slate-900 text-sm">Visual AI Analysis</h3>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-600">Crystal Coverage</span>
                <span className="text-lg font-black text-teal-600">78%</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-600">AI Model Confidence</span>
                <span className="text-base font-extrabold text-emerald-600">91%</span>
              </div>

              <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-between">
                <span className="text-xs font-bold text-teal-800">Harvest Readiness Score</span>
                <span className="text-xl font-black text-gradient-green-blue">{activeBlock.harvestReadiness}%</span>
              </div>
            </div>
          </div>

          {/* 5 AI Crystallization Stages Card */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">5-Stage NaCl Progression</h3>
            <StageTracker currentStageNumber={4} />
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { SaltBlock } from '../../types';
import { Badge } from '../ui/Badge';
import { LeafletSaltMap } from './LeafletSaltMap';
import { Map, Grid3X3, Zap, Droplets, Thermometer } from 'lucide-react';

interface SaltFieldMapProps {
  blocks: SaltBlock[];
  selectedBlockId: string;
  onSelectBlock: (id: string) => void;
}

export const SaltFieldMap: React.FC<SaltFieldMapProps> = ({ blocks, selectedBlockId, onSelectBlock }) => {
  const [viewMode, setViewMode] = React.useState<'map' | 'grid'>('map');
  const selectedBlock = blocks.find((b) => b.id === selectedBlockId) || blocks[2];

  const getStatusColor = (status: SaltBlock['status'], isSelected: boolean) => {
    if (isSelected) return 'border-teal-500 bg-teal-50/90 shadow-md shadow-teal-100 ring-2 ring-teal-500';
    if (status === 'ACTION_REQUIRED') return 'border-rose-300 bg-rose-50/60 hover:bg-rose-50';
    if (status === 'MONITORING') return 'border-amber-300 bg-amber-50/60 hover:bg-amber-50';
    return 'border-emerald-200 bg-emerald-50/40 hover:bg-emerald-50';
  };

  const getBadgeVariant = (status: SaltBlock['status']) => {
    if (status === 'ACTION_REQUIRED') return 'danger';
    if (status === 'MONITORING') return 'warning';
    return 'success';
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-6 shadow-xs flex flex-col gap-5">
      {/* Map Header with View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              <span className="text-gradient-green-blue">Interactive Salt Evaporation Pan Map</span>
            </h2>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
              12 Active Pans
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time OpenStreetMap & Esri satellite telemetry, LoRa node status & spatial block monitoring
          </p>
        </div>

        {/* View Switcher Tabs & Legend */}
        <div className="flex flex-wrap items-center gap-3">
          {/* View Mode Toggle Buttons */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('map')}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all ${
                viewMode === 'map'
                  ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Map className="w-4 h-4" /> Live Satellite Map
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all ${
                viewMode === 'grid'
                  ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Grid3X3 className="w-4 h-4" /> Spatial Pan Grid
            </button>
          </div>

          {/* Status Legend */}
          <div className="hidden md:flex items-center gap-3 text-xs font-medium border-l border-slate-200 pl-3">
            <span className="flex items-center gap-1 text-slate-700">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Normal
            </span>
            <span className="flex items-center gap-1 text-slate-700">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Monitoring
            </span>
            <span className="flex items-center gap-1 text-slate-700">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Action Required
            </span>
          </div>
        </div>
      </div>

      {/* Main View Body */}
      {viewMode === 'map' ? (
        <LeafletSaltMap
          blocks={blocks}
          selectedBlockId={selectedBlockId}
          onSelectBlock={onSelectBlock}
        />
      ) : (
        <div className="grid grid-cols-1 min-[450px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {blocks.map((block) => {
            const isSelected = block.id === selectedBlockId;
            return (
              <motion.div
                key={block.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectBlock(block.id)}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer relative overflow-hidden ${getStatusColor(
                  block.status,
                  isSelected
                )}`}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-teal-500 animate-ping" />
                )}

                <div className="flex items-center justify-between mb-2">
                  <span className="font-extrabold text-slate-900 text-base">{block.id}</span>
                  <Badge variant={getBadgeVariant(block.status)} size="sm">
                    {block.status === 'ACTION_REQUIRED' ? 'Alert' : block.status}
                  </Badge>
                </div>

                <div className="text-[11px] font-semibold text-slate-500 truncate mb-3">{block.zone}</div>

                <div className="space-y-1.5 text-xs border-t border-slate-200/50 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 flex items-center gap-1">
                      <Zap className="w-3 h-3 text-teal-600" /> Salinity EC
                    </span>
                    <span className="font-bold text-slate-900">{block.currentEc} mS/cm</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 flex items-center gap-1">
                      <Thermometer className="w-3 h-3 text-amber-500" /> Temp
                    </span>
                    <span className="font-semibold text-slate-700">{block.temp}°C</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 flex items-center gap-1">
                      <Droplets className="w-3 h-3 text-cyan-600" /> Harvest
                    </span>
                    <span className="font-bold text-teal-600">{block.harvestReadiness}%</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Selected Block Quick Drawer Footer */}
      {selectedBlock && (
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold flex items-center justify-center text-sm shadow-sm shrink-0">
              {selectedBlock.id}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-slate-900 text-sm">{selectedBlock.name}</h4>
                <Badge variant={getBadgeVariant(selectedBlock.status)} size="sm">
                  {selectedBlock.crystallizationStage}
                </Badge>
              </div>
              <p className="text-xs text-slate-500">
                Target EC: {selectedBlock.targetEc} mS/cm • Harvest Readiness: {selectedBlock.harvestReadiness}% • 4 LoRa Nodes Active
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end md:self-auto shrink-0">
            <div className="text-right text-xs">
              <span className="block text-slate-400">Current Brine Density</span>
              <span className="font-extrabold text-teal-600 text-base">{selectedBlock.currentEc} mS/cm</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

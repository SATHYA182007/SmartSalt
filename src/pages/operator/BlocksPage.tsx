import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import { SaltFieldMap } from '../../components/maps/SaltFieldMap';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Search, Filter, Activity, ArrowRight, BrainCircuit } from 'lucide-react';

export const BlocksPage: React.FC = () => {
  const navigate = useNavigate();
  const { blocks, selectedBlockId, setSelectedBlockId } = useAppStore();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<'ALL' | 'NORMAL' | 'MONITORING' | 'ACTION_REQUIRED'>('ALL');

  const filteredBlocks = blocks.filter((b) => {
    const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) || b.zone.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Salt Evaporation Blocks</h1>
          <p className="text-xs text-slate-500">
            Spatial monitoring & block selection across North, Central and South production zones
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search block or zone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 w-48 sm:w-64"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">All Statuses</option>
            <option value="NORMAL">Normal</option>
            <option value="MONITORING">Monitoring</option>
            <option value="ACTION_REQUIRED">Action Required</option>
          </select>
        </div>
      </div>

      {/* Spatial Field Grid Map */}
      <SaltFieldMap
        blocks={blocks}
        selectedBlockId={selectedBlockId}
        onSelectBlock={(id) => setSelectedBlockId(id)}
      />

      {/* Block List Cards */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900">All Blocks Detailed Telemetry Cards ({filteredBlocks.length})</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBlocks.map((block) => {
            const isSelected = block.id === selectedBlockId;
            return (
              <div
                key={block.id}
                onClick={() => setSelectedBlockId(block.id)}
                className={`bg-white border rounded-2xl p-5 shadow-xs transition-all hover:shadow-md cursor-pointer ${
                  isSelected ? 'border-blue-600 ring-2 ring-blue-500/20' : 'border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-xl bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center">
                      {block.id}
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{block.name}</h4>
                      <p className="text-[11px] text-slate-500">{block.zone}</p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      block.status === 'ACTION_REQUIRED'
                        ? 'danger'
                        : block.status === 'MONITORING'
                        ? 'warning'
                        : 'success'
                    }
                    size="sm"
                  >
                    {block.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 my-3 text-center">
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">EC Level</span>
                    <span className="text-sm font-extrabold text-blue-600">{block.currentEc} mS/cm</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">Brine Temp</span>
                    <span className="text-sm font-bold text-slate-800">{block.temp}°C</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">Harvest Ready</span>
                    <span className="text-sm font-extrabold text-blue-600">{block.harvestReadiness}%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-medium">
                    Stage: <strong className="text-slate-900">{block.crystallizationStage}</strong>
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedBlockId(block.id);
                        navigate('/operator/monitoring');
                      }}
                      variant="ghost"
                      size="sm"
                      leftIcon={<Activity className="w-3.5 h-3.5 text-blue-600" />}
                    >
                      Monitor
                    </Button>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedBlockId(block.id);
                        navigate('/operator/ai-insights');
                      }}
                      variant="secondary"
                      size="sm"
                      leftIcon={<BrainCircuit className="w-3.5 h-3.5 text-blue-600" />}
                    >
                      AI
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import { SaltFieldMap } from '../../components/maps/SaltFieldMap';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { SaltBlock } from '../../types';
import { Search, Plus, Edit2, Trash2, Activity, BrainCircuit } from 'lucide-react';

export const BlocksPage: React.FC = () => {
  const navigate = useNavigate();
  const { blocks, selectedBlockId, setSelectedBlockId, addBlock, updateBlock, deleteBlock } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'NORMAL' | 'MONITORING' | 'ACTION_REQUIRED'>('ALL');

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingBlock, setEditingBlock] = useState<SaltBlock | null>(null);
  const [deletingBlockId, setDeletingBlockId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    zone: 'Concentration Zone 1',
    areaHectares: 2.5,
    targetEc: 210,
    currentEc: 150,
    temp: 32.0,
    waterLevel: 8.0,
    humidity: 60,
    rainRisk: 'LOW' as 'LOW' | 'MODERATE' | 'HIGH',
    harvestReadiness: 50,
    crystallizationStage: 'Concentration' as const,
    lat: 36.655,
    lng: -6.292,
  });

  const filteredBlocks = blocks.filter((b) => {
    const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) || b.zone.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenAddModal = () => {
    const nextId = `PAN-D0${blocks.length + 1}`;
    setFormData({
      id: nextId,
      name: `Evaporation Pan D-0${blocks.length + 1}`,
      zone: 'East Production Zone 4',
      areaHectares: 2.8,
      targetEc: 210,
      currentEc: 145,
      temp: 32.5,
      waterLevel: 8.5,
      humidity: 58,
      rainRisk: 'LOW',
      harvestReadiness: 48,
      crystallizationStage: 'Concentration',
      lat: 36.657,
      lng: -6.288,
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (block: SaltBlock) => {
    setEditingBlock(block);
    setFormData({
      id: block.id,
      name: block.name,
      zone: block.zone,
      areaHectares: block.areaHectares,
      targetEc: block.targetEc,
      currentEc: block.currentEc,
      temp: block.temp,
      waterLevel: block.waterLevel,
      humidity: block.humidity,
      rainRisk: block.rainRisk as 'LOW' | 'MODERATE' | 'HIGH',
      harvestReadiness: block.harvestReadiness,
      crystallizationStage: block.crystallizationStage as any,
      lat: block.lat,
      lng: block.lng,
    });
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newBlock: SaltBlock = {
      ...formData,
      status: 'NORMAL',
      ecTrend: 'RISING',
      tempTrend: 'STABLE',
      waterLevelTrend: 'FALLING',
      nodeCount: 4,
      lastUpdated: 'Just now',
    };
    await addBlock(newBlock);
    setIsAddModalOpen(false);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlock) return;
    const updatedBlock: SaltBlock = {
      ...editingBlock,
      ...formData,
      lastUpdated: 'Just now',
    };
    await updateBlock(updatedBlock);
    setEditingBlock(null);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingBlockId) return;
    await deleteBlock(deletingBlockId);
    setDeletingBlockId(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span className="text-gradient-green-blue text-effect-glow">Salt Evaporation Blocks</span>
          </h1>
          <p className="text-xs text-slate-500">
            Spatial monitoring & block selection across North, Central and South production zones
          </p>
        </div>

        {/* Search, Filter & Add Button */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search block or zone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-teal-500 w-44 sm:w-56"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
          >
            <option value="ALL">All Statuses</option>
            <option value="NORMAL">Normal</option>
            <option value="MONITORING">Monitoring</option>
            <option value="ACTION_REQUIRED">Action Required</option>
          </select>

          <Button onClick={handleOpenAddModal} variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
            Add Block
          </Button>
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
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">All Salt Pans & Telemetry Cards ({filteredBlocks.length})</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBlocks.map((block) => {
            const isSelected = block.id === selectedBlockId;
            return (
              <div
                key={block.id}
                onClick={() => setSelectedBlockId(block.id)}
                className={`bg-white border rounded-2xl p-5 shadow-xs transition-all hover:shadow-md cursor-pointer relative group ${
                  isSelected ? 'border-teal-500 ring-2 ring-teal-500/20' : 'border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white font-extrabold text-xs flex items-center justify-center shadow-xs">
                      {block.id}
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{block.name}</h4>
                      <p className="text-[11px] text-slate-500">{block.zone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1.5">
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
                </div>

                <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 my-3 text-center">
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">EC Level</span>
                    <span className="text-sm font-extrabold text-teal-600">{block.currentEc} mS/cm</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">Brine Temp</span>
                    <span className="text-sm font-bold text-slate-800">{block.temp}°C</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">Harvest Ready</span>
                    <span className="text-sm font-extrabold text-gradient-green-blue">{block.harvestReadiness}%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-slate-500 font-medium">
                    Stage: <strong className="text-slate-900">{block.crystallizationStage}</strong>
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenEditModal(block);
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-teal-600 hover:bg-teal-50 transition-colors"
                      title="Edit Block"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeletingBlockId(block.id);
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Delete Block"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedBlockId(block.id);
                        navigate('/operator/monitoring');
                      }}
                      variant="ghost"
                      size="sm"
                      leftIcon={<Activity className="w-3.5 h-3.5 text-teal-600" />}
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
                      leftIcon={<BrainCircuit className="w-3.5 h-3.5 text-teal-600" />}
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

      {/* ADD BLOCK MODAL */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Create New Salt Evaporation Pan">
        <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-slate-700 block">Block ID</label>
              <input
                type="text"
                required
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold font-mono"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-slate-700 block">Block Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-slate-700 block">Zone</label>
              <input
                type="text"
                required
                value={formData.zone}
                onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-slate-700 block">Crystallization Stage</label>
              <select
                value={formData.crystallizationStage}
                onChange={(e) => setFormData({ ...formData, crystallizationStage: e.target.value as any })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
              >
                <option value="Brine">Brine Intake</option>
                <option value="Concentration">Concentration</option>
                <option value="Pre-crystallization">Pre-crystallization</option>
                <option value="Crystallization">Crystallization</option>
                <option value="Harvest Ready">Harvest Ready</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-slate-700 block">Current EC (mS/cm)</label>
              <input
                type="number"
                required
                value={formData.currentEc}
                onChange={(e) => setFormData({ ...formData, currentEc: Number(e.target.value) })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-slate-700 block">Target EC (mS/cm)</label>
              <input
                type="number"
                required
                value={formData.targetEc}
                onChange={(e) => setFormData({ ...formData, targetEc: Number(e.target.value) })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-slate-700 block">Brine Temp (°C)</label>
              <input
                type="number"
                step="0.1"
                required
                value={formData.temp}
                onChange={(e) => setFormData({ ...formData, temp: Number(e.target.value) })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <Button type="button" variant="secondary" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Create Salt Block
            </Button>
          </div>
        </form>
      </Modal>

      {/* EDIT BLOCK MODAL */}
      <Modal isOpen={!!editingBlock} onClose={() => setEditingBlock(null)} title={`Edit Parameters: ${editingBlock?.name}`}>
        <form onSubmit={handleEditSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-slate-700 block">Block Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-slate-700 block">Zone</label>
              <input
                type="text"
                required
                value={formData.zone}
                onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-slate-700 block">Current EC</label>
              <input
                type="number"
                required
                value={formData.currentEc}
                onChange={(e) => setFormData({ ...formData, currentEc: Number(e.target.value) })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-slate-700 block">Brine Temp</label>
              <input
                type="number"
                step="0.1"
                required
                value={formData.temp}
                onChange={(e) => setFormData({ ...formData, temp: Number(e.target.value) })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-slate-700 block">Water Level (cm)</label>
              <input
                type="number"
                step="0.1"
                required
                value={formData.waterLevel}
                onChange={(e) => setFormData({ ...formData, waterLevel: Number(e.target.value) })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <Button type="button" variant="secondary" onClick={() => setEditingBlock(null)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>

      {/* DELETE CONFIRMATION MODAL */}
      <Modal isOpen={!!deletingBlockId} onClose={() => setDeletingBlockId(null)} title="Delete Salt Evaporation Block">
        <div className="space-y-4 text-xs">
          <p className="text-slate-600 font-medium">
            Are you sure you want to delete salt block <strong className="text-slate-900 font-bold">{deletingBlockId}</strong>? This action will remove all linked sensor probe assignments and Supabase records.
          </p>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={() => setDeletingBlockId(null)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteConfirm}>
              Delete Block
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

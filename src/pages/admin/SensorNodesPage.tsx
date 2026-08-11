import React from 'react';
import { useNavigate } from 'react-router-dom';
import { deviceService } from '../../services/deviceService';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Search, Filter, Radio, Battery, Wifi, Eye } from 'lucide-react';

export const SensorNodesPage: React.FC = () => {
  const navigate = useNavigate();
  const nodes = deviceService.getSensorNodes();

  const [searchQuery, setSearchQuery] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<'ALL' | 'ONLINE' | 'OFFLINE' | 'DEGRADED'>('ALL');

  const filteredNodes = nodes.filter((n) => {
    const matchesSearch = n.id.toLowerCase().includes(searchQuery.toLowerCase()) || n.blockName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || n.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white shadow-md shadow-teal-500/25">
            <Radio className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span className="text-gradient-green-blue text-effect-glow">Deployed Sensor Nodes ({nodes.length})</span>
            </h1>
            <p className="text-xs text-slate-500">
              Hardware node inventory across salt pans, LoRa RSSI link budgets & probe telemetry status
            </p>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search node ID or block..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 w-48 sm:w-64"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700"
          >
            <option value="ALL">All Statuses</option>
            <option value="ONLINE">Online</option>
            <option value="DEGRADED">Degraded</option>
            <option value="OFFLINE">Offline</option>
          </select>
        </div>
      </div>

      {/* Nodes Table */}
      <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3.5 px-4">Node ID</th>
                <th className="py-3.5 px-4">Block</th>
                <th className="py-3.5 px-4">Sensor Probes</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Battery</th>
                <th className="py-3.5 px-4">LoRa Signal</th>
                <th className="py-3.5 px-4">Last Seen</th>
                <th className="py-3.5 px-4">Calibration</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium">
              {filteredNodes.map((node) => (
                <tr key={node.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{node.id}</td>
                  <td className="py-3.5 px-4 font-semibold text-teal-600">{node.blockName}</td>
                  <td className="py-3.5 px-4">
                    <div className="flex gap-1">
                      {node.sensorTypes.map((t) => (
                        <span key={t} className="px-1.5 py-0.5 rounded bg-slate-100 text-[10px] font-bold text-slate-600">
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge variant={node.status === 'ONLINE' ? 'success' : node.status === 'DEGRADED' ? 'warning' : 'danger'} size="sm">
                      {node.status}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-800">{node.batteryLevel}%</td>
                  <td className="py-3.5 px-4 text-slate-600">{node.signalDbm} dBm ({node.signalQuality})</td>
                  <td className="py-3.5 px-4 text-slate-500">{node.lastSeen}</td>
                  <td className="py-3.5 px-4">
                    <Badge variant={node.calibrationStatus === 'OK' ? 'success' : 'warning'} size="sm">
                      {node.calibrationStatus}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Button
                      onClick={() => navigate(`/operator/sensors/${node.id}`)}
                      variant="ghost"
                      size="sm"
                      leftIcon={<Eye className="w-3.5 h-3.5 text-teal-600" />}
                    >
                      Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

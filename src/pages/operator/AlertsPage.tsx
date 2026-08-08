import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Alert } from '../../types';
import {
  Bell,
  CheckCircle,
  AlertTriangle,
  Info,
  Check,
  ArrowRight,
  Filter,
  Zap,
  CloudRain,
  Wrench,
  BatteryCharging,
  Wifi,
} from 'lucide-react';

export const OperatorAlertsPage: React.FC = () => {
  const navigate = useNavigate();
  const { alerts, acknowledgeAlert, resolveAlert, setSelectedBlockId } = useAppStore();

  const [severityFilter, setSeverityFilter] = React.useState<'ALL' | 'CRITICAL' | 'WARNING' | 'INFO'>('ALL');
  const [statusFilter, setStatusFilter] = React.useState<'ALL' | 'NEW' | 'ACKNOWLEDGED' | 'RESOLVED'>('ALL');
  const [selectedAlert, setSelectedAlert] = React.useState<Alert | null>(null);

  const filteredAlerts = alerts.filter((a) => {
    const matchesSev = severityFilter === 'ALL' || a.severity === severityFilter;
    const matchesStat = statusFilter === 'ALL' || a.status === statusFilter;
    return matchesSev && matchesStat;
  });

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'SALINITY_DROP':
        return <Zap className="w-5 h-5 text-rose-600" />;
      case 'RAIN_RISK':
        return <CloudRain className="w-5 h-5 text-amber-600" />;
      case 'SENSOR_HEALTH':
        return <Wrench className="w-5 h-5 text-amber-600" />;
      case 'LOW_BATTERY':
        return <BatteryCharging className="w-5 h-5 text-rose-600" />;
      case 'CONNECTIVITY':
        return <Wifi className="w-5 h-5 text-blue-600" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-amber-600" />;
    }
  };

  const handleBlockNavigate = (blockId: string) => {
    setSelectedBlockId(blockId);
    setSelectedAlert(null);
    navigate('/operator/monitoring');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-rose-600 text-white shadow-md shadow-rose-200">
            <Bell className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Hardware & Field Alerts</h1>
            <p className="text-xs text-slate-500">
              Hardware sensor diagnostics, salinity drop alerts, rain risk notifications & battery telemetry
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value as any)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700"
          >
            <option value="ALL">All Severities</option>
            <option value="CRITICAL">Critical Only</option>
            <option value="WARNING">Warning Only</option>
            <option value="INFO">Info Only</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700"
          >
            <option value="ALL">All Statuses</option>
            <option value="NEW">New</option>
            <option value="ACKNOWLEDGED">Acknowledged</option>
            <option value="RESOLVED">Resolved</option>
          </select>
        </div>
      </div>

      {/* Alerts Table / Card List */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900">Active Alert Stream ({filteredAlerts.length})</h3>

        <div className="divide-y divide-slate-100 space-y-3">
          {filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              onClick={() => setSelectedAlert(alert)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                alert.status === 'NEW'
                  ? 'bg-rose-50/40 border-rose-200 hover:bg-rose-50/70'
                  : alert.status === 'ACKNOWLEDGED'
                  ? 'bg-amber-50/30 border-amber-200'
                  : 'bg-white border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs shrink-0">
                  {getAlertIcon(alert.type)}
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900 text-sm">{alert.title}</span>
                    <Badge
                      variant={
                        alert.severity === 'CRITICAL'
                          ? 'danger'
                          : alert.severity === 'WARNING'
                          ? 'warning'
                          : 'info'
                      }
                      size="sm"
                    >
                      {alert.severity}
                    </Badge>
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                      {alert.blockName}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-1">{alert.description}</p>
                  <span className="text-[10px] text-slate-400 font-medium block">{alert.timestamp}</span>
                </div>
              </div>

              {/* Status Action Buttons */}
              <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                {alert.status === 'NEW' && (
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      acknowledgeAlert(alert.id);
                    }}
                    variant="secondary"
                    size="sm"
                  >
                    Acknowledge
                  </Button>
                )}
                {alert.status !== 'RESOLVED' && (
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      resolveAlert(alert.id);
                    }}
                    variant="outline"
                    size="sm"
                    leftIcon={<Check className="w-3.5 h-3.5 text-emerald-600" />}
                  >
                    Resolve
                  </Button>
                )}
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBlockNavigate(alert.blockId);
                  }}
                  variant="ghost"
                  size="sm"
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  View Block
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alert Detail Modal */}
      <Modal
        isOpen={!!selectedAlert}
        onClose={() => setSelectedAlert(null)}
        title={selectedAlert?.title || 'Alert Diagnostic Details'}
      >
        {selectedAlert && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant={selectedAlert.severity === 'CRITICAL' ? 'danger' : 'warning'} size="md">
                {selectedAlert.severity} SEVERITY
              </Badge>
              <span className="text-xs text-slate-400 font-medium">{selectedAlert.timestamp}</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase block">Alert Description</span>
              <p className="text-sm font-semibold text-slate-900">{selectedAlert.description}</p>
            </div>

            <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 space-y-2">
              <span className="text-xs font-bold text-blue-800 uppercase block">Recommended Field Action</span>
              <p className="text-sm font-semibold text-blue-900">{selectedAlert.recommendedAction}</p>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button onClick={() => handleBlockNavigate(selectedAlert.blockId)} variant="primary">
                Navigate to Block {selectedAlert.blockId}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

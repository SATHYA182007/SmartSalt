import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Bell, Check, Radio, Wifi, BatteryCharging, AlertTriangle } from 'lucide-react';

export const AdminAlertsPage: React.FC = () => {
  const { alerts, acknowledgeAlert, resolveAlert } = useAppStore();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-rose-600 text-white shadow-md shadow-rose-200">
            <Bell className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Infrastructure Alerts Stream</h1>
            <p className="text-xs text-slate-500">
              Hardware disconnects, gateway timeouts & low battery notifications across deployment
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="divide-y divide-slate-100 space-y-3">
          {alerts.map((alert) => (
            <div key={alert.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-slate-900 text-sm">{alert.title}</span>
                  <Badge variant={alert.severity === 'CRITICAL' ? 'danger' : 'warning'} size="sm">
                    {alert.severity}
                  </Badge>
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                    {alert.blockName}
                  </span>
                </div>
                <p className="text-xs text-slate-600">{alert.description}</p>
                <span className="text-[10px] text-slate-400 block">{alert.timestamp}</span>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                {alert.status === 'NEW' && (
                  <Button onClick={() => acknowledgeAlert(alert.id)} variant="secondary" size="sm">
                    Acknowledge
                  </Button>
                )}
                {alert.status !== 'RESOLVED' && (
                  <Button onClick={() => resolveAlert(alert.id)} variant="outline" size="sm" leftIcon={<Check className="w-3.5 h-3.5 text-emerald-600" />}>
                    Resolve
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

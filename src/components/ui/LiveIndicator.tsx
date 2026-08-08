import React from 'react';

interface LiveIndicatorProps {
  label?: string;
  status?: 'ONLINE' | 'OFFLINE' | 'DEGRADED';
}

export const LiveIndicator: React.FC<LiveIndicatorProps> = ({ label = 'LIVE', status = 'ONLINE' }) => {
  const colorMap = {
    ONLINE: { bg: 'bg-emerald-500', ping: 'bg-emerald-400', text: 'text-emerald-700' },
    DEGRADED: { bg: 'bg-amber-500', ping: 'bg-amber-400', text: 'text-amber-700' },
    OFFLINE: { bg: 'bg-rose-500', ping: 'bg-rose-400', text: 'text-rose-700' },
  };

  const current = colorMap[status];

  return (
    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-100/80 border border-slate-200 text-xs font-semibold">
      <span className="relative flex h-2 w-2">
        {status === 'ONLINE' && (
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${current.ping} opacity-75`} />
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${current.bg}`} />
      </span>
      <span className={`${current.text} uppercase tracking-wider text-[11px]`}>{label}</span>
    </div>
  );
};

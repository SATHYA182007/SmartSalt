import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Check, Trash2, ArrowRight } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { notifications, markNotificationAsRead, clearAllNotifications } = useAppStore();

  const handleNotificationClick = (link: string, id: string) => {
    markNotificationAsRead(id);
    onClose();
    navigate(link);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div onClick={onClose} className="fixed inset-0 z-40 bg-transparent" />
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute right-4 top-16 z-50 w-80 sm:w-96 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden"
          >
            {/* Drawer Header */}
            <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-teal-600" />
                <span className="font-semibold text-sm text-slate-900">Hardware Telemetry Alerts</span>
              </div>
              {notifications.length > 0 && (
                <button
                  onClick={clearAllNotifications}
                  className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 hover:underline"
                >
                  <Trash2 className="w-3 h-3" /> Clear all
                </button>
              )}
            </div>

            {/* List */}
            <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs">No active telemetry notifications</div>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => handleNotificationClick(n.link, n.id)}
                    className={`p-4 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3 ${
                      !n.read ? 'bg-teal-50/40' : ''
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                        n.severity === 'critical'
                          ? 'bg-rose-500'
                          : n.severity === 'warning'
                          ? 'bg-amber-500'
                          : 'bg-teal-500'
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-semibold text-xs text-slate-900 truncate">{n.title}</span>
                        <span className="text-[10px] text-slate-400 shrink-0">{n.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-2">{n.message}</p>
                      <div className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-teal-600">
                        View details <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

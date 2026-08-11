import { create } from 'zustand';
import { User, Role, SaltBlock, Alert, NotificationItem } from '../types';
import { authService } from '../services/authService';
import { sensorService } from '../services/sensorService';
import { alertService } from '../services/alertService';
import { supabase } from '../lib/supabase';

interface AppState {
  user: User | null;
  role: Role;
  selectedBlockId: string;
  blocks: SaltBlock[];
  alerts: Alert[];
  notifications: NotificationItem[];
  isLiveSimulating: boolean;
  
  // Actions
  setUser: (user: User | null) => void;
  updateUserProfile: (updatedFields: Partial<User>) => Promise<void>;
  setRole: (role: Role) => void;
  setSelectedBlockId: (id: string) => void;
  toggleLiveSimulation: () => void;
  addBlock: (newBlock: SaltBlock) => Promise<void>;
  updateBlock: (updatedBlock: SaltBlock) => Promise<void>;
  deleteBlock: (blockId: string) => Promise<void>;
  acknowledgeAlert: (alertId: string) => void;
  resolveAlert: (alertId: string) => void;
  markNotificationAsRead: (notificationId: string) => void;
  clearAllNotifications: () => void;
  tickRealtimeUpdate: () => void;
  logout: () => void;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Harvest Readiness Milestone',
    message: 'Block A03 reached 87% harvest readiness threshold.',
    timestamp: '5 min ago',
    read: false,
    link: '/operator/ai-insights',
    severity: 'info',
  },
  {
    id: 'notif-2',
    title: 'EC Sensor Anomaly',
    message: 'Sensor B02 reported abnormal EC fluctuation (-18%).',
    timestamp: '32 min ago',
    read: false,
    link: '/operator/alerts',
    severity: 'critical',
  },
  {
    id: 'notif-3',
    title: 'Gateway Warning',
    message: 'Gateway GW-03 lost signal with 2 nodes in Sector C.',
    timestamp: '1 hour ago',
    read: true,
    link: '/admin/gateways',
    severity: 'warning',
  },
];

export const useAppStore = create<AppState>((set, get) => ({
  user: authService.getCurrentUser(),
  role: (authService.getCurrentUser()?.role as Role) || 'operator',
  selectedBlockId: 'A03',
  blocks: sensorService.getSaltBlocks(),
  alerts: alertService.getAlerts(),
  notifications: INITIAL_NOTIFICATIONS,
  isLiveSimulating: true,

  setUser: (user) => set({ user, role: user ? user.role : 'operator' }),
  
  updateUserProfile: async (updatedFields) => {
    const currentUser = get().user;
    if (!currentUser) return;

    const newUser: User = { ...currentUser, ...updatedFields };
    set({ user: newUser });
    localStorage.setItem('smartsalt_user', JSON.stringify(newUser));

    try {
      await supabase.from('profiles').upsert({
        email: newUser.email,
        full_name: newUser.name,
        role: newUser.role,
        organization: newUser.organization,
        avatar_url: newUser.avatarUrl,
      }, { onConflict: 'email' });
    } catch {
      // Graceful fallback
    }
  },

  setRole: (role) => set({ role }),
  setSelectedBlockId: (selectedBlockId) => set({ selectedBlockId }),
  
  toggleLiveSimulation: () => set((state) => ({ isLiveSimulating: !state.isLiveSimulating })),

  addBlock: async (newBlock) => {
    const updatedBlocks = [newBlock, ...get().blocks];
    set({ blocks: updatedBlocks });
    localStorage.setItem('smartsalt_blocks', JSON.stringify(updatedBlocks));

    try {
      await supabase.from('salt_blocks').insert({
        id: newBlock.id,
        name: newBlock.name,
        zone: newBlock.zone,
        target_ec: newBlock.targetEc,
        current_ec: newBlock.currentEc,
        temp: newBlock.temp,
        water_level: newBlock.waterLevel,
        status: newBlock.status,
        crystallization_stage: newBlock.crystallizationStage,
        harvest_readiness: newBlock.harvestReadiness,
        lat: newBlock.lat,
        lng: newBlock.lng,
      });
    } catch {
      // Graceful fallback
    }
  },

  updateBlock: async (updatedBlock) => {
    const updatedBlocks = get().blocks.map((b) => (b.id === updatedBlock.id ? updatedBlock : b));
    set({ blocks: updatedBlocks });
    localStorage.setItem('smartsalt_blocks', JSON.stringify(updatedBlocks));

    try {
      await supabase.from('salt_blocks').upsert({
        id: updatedBlock.id,
        name: updatedBlock.name,
        zone: updatedBlock.zone,
        target_ec: updatedBlock.targetEc,
        current_ec: updatedBlock.currentEc,
        temp: updatedBlock.temp,
        water_level: updatedBlock.waterLevel,
        status: updatedBlock.status,
        crystallization_stage: updatedBlock.crystallizationStage,
        harvest_readiness: updatedBlock.harvestReadiness,
        lat: updatedBlock.lat,
        lng: updatedBlock.lng,
      });
    } catch {
      // Graceful fallback
    }
  },

  deleteBlock: async (blockId) => {
    const updatedBlocks = get().blocks.filter((b) => b.id !== blockId);
    set({ blocks: updatedBlocks });
    localStorage.setItem('smartsalt_blocks', JSON.stringify(updatedBlocks));

    try {
      await supabase.from('salt_blocks').delete().eq('id', blockId);
    } catch {
      // Graceful fallback
    }
  },

  acknowledgeAlert: (alertId) => {
    alertService.acknowledgeAlert(alertId);
    const updatedAlerts = alertService.getAlerts();
    set({ alerts: updatedAlerts });
    localStorage.setItem('smartsalt_alerts', JSON.stringify(updatedAlerts));
  },

  resolveAlert: (alertId) => {
    alertService.resolveAlert(alertId);
    const updatedAlerts = alertService.getAlerts();
    set({ alerts: updatedAlerts });
    localStorage.setItem('smartsalt_alerts', JSON.stringify(updatedAlerts));
  },

  markNotificationAsRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    }));
  },

  clearAllNotifications: () => set({ notifications: [] }),

  tickRealtimeUpdate: () => {
    const { isLiveSimulating, blocks } = get();
    if (!isLiveSimulating) return;

    const updatedBlocks = blocks.map((b) => {
      const ecDrift = Math.random() > 0.4 ? Number((Math.random() * 0.4).toFixed(1)) : -0.1;
      const tempDrift = Math.random() > 0.5 ? Number((Math.random() * 0.2 - 0.1).toFixed(1)) : 0;
      const waterDrift = Math.random() > 0.4 ? -0.05 : 0;

      const newEc = Math.max(90, Math.min(220, Math.round((b.currentEc + ecDrift) * 10) / 10));
      const newTemp = Math.max(25, Math.min(42, Math.round((b.temp + tempDrift) * 10) / 10));
      const newWater = Math.max(1.0, Math.min(20, Math.round((b.waterLevel + waterDrift) * 100) / 100));

      const ecRatio = Math.min(1.0, newEc / b.targetEc);
      const newHarvestReadiness = Math.min(99, Math.round(ecRatio * 96));

      return {
        ...b,
        currentEc: newEc,
        temp: newTemp,
        waterLevel: newWater,
        harvestReadiness: newHarvestReadiness,
        lastUpdated: 'Just now',
      };
    });

    set({ blocks: updatedBlocks });
  },

  logout: () => {
    authService.logout();
    set({ user: null, role: 'operator' });
  },
}));

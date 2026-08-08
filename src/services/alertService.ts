import { Alert } from '../types';

export const INITIAL_ALERTS: Alert[] = [
  {
    id: 'ALT-1001',
    title: 'Rain Risk — Brine Dilution Warning',
    description: 'Moderate rain probability detected. Concentrated brine in Block A03 is at risk of dilution.',
    severity: 'WARNING',
    status: 'NEW',
    type: 'RAIN_RISK',
    blockId: 'A03',
    blockName: 'Block A03',
    timestamp: '10 min ago',
    recommendedAction: 'Engage rain diversion sluices or prepare emergency brine pump-over.',
  },
  {
    id: 'ALT-1002',
    title: 'Sudden Salinity Drop',
    description: 'EC dropped 18% in the last 2 hours from 156 mS/cm to 128 mS/cm.',
    severity: 'CRITICAL',
    status: 'NEW',
    type: 'SALINITY_DROP',
    blockId: 'B02',
    blockName: 'Block B02',
    timestamp: '32 min ago',
    recommendedAction: 'Inspect block intake gate for unexpected freshwater influx.',
  },
  {
    id: 'ALT-1003',
    title: 'Sensor Health Anomaly',
    description: 'EC probe readings on Node NODE-C01-01 show fluctuating resistance noise.',
    severity: 'WARNING',
    status: 'ACKNOWLEDGED',
    type: 'SENSOR_HEALTH',
    blockId: 'C01',
    blockName: 'Block C01',
    nodeId: 'NODE-C01-01',
    timestamp: '1 hour ago',
    recommendedAction: 'Clean polymer probe tip and verify RS485 bus connections.',
  },
  {
    id: 'ALT-1004',
    title: 'Low Node Battery',
    description: 'Internal LiFePO4 battery level dropped below 15% threshold (12%).',
    severity: 'CRITICAL',
    status: 'NEW',
    type: 'LOW_BATTERY',
    blockId: 'B02',
    blockName: 'Block B02',
    nodeId: 'NODE-B02-03',
    timestamp: '2 hours ago',
    recommendedAction: 'Inspect solar charging panel glass for salt crusting or replace battery pack.',
  },
  {
    id: 'ALT-1005',
    title: 'Intermittent LoRa Connectivity',
    description: 'Packet delivery rate fell to 68% over 15 min evaluation window.',
    severity: 'INFO',
    status: 'RESOLVED',
    type: 'CONNECTIVITY',
    blockId: 'A02',
    blockName: 'Block A02',
    nodeId: 'NODE-A02-02',
    timestamp: '4 hours ago',
    recommendedAction: 'Check antenna alignment and RSSI levels on Gateway GW-01.',
  },
];

let alertsState = [...INITIAL_ALERTS];

export const alertService = {
  getAlerts(): Alert[] {
    return alertsState;
  },

  getAlertsByBlock(blockId: string): Alert[] {
    return alertsState.filter((a) => a.blockId === blockId);
  },

  acknowledgeAlert(id: string): Alert | undefined {
    alertsState = alertsState.map((a) => (a.id === id ? { ...a, status: 'ACKNOWLEDGED' as const } : a));
    return alertsState.find((a) => a.id === id);
  },

  resolveAlert(id: string): Alert | undefined {
    alertsState = alertsState.map((a) => (a.id === id ? { ...a, status: 'RESOLVED' as const } : a));
    return alertsState.find((a) => a.id === id);
  },
};

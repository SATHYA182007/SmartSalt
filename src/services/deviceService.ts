import { SensorNode, Gateway } from '../types';

export const INITIAL_GATEWAYS: Gateway[] = [
  {
    id: 'GW-01',
    name: 'Gateway North Mast (LoRa-868)',
    location: 'North Elevation Tower, Sector A',
    connectedNodes: 16,
    status: 'ONLINE',
    signalHealth: 98,
    internetBackhaul: '4G Cellular',
    lastSync: 'Just now',
    uptimePercent: 99.94,
    ipAddress: '192.168.10.4',
  },
  {
    id: 'GW-02',
    name: 'Gateway Central Hub (LoRa-868)',
    location: 'Central Control Station, Sector B',
    connectedNodes: 16,
    status: 'ONLINE',
    signalHealth: 95,
    internetBackhaul: 'Ethernet',
    lastSync: '4s ago',
    uptimePercent: 99.88,
    ipAddress: '192.168.10.5',
  },
  {
    id: 'GW-03',
    name: 'Gateway South Solar Array (LoRa-868)',
    location: 'South Boundary Substation, Sector C',
    connectedNodes: 16,
    status: 'WARNING',
    signalHealth: 78,
    internetBackhaul: 'Satellite',
    lastSync: '42s ago',
    uptimePercent: 98.50,
    ipAddress: '192.168.10.6',
  },
];

export const INITIAL_NODES: SensorNode[] = Array.from({ length: 48 }).map((_, idx) => {
  const blockNum = Math.floor(idx / 4); // 12 blocks (0 to 11)
  const blockLetters = ['A01', 'A02', 'A03', 'A04', 'B01', 'B02', 'B03', 'B04', 'C01', 'C02', 'C03', 'C04'];
  const blockId = blockLetters[blockNum];
  const nodeSubIdx = (idx % 4) + 1;
  const nodeId = `NODE-${blockId}-0${nodeSubIdx}`;

  let status: 'ONLINE' | 'OFFLINE' | 'DEGRADED' = 'ONLINE';
  let battery = 85 + Math.floor(Math.random() * 14);
  let calibration: 'OK' | 'DUE' | 'OVERDUE' = 'OK';
  let signalQuality: 'EXCELLENT' | 'GOOD' | 'FAIR' | 'POOR' = 'EXCELLENT';

  if (idx === 14) {
    status = 'OFFLINE';
    battery = 12;
    calibration = 'DUE';
    signalQuality = 'POOR';
  } else if (idx === 27) {
    status = 'OFFLINE';
    battery = 8;
    calibration = 'OVERDUE';
    signalQuality = 'POOR';
  } else if (idx % 11 === 0) {
    status = 'DEGRADED';
    battery = 42;
    calibration = 'DUE';
    signalQuality = 'FAIR';
  }

  const sensorTypesList: ('EC' | 'TEMP' | 'WATER_LEVEL' | 'WEATHER' | 'CAMERA')[][] = [
    ['EC', 'TEMP', 'WATER_LEVEL'],
    ['EC', 'TEMP'],
    ['WATER_LEVEL', 'WEATHER'],
    ['CAMERA', 'EC', 'TEMP'],
  ];

  return {
    id: nodeId,
    blockId,
    blockName: `Block ${blockId}`,
    nodeName: `SmartSalt Pro Node ${nodeSubIdx} (${blockId})`,
    firmwareVersion: 'v2.8.4-LoRa',
    status,
    batteryLevel: battery,
    signalDbm: -60 - Math.floor(Math.random() * 25),
    signalQuality,
    gatewayId: blockNum < 4 ? 'GW-01' : blockNum < 8 ? 'GW-02' : 'GW-03',
    lastSeen: status === 'OFFLINE' ? '2h 14m ago' : `${Math.floor(Math.random() * 20) + 1}s ago`,
    sensorTypes: sensorTypesList[idx % 4],
    ip67Status: idx === 14 || idx === 27 ? 'CHECK_REQUIRED' : 'SEALED',
    calibrationStatus: calibration,
    lastCalibrated: '2026-06-15',
    nextCalibrationDue: calibration === 'OK' ? '2026-12-15' : '2026-08-01',
  };
});

export const deviceService = {
  getGateways(): Gateway[] {
    return INITIAL_GATEWAYS;
  },

  getSensorNodes(): SensorNode[] {
    return INITIAL_NODES;
  },

  getNodeById(id: string): SensorNode | undefined {
    return INITIAL_NODES.find((n) => n.id === id);
  },

  getSystemStats() {
    const nodes = INITIAL_NODES;
    const online = nodes.filter((n) => n.status === 'ONLINE').length;
    const offline = nodes.filter((n) => n.status === 'OFFLINE').length;
    const degraded = nodes.filter((n) => n.status === 'DEGRADED').length;
    const calibrationDue = nodes.filter((n) => n.calibrationStatus !== 'OK').length;
    const gateways = INITIAL_GATEWAYS;

    return {
      totalNodes: nodes.length,
      onlineNodes: online,
      offlineNodes: offline,
      degradedNodes: degraded,
      totalGateways: gateways.length,
      healthyGateways: gateways.filter((g) => g.status === 'ONLINE').length,
      calibrationDueCount: calibrationDue,
    };
  },
};

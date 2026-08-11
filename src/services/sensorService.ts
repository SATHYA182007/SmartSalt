import { SaltBlock, SensorReading } from '../types';

export const INITIAL_BLOCKS: SaltBlock[] = [
  {
    id: 'A01',
    name: 'Block A01',
    zone: 'North Crystallization Pan 1',
    areaHectares: 2.4,
    status: 'NORMAL',
    currentEc: 142,
    targetEc: 210,
    ecTrend: 'RISING',
    temp: 31.5,
    tempTrend: 'RISING',
    waterLevel: 8.4,
    waterLevelTrend: 'FALLING',
    humidity: 58,
    rainRisk: 'LOW',
    harvestReadiness: 45,
    crystallizationStage: 'Pre-crystallization',
    nodeCount: 4,
    lat: 36.651,
    lng: -6.295,
    lastUpdated: '10s ago',
  },
  {
    id: 'A02',
    name: 'Block A02',
    zone: 'North Crystallization Pan 2',
    areaHectares: 2.8,
    status: 'MONITORING',
    currentEc: 162,
    targetEc: 210,
    ecTrend: 'RISING',
    temp: 33.1,
    tempTrend: 'STABLE',
    waterLevel: 6.2,
    waterLevelTrend: 'FALLING',
    humidity: 60,
    rainRisk: 'MODERATE',
    harvestReadiness: 68,
    crystallizationStage: 'Crystallization',
    nodeCount: 4,
    lat: 36.654,
    lng: -6.291,
    lastUpdated: '5s ago',
  },
  {
    id: 'A03',
    name: 'Block A03',
    zone: 'North Crystallization Pan 3',
    areaHectares: 3.1,
    status: 'ACTION_REQUIRED',
    currentEc: 185,
    targetEc: 210,
    ecTrend: 'RISING',
    temp: 34.8,
    tempTrend: 'RISING',
    waterLevel: 4.2,
    waterLevelTrend: 'FALLING',
    humidity: 62,
    rainRisk: 'MODERATE',
    harvestReadiness: 87,
    crystallizationStage: 'Crystallization',
    nodeCount: 4,
    lat: 36.658,
    lng: -6.286,
    lastUpdated: 'Just now',
  },
  {
    id: 'A04',
    name: 'Block A04',
    zone: 'North Evaporation Pan 4',
    areaHectares: 3.5,
    status: 'NORMAL',
    currentEc: 110,
    targetEc: 210,
    ecTrend: 'RISING',
    temp: 29.8,
    tempTrend: 'STABLE',
    waterLevel: 12.1,
    waterLevelTrend: 'FALLING',
    humidity: 55,
    rainRisk: 'LOW',
    harvestReadiness: 22,
    crystallizationStage: 'Brine',
    nodeCount: 4,
    lat: 36.662,
    lng: -6.282,
    lastUpdated: '12s ago',
  },
  {
    id: 'B01',
    name: 'Block B01',
    zone: 'Central Pan 1',
    areaHectares: 2.9,
    status: 'NORMAL',
    currentEc: 195,
    targetEc: 210,
    ecTrend: 'RISING',
    temp: 35.4,
    tempTrend: 'STABLE',
    waterLevel: 3.8,
    waterLevelTrend: 'FALLING',
    humidity: 54,
    rainRisk: 'LOW',
    harvestReadiness: 94,
    crystallizationStage: 'Harvest Ready',
    nodeCount: 4,
    lat: 36.649,
    lng: -6.301,
    lastUpdated: '3s ago',
  },
  {
    id: 'B02',
    name: 'Block B02',
    zone: 'Central Pan 2',
    areaHectares: 3.0,
    status: 'ACTION_REQUIRED',
    currentEc: 128,
    targetEc: 210,
    ecTrend: 'FALLING',
    temp: 30.2,
    tempTrend: 'FALLING',
    waterLevel: 9.5,
    waterLevelTrend: 'RISING',
    humidity: 78,
    rainRisk: 'HIGH',
    harvestReadiness: 38,
    crystallizationStage: 'Concentration',
    nodeCount: 4,
    lat: 36.652,
    lng: -6.298,
    lastUpdated: '18s ago',
  },
  {
    id: 'B03',
    name: 'Block B03',
    zone: 'Central Pan 3',
    areaHectares: 2.7,
    status: 'NORMAL',
    currentEc: 174,
    targetEc: 210,
    ecTrend: 'RISING',
    temp: 33.9,
    tempTrend: 'RISING',
    waterLevel: 5.1,
    waterLevelTrend: 'FALLING',
    humidity: 59,
    rainRisk: 'LOW',
    harvestReadiness: 79,
    crystallizationStage: 'Crystallization',
    nodeCount: 4,
    lat: 36.656,
    lng: -6.294,
    lastUpdated: '7s ago',
  },
  {
    id: 'B04',
    name: 'Block B04',
    zone: 'Central Pan 4',
    areaHectares: 3.2,
    status: 'NORMAL',
    currentEc: 155,
    targetEc: 210,
    ecTrend: 'RISING',
    temp: 32.6,
    tempTrend: 'STABLE',
    waterLevel: 6.9,
    waterLevelTrend: 'FALLING',
    humidity: 58,
    rainRisk: 'LOW',
    harvestReadiness: 62,
    crystallizationStage: 'Pre-crystallization',
    nodeCount: 4,
    lat: 36.660,
    lng: -6.290,
    lastUpdated: '15s ago',
  },
  {
    id: 'C01',
    name: 'Block C01',
    zone: 'South Crystallization 1',
    areaHectares: 2.2,
    status: 'MONITORING',
    currentEc: 148,
    targetEc: 210,
    ecTrend: 'STABLE',
    temp: 31.0,
    tempTrend: 'FALLING',
    waterLevel: 7.8,
    waterLevelTrend: 'STABLE',
    humidity: 65,
    rainRisk: 'MODERATE',
    harvestReadiness: 52,
    crystallizationStage: 'Pre-crystallization',
    nodeCount: 4,
    lat: 36.646,
    lng: -6.308,
    lastUpdated: '22s ago',
  },
  {
    id: 'C02',
    name: 'Block C02',
    zone: 'South Crystallization 2',
    areaHectares: 2.5,
    status: 'NORMAL',
    currentEc: 188,
    targetEc: 210,
    ecTrend: 'RISING',
    temp: 34.2,
    tempTrend: 'RISING',
    waterLevel: 4.5,
    waterLevelTrend: 'FALLING',
    humidity: 56,
    rainRisk: 'LOW',
    harvestReadiness: 89,
    crystallizationStage: 'Crystallization',
    nodeCount: 4,
    lat: 36.650,
    lng: -6.304,
    lastUpdated: '2s ago',
  },
  {
    id: 'C03',
    name: 'Block C03',
    zone: 'South Pan 3',
    areaHectares: 3.4,
    status: 'NORMAL',
    currentEc: 104,
    targetEc: 210,
    ecTrend: 'RISING',
    temp: 28.9,
    tempTrend: 'STABLE',
    waterLevel: 14.2,
    waterLevelTrend: 'FALLING',
    humidity: 57,
    rainRisk: 'LOW',
    harvestReadiness: 18,
    crystallizationStage: 'Brine',
    nodeCount: 4,
    lat: 36.654,
    lng: -6.300,
    lastUpdated: '14s ago',
  },
  {
    id: 'C04',
    name: 'Block C04',
    zone: 'South Pan 4',
    areaHectares: 3.1,
    status: 'NORMAL',
    currentEc: 178,
    targetEc: 210,
    ecTrend: 'RISING',
    temp: 33.7,
    tempTrend: 'STABLE',
    waterLevel: 4.8,
    waterLevelTrend: 'FALLING',
    humidity: 61,
    rainRisk: 'LOW',
    harvestReadiness: 82,
    crystallizationStage: 'Crystallization',
    nodeCount: 4,
    lat: 36.658,
    lng: -6.296,
    lastUpdated: '9s ago',
  },
];

export interface HistoricalDataPoint {
  time: string;
  ec: number;
  temp: number;
  waterLevel: number;
  humidity: number;
}

export const sensorService = {
  getSaltBlocks(): SaltBlock[] {
    const stored = localStorage.getItem('smartsalt_blocks');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {
        // Fallback to INITIAL_BLOCKS
      }
    }
    return INITIAL_BLOCKS;
  },

  getBlockById(id: string): SaltBlock | undefined {
    return this.getSaltBlocks().find((b) => b.id === id);
  },

  getLatestReading(blockId: string): SensorReading {
    const block = this.getBlockById(blockId) || INITIAL_BLOCKS[2]; // Default to Block A03
    return {
      id: `rdg-${blockId}-${Date.now()}`,
      nodeId: `NODE-${blockId}`,
      blockId: block.id,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      ec: block.currentEc,
      temperature: block.temp,
      waterLevel: block.waterLevel,
      humidity: block.humidity,
      ambientTemp: Math.round((block.temp - 3.2) * 10) / 10,
      rainRisk: block.rainRisk,
      battery: 91,
      signalStrength: -68,
      signalQuality: 'EXCELLENT',
      crystalCoverage: Math.min(95, Math.round(block.harvestReadiness * 0.9)),
      cameraStatus: 'ACTIVE',
    };
  },

  getHistoricalData(blockId: string, timeframe: '6H' | '24H' | '7D' | '30D'): HistoricalDataPoint[] {
    const block = this.getBlockById(blockId) || INITIAL_BLOCKS[2];
    const pointsCount = timeframe === '6H' ? 12 : timeframe === '24H' ? 24 : timeframe === '7D' ? 14 : 30;
    
    const baseEc = block.currentEc;
    const baseTemp = block.temp;
    const baseWater = block.waterLevel;
    const points: HistoricalDataPoint[] = [];

    for (let i = pointsCount - 1; i >= 0; i--) {
      let timeLabel = '';
      if (timeframe === '6H') {
        const d = new Date(Date.now() - i * 30 * 60 * 1000);
        timeLabel = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      } else if (timeframe === '24H') {
        const d = new Date(Date.now() - i * 60 * 60 * 1000);
        timeLabel = `${d.getHours()}:00`;
      } else if (timeframe === '7D') {
        const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
        timeLabel = d.toLocaleDateString([], { weekday: 'short' });
      } else {
        const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
        timeLabel = `${d.getMonth() + 1}/${d.getDate()}`;
      }

      // Realistic trend curves: EC goes up over time as water evaporates (water level goes down)
      const progressionRatio = (pointsCount - 1 - i) / pointsCount;
      const ecVariation = Math.round((baseEc - (pointsCount * 0.8) + (progressionRatio * pointsCount * 0.9) + (Math.sin(i) * 1.5)) * 10) / 10;
      const tempVariation = Math.round((baseTemp - 2 + (Math.cos(i * 0.5) * 2.2)) * 10) / 10;
      const waterVariation = Math.round(Math.max(1.5, baseWater + (i * 0.15) + (Math.sin(i * 0.7) * 0.3)) * 10) / 10;
      const humidityVariation = Math.round((block.humidity + Math.sin(i) * 5) * 10) / 10;

      points.push({
        time: timeLabel,
        ec: ecVariation,
        temp: tempVariation,
        waterLevel: waterVariation,
        humidity: humidityVariation,
      });
    }

    return points;
  },
};

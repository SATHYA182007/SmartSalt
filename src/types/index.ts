export type Role = 'operator' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  organization: string;
  avatarUrl?: string;
  lastLogin: string;
}

export type BlockStatus = 'NORMAL' | 'MONITORING' | 'ACTION_REQUIRED';

export interface SaltBlock {
  id: string; // e.g. "A01", "A03"
  name: string; // e.g. "Block A03"
  zone: string; // e.g. "North Crystallization Zone"
  areaHectares: number;
  status: BlockStatus;
  currentEc: number; // mS/cm
  targetEc: number; // mS/cm for harvest readiness (e.g., 210 mS/cm)
  ecTrend: 'RISING' | 'FALLING' | 'STABLE';
  temp: number; // °C
  tempTrend: 'RISING' | 'FALLING' | 'STABLE';
  waterLevel: number; // cm
  waterLevelTrend: 'RISING' | 'FALLING' | 'STABLE';
  humidity: number; // %
  rainRisk: 'LOW' | 'MODERATE' | 'HIGH';
  harvestReadiness: number; // 0-100%
  crystallizationStage: 'Brine' | 'Concentration' | 'Pre-crystallization' | 'Crystallization' | 'Harvest Ready';
  nodeCount: number;
  lat: number;
  lng: number;
  lastUpdated: string;
}

export interface SensorReading {
  id: string;
  nodeId: string;
  blockId: string;
  timestamp: string;
  ec: number; // mS/cm
  temperature: number; // °C
  waterLevel: number; // cm
  humidity: number; // %
  ambientTemp: number; // °C
  rainRisk: 'LOW' | 'MODERATE' | 'HIGH';
  battery: number; // %
  signalStrength: number; // dBm e.g. -68
  signalQuality: 'EXCELLENT' | 'GOOD' | 'FAIR' | 'POOR';
  crystalCoverage?: number; // %
  cameraStatus?: 'ACTIVE' | 'OFFLINE';
}

export interface AIInsightFactor {
  label: string;
  type: 'positive' | 'negative' | 'neutral';
  impact: string;
}

export interface AIInsight {
  blockId: string;
  blockName: string;
  salinityEstimate: 'LOW' | 'OPTIMAL' | 'HIGH' | 'CRITICAL';
  crystallizationStage: 'Brine' | 'Concentration' | 'Pre-crystallization' | 'Crystallization' | 'Harvest Ready';
  crystallizationStageNumber: number; // 1 to 5
  harvestReadiness: number; // 0-100%
  estimatedHarvestWindow: string; // e.g. "3–4 Days"
  rainRisk: 'LOW' | 'MODERATE' | 'HIGH';
  rainImpactDescription: string;
  confidence: number; // 0-100%
  factors: AIInsightFactor[];
  summary: string;
  lastAnalyzed: string;
}

export interface SensorNode {
  id: string; // e.g. "NODE-A03"
  blockId: string;
  blockName: string;
  nodeName: string;
  firmwareVersion: string;
  status: 'ONLINE' | 'OFFLINE' | 'DEGRADED';
  batteryLevel: number; // %
  signalDbm: number; // e.g. -65 dBm
  signalQuality: 'EXCELLENT' | 'GOOD' | 'FAIR' | 'POOR';
  gatewayId: string;
  lastSeen: string;
  sensorTypes: ('EC' | 'TEMP' | 'WATER_LEVEL' | 'WEATHER' | 'CAMERA')[];
  ip67Status: 'SEALED' | 'CHECK_REQUIRED';
  calibrationStatus: 'OK' | 'DUE' | 'OVERDUE';
  lastCalibrated: string;
  nextCalibrationDue: string;
}

export interface Gateway {
  id: string; // e.g. "GW-01"
  name: string;
  location: string;
  connectedNodes: number;
  status: 'ONLINE' | 'OFFLINE' | 'WARNING';
  signalHealth: number; // %
  internetBackhaul: '4G Cellular' | 'Ethernet' | 'Satellite';
  lastSync: string;
  uptimePercent: number;
  ipAddress: string;
}

export type AlertSeverity = 'INFO' | 'WARNING' | 'CRITICAL';
export type AlertStatus = 'NEW' | 'ACKNOWLEDGED' | 'RESOLVED';
export type AlertType = 'SALINITY_DROP' | 'RAIN_RISK' | 'SENSOR_HEALTH' | 'LOW_BATTERY' | 'CONNECTIVITY';

export interface Alert {
  id: string;
  title: string;
  description: string;
  severity: AlertSeverity;
  status: AlertStatus;
  type: AlertType;
  blockId: string;
  blockName: string;
  nodeId?: string;
  timestamp: string;
  recommendedAction: string;
}

export interface WeatherForecast {
  time: string; // e.g. "12:00 PM"
  temp: number;
  humidity: number;
  rainProb: number;
  condition: 'Sunny' | 'Partly Cloudy' | 'Rain Risk' | 'Overcast';
}

export interface WeatherReading {
  temperature: number; // °C
  humidity: number; // %
  rainProbability: number; // %
  rainfall24h: number; // mm
  windSpeed: number; // km/h
  solarRadiation: number; // W/m²
  evaporationRate: number; // mm/day
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH';
  riskSummary: string;
  forecast24h: WeatherForecast[];
  lastUpdated: string;
}

export interface CrystallizationStatus {
  blockId: string;
  blockName: string;
  stageIndex: number; // 1-5
  stageName: 'Stage 1 — Brine' | 'Stage 2 — Concentration' | 'Stage 3 — Pre-crystallization' | 'Stage 4 — Crystallization' | 'Stage 5 — Harvest-ready';
  crystalCoverage: number; // %
  crystalDensity: 'Sparse' | 'Moderate' | 'Dense' | 'Optimal Harvest Density';
  visualAnalysis: string;
  aiConfidence: number; // %
  harvestReadiness: number; // %
  lastCameraSnapshot: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  link: string;
  severity: 'info' | 'warning' | 'critical';
}

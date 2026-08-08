import { AIInsight, SaltBlock } from '../types';
import { sensorService } from './sensorService';

export const aiService = {
  getAIInsightForBlock(blockId: string): AIInsight {
    const block = sensorService.getBlockById(blockId) || sensorService.getSaltBlocks()[2]; // Block A03 default

    // Deterministic calculation logic simulating ML inference model
    let salinityEstimate: 'LOW' | 'OPTIMAL' | 'HIGH' | 'CRITICAL' = 'OPTIMAL';
    if (block.currentEc < 120) salinityEstimate = 'LOW';
    else if (block.currentEc >= 120 && block.currentEc < 170) salinityEstimate = 'OPTIMAL';
    else if (block.currentEc >= 170 && block.currentEc < 205) salinityEstimate = 'HIGH';
    else salinityEstimate = 'CRITICAL';

    let stageNum = 1;
    if (block.crystallizationStage === 'Brine') stageNum = 1;
    else if (block.crystallizationStage === 'Concentration') stageNum = 2;
    else if (block.crystallizationStage === 'Pre-crystallization') stageNum = 3;
    else if (block.crystallizationStage === 'Crystallization') stageNum = 4;
    else if (block.crystallizationStage === 'Harvest Ready') stageNum = 5;

    // Harvest readiness formula based on EC (target ~210 mS/cm), temp and water level
    const ecRatio = Math.min(1.0, block.currentEc / block.targetEc);
    const harvestReadiness = Math.min(99, Math.round(ecRatio * 96));

    let window = '7–10 Days';
    if (harvestReadiness >= 90) window = '1–2 Days (Immediate Harvest)';
    else if (harvestReadiness >= 80) window = '3–4 Days';
    else if (harvestReadiness >= 60) window = '4–6 Days';
    else if (harvestReadiness >= 40) window = '6–8 Days';

    const rainImpactDesc =
      block.rainRisk === 'HIGH'
        ? 'High probability of rain within 12 hours. High risk of brine dilution in active crystallization pan.'
        : block.rainRisk === 'MODERATE'
        ? 'Possible rainfall within 24 hours. Monitor evaporation rate and prepare drainage overflow.'
        : 'Favorable dry evaporation weather. Zero rain disruption predicted for next 48 hours.';

    const factors = [
      {
        label: `Rising EC trend (${block.currentEc} mS/cm)`,
        type: 'positive' as const,
        impact: 'Accelerates brine concentration toward optimal sodium chloride crystallization threshold.',
      },
      {
        label: `Elevated brine temp (${block.temp}°C)`,
        type: 'positive' as const,
        impact: 'Sustains thermal evaporation momentum under high solar radiation.',
      },
      {
        label: `Controlled water level (${block.waterLevel} cm)`,
        type: 'positive' as const,
        impact: 'Indicates steady volumetric loss via ambient evaporation.',
      },
      {
        label: `Rain risk factor (${block.rainRisk})`,
        type: block.rainRisk === 'HIGH' ? ('negative' as const) : block.rainRisk === 'MODERATE' ? ('neutral' as const) : ('positive' as const),
        impact: block.rainRisk === 'HIGH' ? 'Potential freshwater dilution could reverse 24h EC gains.' : 'Stable weather parameters support continuous salt crystal formation.',
      },
    ];

    return {
      blockId: block.id,
      blockName: block.name,
      salinityEstimate,
      crystallizationStage: block.crystallizationStage,
      crystallizationStageNumber: stageNum,
      harvestReadiness,
      estimatedHarvestWindow: window,
      rainRisk: block.rainRisk,
      rainImpactDescription: rainImpactDesc,
      confidence: 91,
      factors,
      summary: `${block.name} is progressing smoothly through ${block.crystallizationStage.toLowerCase()} with high sodium chloride density.`,
      lastAnalyzed: 'Updated 1 min ago via SmartSalt Neural Engine v2.4',
    };
  },
};

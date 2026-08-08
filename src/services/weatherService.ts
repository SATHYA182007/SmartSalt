import { WeatherReading } from '../types';

export const weatherService = {
  getWeatherData(): WeatherReading {
    return {
      temperature: 34.2,
      humidity: 58,
      rainProbability: 45,
      rainfall24h: 0,
      windSpeed: 18.5, // km/h
      solarRadiation: 890, // W/m² (High solar gain)
      evaporationRate: 9.4, // mm/day (Excellent evaporation momentum)
      riskLevel: 'MODERATE',
      riskSummary: 'Moderate rain probability (45%) forecast within 18 hours. High ambient temperature (34.2°C) and strong solar radiation maintain rapid brine concentration, but rain monitoring is advised for advanced crystallization blocks.',
      forecast24h: [
        { time: '09:00 AM', temp: 30.5, humidity: 64, rainProb: 10, condition: 'Sunny' },
        { time: '12:00 PM', temp: 34.2, humidity: 58, rainProb: 20, condition: 'Sunny' },
        { time: '03:00 PM', temp: 35.8, humidity: 52, rainProb: 35, condition: 'Partly Cloudy' },
        { time: '06:00 PM', temp: 32.4, humidity: 62, rainProb: 45, condition: 'Rain Risk' },
        { time: '09:00 PM', temp: 28.6, humidity: 71, rainProb: 40, condition: 'Overcast' },
        { time: '12:00 AM', temp: 26.2, humidity: 78, rainProb: 25, condition: 'Partly Cloudy' },
        { time: '03:00 AM', temp: 24.8, humidity: 82, rainProb: 15, condition: 'Sunny' },
        { time: '06:00 AM', temp: 26.5, humidity: 75, rainProb: 10, condition: 'Sunny' },
      ],
      lastUpdated: 'Live weather sensor feed (Station WS-01)',
    };
  },
};

'use server';
/**
 * @fileOverview A tool for fetching weather data.
 */
import {ai} from '@/ai/genkit';
import {z} from 'zod';

// Mock weather data for Tultepec
const mockWeatherData = {
  temperature: 22,
  description: 'Parcialmente Nublado',
  icon: '☁️',
};

export const getWeatherForLocation = ai.defineTool(
  {
    name: 'getWeatherForLocation',
    description: 'Returns the current weather for a given latitude and longitude.',
    inputSchema: z.object({
      latitude: z.number().describe('The latitude of the location.'),
      longitude: z.number().describe('The longitude of the location.'),
    }),
    outputSchema: z.object({
      temperature: z.number().describe('The current temperature in Celsius.'),
      description: z.string().describe('A brief description of the weather conditions.'),
      icon: z.string().describe('An emoji representing the weather.'),
    }),
  },
  async (input) => {
    console.log(`Fetching weather for: ${input.latitude}, ${input.longitude}`);
    // In a real application, you would make an API call to a weather service here.
    // For this example, we return mock data.
    return mockWeatherData;
  }
);
